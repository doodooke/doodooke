function includeRoute(routes = [], path) {
    let include = false;
    for (const key in routes) {
        if (routes[key].path === path) {
            include = true;
            break;
        }
    }
    return include;
}

export default function({ app, route, redirect, req }) {
    if (req && req.headers && req.headers.host === "www.doodooke.qingful.com") {
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

    const routes = app.router.options.routes;
    if (route.path === "/" || route.matched.length === 0) {
        if (includeRoute(routes, "/portal")) {
            redirect("/portal");
        } else if (includeRoute(routes, "/app/apps")) {
            redirect("/app/apps");
        } else if (includeRoute(routes, "/public/login")) {
            redirect("/public/login");
        } else {
            redirect("/admin");
        }
        return;
    }
}
