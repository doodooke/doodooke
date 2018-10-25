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

app.plugin("core");
app.plugin("webhook", {
    secret: "qingful",
    isMaster: true,
    cmd: {
        "@start": "pm2 start pm2.json",
        "@restart": "pm2 restart pm2.json",
        "@stop": "pm2 stop pm2.json",
        "@pull": "git pull",
        "@install": "yarn install"
    }
});
app.plugin("static");
app.plugin("migrate");
app.plugin("nuxt");
app.plugin("sentry");
app.plugin("wxaOpen");
app.plugin("proxy");
app.plugin("baas");

(async () => {
    const server = await app.start();
    doodoo.hook.run("dingding", "系统提示", "应用启动成功");

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
