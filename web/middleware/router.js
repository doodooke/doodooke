export default function({ app, route, redirect, req }) {
    if (
        req &&
        req.headers &&
        req.headers.host === "www.doodooke.qingful.com:3000"
    ) {
        redirect(`https://www.doodooke.com${req.url}`);
        return;
    }
    if (req && req.headers && req.headers.host === "doodooke.com") {
        redirect(`https://www.doodooke.com${req.url}`);
        return;
    }
    if (route.path === "/admin") {
        redirect("/admin/public/login");
        return;
    }
    if (route.path === "/" || route.matched.length === 0) {
        redirect("/portal");
        return;
    }
}
