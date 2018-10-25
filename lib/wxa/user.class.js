const Wxa = require("./wxa.class");

module.exports = class User extends Wxa {
    bind_tester(authorizer_access_token, wechatid) {
        const url = `https://api.weixin.qq.com/wxa/bind_tester?access_token=${authorizer_access_token}`;
        const params = {
            wechatid: wechatid
        };

        return this.post(url, params);
    }

    unbind_tester(authorizer_access_token, wechatid) {
        const url = `https://api.weixin.qq.com/wxa/unbind_tester?access_token=${authorizer_access_token}`;
        const params = {
            wechatid: wechatid
        };

        return this.post(url, params);
    }
};
