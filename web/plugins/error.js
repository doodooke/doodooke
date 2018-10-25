import Vue from 'vue';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

Raven
    .config('http://285b7fa472a54f79a822fb4eb375aab0@sentry.oneqing.com/82', { release: "20180810" })
    .addPlugin(RavenVue, Vue)
    .install();