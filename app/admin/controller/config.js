const base = require("./base");
const _ = require("lodash");
const yaml = require('js-yaml');
const fs = require('fs');

module.exports = class extends base {
    async _initialize() {
        await super.isAdminAuth();
    }

    /**
     *
     * @api {get} /admin/config/index 获取配置
     * @apiDescription 获取配置
     * @apiGroup admin Config
     * @apiVersion 0.0.1
     *
     * @apiHeader {String} Token 用户登录授权token.
     * @apiParam {String} names 字段名
     *
     * @apiSuccess {Object} success 
     *
     * @apiSampleRequest /admin/config/index
     *
     */
    async index() {
        const { names } = this.query;
        const _names = names.split(",")
        const _env = {};
        for (const key in _names) {
            _env[_names[key]] = process.env[_names[key]]
        }

        this.success(_env);
    }

    /**
     *
     * @api {get} /admin/config/add 修改配置
     * @apiDescription 修改配置
     * @apiGroup admin Config
     * @apiVersion 0.0.1
     *
     * @apiHeader {String} Token 用户登录授权token.
     *
     * @apiSuccess {Object} success 
     *
     * @apiSampleRequest /admin/config/add
     *
     */
    async add() {
        const data = this.post;
        const configData = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));
        for (const key in data) {
            process.env[key] = data[key];

            _.set(configData, _.toLower(key).replace("_", "."), data[key])
        }

        const configYaml = yaml.safeDump(configData, {
            indent: 4
        })
        fs.writeFileSync('config.yml', configYaml);

        this.success();
    }
};
