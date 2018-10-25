import { Message } from "element-ui";

export default function ({ app, $axios, redirect, req }) {
    $axios.onRequest(config => {
        console.log("onRequest");

        // cookies
        config.headers.Token = app.$cookies.get("Token") || "";
        config.headers.AppToken = app.$cookies.get("AppToken") || "";
        config.headers.ProjectToken = app.$cookies.get("ProjectToken") || "";
        config.headers.PageToken = app.$cookies.get("PageToken") || "";

        // config.headers["X-IP"] = req.headers["X-Real-IP"] || req.ip;

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
                if (data.errcode === "Admin Unauthorized") {
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
            }
            if (status === 301) {
                redirect("/install/config");
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
