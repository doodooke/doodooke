const fs = require("fs");
const md5 = require("md5");
const yaml = require('js-yaml');
const _mysql = require('doodoo-plugin-mysql');
const _redis = require('doodoo-plugin-redis');
const shell = require("shelljs");
const _ = require("lodash");
const uuid = require("uuid/v4");

module.exports = class extends doodoo.Controller {

    async _init() {
        if (fs.existsSync("install.lock")) {
            this.fail("已经安装过，如需重新安装请删除代码根目录install.lock");
        }
    }
    /**
     *
     * @api {get} /install/public/setup1 安装环境检测
     * @apiDescription 安装环境检测
     * @apiGroup install
     * @apiVersion 0.0.1
     *
     *
     * @apiSampleRequest /install/public/setup1
     *
     */
    async setup1() {
        let file_app = false;
        try {
            fs.accessSync('app', fs.constants.R_OK | fs.constants.W_OK);
            file_app = true;
        } catch (err) {
            console.error('无权访问');
        }

        this.success({
            system: {
                node: process.version,
                platform: process.platform,
                cwd: process.cwd()
            },
            catalog: {
                app: file_app
            }
        });
    }

    /**
     *
     * @api {get} /install/public/setup2 参数配置
     * @apiDescription 参数配置
     * @apiGroup install
     * @apiVersion 0.0.1
     *
     *
     * @apiSampleRequest /install/public/setup2
     *
     */
    async setup2() {
        const {
            mysql,
            redis,
            admin_username,
            admin_password,
            confirm_password
        } = this.post;
        let newPwd = md5(admin_password);
        if (!admin_password || !admin_username || !confirm_password) {
            this.fail("请将信息填写完整");
            return;
        }
        if (admin_password !== confirm_password) {
            this.fail("密码和确认密码不一致");
            return;
        }
        const configData = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));
        const _configData = _.merge(configData, {
            mysql: mysql,
            redis: redis
        }, {
                mysql: {
                    charset: 'utf8mb4'
                },
                jwt: {
                    secret: uuid(),
                    expiresin: '7 days',
                    admin_secret: uuid(),
                    admin_expiresin: '7 days'
                }
            })
        const configYaml = yaml.safeDump(_configData, {
            indent: 4
        })
        fs.writeFileSync('config.yml', configYaml);
        fs.writeFileSync('install.lock', '');

        await _mysql({
            mysql: _.merge(mysql, {
                charset: 'utf8mb4'
            })
        });
        await _redis({ redis: redis })
        // 升级migrate
        shell.exec("./bin/migrate.js latest");

        await this.model("admin")
            .forge({
                nickname: admin_username,
                password: newPwd,
                status: 1
            })
            .save();

        for (let key in _configData) {
            for (let _key in _configData[key]) {
                process.env[_.toUpper(key) + "_" + _.toUpper(_key)] = _configData[key][_key]
            }
        }

        this.success();
    }

};
