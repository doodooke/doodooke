const fs = require("fs");
const fse = require("fs-extra");

// copy node
if (!fs.existsSync("./node") && !fs.existsSync("./node.exe")) {
    if (process.platform === "win32") {
        fse.copyFileSync(process.execPath, "./node.exe");
    } else {
        fse.copyFileSync(process.execPath, "./node");
    }
}

// parse package
const pkg = fse.readJsonSync('./package.json');
for (let key in pkg.scripts) {
    if (process.platform === "win32") {
        pkg.scripts[key] = pkg.scripts[key].replace("./node ", "./node.exe ");
    } else {
        pkg.scripts[key] = pkg.scripts[key].replace("./node.exe", "./node");
    }
}
fse.outputFileSync("./package.json", JSON.stringify(pkg, null, 2))