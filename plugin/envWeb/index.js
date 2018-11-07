const _url = require("url");

module.exports = () => {
    doodoo.router.get("/app/home/public/envweb", async (ctx, next) => {
        const _domain = ctx.host || _url.parse(process.env.APP_HOST).host;
        const _domains = _domain.split(".");
        _domains.shift();
        const domain = _domains.join(".");
        console.log('domain:',domain);
        await ctx.hook.run("envweb", domain, ctx);
        ctx.success(ctx.state.envweb);
    })
};
