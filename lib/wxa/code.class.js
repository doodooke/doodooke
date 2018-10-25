const axios = require("axios");
const got = require("got");
const Wxa = require("./wxa.class");

module.exports = class Code extends Wxa {
    commit(
        authorizer_access_token,
        template_id,
        ext_json,
        user_version,
        user_desc
    ) {
        const url = `https://api.weixin.qq.com/wxa/commit?access_token=${authorizer_access_token}`;
        const params = {
            template_id: template_id,
            ext_json: ext_json, // ext_json请参考下面的格式
            user_version: user_version,
            user_desc: user_desc
        };

        return this.post(url, params);
    }

    get_exp_qrcode(authorizer_access_token, path) {
        let url = `https://api.weixin.qq.com/wxa/get_qrcode?access_token=${authorizer_access_token}`;
        if (path) {
            url += `&path=${path}`;
        }
        return got.stream(url);
    }

    modify_domain(authorizer_access_token, action = "get", domain) {
        const url = `https://api.weixin.qq.com/wxa/modify_domain?access_token=${authorizer_access_token}`;
        const params = Object.assign(
            {
                action: action
            },
            domain
        );

        return this.post(url, params);
    }

    set_webview_domain(authorizer_access_token, action = "set", webviewdomain) {
        const url = `https://api.weixin.qq.com/wxa/setwebviewdomain?access_token=${authorizer_access_token}`;
        const params = Object.assign(
            { action: action },
            { webviewdomain: webviewdomain }
        );
        console.log("set_webview_domain");
        console.log(params);

        return this.post(url, params);
    }

    get_category(authorizer_access_token) {
        const url = `https://api.weixin.qq.com/wxa/get_category?access_token=${authorizer_access_token}`;
        return this.get(url);
    }

    get_page(authorizer_access_token) {
        const url = `https://api.weixin.qq.com/wxa/get_page?access_token=${authorizer_access_token}`;
        return this.get(url);
    }

    undocodeaudit(authorizer_access_token) {
        const url = `https://api.weixin.qq.com/wxa/undocodeaudit?access_token=${authorizer_access_token}`;
        return this.get(url);
    }

    submit_audit(authorizer_access_token, item_list) {
        const url = `https://api.weixin.qq.com/wxa/submit_audit?access_token=${authorizer_access_token}`;
        return this.post(url, { item_list });
    }

    get_auditstatus(authorizer_access_token, auditid) {
        const url = `https://api.weixin.qq.com/wxa/get_auditstatus?access_token=${authorizer_access_token}`;
        const params = {
            auditid: auditid
        };

        return this.post(url, params);
    }

    get_latest_auditstatus(authorizer_access_token) {
        const url = `https://api.weixin.qq.com/wxa/get_latest_auditstatus?access_token=${authorizer_access_token}`;
        return this.get(url);
    }

    release(authorizer_access_token) {
        const url = `https://api.weixin.qq.com/wxa/release?access_token=${authorizer_access_token}`;
        const params = {};

        return this.post(url, params);
    }

    change_visitstatus(authorizer_access_token, action = "open") {
        const url = `https://api.weixin.qq.com/wxa/get_auditstatus?access_token=${authorizer_access_token}`;
        const params = {
            action: action
        };

        return this.post(url, params);
    }

    revertcoderelease(authorizer_access_token) {
        const url = `https://api.weixin.qq.com/wxa/revertcoderelease?access_token=${authorizer_access_token}`;
        return this.get(url);
    }

    /**
     * 申请，查询，删除插件
     * @param {*} authorizer_access_token
     * @param {*} action
     * @param {*} plugin_appid
     */
    wxa_plugin(authorizer_access_token, action, plugin_appid) {
        const url = `https://api.weixin.qq.com/wxa/plugin?access_token=${authorizer_access_token}`;
        const params = { action, plugin_appid };

        return this.post(url, params);
    }
};
