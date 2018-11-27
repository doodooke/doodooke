import Vue from "vue";
import Raven from "raven-js";
import RavenVue from "raven-js/plugins/vue";

Raven.config("http://5cd5256ae8c54c52aa35fd5aedcb1429@sentry.oneqing.com/3", {
    release: "20181029"
})
    .addPlugin(RavenVue, Vue)
    .install();
