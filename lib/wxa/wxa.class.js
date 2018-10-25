const axios = require("axios");
const got = require("got");
const fse = require("fs-extra");
const moment = require("moment");
const WXBizDataCrypt = require("./WXBizDataCrypt");

module.exports = class Wxa {
    constructor(appid, appsecret) {
        this.appid = appid;
        this.appsecret = appsecret;
        this.token = {};
        this.preAuth = {};

        this.prefix = "https://api.weixin.qq.com/cgi-bin/component/";
        this.snsPrefix = "https://api.weixin.qq.com/sns/";
    }

    async post(url, data = {}, options = {}) {
        try {
            const res = await axios(
                Object.assign(
                    {
                        url: url,
                        method: "post",
                        data: data
                    },
                    options
                )
            );
            if (res.data.errmsg && res.data.errmsg !== "ok") {
                console.error(moment().format("YYYY-MM-DD HH:mm:ss"));
                console.error(res.data);
            }
            return res.data;
        } catch (err) {
            console.error(err);
        }
    }

    async get(url, options = {}) {
        try {
            const res = await axios(
                Object.assign(
                    {
                        url: url,
                        method: "get"
                    },
                    options
                )
            );
            if (res.data.errmsg && res.data.errmsg !== "ok") {
                console.error(moment().format("YYYY-MM-DD HH:mm:ss"));
                console.error(res.data);
            }
            return res.data;
        } catch (err) {
            console.error(err);
        }
    }

    get isValidToken() {
        return (
            !!this.token.component_access_token &&
            new Date().getTime() < this.token.expires_at
        );
    }

    get isValidPreAuth() {
        return (
            !!this.preAuth.pre_auth_code &&
            new Date().getTime() < this.preAuth.expires_at
        );
    }

    saveComponentVerifyTicket(data) {
        return doodoo.models.component_verify_ticket
            .forge(Object.assign(data, { id: 1 }))
            .save();
    }

    getComponentVerifyTicket() {
        return doodoo.models.component_verify_ticket
            .query({ where: { id: 1 } })
            .fetch();
    }

    async getComponentAccessToken(data) {
        let accessToken;
        try {
            accessToken = doodoo.models.component_access_token
                .query({ where: { id: 1 } })
                .fetch();
        } catch (err) {
            accessToken = await this.fetchComponentAccessToken();
        }
        return accessToken;
    }

    saveComponentAccessToken(data) {
        if (data.errmsg) {
            return;
        }

        return doodoo.models.component_access_token
            .forge(Object.assign(data, { id: 1 }))
            .save();
    }

    async fetchComponentAccessToken() {
        const url = this.prefix + "api_component_token";
        const { ComponentVerifyTicket } = await this.getComponentVerifyTicket();
        const params = {
            component_appid: this.appid,
            component_appsecret: this.appsecret,
            component_verify_ticket: ComponentVerifyTicket
        };
        this.token = await this.post(url, params);

        // 过期时间，因网络延迟等，将实际过期时间提前100秒
        this.token.expires_at =
            new Date().getTime() + (this.token.expires_in - 100) * 1000;
        // 缓存component_access_token
        await this.saveComponentAccessToken(this.token);

        return this.token;
    }

    async getComponentToken() {
        if (!this.token.component_access_token) {
            this.token = await this.getComponentAccessToken();
        }
        if (this.isValidToken) {
            return this.token;
        }

        return this.fetchComponentAccessToken();
    }

    async getPreAuthCode() {
        if (this.isValidPreAuth) {
            return this.preAuth;
        }

        const { component_access_token } = await this.getComponentToken();
        const url =
            this.prefix +
            "api_create_preauthcode?component_access_token=" +
            component_access_token;
        const params = {
            component_appid: this.appid
        };

        this.preAuth = await this.post(url, params);

        // 过期时间，因网络延迟等，将实际过期时间提前100秒
        this.preAuth.expires_at =
            new Date().getTime() + (this.preAuth.expires_in - 100) * 1000;

        return this.preAuth;
    }

    async getComponentOauthUrl(redirect_uri) {
        const { pre_auth_code } = await this.getPreAuthCode();
        const url = `https://mp.weixin.qq.com/cgi-bin/componentloginpage?component_appid=${
            this.appid
        }&pre_auth_code=${pre_auth_code}&redirect_uri=${encodeURIComponent(
            redirect_uri
        )}`;
        return url;
    }

    // 授权返回，this.query.auth_code
    async getAuthToken(auth_code) {
        const { component_access_token } = await this.getComponentToken();
        const url =
            this.prefix +
            "api_query_auth?component_access_token=" +
            component_access_token;
        const params = {
            component_appid: this.appid,
            authorization_code: auth_code
        };
        const token = await this.post(url, params);

        token.authorization_info.expires_at =
            new Date().getTime() +
            (token.authorization_info.expires_in - 100) * 1000;

        return token;
    }

    async getAuthInfo(authorizer_appid) {
        const { component_access_token } = await this.getComponentToken();
        const url =
            this.prefix +
            "api_get_authorizer_info?component_access_token=" +
            component_access_token;
        const params = {
            component_appid: this.appid,
            authorizer_appid: authorizer_appid
        };
        return await this.post(url, params);
    }

    async refreshAuthToken(authorizer_appid, authorizer_refresh_token) {
        const { component_access_token } = await this.getComponentToken();
        const url =
            this.prefix +
            "api_authorizer_token?component_access_token=" +
            component_access_token;
        const params = {
            component_appid: this.appid,
            authorizer_appid: authorizer_appid,
            authorizer_refresh_token: authorizer_refresh_token
        };
        return await this.post(url, params);
    }

    async jscode2session(authorizer_appid, code) {
        const { component_access_token } = await this.getComponentToken();
        const url =
            this.snsPrefix +
            `component/jscode2session?appid=${authorizer_appid}&js_code=${code}&grant_type=authorization_code&component_appid=${
                this.appid
            }&component_access_token=${component_access_token}`;
        return await this.get(url);
    }

    async getUserInfo(authorizer_appid, sessionKey, encryptedData, iv) {
        const pc = new WXBizDataCrypt(authorizer_appid, sessionKey);
        return pc.decryptData(encryptedData, iv);
    }

    getWxaQrcode(authorizer_access_token, path, width = 430, type = 0) {
        let url = `https://api.weixin.qq.com/wxa/getwxacode?access_token=${authorizer_access_token}`;
        if (type === 1) {
            url = `https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=${authorizer_access_token}`;
        }
        const params = {
            path: path,
            width: width
        };

        return got.stream.post(url, { body: JSON.stringify(params) });
    }

    getWxaQrcodeUnlimit(
        authorizer_access_token,
        scene = "",
        page = "",
        width = 430
    ) {
        const url = `http://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${authorizer_access_token}`;
        const params = {
            scene: scene,
            width: width,
            page: page
        };

        return got.stream.post(url, { body: JSON.stringify(params) });
    }

    async sendText(authorizer_access_token, openid, text) {
        const url = `https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=${authorizer_access_token}`;
        const params = {
            touser: openid,
            msgtype: "text",
            text: {
                content: text
            }
        };

        return await this.post(url, params);
    }

    async sendImage(authorizer_access_token, openid, media_id) {
        const url = `https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=${authorizer_access_token}`;
        const params = {
            touser: openid,
            msgtype: "image",
            image: {
                media_id: media_id
            }
        };

        return await this.post(url, params);
    }
};
