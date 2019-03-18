const Joi = require("joi");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const fse = require("fs-extra");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const glob = require("glob");

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
    async _initialize() {
        // await installMigrate();
    }

    /**
     *
     * @api {post} /admin/public/connectedMysql 监测数据库是否链接
     * @apiDescription 监测数据库是否链接
     * @apiGroup admin Admin
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
     * @apiGroup admin Admin
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
     * @apiGroup admin Admin
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

    /**
     *
     * @api {post} /admin/public/getVersion 客户登录
     * @apiDescription 客户登录授权
     * @apiGroup admin Admin
     * @apiVersion 0.0.1
     *
     * @apiParam {String} code Security Code
     *
     * @apiSuccess {String} json 当前app，plugin目录下模块，版本
     *
     * @apiSampleRequest /admin/public/getVersion
     *
     */

    async getVersion(){
        // 先获取app 模块
        const url = path.resolve(__dirname, "../../");
        const pluginUrl = path.resolve(__dirname, "../../../plugin");
        const dirArr = fs.readdirSync(url);
        const pluginArr = fs.readdirSync(pluginUrl);
        const leng=pluginArr.length;
        const newArr=[];
        const appUrl= path.resolve(__dirname, "../../../");
        const appInfo=require(`${appUrl}/package.json`.replace(/\\/g,"/"));
        newArr.push({name:appInfo.name,version:appInfo.version,description:appInfo.description})
        Array.prototype.push.apply(dirArr,pluginArr);
       
        
        for(let x=0;x<dirArr.length;x++){
            const pakUrl = dirArr.length-x<=leng?`${pluginUrl}/${dirArr[x]}/package.json`.replace(/\\/g,"/"):`${url}/${dirArr[x]}/package.json`.replace(/\\/g,"/");
            const moduleUrl = dirArr.length-x<=leng?`${pluginUrl}/${dirArr[x]}`.replace(/\\/g, "/"):`${url}/${dirArr[x]}`.replace(/\\/g, "/");
            const stat = fs.lstatSync(moduleUrl);
            if (!stat.isDirectory()) {
                continue;
            }
            const list = require(pakUrl);
            const row={
                name:list.name,
                version:list.version,
                description:list.description
            } 
            
            newArr.push(row);
        }
        
        this.success(newArr)
       
    } 


};
