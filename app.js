try {
    require("doodoo-core");
} catch (error) {}

const Doodoo = require("doodoo.js");
const socket = require("socket.io");
const cors = require("koa-cors");
const context = require("./context");

// 初始化
const app = new Doodoo();
Object.assign(app.context, context);
app.use(
    cors({
        credentials: true
    })
);

app.plugin("static");
app.plugin("migrate");
app.plugin("core");
app.plugin("nuxt");
app.plugin("sentry");
app.plugin("wxaOpen");
app.plugin("proxy");
app.plugin("baas");

(async () => {
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
})();
