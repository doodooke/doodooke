import { Message } from "element-ui";

export default function ({ app, $axios, redirect, req }) {
    $axios.onRequest(config => {
        console.log("onRequest");

        // cookies
        config.headers.Token = app.$cookies.get("Token") || "";
        config.headers.AppToken = app.$cookies.get("AppToken") || "";
        config.headers.ProjectToken = app.$cookies.get("ProjectToken") || "";
        config.headers.PageToken = app.$cookies.get("PageToken") || "";
        config.headers.WxaToken = app.$cookies.get("WxaToken") || "";

        // config.headers["X-IP"] = req.headers["X-Real-IP"] || req.ip;
        config.headers.uniqueToken = app.$cookies.get("uniqueToken") || "";
    });

    $axios.onResponse(response => {
        console.log("onResponse");

        if (response.data && response.data.errcode) {
            Message.error(response.data.errmsg);
        }
    });

    $axios.onError(error => {
        console.log("onError");
        console.log(error);

        if (error.response) {
            const { status, data } = error.response;
            if (status === 401) {
                if (data.errcode === "Admin Unauthorized" || data.errcode === "Admin Status Unauthorized") {
                    redirect("/admin/public/login");
                    return;
                }
                if (data.errcode === "Custom Unauthorized") {
                    let redirectUrl = '/public/login';
                    if (app.context.from) {
                        redirectUrl += `?redirect=${encodeURIComponent(app.context.from.fullPath)}`
                    } else {
                        redirectUrl += `?redirect=${encodeURIComponent(app.context.route.fullPath)}`
                    }
                    redirect(redirectUrl);
                    return;
                }
                if (data.errcode === "Page Unauthorized") {
                    redirect("/diy/diy");
                    return;
                }
                if (data.errcode === "App Unauthorized") {
                    redirect("/app/apps");
                    return;
                }
                if (data.errcode === "Custom Agent Unauthorized" || data.errcode === "Agent Unauthorized") {
                    redirect("/app/apps");
                    return;
                }
            }
        } else {
            console.log("Error", error.message);
        }
    });

    $axios.onRequestError(err => {
        console.log("onRequestError");
    });
    $axios.onResponseError(err => {
        console.log("onResponseError");
    });
}
