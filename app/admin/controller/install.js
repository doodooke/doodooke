const fse = require("fs-extra");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const glob = require("glob");
const download = require("download");
const shell = require("shelljs");

/**
 * 执行sql
 * @param {*} sqlFile
 */
async function execSql(sqlFile) {
    const sql = await new Promise(function(resolve) {
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
    async installModule() {
        const { id, Token, securityCode } = this.query;
        if (securityCode !== doodoo.securityCode) {
            this.fail("无权限，安全码(Security Code)不正确");
            return;
        }

        await installMigrate();

        // 关闭watcher
        if (doodoo.watcher) {
            doodoo.watcher.close();
        }

        const downloadedModules = [];
        const downloaded = await download(
            `http://core.doodooke.com/app/${id}?Token=${Token}`,
            "./",
            {
                extract: true,
                strip: 1,
                map: file => {
                    if (file.type !== "directory") {
                        return file;
                    }

                    const dir = path.parse(file.path).dir;
                    if (
                        dir &&
                        !_.includes(downloadedModules, dir.split("/")[1]) &&
                        dir.indexOf("/") === 3
                    ) {
                        downloadedModules.push(dir.split("/")[1]);
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
                    shell.exec("pm2 restart pm2.config.js");
                }, 3000);
                this.success(tip);
                return;
            }
        }
        this.fail(`模块安装/更新失败`);
    }
};
