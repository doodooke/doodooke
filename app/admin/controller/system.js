const shell = require("shelljs");
const path = require("path");
const _ = require("lodash");
const fse = require("fs-extra");
const base = require("./base");

module.exports = class extends base {
    async _initialize() {
        await super.isAdminAuth();
    }

    /**
     *
     * @api {get} /admin/system/webBuild web编译
     * @apiDescription web编译
     * @apiGroup web编译
     * @apiVersion 0.0.1
     *
     * @apiHeader {String} Token 用户登录授权token
     *
     * @apiSampleRequest /admin/system/webBuild
     *
     */
    async webBuild() {
        shell.exec("npm run web:build");
        this.success();
    }

    /**
     *
     * @api {get} /admin/system/pm2Restart pm2重启
     * @apiDescription pm2重启
     * @apiGroup pm2重启
     * @apiVersion 0.0.1
     *
     * @apiHeader {String} Token 用户登录授权token
     *
     * @apiSampleRequest /admin/system/pm2Restart
     *
     */
    async pm2Restart() {
        shell.exec("pm2 restart pm2.json");
        this.success();
    }

    /**
     *
     * @api {get} /admin/system/webBuildAndPm2Restart 编译&重启
     * @apiDescription 编译&重启
     * @apiGroup 编译&重启
     * @apiVersion 0.0.1
     *
     * @apiHeader {String} Token 用户登录授权token
     *
     * @apiSampleRequest /admin/system/webBuildAndPm2Restart
     *
     */
    async webBuildAndPm2Restart() {
        shell.exec("npm run web:build && pm2 restart pm2.json");
        this.success();
    }

    /**
     *
     * @api {get} /admin/system/connectPm2Logs 连接pm2日志
     * @apiDescription 连接pm2日志
     * @apiGroup 连接pm2日志
     * @apiVersion 0.0.1
     *
     * @apiHeader {String} Token 用户登录授权token
     *
     * @apiSampleRequest /admin/system/connectPm2Logs
     *
     */
    async connectPm2Logs() {
        const { uid } = this.query;
        const pm2Json = await fse.readJson(path.resolve("pm2.json"));

        const child = shell.exec(`pm2 logs ${_.first(pm2Json.apps).name}`, {
            async: true,
            silent: true
        });
        const sid = await this.redis.getAsync(`wxLogin:uid:${uid}:sid`);
        if (sid && io.sockets.sockets[sid]) {
            const socket = io.sockets.sockets[sid];

            child.stdout.on("data", function(data) {
                socket.emit("pm2Logs", data);
            });
            this.success();
            return;
        }
        this.fail();
    }

    /**
     *
     * @api {get} /admin/system/getSecurityCode 获取安全码（Security Code）
     * @apiDescription 获取安全码（Security Code）
     * @apiGroup 获取安全码（Security Code）
     * @apiVersion 0.0.1
     *
     * @apiHeader {String} Token 用户登录授权token
     *
     * @apiSampleRequest /admin/system/getSecurityCode
     *
     */
    async getSecurityCode() {
        this.success(this.securityCode);
    }
};
