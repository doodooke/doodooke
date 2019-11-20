export default (async function({ app, route, redirect, req, store }) {
    // 去掉http 或 https
    let appHostArr =
        app.context.env.APP_HOST.indexOf("https://") != -1
            ? app.context.env.APP_HOST.split("https://")
            : app.context.env.APP_HOST.split("http://");
    console.log("appHostArr-->", appHostArr);
    if (req && req.headers && req.headers.host.indexOf("127.0.0.1") === -1 && req.headers.host.indexOf("localhost") === -1) {
        if (appHostArr[1] != req.headers.host) {
            const res = await app.$axios.$get(
                `/api/public/home/public/checkAgent?host=${req.headers.host}`
            );
            console.log("res-->", res);
            if (res && res.errmsg !== "ok") {
                redirect(app.context.env.APP_HOST);
            }
            // 1.检查请求的域名是否等于
        }
    }
});
