const fs = require("fs");
const fse = require("fs-extra");
const uuid = require("uuid");

// 安全码
if (fs.existsSync("SECURITY_CODE.key")) {
    const securityCode = fs.readFileSync("SECURITY_CODE.key", {
        encoding: "utf8"
    });
    if (securityCode) {
        doodoo.securityCode = securityCode;
    }
}
if (!doodoo.securityCode) {
    doodoo.securityCode = uuid();
    fse.outputFileSync("SECURITY_CODE.key", doodoo.securityCode);
}

console.log();
console.log("安全码 Security Code:", doodoo.securityCode);
console.log();