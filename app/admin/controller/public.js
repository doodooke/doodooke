const Joi = require("joi");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

async function validate(keys = {}, schema = {}) {
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
}

function jwtSign(obj, expires_in, secret) {
    return jwt.sign(obj, secret || process.env.JWT_SECRET, {
        expiresIn: expires_in || process.env.JWT_EXPIRESIN
    });
}

module.exports = class extends doodoo.Controller {
    async _initialize() {}

    /**
     *
     * @api {post} /admin/public/connectedMysql 监测数据库是否链接
     * @apiDescription 监测数据库是否链接
     * @apiGroup Admin
     * @apiVersion 0.0.1
     *
     * @apiSampleRequest /admin/public/connectedMysql
     *
     */
    async connectedMysql() {
        try {
            await this.bookshelf.knex.raw("show tables;");
            this.success();
        } catch (error) {
            this.fail();
        }
    }

    /**
     *
     * @api {post} /admin/public/login 客户登录
     * @apiDescription 客户登录授权
     * @apiGroup Admin
     * @apiVersion 0.0.1
     *
     * @apiParam {nickname} nickname 用户名
     * @apiParam {String} password 客户密码
     *
     * @apiSuccess {String} token jwt加密码
     * @apiSuccess {Json} admin 用户信息
     *
     * @apiSampleRequest /admin/public/login
     *
     */
    async login() {
        await validate(this.post, {
            nickname: Joi.string().required(),
            password: Joi.string().required()
        });

        const { nickname, password } = this.post;
        const ip = this.get("X-Real-IP") || this.ip;

        const admin = await this.model("admin")
            .query({
                where: {
                    nickname: nickname,
                    password: md5(password),
                    status: 1
                }
            })
            .fetch();
        if (!admin) {
            this.fail("账号密码有误");
            return;
        }
        // 记录登录IP
        await this.model("admin_log")
            .forge({
                admin_id: admin.id,
                ip: ip,
                info: "登录"
            })
            .save();
        const token = jwtSign(
            admin,
            process.env.JWT_ADMIN_EXPIRESIN,
            process.env.JWT_ADMIN_SECRET
        );
        this.success({ token, admin });
    }

    /**
     *
     * @api {post} /admin/public/codeLogin 客户登录
     * @apiDescription 客户登录授权
     * @apiGroup Admin
     * @apiVersion 0.0.1
     *
     * @apiParam {String} code Security Code
     *
     * @apiSuccess {String} token jwt加密码
     *
     * @apiSampleRequest /admin/public/codeLogin
     *
     */
    async codeLogin() {
        const { code } = this.post;

        if (code === this.securityCode) {
            const token = jwtSign(
                { code: code },
                process.env.JWT_ADMIN_EXPIRESIN,
                process.env.JWT_ADMIN_SECRET
            );
            this.success({ token });
        } else {
            this.fail("code无效");
            return;
        }
    }
};
