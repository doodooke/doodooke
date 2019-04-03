
const fse = require("fs-extra");
const path = require("path");
const fs = require("fs");
const yaml = require("js-yaml");
const dotenv = require("dotenv");
const _ = require("lodash");
const removeDirs = [
    './../app/app',
    './../plugin/minialipay',
    './../plugin/wxa',
    './../plugin/core'
];

function upgradeEnvToYml(envFile, ymlFile) {
    const env = dotenv.parse(fs.readFileSync(envFile))
    const _env = {};
    for (let key in env) {
        if (key === "MYSQL" || key === "REDIS" || key === "QINIU") {
            continue;
        }
        _.set(_env, _.toLower(key).replace("_", "."), env[key])
    }
    fs.writeFileSync(ymlFile, yaml.safeDump(_env, {
        indent: 4
    }));
    fs.unlinkSync(envFile);
}

async function update() {
    for (let row of removeDirs) {
        const filePath = path.resolve(__dirname, row);
        const exist = await fse.pathExists(filePath);
        console.log(`path ${filePath} exist ${exist}`);
        if (exist) {
            try {
                await fse.remove(filePath)
                console.log(`remove ${filePath} success!`)
            } catch (err) {
                console.error(err)
            }
        }
    }

    // 执行upgrateEnvToYml
    if (fs.existsSync(".env")) {
        upgradeEnvToYml(".env", "config.yml")
    }
    if (fs.existsSync(".env.web")) {
        upgradeEnvToYml(".env.web", "web.config.yml")
    }
    if (fs.existsSync("docker.env")) {
        upgradeEnvToYml("docker.env", "docker.config.yml")
    }
    console.log("upgradeEnvToYml ok")

    // 生成install.lock
    await fse.ensureFile("install.lock");
}

exports.up = function (knex, Promise) {
    return Promise.all([
        update()
    ])
};

exports.down = function (knex, Promise) {

};
