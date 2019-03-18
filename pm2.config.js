const fs = require("fs");
const path = require("path");

// 切换node
let nodePath = process.execPath;
if (fs.existsSync("./node")) {
    nodePath = path.resolve("./node");
}
if (fs.existsSync("./node.exe")) {
    nodePath = path.resolve("./node.exe");
}

module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        {
            name: "doodooke",
            script: "app.js",
            watch: false,
            exec_mode: "fork",
            error_file: "./logs/error.log",
            out_file: "./logs/out.log",
            log_date_format: "YYYY-MM-DD HH:mm:ss",
            instances: 1,
            interpreter: nodePath,
            node_args: [],
            args: [],
            env: {
                NODE_ENV: "docker"
            }
        }
    ]
};
