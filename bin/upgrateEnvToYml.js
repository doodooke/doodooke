#!/usr/bin/env node

const fs = require("fs");
const yaml = require("js-yaml");
const dotenv = require("dotenv");
const _ = require("lodash");

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

if (fs.existsSync(".env")) {
    upgradeEnvToYml(".env", "config.yml")
}
if (fs.existsSync(".env.web")) {
    upgradeEnvToYml(".env.web", "web.config.yml")
}
if (fs.existsSync("docker.env")) {
    upgradeEnvToYml("docker.env", "docker.config.yml")
}
console.log("ok")