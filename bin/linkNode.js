const fs = require("fs");

if (!fs.existsSync("./node")) {
    // 创建快捷方式
    fs.symlinkSync(process.execPath, "./node");
}