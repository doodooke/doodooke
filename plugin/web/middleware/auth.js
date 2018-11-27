export default (async function ({ app, route, redirect, req, store }) {
    console.log("检测权限");
    if (req && req.headers) {
        if (app.context.env.APP_HOST != req.headers.host) {
            const res = await app.$axios.$get(`/api/app/home/public/envweb?host=${req.headers.host}`);
            if (res && res.errmsg === "ok") {
                const env = Object.assign(app.context.env, res.data)
                store.commit('SET_ENV', env)
            }
        }
    }
});
