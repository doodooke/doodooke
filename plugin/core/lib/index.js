const axios = require("axios");
const fs = require("fs");
const fse = require("fs-extra");
const qs = require("querystring");
const uuid = require("uuid");
const path = require("path");
const download = require("download");
const address = require("address");
const shell = require("shelljs");

// 安全码
if (fs.existsSync("SECURITY_CODE.key")) {
    const securityCode = fs.readFileSync("SECURITY_CODE.key", {
        encoding: "utf8"
    });
    if (securityCode) {
        doodoo.securityCode = securityCode;
    }
}
if (!doodoo.securityCode) {
    doodoo.securityCode = uuid();
    fse.outputFileSync("SECURITY_CODE.key", doodoo.securityCode);
}

function getAddress() {
    return new Promise((resolve, reject) => {
        address((err, addrs) => {
            if (err) {
                reject(err);
            } else {
                resolve(addrs);
            }
        });
    });
}

module.exports = async () => {
    const addrs = await getAddress();
    const pkg = await fse.readJson("./package.json");

    console.log();
    console.log("Security Code:", doodoo.securityCode);
    console.log();

    try {
        await axios.post(
            `http://core.doodooke.com/installDevice?uuid=${
                doodoo.securityCode
            }`,
            {
                addrs,
                env: {
                    port: process.env.APP_PORT,
                    host: process.env.APP_HOST,
                    prefix: process.env.APP_PREFIX
                }
            }
        );
    } catch (error) {
        console.error("Core Network Error");
    }

    // 安全校验
    doodoo.router.use("/core", async (ctx, next) => {
        if (ctx.query.uuid !== doodoo.securityCode) {
            throw new Error("Illegal Request");
        }
        await next();
    });

    // 系统连通校验
    doodoo.router.get("/core/ping", async (ctx, next) => {
        ctx.success();
    });

    // 自动更新系统
    doodoo.router.get("/core/installSystem", async (ctx, next) => {
        const downloaded = await download(
            `http://core.doodooke.com/installSystem?${qs.stringify(
                Object.assign(
                    {
                        name: pkg.name,
                        version: pkg.version
                    },
                    addrs
                )
            )}`,
            "./",
            { extract: true }
        );
        if (downloaded.length > 0) {
            const exist = await fse.pathExists(path.resolve("install.js"));
            if (exist) {
                require(path.resolve("install.js"));
            }

            const install = shell.exec("npm run bootstrap");
            let restart;
            if (process.env.PM2_USAGE) {
                restart = shell.exec("pm2 restart pm2.json");
            } else {
                console.error(
                    "系统更新成功，当前系统不是pm2启动的，请手动重启生效"
                );
            }
            ctx.success({ install, restart });
            return;
        }
        ctx.fail();
    });
};
