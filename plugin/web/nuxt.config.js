/**
 * 临时兼容
 */
const path = require("path");
if (process.cwd() === __dirname) {
  process.chdir(path.resolve(__dirname, "./../../"));
}

const fs = require("fs");
const {
  relativeTo
} = require("@nuxt/common");
const glob = require("glob");
const _url = require("url");
const pathToRegexp = require("path-to-regexp");
const rewrite = require("./../../rewrite");
const yaml = require('js-yaml');
const _ = require('lodash');

const configData = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));
const webConfigData = yaml.safeLoad(fs.readFileSync('web.config.yml', 'utf8'));
const _webConfigData = {};
for (let key in webConfigData) {
  if (_.isString(webConfigData[key])) {
    _webConfigData[_.toUpper(key)] = webConfigData[key];
    continue;
  }
  for (let _key in webConfigData[key]) {
    _webConfigData[_.toUpper(key) + "_" + _.toUpper(_key)] = webConfigData[key][_key]
  }
}
const webConfig = _.merge(
  webConfigData,
  _webConfigData, {
  APP_HOST: configData.app.host,
  APP_PREFIX: configData.app.prefix,
  DOMAIN: _url.parse(configData.app.host).host,
  API_DOMAIN: configData.app.host + configData.app.prefix
}
);
const appDir = "app";

function createRoutes(srcDir) {
  const views = glob.sync("*/view/**/*.vue", {
    cwd: appDir
  });

  const routes = [];
  for (const key in views) {
    const file = path.resolve(appDir, views[key]);
    const _path = "/" +
      views[key]
        .replace(/\\/g, "/")
        .replace(/\/view/, "")
        .replace(/\/_/g, "/:")
        .replace(/.vue$/, "")
        .replace(/.index$/, "");
    routes.push({
      name: views[key],
      path: _path,
      component: file,
      chunkName: "pages/app/" + views[key]
    });

    if (_path === '/portal') {
      routes.push({
        name: "@" + views[key],
        path: "/",
        component: file,
        chunkName: "pages/app/" + views[key]
      });
    }

    for (const _key in rewrite) {
      const keys = [];
      const regexp = pathToRegexp(`${rewrite[_key]}(.*)`, keys);
      const regres = regexp.exec(_path);

      if (regres) {
        routes.push({
          name: "@" + views[key],
          path: _path.replace(rewrite[_key], _key),
          component: file,
          chunkName: "pages/app/" + views[key]
        });
      }
    }
  }

  return routes;
}

function createLayouts() {
  const layouts = glob.sync("*/layout/**/*.vue", {
    cwd: appDir
  });
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
  for (const value of webConfig.HEAD_SCRIPT.split(",")) {
    HEAD_SCRIPT.push({
      src: value
    });
  }
}
/***LINK***/
let HEAD_LINK = [];
if (webConfig.HEAD_LINK) {
  for (const value of webConfig.HEAD_LINK.split(",")) {
    HEAD_LINK.push({
      rel: "stylesheet",
      type: "text/css",
      href: value
    });
  }
}

module.exports = {
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  
  rootDir: "plugin/web",

  env: webConfig,

  layouts: createLayouts(),

  head: {
    title: webConfig.HEAD_TITLE,
    meta: [{
      charset: "utf-8"
    },
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
    script: [{
      src: "/js/polyfill.min.js"
    },
    {
      src: "/js/socket.io.js"
    },
    {
      src: "/cnzz.js"
    }
    ].concat(HEAD_SCRIPT),
    link: [{
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico"
    },
    {
      rel: "stylesheet",
      type: "text/css",
      href: "/css/animate.css"
    },
    {
      rel: "stylesheet",
      type: "text/css",
      href: "https://cdn.bootcss.com/element-ui/2.6.1/theme-chalk/index.css"
    },
    {
      rel: "stylesheet",
      type: "text/css",
      href: "/common.css"
    },
    {
      rel: "stylesheet",
      type: "text/css",
      href: "//at.alicdn.com/t/font_704506_m9kwvbg4jh.css"
    }
    ].concat(HEAD_LINK)
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: "#3B8070"
  },
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
    extend(config, {
      isDev,
      isClient
    }) {
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

  modules: ["@nuxtjs/axios", "cookie-universal-nuxt", "@nuxtjs/sitemap", "~/hook.js"],

  axios: {
    proxy: true, // Can be also an object with default options
    debug: false,
    baseURL: `http://127.0.0.1:${configData.app.port}`
  },

  router: {
    middleware: ["auth", "router", "browser"]
  },

  sitemap: {
    path: "/sitemap.xml",
    hostname: configData.app.host,
    cacheTime: 1000 * 60 * 15,
    gzip: true
  },

  proxy: {
    "/api": {
      target: `http://127.0.0.1:${configData.app.port}`
    },
    "/registry": {
      target: `http://registry.doodooke.com`,
      pathRewrite: {
        "^/registry": "/"
      }
    }
  },

  css: [],

  plugins: [{
    src: "~plugins/element.js",
    ssr: true
  },
  {
    src: "~plugins/axios.js",
    ssr: true
  },
  {
    src: "~plugins/util.js",
    ssr: true
  },
  {
    src: "~plugins/upload.js",
    ssr: false
  },
  {
    src: "~plugins/link.js",
    ssr: false
  },
  {
    src: "~plugins/editor.js",
    ssr: false
  },
  {
    src: "~plugins/amap.js",
    ssr: false
  },
  {
    src: "~plugins/particles.js",
    ssr: false
  },
  {
    src: "~plugins/echarts.js",
    ssr: false
  },
  {
    src: "~plugins/region.js",
    ssr: false
  },
  {
    src: "~plugins/ga.js",
    ssr: false
  },
  {
    src: "~plugins/dragx.js",
    ssr: false
  },
  {
    src: "~plugins/bus.js",
    ssr: false
  },
  {
    src: "~plugins/freedrag.js",
    ssr: false
  }
  ]
};
