import Vuex from "vuex";

function getCoryright(host) {
    if (host === "127.0.0.1" || host === "localhost" || host === "0.0.0.0") {
        return host;
    }

    let hosts = host.split(".");
    return hosts.join(".");
}

function isAgent(host, domain) {
    const copyright = getCoryright(host);
    if (copyright.split(":")[0] === domain) {
        return false;
    }
    return true;
}

const createStore = () => {
    return new Vuex.Store({
        state: {
            agent: false,
            host: "",
            custom: {},
            copyright: "",
            componentId: 0,
            color: "#000000",
            pageId: 0,
            env: {},
            browser: "",
            recentArticle: [],
            navData: [],
            marketCompare: {
                showCompare: false,
                appData: []
            }
        },
        mutations: {
            SET_AGENT(state, agent) {
                state.agent = agent;
            },
            SET_CUSTOM(state, custom) {
                state.custom = custom;
            },
            SET_HOST(state, host) {
                state.host = host;
            },
            SET_CORYRIGHT(state, copyright) {
                state.copyright = copyright;
            },
            SET_COMPONENT_ID(state, id) {
                state.componentId = id;
            },
            SET_PAGE_ID(state, id) {
                state.pageId = id;
            },
            SET_COLOR(state, color) {
                state.color = color;
            },
            SET_ENV(state, env) {
                state.env = env;
            },
            SET_BROWSER(state, browser) {
                state.browser = browser;
            },
            SET_RECENT_ARTICLE(state, article) {
                state.recentArticle = article;
            },
            SET_NAV_DATA(state, nav) {
                state.navData = nav;
            },
            SET_MARKET_COMPARE(state, data) {
                state.marketCompare = data;
            }
        },
        actions: {
            nuxtServerInit({
                commit
            }, {
                app,
                req
            }) {
                const xHost = req.headers["x-host"];
                if (xHost) {
                    commit("SET_AGENT", isAgent(xHost, app.context.env.DOMAIN));
                    commit("SET_HOST", xHost);
                    commit("SET_CORYRIGHT", getCoryright(xHost));
                }
                if (app.$cookies.get("custom")) {
                    commit("SET_CUSTOM", app.$cookies.get("custom"));
                }
                if (app.context.env) {
                    commit("SET_ENV", app.context.env);
                }

                const u_agent = req.headers["user-agent"];
                let browser_name = '';
                if (u_agent) {
                    if (u_agent.indexOf('Firefox') > -1) {
                        browser_name = 'Firefox';
                    } else if (u_agent.indexOf('Chrome') > -1) {
                        browser_name = 'Chrome';
                    } else if (u_agent.indexOf('Trident') > -1 && u_agent.indexOf('rv:11') > -1) {
                        browser_name = 'IE';
                    } else if (u_agent.indexOf('MSIE') > -1 && u_agent.indexOf('Trident') > -1) {
                        browser_name = 'IE';
                    } else if (u_agent.indexOf('Opera') > -1) {
                        browser_name = 'Opera';
                    }
                    commit("SET_BROWSER", browser_name);
                }
            }
        }
    });
};

export default createStore;