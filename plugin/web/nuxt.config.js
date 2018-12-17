/**
 * 临时兼容
 */
const path = require("path");
if (process.cwd() === __dirname) {
    process.chdir(path.resolve(__dirname, "./../../"));
}

const fs = require("fs");
const { relativeTo } = require("@nuxt/common");
const glob = require("glob");
const _url = require("url");
const dotenv = require("dotenv");
const apiConfig = dotenv.parse(fs.readFileSync(".env"));
const webConfig = Object.assign(dotenv.parse(fs.readFileSync(".env.web")), {
    APP_HOST: apiConfig.APP_HOST,
    APP_PREFIX: apiConfig.APP_PREFIX,
    DOMAIN: _url.parse(apiConfig.APP_HOST).host,
    API_DOMAIN: apiConfig.APP_HOST + apiConfig.APP_PREFIX
});
const appDir = "app";

function createRoutes(srcDir) {
    const views = glob.sync("*/view/**/*.vue", {
        cwd: appDir
    });

    const routes = [];
    for (const key in views) {
        const file = path.resolve(appDir, views[key]);
        routes.push({
            name: views[key],
            path:
                "/" +
                views[key]
                    .replace(/\\/g, "/")
                    .replace(/\/view/, "")
                    .replace(/_/g, ":")
                    .replace(/.vue$/, "")
                    .replace(/.index$/, ""),
            component: file,
            chunkName: "pages/app/" + views[key]
        });
    }
    return routes;
}

function createLayouts() {
    const layouts = glob.sync("*/layout/**/*.vue", { cwd: appDir });
    const _layouts = {};
    for (const key in layouts) {
        _layouts[
            path
                .basename(layouts[key])
                .replace(/\\/g, "/")
                .replace(/.vue$/, "")
        ] = relativeTo(
            path.resolve(__dirname, ".nuxt"),
            path.resolve(appDir, layouts[key])
        );
    }

    return _layouts;
}
/***SCRIPT***/
let HEAD_SCRIPT = [];
if (webConfig.HEAD_SCRIPT) {
    for(const value of webConfig.HEAD_SCRIPT.split(',')){
        HEAD_SCRIPT.push({
            src: value
        })
    }
}
/***LINK***/
let HEAD_LINK = [];
if (webConfig.HEAD_LINK) {
    for(const value of webConfig.HEAD_LINK.split(',')){
        HEAD_LINK.push({
            rel: "stylesheet",
            type: "text/css",
            href: value
        })
    }
}

module.exports = {
    rootDir: "plugin/web",

    env: webConfig,

    layouts: createLayouts(),

    head: {
        title: webConfig.HEAD_TITLE,
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            {
                hid: "description",
                name: "description",
                content: webConfig.HEAD_META_DESCRIPTION
            },
            {
                hid: "keywords",
                name: "keywords",
                content: webConfig.HEAD_META_KEYWORDS
            }
        ],
        script: [
            {
                src:
                    "https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js"
            },
            {
                src:
                    "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js"
            },
            {
                src:
                    "https://hm.baidu.com/hm.js?be01837c791802c529c8c6890dfe5079"
            },
            {
                src:
                    "https://s19.cnzz.com/z_stat.php?id=1274740931&web_id=1274740931",
                type: "hidden"
            }
        ].concat(HEAD_SCRIPT),
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            {
                rel: "stylesheet",
                type: "text/css",
                href:
                    "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.css"
            },
            {
                rel: "stylesheet",
                type: "text/css",
                href:
                    "https://unpkg.com/element-ui@2.4.8/lib/theme-chalk/index.css"
            },
            {
                rel: "stylesheet",
                type: "text/css",
                href: "/common.css"
            },
            {
                rel: "stylesheet",
                type: "text/css",
                href: "//at.alicdn.com/t/font_704506_bcl8ibsxl4.css"
            }
        ].concat(HEAD_LINK)
    },
    /*
     ** Customize the progress bar color
     */
    loading: { color: "#3B8070" },
    /*
     ** Build configuration
     */
    build: {
        createRoutes: srcDir => {
            return createRoutes(srcDir);
        },

        /*
         ** Run ESLint on save
         */
        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: "pre",
                    test: /\.(js|vue)$/,
                    loader: "eslint-loader",
                    exclude: /(node_modules)/
                });
            }
            config.devtool = "#source-map";
        },

        vendor: ["axios", "element-ui"]
    },

    loading: false,

    modules: ["@nuxtjs/axios", "cookie-universal-nuxt", "@nuxtjs/sitemap"],

    axios: {
        proxy: true, // Can be also an object with default options
        debug: false,
        baseURL: `http://127.0.0.1:${apiConfig.APP_PORT}`
    },

    router: {
        middleware: ["auth", "router"]
    },

    sitemap: {
        path: "/sitemap.xml",
        hostname: apiConfig.APP_HOST,
        cacheTime: 1000 * 60 * 15,
        gzip: true,
        generate: false, // Enable me when using nuxt generate
        exclude: ["**"],
        routes: [
            "/",
            "/portal",
            "/portal/diy",
            "/portal/shop",
            "/public/login",
            "/public/register",
            "/public/forget_pwd",
            "/cms/cms",
            "/www/diy.html",
            "/www/shop.html"
        ]
    },

    proxy: {
        "/api": {
            target: `http://127.0.0.1:${apiConfig.APP_PORT}`
        }
    },

    css: [],

    plugins: [
        { src: "~plugins/element.js", ssr: true },
        { src: "~plugins/axios.js", ssr: true },
        { src: "~plugins/util.js", ssr: true },
        { src: "~plugins/upload.js", ssr: false },
        { src: "~plugins/link.js", ssr: false },
        { src: "~plugins/editor.js", ssr: false },
        { src: "~plugins/amap.js", ssr: false },
        { src: "~plugins/particles.js", ssr: false },
        { src: "~plugins/echarts.js", ssr: false },
        { src: "~plugins/region.js", ssr: false },
        { src: "~plugins/error.js", ssr: false },
        { src: "~plugins/ga.js", ssr: false },
        { src: "~plugins/dragx.js", ssr: false },
        { src: "~plugins/bus.js", ssr: false }
    ]
};
