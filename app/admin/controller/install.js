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
const shell = require("shelljs");

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
                sqls[key] = _.trim(sqls[key]);
                if (sqls[key]) {
                    try {
                        await doodoo.bookshelf.knex.raw(sqls[key]);
                    } catch (e) {
                        console.error(e.sqlMessage);
                    }
                }
            }
        } else {
            if (_.trim(sql)) {
                try {
                    await doodoo.bookshelf.knex.raw(sql);
                } catch (e) {
                    console.error(e.sqlMessage);
                }
            }
        }
    }
}

async function installMigrate() {
    const moduleDirName = "admin";
    const moduleDir = path.resolve(process.env.APP_ROOT, moduleDirName);
    // 执行install.js
    const exist = await fse.pathExists(path.resolve(moduleDir, "install.js"));
    if (exist) {
        require(path.resolve(moduleDir, "install.js"));
    }

    // 执行sql
    const sqls = glob
        .sync("**/*.sql", {
            cwd: path.resolve(moduleDir, "sql")
        })
        .sort((a, b) => {
            return Number(_.trimEnd(a, ".sql")) - Number(_.trimEnd(b, ".sql"));
        });
    for (const key in sqls) {
        if (Number(key) === 0) {
            const tableExists = await doodoo.bookshelf.knex.schema.hasTable(
                "migrate"
            );
            if (!tableExists) {
                // sql未执行
                await execSql(path.resolve(moduleDir, "sql", sqls[key]));
                await doodoo
                    .model("migrate")
                    .forge({
                        module: moduleDirName,
                        sql: sqls[key]
                    })
                    .save();
            }
        } else {
            const exists = await doodoo
                .model("migrate")
                .query(qb => {
                    qb.where("module", moduleDirName);
                    qb.where("sql", sqls[key]);
                })
                .fetch();
            if (!exists) {
                await execSql(path.resolve(moduleDir, "sql", sqls[key]));
                await doodoo
                    .model("migrate")
                    .forge({
                        module: moduleDirName,
                        sql: sqls[key]
                    })
                    .save();
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
        const url = path.resolve(__dirname, "../../../").replace(/\\/g, "/");
        const dir = url.split("/")[url.split("/").length - 1];
        const { module, Token, securityCode, ids = "" } = this.query;
        const license = await fse.readFile("./LICENSE.key");
        const addrs = await getAddress();

        if (securityCode !== doodoo.securityCode) {
            this.fail("无权限，安全码(Security Code)不正确");
            return;
        }

        await installMigrate();

        const downloadData = Object.assign(
            {
                license,
                module,
                Token,
                dir
            },
            addrs
        );

        const downloadedModules = [];
        const downloaded = await download(
            `http://core.doodooke.com/installModule?${qs.stringify(
                downloadData
            )}`,
            "./",
            {
                extract: true,
                map: file => {
                    if (file.type !== "directory") {
                        return file;
                    }

                    const dir = path.parse(file.path).dir;
                    if (
                        dir &&
                        !_.includes(
                            downloadedModules,
                            dir.split('/')[1]
                        ) &&
                        dir.indexOf('/') === 3
                    ) {
                        downloadedModules.push(dir.split('/')[1]);
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
                        await doodoo
                            .model("migrate")
                            .forge({
                                module: moduleDirName,
                                sql: sqls[key]
                            })
                            .save();
                        await fse.remove(
                            path.resolve(moduleDir, "sql", `${sqls[key]}.lock`)
                        );
                        continue;
                    }
                    const exists = await this.model("migrate")
                        .query(qb => {
                            qb.where("module", moduleDirName);
                            qb.where("sql", sqls[key]);
                        })
                        .fetch();
                    if (!exists) {
                        // sql未执行
                        await execSql(
                            path.resolve(moduleDir, "sql", sqls[key])
                        );
                        await doodoo
                            .model("migrate")
                            .forge({
                                module: moduleDirName,
                                sql: sqls[key]
                            })
                            .save();
                    }
                }
            }

            let tip;
            if (!process.env.PM2_USAGE) {
                tip = `模块安装/更新成功，您当前系统不是pm2启动的，请手动重启`;

                setTimeout(async () => {
                    shell.exec("npm run bootstrap && npm run web:build");
                }, 3000);
                this.success(tip);
                return;
            } else {
                tip = `模块安装/更新成功，3s后自动构建，自动重启。如果重启失败，请手动重启。`;

                setTimeout(async () => {
                    shell.exec("npm run bootstrap && npm run web:build");
                    shell.exec("pm2 restart pm2.json");
                }, 3000);
                this.success(tip);
                return;
            }
        }
        this.fail(`模块安装/更新失败`);
    }
    //  返回当前所有模块的版本号
    async moduleVersion() {
        const url = path.resolve(__dirname, "../../");
        const dirArr = fs.readdirSync(url);
        const pluginUrl = path.resolve(__dirname, "../../../plugin");
        const pluginArr = fs.readdirSync(pluginUrl);
        const newDirArr = dirArr.map(item => {
            const pakUrl = `${url}/${item}/package.json`.replace(/\\/g, "/");
            const moduleUrl = `${url}/${item}`.replace(/\\/g, "/");
            const stat = fs.lstatSync(moduleUrl);
            if (stat.isDirectory()) {
                const json = require(pakUrl);
                return {
                    name: json.name,
                    verson: json.version
                };
            }
        });

        const newPluginArr = pluginArr.map(item => {
            const pakUrl = `${pluginUrl}/${item}/package.json`.replace(
                /\\/g,
                "/"
            );
            const moduleUrl = `${pluginUrl}/${item}`.replace(/\\/g, "/");
            const stat = fs.lstatSync(moduleUrl);
            if (stat.isDirectory()) {
                const json = require(pakUrl);
                return {
                    name: json.name,
                    verson: json.version
                };
            }
        });
        const arr = _.compact(newDirArr.concat(newPluginArr));
        this.success(arr);
    }

    async updateModule() {
        const url = path.resolve(__dirname, "../../../").replace(/\\/g, "/");
        const dir = url.split("/")[url.split("/").length - 1];
        const { Token, securityCode, cid = "", pid = 0 } = this.query;
        const license = await fse.readFile("./LICENSE.key");
        const addrs = await getAddress();

        if (securityCode !== doodoo.securityCode) {
            this.fail("无权限，安全码(Security Code)不正确");
            return;
        }

        await installMigrate();

        const downloadData = Object.assign(
            { license, module, Token, cid, pid, dir },
            addrs
        );

        const downloadedModules = [];
        const downloaded = await download(
            `http://core.doodooke.com/updateSystem?${qs.stringify(
                downloadData
            )}`,
            "./",
            {
                extract: true,
                map: file => {
                    if (file.type !== "directory") {
                        return file;
                    }

                    const dir = path.parse(file.path).dir;
                    if (
                        dir &&
                        !_.includes(
                            downloadedModules,
                            dir.split('/')[1]
                        ) &&
                        dir.indexOf('/') === 3
                    ) {
                        downloadedModules.push(dir.split('/')[1]);
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
                        await this.model("migrate")
                            .forge({
                                module: moduleDirName,
                                sql: sqls[key]
                            })
                            .save();
                        await fse.remove(
                            path.resolve(moduleDir, "sql", `${sqls[key]}.lock`)
                        );
                        continue;
                    }
                    const exists = await this.model("migrate")
                        .query(qb => {
                            qb.where("module", moduleDirName);
                            qb.where("sql", sqls[key]);
                        })
                        .fetch();
                    if (!exists) {
                        // sql未执行
                        await execSql(
                            path.resolve(moduleDir, "sql", sqls[key])
                        );
                        await this.model("migrate")
                            .forge({
                                module: moduleDirName,
                                sql: sqls[key]
                            })
                            .save();
                    }
                }
            }

            let tip;
            if (!process.env.PM2_USAGE) {
                tip = `模块安装/更新成功，您当前系统不是pm2启动的，请手动重启`;

                setTimeout(async () => {
                    shell.exec("npm run bootstrap && npm run web:build");
                }, 3000);
                this.success(tip);
                return;
            } else {
                tip = `模块安装/更新成功，3s后自动构建，自动重启。如果重启失败，请手动重启。`;

                setTimeout(async () => {
                    shell.exec("npm run bootstrap && npm run web:build");
                    shell.exec("pm2 restart pm2.json");
                }, 3000);
                this.success(tip);
                return;
            }
        }
        this.fail(`模块安装/更新失败`);
    }
};
