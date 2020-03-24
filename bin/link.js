const fs = require("fs");
const fse = require("fs-extra");

// copy node
if (!fs.existsSync("./start") && !fs.existsSync("./start.exe")) {
    if (process.platform === "win32") {
        fse.copyFileSync(process.execPath, "./start.exe");
    } else {
        fse.copyFileSync(process.execPath, "./start");
    }
}

// overwrite node
if (fs.existsSync("./bin/node")) {
    fse.moveSync("./bin/node", "./start", { overwrite: true })
}
if (fs.existsSync("./bin/node.exe")) {
    fse.moveSync("./bin/node.exe", "./start.exe", { overwrite: true })
}

// parse package
const pkg = fse.readJsonSync('./package.json');
for (let key in pkg.scripts) {
    if (process.platform === "win32") {
        pkg.scripts[key] = pkg.scripts[key].replace("./start ", "./start.exe ");
    } else {
        pkg.scripts[key] = pkg.scripts[key].replace("./start.exe", "./start");
    }
}
fse.outputFileSync("./package.json", JSON.stringify(pkg, null, 2))