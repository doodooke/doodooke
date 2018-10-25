const Wxa = require("./wxa.class");

module.exports = class TplMsg extends Wxa {
    /**
     * 获取小程序模板库标题列表
     * @param authorizer_access_token
     * @param offset
     * @param count
     * @returns {Promise}
     */
    get_tplmsg_list(authorizer_access_token, offset, count) {
        const url = `https://api.weixin.qq.com/cgi-bin/wxopen/template/library/list?access_token=${authorizer_access_token}`;
        const params = {
            offset: offset,
            count: count
        };
        return this.post(url, params);
    }

    /**
     * 获取模板库某个模板标题下关键词库
     * @param authorizer_access_token
     * @param tpl_title_id 模板标题id
     * @returns {Promise}
     */
    get_keyword_lib(authorizer_access_token, tpl_title_id) {
        const url = `https://api.weixin.qq.com/cgi-bin/wxopen/template/library/get?access_token=${authorizer_access_token}`;
        const params = {
            id: tpl_title_id
        };
        return this.post(url, params);
    }

    /**
     * 组合模板并添加至帐号下的个人模板库
     * @param authorizer_access_token
     * @param tpl_title_id 模板标题id
     * @param keyword_id_list 模板关键词列表
     * @returns {Promise}
     */
    add_tplmsg(authorizer_access_token, tpl_title_id, keyword_id_list) {
        const url = `https://api.weixin.qq.com/cgi-bin/wxopen/template/add?access_token=${authorizer_access_token}`;
        let keyword_arr = [];
        if (keyword_id_list instanceof Array) return;
        if (keyword_id_list.indexOf(",") != -1) {
            keyword_arr = keyword_id_list.split(",");
        } else {
            keyword_arr = [keyword_id_list];
        }
        const params = {
            id: tpl_title_id,
            keyword_id_list: keyword_arr
        };
        return this.post(url, params);
    }

    /**
     * 获取帐号下已存在的模板列表
     * @param authorizer_access_token
     * @param offset
     * @param count
     * @returns {Promise}
     */
    get_mytplmsg_list(authorizer_access_token, offset, count) {
        const url = `https://api.weixin.qq.com/cgi-bin/wxopen/template/list?access_token=${authorizer_access_token}`;
        const params = {
            offset: offset,
            count: count
        };
        return this.post(url, params);
    }

    /**
     * 删除帐号下的某个模板
     * @param authorizer_access_token
     * @param tpl_id 模版id
     * @returns {Promise}
     */
    del_tplmsg(authorizer_access_token, tpl_id) {
        const url = `https://api.weixin.qq.com/cgi-bin/wxopen/template/del?access_token=${authorizer_access_token}`;
        const params = {
            template_id: tpl_id
        };
        return this.post(url, params);
    }

    /**
     * 发送模版消息
     * @param authorizer_access_token
     * @param touser
     * @param tpl_id
     * @param form_id
     * @param data
     * @param page
     * @param emphasis_keyword
     * @returns {Promise}
     */
    send_tplmsg(
        authorizer_access_token,
        touser,
        tpl_id,
        form_id,
        data,
        page,
        emphasis_keyword
    ) {
        const url = `https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${authorizer_access_token}`;
        const params = {
            touser: touser,
            template_id: tpl_id,
            page: page,
            form_id: form_id,
            data: JSON.parse(data),
            emphasis_keyword: emphasis_keyword
        };
        return this.post(url, params);
    }
};
