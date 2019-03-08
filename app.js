try {
    require("doodoo-core");
} catch (error) { }

const Doodoo = require("doodoo.js");
const socket = require("socket.io");
const cors = require("koa-cors");
const glob = require("glob");
const fs = require("fs");

// 检测完成
process.on("startServer", async () => {
    // 兼容1.x配置文件
    const env = Object.assign({}, process.env);
    require("doodoo-plugin-dotenv");
    Object.assign(process.env, env);

    const app = new Doodoo();
    app.use(
        cors({
            credentials: true
        })
    );

    if (fs.existsSync("./plugin/sentry")) {
        app.plugin("sentry");
    }
    if (app.env === "development") {
        app.plugin("chokidar");
    }
    app.plugin("mysql");
    app.plugin("redis");
    app.plugin("static");
    app.plugin("proxy");
    app.plugin("baas");

    // 自动加载
    const plugins = glob.sync("*", {
        cwd: "plugin"
    });
    for (const key in plugins) {
        app.plugin(plugins[key]);
    }

    const server = await app.start();

    // 全局
    global.io = socket(server);
    io.on("connection", async socket => {
        const sid = socket.id;
        const { uid } = socket.request._query;
        if (!uid) {
            return;
        }

        await doodoo.redis.setAsync(
            `wxLogin:uid:${uid}:sid`,
            sid,
            "EX",
            60 * 60 * 2
        );
    });
}); 

// 启动检测
require("./upgrade")();