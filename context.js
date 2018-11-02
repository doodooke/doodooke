const fs = require("fs");
const Joi = require("joi");
const got = require("got");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const topClient = require("./lib/alidayu/topClient");
const Code = require("./lib/wxa/code.class");
const SMSClient = require("@alicloud/sms-sdk");
const LTT = require("list-to-tree");
const qiniu = require("qiniu");
const _url = require("url");

module.exports = {
    model(model) {
        return doodoo.models[model];
    },

    getHostPrefix() {
        return process.env.APP_HOST + process.env.APP_PREFIX;
    },

    get hook() {
        return doodoo.hooks;
    },

    async validate(keys = {}, schema = {}) {
        try {
            return await new Promise((resolve, reject) => {
                Joi.validate(keys, schema, (err, value) => {
                    if (err) reject(err);
                    resolve(true);
                });
            });
        } catch (error) {
            throw error;
        }
    },

    jwtSign(obj, expires_in, secret) {
        return jwt.sign(obj, secret || process.env.JWT_SECRET, {
            expiresIn: expires_in || process.env.JWT_EXPIRESIN
        });
    },

    jwtVerify(str, secret) {
        return jwt.verify(str, secret || process.env.JWT_SECRET);
    },

    readFile(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, "utf8", (err, data) => {
                if (err) throw err;
                resolve(data);
            });
        });
    },
    getTree(list, key_parent = "pid", key_child = "sub") {
        const ltt = new LTT(list, {
            key_id: "id",
            key_parent,
            key_child,
            empty_children: true
        });

        /* eslint-disable new-cap */
        return ltt.GetTree();
        /* eslint-disable new-cap */
    },
    rankTree(arr) {
        arr.sort((a, b) => {
            return a.rank - b.rank;
        });
        arr.map(val => {
            // 给多店添加token
            if (val.name === "multi") {
                const props = JSON.parse(val.props);
                console.log(
                    "val.props.shop_id----->给多店添加token给多店添加token",
                    props.shop_id
                );
                val.shopSubToken = this.jwtSign({
                    id: props.shop_id
                });
            }
            if (val.sub && val.sub.length) {
                return this.rankTree(val.sub);
            } else {
                return val;
            }
        });

        return arr;
    },
    async lock(key, expire = 3) {
        const result = await this.redis.saddAsync(key, 1);
        await this.redis.expireAsync(key, expire);
        return result;
    },

    async unlock(key) {
        const result = await this.redis.delAsync(key);
        return result;
    },

    isUrl(url) {
        if (url.substr(0, 7) === "http://" || url.substr(0, 8) === "https://") {
            return true;
        }
        return false;
    },

    isSet(name) {
        if (name !== "" && name !== undefined) {
            return true;
        }
        return false;
    },

    strToArray(str, step) {
        if (str instanceof Array) return str;
        if (step === undefined) step = ",";

        if (str.indexOf(step) !== -1) {
            return str.split(step);
        } else {
            return [str];
        }
    },

    httpToHttps(url) {
        if (url.substr(0, 7) === "http://") {
            return "https://" + url.substr(8, url.length);
        }
        return url;
    },

    randomCode(num) {
        let code = "";
        for (let i = 0; i < num; i++) {
            code += Math.floor(Math.random() * 10);
        }
        return code;
    },

    strToJsTemplate(template, data) {
        const keys = Object.keys(data);
        const dataList = keys.map(key => {
            return data[key];
        });

        /* eslint-disable */
        // 这里使用反引号来构建模板引擎
        return new Function(keys.join(","), "return `" + template + "`;").apply(
            null,
            dataList
        );
        /* eslint-disable */
    },

    async sendSms(to, code) {
        // 阿里大于 尊敬的用户, 您的${name}验证码是${code}，请及时输入验证码完成操作。
        // 阿里云 尊敬的用户, 您的验证码是${code}，请及时输入验证码完成操作。

        let appkey = process.env.ALISMS_APPKEY;
        let appsecret = process.env.ALISMS_APPSECRET;
        let sms_free_sign_name = process.env.ALISMS_FREE_SIGN_NAME;
        let sms_template_code = process.env.ALISMS_TEMPLATE_CODE;
        let sms_param = '{"code":"' + code + '","name":"小程序"}';

        const _domain = this.host || _url.parse(process.env.APP_HOST).host;
        const _domains = _domain.split(".");
        _domains.shift();
        const domain = _domains.join(".");
        console.log("发短信检查代理商 domain:", domain);
        await this.hook.run("agent", domain, this);
        const agentSms = this.agentSms;
        console.log('agentSms',agentSms);
        if (agentSms && agentSms.status) {
            appkey = agentSms.appkey;
            appsecret = agentSms.appsecret;
            sms_free_sign_name = agentSms.sign;
            sms_template_code = agentSms.template_code;
        }
        try {
            //     const wxa_id = this.state.wxa ? this.state.wxa.id : 0;
            //     const body = await this.getAgentInfo(wxa_id);
            //     if (body.data && body.code && body.data.smsConfig) {
            //         appkey = body.data.smsConfig.appkey;
            //         appsecret = body.data.smsConfig.appsecret;
            //         sms_free_sign_name = body.data.smsConfig.sign;
            //         sms_template_code = body.data.smsConfig.template_code;

            //         // 阿里云

            if (process.env.ALISMS_TYPE == 2) {
                const smsClient = new SMSClient({
                    accessKeyId: appkey,
                    secretAccessKey: appsecret
                });
                sms_param = '{"code":"' + code + '"}';

                return new Promise((resolve, reject) => {
                    smsClient
                        .sendSMS({
                            PhoneNumbers: to,
                            SignName: sms_free_sign_name,
                            TemplateCode: sms_template_code,
                            TemplateParam: sms_param
                        })
                        .then(
                            res => {
                                const { Code } = res;
                                if (Code === "OK") {
                                    // 处理返回参数
                                    resolve(res);
                                } else {
                                    console.error(res);
                                }
                            },
                            err => {
                                reject(err);
                            }
                        );
                });
            }
            //     }
        } catch (err) {}

        // 默认是阿里大于
        const TopClient = topClient.TopClient;
        const client = new TopClient({
            appkey: appkey,
            appsecret: appsecret,
            REST_URL: "http://gw.api.taobao.com/router/rest"
        });

        return new Promise((resolve, reject) => {
            client.execute(
                "alibaba.aliqin.fc.sms.num.send",
                {
                    extend: "",
                    sms_type: "normal",
                    sms_free_sign_name: sms_free_sign_name,
                    sms_param: sms_param,
                    rec_num: to,
                    sms_template_code: sms_template_code
                },
                (error, response) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(response);
                    }
                }
            );
        });
    },

    async checkWxaAuthorizerAccessToken(wxa) {
        if (new Date().getTime() >= wxa.expires_at) {
            const code = new Code(
                process.env.OPEN_APPID,
                process.env.OPEN_APPSECRET
            );
            const refreshAuthToken = await code.refreshAuthToken(
                wxa.authorizer_appid,
                wxa.authorizer_refresh_token
            );
            if (refreshAuthToken.errmsg) {
                console.error(refreshAuthToken);
                return;
            }

            const data = {
                expires_at:
                    new Date().getTime() +
                    (refreshAuthToken.expires_in - 100) * 1000,
                authorizer_access_token:
                    refreshAuthToken.authorizer_access_token,
                authorizer_refresh_token:
                    refreshAuthToken.authorizer_refresh_token
            };
            return await doodoo
                .model("wxa")
                .forge(Object.assign(wxa, data))
                .save();
        }
        return wxa;
    },

    wxaErr(err) {
        const errs = [
            { errcode: -1, errmsg: "系统繁忙" },
            { errcode: 85001, errmsg: "微信号不存在或微信号设置为不可搜索" },
            { errcode: 85002, errmsg: "小程序绑定的体验者数量达到上限" },
            { errcode: 85003, errmsg: "微信号绑定的小程序体验者达到上限" },
            { errcode: 85004, errmsg: "微信号已经绑定" },
            { errcode: 86000, errmsg: "不是由第三方代小程序进行调用" },
            { errcode: 86001, errmsg: "不存在第三方的已经提交的代码" },
            {
                errcode: 86002,
                errmsg: "小程序还未设置昵称、头像、简介。请先设置完后再重新提交"
            },
            { errcode: 85006, errmsg: "标签格式错误" },
            { errcode: 85007, errmsg: "页面路径错误" },
            { errcode: 85008, errmsg: "类目填写错误" },
            { errcode: 85009, errmsg: "已经有正在审核的版本" },
            { errcode: 85010, errmsg: "提交审核列表有项目为空" },
            { errcode: 85011, errmsg: "标题填写错误" },
            { errcode: 85023, errmsg: "审核列表填写的项目数不在1-5以内" },
            { errcode: 85019, errmsg: "没有审核版本" },
            { errcode: 85020, errmsg: "审核状态未满足发布" },
            { errcode: 85021, errmsg: "状态不可变" },
            { errcode: 85022, errmsg: "action非法" },
            { errcode: 85013, errmsg: "无效的自定义配置" },
            { errcode: 85012, errmsg: "无效的审核编号" },
            { errcode: 85014, errmsg: "无效的模版编号" },
            { errcode: 89019, errmsg: "业务域名无更改" },
            { errcode: 89020, errmsg: "业务域名数量超过限制" },
            { errcode: 87011, errmsg: "现网已经在灰度发布，不能进行版本回退" },
            {
                errcode: 87012,
                errmsg:
                    "该版本不能回退，可能的原因：1:无上一个线上版用于回退 2:此版本为已回退版本，不能回退 3:此版本为回退功能上线之前的版本，不能回退"
            },
            {
                errcode: 87013,
                errmsg: "撤回次数达到上限（每天一次，每个月10次）"
            },
            {
                errcode: 85085,
                errmsg:
                    "近7天提交审核的小程序数量过多，请耐心等待审核完毕后再次提交"
            }
        ];
        for (const key in errs) {
            if (errs[key].errcode === err.errcode) {
                return errs[key].errmsg;
            }
        }
        return err.errmsg;
    },

    // 模板消息错误码
    tplMsgErr(err) {
        const errs = [
            {
                errcode: -1,
                errmsg: "系统繁忙"
            },
            {
                errcode: 40037,
                errmsg: "模板id不正确"
            },
            {
                errcode: 41028,
                errmsg: "form_id不正确，或者过期"
            },
            {
                errcode: 41029,
                errmsg: "form_id已被使用"
            },
            {
                errcode: 41030,
                errmsg: "page不正确"
            },
            {
                errcode: 45009,
                errmsg: "接口调用超过限额"
            }
        ];
        for (let key in errs) {
            if (errs[key].errcode === err.errcode) {
                return errs[key].errmsg;
            }
        }
        return err.errmsg;
    },

    async payTrue(tradeid) {
        const trade = await this.model("trade")
            .query({
                where: {
                    tradeid: tradeid,
                    status: 0
                }
            })
            .fetch();
        if (trade) {
            await this.model("trade")
                .forge({
                    id: trade.id,
                    status: 1
                })
                .save();

            // 钩子
            await this.hook.run("payTrue", trade);
            try {
                await this.hook.run("print", trade);
            } catch (error) {
                console.log(error);
            }
            await this.hook.run("fxUser", trade);
            //会员卡钩子
            await this.hook.run("cardPaytrue", trade);
            // 支付成功回调
            if (trade.notify_url) {
                // invalid expiresIn option for string payload
                const token = jwt.sign(trade.tradeid, process.env.JWT_SECRET);

                let notify_url = trade.notify_url;
                if (notify_url.indexOf("?") === -1) {
                    notify_url = notify_url + "?";
                } else {
                    notify_url = notify_url + "&";
                }

                const notifyTime = [0, 1000, 3000];
                for (let key in notifyTime) {
                    setTimeout(() => {
                        got
                            .post(
                                `${notify_url}token=${token}&tradeid=${
                                    trade.tradeid
                                }&notify_type=${
                                    trade.notify_type
                                }&notify_data=${trade.notify_data}`
                            )
                            .catch(err => {});
                    }, notifyTime[key]);
                }
            }
        }
    },

    async refundTrue(tradeid) {
        const trade = await this.model("trade")
            .query({
                where: {
                    tradeid: tradeid,
                    status: 1
                }
            })
            .fetch();
        if (trade) {
            await this.model("trade")
                .forge({
                    id: trade.id,
                    status: -1
                })
                .save();

            // 支付成功回调
            if (trade.notify_url) {
                // invalid expiresIn option for string payload
                const token = jwt.sign(trade.tradeid, process.env.JWT_SECRET);

                let notify_url = trade.notify_url;
                if (notify_url.indexOf("?") === -1) {
                    notify_url = notify_url + "?";
                } else {
                    notify_url = notify_url + "&";
                }

                const notifyTime = [0, 1000, 3000];
                for (let key in notifyTime) {
                    setTimeout(() => {
                        got
                            .post(
                                `${notify_url}token=${token}&tradeid=${
                                    trade.tradeid
                                }&notify_type=${
                                    trade.notify_type
                                }&notify_data=${trade.notify_data}`
                            )
                            .catch(err => {});
                    }, notifyTime[key]);
                }
            }
        }
    },

    async uploadFile(localFile, savename) {
        const mac = new qiniu.auth.digest.Mac(
            process.env.QINIU_ACCESSKEY,
            process.env.QINIU_SECRETKEY
        );
        /* eslint-disable quotes */
        const options = {
            scope: process.env.QINIU_BUCKET + ":" + savename,
            returnBody:
                '{"bucket":"$(bucket)","key":"$(key)","etag":"$(etag)","fname":"$(fname)","fsize":"$(fsize)","mimeType":$(mimeType),"uuid":"$(uuid)","ext":"$(ext)"}',
            callbackBodyType: "application/json"
        };
        /* eslint-disable quotes */

        const putPolicy = new qiniu.rs.PutPolicy(options);
        const uploadToken = putPolicy.uploadToken(mac);
        const qiniuConfig = new qiniu.conf.Config();
        const formUploader = new qiniu.form_up.FormUploader(qiniuConfig);
        const putExtra = new qiniu.form_up.PutExtra();

        return new Promise((resolve, reject) => {
            formUploader.putFile(
                uploadToken,
                savename,
                localFile,
                putExtra,
                (respErr, respBody, respInfo) => {
                    if (respErr) {
                        reject(respErr);
                    }
                    if (respInfo.statusCode === 200) {
                        resolve(respBody.key);
                    } else {
                        reject(respBody);
                    }
                }
            );
        });
    },
    // 对预售商品添加相关设置
    async marketProduct(product) {
        const { shop_id, id, type } = product;
        if (Number(type) !== 3) {
            return product;
        }

        // 预售相关设置
        const info = await doodoo
            .model("productBook")
            .query(qb => {
                qb.where("product_id", "=", id);
                qb.where("shop_id", "=", shop_id);
            })
            .fetch();
        product.book = info;

        return product;
    }
};
