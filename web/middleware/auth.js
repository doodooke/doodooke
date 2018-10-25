export default (async function({ app, route, redirect, req }) {
    console.log("检测权限");

    const env = app.context.env;
    if (!env.INSTALLED) {
        redirect("/install/config");
        return;
    }
});
