const { URL, parse } = require("url");
const _ = require("lodash");
const path = require("path");
const httpProxy = require("http-proxy");
const hProxy = httpProxy.createProxyServer({});
hProxy.on("error", (err, req, res) => {
    console.error(err);
    if (req.headers.upgrade && req.headers.upgrade === "websocket") {
        return;
    }
    res.writeHead(500, {
        "Content-Type": "application/json; charset=utf-8"
    });
    res.end(
        `{ "errmsg": "${err.name + " : " + err.message}", "errcode": "1" }`
    );
});

module.exports = () => {
    doodoo.use(async (ctx, next) => {
        let proxyDomain;
        if (ctx.query.ProxyDomain) {
            proxyDomain = ctx.query.ProxyDomain;
            ctx.cookies.set("ProxyDomain", proxyDomain);
        } else {
            if (ctx.cookies.get("ProxyDomain")) {
                proxyDomain = ctx.cookies.get("ProxyDomain");
            }
        }
        if (proxyDomain) {
            const myURL = new URL(proxyDomain);
            const staticExts = [
                ".png",
                ".jpg",
                ".jpeg",
                ".bmp",
                ".gif",
                ".css",
                ".js"
            ];
            if (_.includes(staticExts, path.extname(ctx.path))) {
                ctx.redirect(`${myURL.protocol}//${myURL.host}${ctx.path}`);
                return;
            }

            ctx.respond = false;
            return hProxy.web(ctx.req, ctx.res, {
                target: `${myURL.protocol}//${myURL.host}${ctx.path}`,
                changeOrigin: true,
                ignorePath: true,
                headers: {
                    Host: myURL.host,
                    Cookie: ctx.get("Cookie"),
                    Referer: ctx
                        .get("Referer")
                        .replace(parse(process.env.APP_HOST).host, myURL.host)
                }
            });
        }
        await next();
    });
};
