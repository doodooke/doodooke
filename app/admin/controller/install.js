const download = require("download");
const fse = require("fs-extra");
const shell = require("shelljs");
const moment = require("moment");
const _ = require("lodash");
const path = require("path");

/**
 * 执行 install.js
 * @param {*} sqlFile
 */
async function installJs() {
    const exist = await fse.pathExists("install.js");
    if (exist) {
        const fn = require(path.resolve("install.js"));
        if (_.isFunction(fn)) {
            await fn();
        }
        await fse.move(path.resolve("install.js"), `old_install_${moment().format("YYMMDDHHmmss")}.js`)
    }
}

module.exports = class extends doodoo.Controller {

    async installModule() {
        const { id, Token, securityCode } = this.query;
        if (securityCode !== doodoo.securityCode) {
            this.fail("无权限，安全码(Security Code)不正确");
            return;
        }

        // 关闭watcher
        if (doodoo.watcher) {
            doodoo.watcher.close();
        }

        const downloaded = await download(
            `http://core.doodooke.com/app/${id}?Token=${Token}`,
            "./",
            {
                extract: true,
                strip: 1,
            }
        );

        if (downloaded.length > 0) {
            // 升级migrate
            shell.exec("npm run migrate latest");

            let tip;
            if (!process.env.PM2_USAGE) {
                tip = `模块&插件安装成功，您当前系统不是pm2启动的，请手动重启`;
                shell.exec("npm run bootstrap");

                await installJs();

                this.success(tip);
                return;
            } else {
                tip = `模块&插件安装成功，如果重启失败，请手动重启。`;
                shell.exec("npm run bootstrap && npm run web:build");

                await installJs();

                setTimeout(() => {
                    shell.exec("pm2 reload pm2.config.js");
                }, 100)
                this.success(tip);
                return;
            }
        }
        this.fail(`模块安装/更新失败`);
    }
};
