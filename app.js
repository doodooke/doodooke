try {
    require("doodoo-core");
} catch (error) { }

const Doodoo = require("doodoo.js");
const socket = require("socket.io");
const redisAdapter = require('socket.io-redis');
const cors = require("koa-cors");
const glob = require("glob");
const fs = require("fs");
const _ = require("lodash");
const fse = require("fs-extra");
const uuid = require('uuid');
const http = require('http');
const util = require('util');
const shortid = require('shortid');
const getRawBody = require('raw-body');
const cloneRequest = require('clone-response');
const pathToRegexp = require("path-to-regexp");
const rewrite = require("./rewrite");

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

console.log();
console.log("安全码 Security Code:", doodoo.securityCode);
console.log();

// 本地调试
let debugClient = {};
let debugRequest = {};
doodoo.debugPaths = [];

// 检测完成
process.on("startServer", async () => {
    // 兼容1.x代码
    process.env.QINIU = true;
    // 兼容1.x代码
    for (let key in doodoo.config) {
        for (let _key in doodoo.config[key]) {
            process.env[_.toUpper(key) + "_" + _.toUpper(_key)] = doodoo.config[key][_key]
        }
    }

    const app = new Doodoo();
    app.use(
        cors({
            credentials: true
        })
    );
    app.use(async (ctx, next) => {
        // 本地调试
        if (!_.isEmpty(debugClient)) {
            for (const _path of doodoo.debugPaths) {
                const keys = [];
                const regexp = pathToRegexp(`${_path.path}(.*)`, keys);
                const regres = regexp.exec(ctx.path);

                if (regres) {
                    const uid = shortid.generate();
                    const copy = _path.copy;
                    debugRequest[uid] = {
                        ctx,
                        copy
                    };

                    const _token = ctx.query.uniqueToken || ctx.get("uniqueToken") || "default";
                    if (debugClient[_token]) {
                        if (!copy) {
                            ctx.respond = false;
                        }

                        const clonedResponse = cloneRequest(ctx.req);
                        const body = await getRawBody(ctx.req, {
                            length: ctx.length,
                            limit: "1mb",
                            encoding: "utf8"
                        });
                        
                        debugClient[_token].emit("req", {
                            uid: uid,
                            url: ctx.url,
                            path: ctx.path,
                            query: ctx.query,
                            method: ctx.method,
                            headers: ctx.headers,
                            body: body
                        });

                        ctx.req = clonedResponse;
                        const address = debugClient[_token].handshake.address
                        const sid = debugClient[_token].id
                        if (copy) {
                            console.log(`Debug Copy ${ctx.path} ${address} ${sid}`)
                            await next();
                        } else {
                            console.log(`Debug Forward ${ctx.path} ${address} ${sid}`)
                        }
                    } else {
                        await next();
                    }
                    return;
                }
            }
        }

        await next();
    });
    if (fs.existsSync("./plugin/sentry")) {
        app.plugin("sentry");
    }
    if (app.env === "development") {
        app.plugin("chokidar");
    }

    if (fs.existsSync("install.lock")) {
        app.plugin("mysql");
        app.plugin("redis");
    }
    app.plugin("proxy");
    app.plugin("baas");
    app.plugin("static");

    // 自动加载
    const plugins = glob.sync("*", {
        cwd: "plugin"
    });
    for (const key in plugins) {
        app.plugin(plugins[key]);
    }

    // 启动
    const server = await app.start();

    // rewrite
    for (const layer of app.router.stack) {
        for (const key in rewrite) {
            const keys = [];
            const regexp = pathToRegexp(`${rewrite[key]}(.*)`, keys);
            const regres = regexp.exec(layer.path);

            if (regres) {
                app.router.all(layer.path.replace(rewrite[key], key).replace(new RegExp(`^${doodoo.getConf("app.prefix")}`), ""), ...layer.stack);
            }
        }
    }

    // 全局
    global.io = socket(server);
    io.adapter(redisAdapter(doodoo.getConf("redis")));
    io.on("connection", async socket => {
        const sid = socket.id;
        const { uid, type, securityCode, uniqueToken } = socket.request._query;
        if (type === "wxLogin") {
            if (!uid) {
                return;
            }

            await doodoo.redis.setAsync(
                `wxLogin:uid:${uid}:sid`,
                sid,
                "EX",
                60 * 60 * 2
            );
            return;
        }

        if (type === "debug") {
            if (securityCode != doodoo.securityCode) {
                socket.emit("exit", "Permission denied");
                return
            }

            console.log(`Connected Debug ${socket.handshake.address} ${sid}`)
            console.log("Connected debugPaths", doodoo.debugPaths)

            let _token = uniqueToken || "default";
            socket.on("res", async res => {
                const client = debugRequest[res.uid];
                const copy = client.copy;
                const ctx = client.ctx;
                if (!copy) {
                    ctx.res.writeHead(res.status || 200, res.headers || {});
                    ctx.res.write(res.data);
                    ctx.res.end();
                }

                delete debugRequest[res.uid];
            });
            socket.on("disconnect", reason => {
                console.log(`Disconnected Debug ${socket.handshake.address} ${sid} ${reason}`)
                delete debugClient[_token];
            });

            if (!debugClient[_token]) {
                debugClient[_token] = socket;
            } else {
                socket.emit("exit", "The same uniqueToken, Only one connection is supported at the same time");
            }
        }
    });
});

// 启动检测
require("./upgrade")();