const shell = require("shelljs");
const _ = require("lodash");
const base = require("./base");
const pm2Json = require("./../../../pm2.config");

module.exports = class extends base {
    async _initialize() {
        await super.isAdminAuth();
    }

    /**
     *
     * @api {get} /admin/system/webBuild web编译
     * @apiDescription web编译
     * @apiGroup admin Admin
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
     * @apiGroup  admin Admin
     * @apiVersion 0.0.1
     *
     * @apiHeader {String} Token 用户登录授权token
     *
     * @apiSampleRequest /admin/system/pm2Restart
     *
     */
    async pm2Restart() {
        shell.exec("pm2 reload pm2.config.js");
        this.success();
    }

    /**
     *
     * @api {get} /admin/system/webBuildAndPm2Restart 编译&重启
     * @apiDescription 编译&重启
     * @apiGroup  admin Admin
     * @apiVersion 0.0.1
     *
     * @apiHeader {String} Token 用户登录授权token
     *
     * @apiSampleRequest /admin/system/webBuildAndPm2Restart
     *
     */
    async webBuildAndPm2Restart() {
        shell.exec("npm run web:build && pm2 reload pm2.config.js");
        this.success();
    }

    /**
     *
     * @api {get} /admin/system/connectPm2Logs 连接pm2日志
     * @apiDescription 连接pm2日志
     * @apiGroup  admin Admin
     * @apiVersion 0.0.1
     *
     * @apiHeader {String} Token 用户登录授权token
     *
     * @apiSampleRequest /admin/system/connectPm2Logs
     *
     */
    async connectPm2Logs() {
        const { uid } = this.query;
        const apps = pm2Json.apps;

        const sid = await this.redis.getAsync(`wxLogin:uid:${uid}:sid`);
        if (sid && io.sockets.sockets[sid]) {
            const socket = io.sockets.sockets[sid];

            for (const app of apps) {
                const child = shell.exec(`pm2 logs ${app.name}`, {
                    async: true,
                    silent: true
                });
                child.stdout.on("data", function (data) {
                    socket.emit("pm2Logs", data);
                });
            }
            this.success();
            return;
        }
        this.fail();
    }

    /**
     *
     * @api {get} /admin/system/getSecurityCode 获取安全码（Security Code）
     * @apiDescription 获取安全码（Security Code）
     * @apiGroup admin Admin
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

    async getDebugPaths() {
        this.success(doodoo.debugPaths)
    }

    async saveDebugPaths() {
        const { paths } = this.post;

        if (_.isArray(paths)) {
            doodoo.debugPaths = paths;
        } else {
            doodoo.debugPaths = [paths];
        }

        this.success()
    }
};
