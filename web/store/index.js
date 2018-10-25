import Vuex from "vuex";

function getCoryright(host) {
    if (host === "127.0.0.1" || host === "localhost" || host === "0.0.0.0") {
        return host;
    }

    let hosts = host.split(".");
    hosts.shift();
    return hosts.join(".");
}

function isAgent(host,domain) {
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
            env: {}
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
            }
        },
        actions: {
            nuxtServerInit({ commit }, { app, req }) {
                const xHost = req.headers["x-host"];
                if (xHost) {
                    commit("SET_AGENT", isAgent(xHost,app.context.env.DOMAIN));
                    commit("SET_HOST", xHost);
                    commit("SET_CORYRIGHT", getCoryright(xHost));
                }
                if (app.$cookies.get("custom")) {
                    commit("SET_CUSTOM", app.$cookies.get("custom"));
                }
                if (app.context.env) {
                    commit("SET_ENV", app.context.env);
                }
            }
        }
    });
};

export default createStore;
