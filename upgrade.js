const axios = require("axios");
const download = require("download");
const ProgressBar = require("progress");
const glob = require("glob");
const semver = require("semver");
const fs = require("fs");

async function downloadZip(url, dest, tag) {
    const response = await axios({
        method: "get",
        url: url,
        responseType: "stream"
    });
    const bar = new ProgressBar(
        `[doodoo-upgrade] Updating ${tag} [:bar] :rate/bps :percent :etas`,
        {
            complete: "=",
            incomplete: " ",
            width: 40,
            total: parseInt(response.data.headers["content-length"], 10)
        }
    );

    await download(url, dest, {
        extract: true,
        filter: file => {
            if (/__MACOSX/.test(file.path)) {
                return false;
            }
            return true;
        }
    }).on("response", res => {
        bar.total = res.headers["content-length"];
        res.on("data", data => bar.tick(data.length));
    });
}

module.exports = async () => {
    // 检测升级系统
    // TODO

    // 检测商业版
    const js7Files = glob.sync("**/*.js7", { ignore: ["**/node_modules/**"] });
    if (!js7Files.length) {
        process.emit("startServer");
        return;
    }

    // 必须使用pm2或者./node启动
    if (fs.existsSync("./node") && !process.env.DOODOO_CORE_VERSION) {
        throw new Error("Use pm2 start pm2.config.js or start with ./node");
    }
    // 必须使用pm2或者./node.exe启动
    if (fs.existsSync("./node.exe") && !process.env.DOODOO_CORE_VERSION) {
        throw new Error("Use pm2 start pm2.config.js or start with ./node.exe");
    }

    // 检测升级node
    const requestNodeInfo = await axios.get(
        "http://upgrade.doodooke.com/node/node.json"
    );
    const nodeInfo = requestNodeInfo.data;
    const nodeLatestVersion = nodeInfo.latest;

    if (
        !process.env.DOODOO_CORE_VERSION ||
        semver.gt(nodeLatestVersion, process.env.DOODOO_CORE_VERSION)
    ) {
        let os;
        if (process.platform === "darwin") {
            os = "mac";
        }
        if (process.platform === "linux") {
            os = "linux";
        }
        if (process.platform === "win32") {
            os = "win";
        }
        if (!os) {
            throw new Error("如需支持其他操作系统，请联系客服。");
        }

        console.log("[doodoo-upgrade] 温馨提示：开始升级node，升级完成请重启");
        await downloadZip(
            `http://upgrade.doodooke.com/node/${nodeLatestVersion}/${os}.zip`,
            "./bin",
            "Node"
        );

        if (process.platform === "win32") {
            fs.symlinkSync("./bin/node.exe", "./node");
        } else {
            fs.symlinkSync("./bin/node", "./node");
        }

        process.exit();
    }

    process.emit("startServer");
}
