const download = require("download");
const shell = require("shelljs");

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
            let tip;
            if (!process.env.PM2_USAGE) {
                tip = `模块&插件安装成功，您当前系统不是pm2启动的，请手动重启`;

                shell.exec("npm run bootstrap");
                shell.exec("npm run migrate latest");

                this.success(tip);
                return;
            } else {
                tip = `模块&插件安装成功，如果重启失败，请手动重启。`;

                shell.exec("npm run bootstrap");
                shell.exec("npm run migrate latest");
                shell.exec("npm run web:build");

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
