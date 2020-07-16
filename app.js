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
const shortid = require('shortid');
const getRawBody = require('raw-body');
const cloneRequest = require('clone-response');
const pathToRegexp = require("path-to-regexp");
const redis = require("redis");
const bluebird = require("bluebird");
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
doodoo.debugPaths = [];
doodoo.debugRequest = {};

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const pub = redis.createClient(doodoo.getConf("redis"));
const sub = redis.createClient(doodoo.getConf("redis"));

sub.on("message", (channel, message) => {
    console.log('channel', channel)
    console.log('message', message)

    // 调试路径
    if (channel === `debugPaths`) {
        doodoo.debugPaths = JSON.parse(message);
        return
    }

    // 调试请求，响应一次
    const ctx = doodoo.debugRequest[channel];
    if (ctx) {
        const res = JSON.parse(message)
        ctx.res.writeHead(res.status || 200, res.headers || {});

        if (_.isString(res.data)) {
            ctx.res.end(res.data);
        }
        if (_.isArray(res.data) || _.isPlainObject(res.data)) {
            ctx.res.end(JSON.stringify(res.data));
        }
        if (_.isNumber(res.data)) {
            ctx.res.end(String(res.data));
        }

        delete doodoo.debugRequest[channel];
        sub.unsubscribe(channel);
        return
    }
});
sub.subscribe("debugPaths");

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
        if (doodoo.debugPaths.length) {
            for (const _path of doodoo.debugPaths) {
                const keys = [];
                const regexp = pathToRegexp(`${_path.path}(.*)`, keys);
                const regres = regexp.exec(ctx.path);

                if (regres) {
                    const uid = shortid.generate();
                    const copy = _path.copy;
                    const _token = ctx.query.uniqueToken || ctx.get("uniqueToken") || "default";
                    if (!copy) {
                        ctx.respond = false;
                        doodoo.debugRequest[`res_${uid}`] = ctx;
                        sub.subscribe(`res_${uid}`);
                    }

                    const clonedResponse = cloneRequest(ctx.req);
                    const body = await getRawBody(ctx.req, {
                        length: ctx.length,
                        limit: "1mb",
                        encoding: "utf8"
                    });

                    io.to(_token).emit("req", {
                        uid: uid,
                        url: ctx.url,
                        path: ctx.path,
                        query: ctx.query,
                        method: ctx.method,
                        headers: ctx.headers,
                        body: body
                    });

                    ctx.req = clonedResponse;
                    if (copy) {
                        console.log(`Debug Copy ${_token} ${ctx.path}`)
                        await next();
                    } else {
                        console.log(`Debug Forward ${_token} ${ctx.path}`)
                    }
                    return;
                }
            }

            await next();
        } else {
            await next();
        }
    });
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
    global.io = socket(server, {
        transports: ['websocket', 'polling']
    });
    io.adapter(redisAdapter(Object.assign(doodoo.getConf("redis"), { pubClient: pub, subClient: sub })));
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
                io.to(sid).emit("exit", "Permission denied");
                return
            }

            console.log(`Connected Debug ${socket.handshake.address} ${sid}`)
            console.log("Connected debugPaths", doodoo.debugPaths)

            const _token = uniqueToken || "default";
            const clients = await new Promise((resolve, reject) => {
                io.in(_token).clients((err, clients) => {
                    if (err) reject(err);
                    resolve(clients)
                });
            });
            if (clients.length) {
                io.to(sid).emit("exit", "The same uniqueToken, Only one connection is supported at the same time");
                return;
            }

            socket.join(_token);
            socket.on("res", async res => {
                pub.publish(`res_${res.uid}`, JSON.stringify(res));
            });
            socket.on("disconnect", reason => {
                console.log(`Disconnected Debug ${socket.handshake.address} ${sid} ${reason}`)
                socket.leave(_token);
            });
        }
    });
});

// 启动检测
require("./upgrade")();