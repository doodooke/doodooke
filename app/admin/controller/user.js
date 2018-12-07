const base = require("./base");
const md5 = require("md5");
module.exports = class extends base {
    async _initialize() {
        await super.isAdminAuth();
    }
    /**
     *
     * @api {post} /admin/user/adminInfo 超管列表
     * @apiDescription 超管列表
     * @apiGroup Admin
     * @apiVersion 0.0.1
     *
     * @apiHeader {String} Token 用户登录授权token
     *
     * @apiSampleRequest /admin/user/adminInfo
     *
     */
    async adminInfo() {
        const info = await this.model("admin")
            .query({})
            .fetchAll();
        this.success(info);
    }
    /**
     *
     * @api {post} /admin/user/updataAdmin 超管信息修改与添加
     * @apiDescription 超管信息修改与添加
     * @apiGroup Admin超管快速功能页
     * @apiVersion 0.0.1
     *
     * @apiHeader {String} Token 用户登录授权token
     *
     * @apiParam {String} nickname 名称
     * @apiParam {String} password 密码
     * @apiParam {Number} phone    手机
     * @apiParam {String} email    邮箱
     * @apiParam {int}   status    状态
     *
     * @apiSampleRequest /admin/user/updataAdmin
     *
     */
    async updataAdmin() {
        const { id = 0, nickname, password, phone, email, status } = this.post;
        const json = {
            id,
            nickname,
            phone,
            email,
            status
        };
        let newPwd = "";
        if (!id) {
            newPwd = md5(password);
            if (!password || !nickname || !phone) {
                this.fail("请将信息填写完整");
                return;
            }
        }

        if (id && password) {
            newPwd = md5(password);
        }
        if (newPwd) {
            json.password = newPwd;
        }
        await this.model("admin")
            .forge(json)
            .save();

        const msg = id ? "信息添加成功" : "信息修改成功";
        this.success(msg);
    }

    /**
     *
     * @api {get} /admin/user/editAdmin 超管信息详情
     * @apiDescription 超管信息详情
     * @apiGroup Admin超管快速功能页
     * @apiVersion 0.0.1
     *
     * @apiHeader {String} Token 用户登录授权token
     *
     * @apiParam {Number} id    手机
     *
     * @apiSampleRequest /admin/user/editAdmin
     *
     */
    async editAdmin() {
        const { id } = this.query;
        const info = await this.model("admin")
            .query(qb => {
                qb.where("id", "=", id);
            })
            .fetch();
        delete info.password;
        this.success(info);
    }
};
