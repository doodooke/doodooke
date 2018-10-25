/**
 * 配置文件
 */

const config = {
    // 配置小程序域名
    wxaDomain: {
        requestdomain: [
            "https://api.doodooke.com",
            "https://api.doodooke.qingful.com"
        ],
        wsrequestdomain: [
            "wss://api.doodooke.com",
            "wss://api.doodooke.qingful.com"
        ],
        uploaddomain: [
            "https://api.doodooke.com",
            "https://api.doodooke.qingful.com"
        ],
        downloaddomain: [
            "https://api.doodooke.com",
            "https://api.doodooke.qingful.com"
        ]
    },
    // 配置小程序业务域名
    webDomain: ["https://api.doodooke.com", "https://api.doodooke.qingful.com"]
};

module.exports = config;
