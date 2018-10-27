const fse = require("fs-extra");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const _ = require("lodash");
const glob = require("glob");
const qs = require("querystring");
const download = require("download");
const address = require("address");
const { exec } = require("child_process");

/**
 * Exec command
 * @param {String} command command
 * @param {String} options options
 */
function execCommand(command, options) {
    return new Promise((resolve, reject) => {
        exec(command, options, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve({
                    stdout: stdout.toString(),
                    stderr: stderr.toString()
                });
            }
        });
    });
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

/**
 * 执行sql
 * @param {*} sqlFile
 */
async function execSql(sqlFile) {
    const sql = await new Promise(function(resolve, reject) {
        fs.readFile(sqlFile, "utf-8", function(err, data) {
            if (err) throw err;
            resolve(data);
        });
    });

    if (sql) {
        if (sql.indexOf(";") != -1) {
            let sqls = sql.split(";");
            for (let key in sqls) {
                if (sqls[key] && sqls[key] != "\n") {
                    await doodoo.bookshelf.knex.raw(sqls[key]);
                }
            }
        } else {
            if (sql != "\n") {
                await doodoo.bookshelf.knex.raw(sql);
            }
        }
    }
}

module.exports = class extends doodoo.Controller {
    async checkModule() {
        const { module, Token } = this.query;
        const license = await fse.readFile("./LICENSE.key");
        const addrs = await getAddress();
        const moduleInfo = await fse.readJson(
            path.resolve(process.env.APP_ROOT, module, "package.json")
        );
        const latest = await axios.post(
            `http://core.doodooke.com/checkModule`,
            Object.assign(
                moduleInfo,
                {
                    license,
                    module,
                    Token
                },
                addrs
            )
        );
        this.success(latest.data);
    }

    async installModule() {
        const { module, Token, securityCode } = this.query;
        const license = await fse.readFile("./LICENSE.key");
        const addrs = await getAddress();

        if (securityCode !== doodoo.securityCode) {
            this.fail("无权限，安全码(Security Code)不正确");
            return;
        }

        const downloadData = Object.assign(
            {
                license,
                module,
                Token
            },
            addrs
        );

        const downloadedModules = [];
        const downloaded = await download(
            `http://core.doodooke.com/installModule?${qs.stringify(
                downloadData
            )}`,
            "app",
            {
                extract: true,
                map: file => {
                    if (file.type !== "directory") {
                        return file;
                    }

                    const dir = path.parse(file.path).dir;
                    if (
                        !_.includes(downloadedModules, dir) &&
                        dir.indexOf(path.sep) === -1
                    ) {
                        downloadedModules.push(dir);
                    }

                    return file;
                }
            }
        );
        if (downloaded.length > 0) {
            for (const moduleDirName of downloadedModules) {
                const moduleDir = path.resolve(
                    process.env.APP_ROOT,
                    moduleDirName
                );
                // 执行install.js
                const exist = await fse.pathExists(
                    path.resolve(moduleDir, "install.js")
                );
                if (exist) {
                    require(path.resolve(moduleDir, "install.js"));
                }

                // 执行sql
                const sqls = glob
                    .sync("**/*.sql", {
                        cwd: path.resolve(moduleDir, "sql")
                    })
                    .sort((a, b) => {
                        return (
                            Number(_.trimEnd(a, ".sql")) -
                            Number(_.trimEnd(b, ".sql"))
                        );
                    });
                for (const key in sqls) {
                    // sql已执行
                    const locked = await fse.pathExists(
                        path.resolve(moduleDir, "sql", `${sqls[key]}.lock`)
                    );
                    if (locked) {
                        await fs.remove(
                            path.resolve(moduleDir, "sql", sqls[key])
                        );
                        continue;
                    }

                    // sql未执行
                    await execSql(path.resolve(moduleDir, "sql", sqls[key]));
                    await fse.move(
                        path.resolve(moduleDir, "sql", sqls[key]),
                        path.resolve(moduleDir, "sql", `${sqls[key]}.lock`)
                    );
                }
            }

            let tip;
            if (!process.env.PM2_USAGE) {
                tip = `${module}模块安装/更新成功，您当前系统不是pm2启动的，请手动重启`;

                setTimeout(async () => {
                    await execCommand(process.env.CMD_BUILD);
                }, 3000);
                this.success(tip);
                return;
            } else {
                tip = `${module}模块安装/更新成功，3s后自动构建，自动重启。如果重启失败，请手动重启。`;

                setTimeout(async () => {
                    await execCommand(process.env.CMD_BUILD);
                    await execCommand("pm2 restart pm2.json");
                }, 3000);
                this.success(tip);
                return;
            }
        }
        this.fail(`${module}模块安装/更新失败`);
    }
};
