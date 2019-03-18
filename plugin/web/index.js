const { Nuxt, Builder } = require("nuxt");
const yn = require("yn");
const glob = require("glob");
const path = require("path");
const fs = require("fs");
const isDev = (process.env.NODE_ENV || "development") === "development";

// 用指定的配置对象实例化 Nuxt.js
const config = require("./nuxt.config");
const nuxt = new Nuxt(Object.assign(config, { dev: isDev }));

module.exports = async () => {
    // 在开发模式下启用编译构建和热加载
    if (isDev && yn(process.env.NUXT_BUILD)) {
        const builder = new Builder(nuxt);
        await builder.build();
    }

    if (fs.existsSync(path.resolve("plugin/migrate"))) {
        // migrate必须在web前加载
        await doodoo.usePlugin("migrate");
    }

    if (fs.existsSync(path.resolve("plugin/webdomain"))) {
        // webdomain必须在nuxt前加载
        await doodoo.usePlugin("webdomain");
    }

    // static必须在nuxt前加载
    const wwws = glob.sync("*/www", {
        cwd: doodoo.getConf("app.root")
    });
    for (const key in wwws) {
        await doodoo.usePlugin("static", {
            dir: path.resolve(doodoo.getConf("app.root"), wwws[key])
        });
    }

    // 页面配置项
    doodoo.router.get("/public/home/public/envweb", async (ctx, next) => {
        const _domain = ctx.query.host || _url.parse(process.env.APP_HOST).host;
        const _domains = _domain.split(".");
        _domains.shift();
        const domain = _domains.join(".");
        console.log("domain:", domain);
        await ctx.hook.run("envweb", domain, ctx);
        ctx.success(ctx.state.envweb);
    });

    doodoo.use(async (ctx, next) => {
        if (
            doodoo.getConf("app.prefix") &&
            ctx.path.indexOf(doodoo.getConf("app.prefix")) === 0
        ) {
            return await next();
        }

        ctx.status = 200;
        ctx.respond = false; // Mark request as handled for Koa
        ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
        nuxt.render(ctx.req, ctx.res);
    });
};
