const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const webConfig = dotenv.parse(fs.readFileSync(".env.web"));
module.exports = class extends doodoo.Controller {
    /**
     *
     * @api {get} /info/home/public/getEnvData 获取项目模版列表
     * @apiDescription 获取项目模版列表
     * @apiGroup info Home
     * @apiVersion 0.0.1
     *
     * @apiSuccess {Array} success 项目列表
     *
     * @apiSampleRequest /info/home/public/getEnvData
     *
     */
    async getEnvData() {
        if (
            fs.existsSync(path.resolve(__dirname, "../../../../install.lock"))
        ) {
            this.success({});
        } else {
            const configInfo = Object.assign({}, webConfig, process.env);
            this.success(configInfo);
        }
    }

    /**
     *
     * @api {post} /info/home/public/postEnv 获取项目模版列表
     * @apiDescription 获取项目模版列表
     * @apiGroup info Home
     * @apiVersion 0.0.1
     *
     * @apiSuccess {Array} success 项目列表
     *
     * @apiSampleRequest /info/home/public/postEnv
     *
     */
    async postEnv() {
        if (
            fs.existsSync(path.resolve(__dirname, "../../../../install.lock"))
        ) {
            return;
        }
        const data = this.post;
        const web_string = `
# www端域名
DOMAIN=${data.DOMAIN}
API_DOMAIN=${data.API_DOMAIN}
WWW_DOMAIN=${data.WWW_DOMAIN}

# 品牌
BRAND=${data.BRAND}
HEAD_TITLE=${data.HEAD_TITLE}
HEAD_META_DESCRIPTION=${data.HEAD_META_DESCRIPTION}
HEAD_META_KEYWORDS=${data.HEAD_META_KEYWORDS}

# 服务电话
TEL=${data.TEL}

#开店咨询
KAIDIAN_ZIXUN=${data.KAIDIAN_ZIXUN}

# 工作时间
WORK_TIME=${data.WORK_TIME}

# 服务咨询
FUWU_ZIXUN=${data.FUWU_ZIXUN}

# 公众号二维码 原始ID
WX_QRCODE_URL=${data.WX_QRCODE_URL}

# 微信客服 web/static/www/img/kefu/weixin.png 430x430
WX_KEFU=/www/img/kefu/weixin.png

# 修改admin端登陆页logo web/static/assets/logo.png 102x40
LOGO=/assets/logo.png

# qq链接
QQ_URL=${data.QQ_URL}

# weibo链接
WEIBO_URL=${data.WEIBO_URL}

# 客服消息接入美洽教程
MEIQIA_JIAOCHENG=${data.MEIQIA_JIAOCHENG}

# 修改浏览器左上角logo data/logo/www.png 102x40
# 修改小程序端版权 data/logo/wxa.png 330x120

COPYRIGHT=${data.COPYRIGHT}
ICP=豫ICP备16009619号
GONGAN_ICP=${data.GONGAN_ICP}

# 友情链接
LINK_NAME=${data.LINK_NAME}
LINK_URL=${data.LINK_URL}`;

        const string = `
# 应用配置
APP_PORT=${data.APP_PORT}
APP_HOST=${data.APP_HOST}
APP_PREFIX=/api
WWW_HOST=${data.WWW_HOST}

# 验证码
VERIFY_MAXIP=${data.VERIFY_MAXIP}
VERIFY_MAXPHONE=${data.VERIFY_MAXPHONE}

# MYSQL数据库链接
MYSQL=${data.MYSQL}
MYSQL_HOST=${data.MYSQL_HOST}
MYSQL_USER=${data.MYSQL_USER}
MYSQL_PASSWORD=${data.MYSQL_PASSWORD}
MYSQL_DATABASE=${data.MYSQL_DATABASE}
MYSQL_PORT=${data.MYSQL_PORT}
MYSQL_CHARSET=${data.MYSQL_CHARSET}

# REDIS链接
REDIS=${data.REDIS}
REDIS_HOST=${data.REDIS_HOST}
REDIS_PORT=${data.REDIS_PORT}
REDIS_PREFIX=${data.REDIS_PREFIX}

# 七牛云
QINIU=${data.QINIU}
QINIU_ACCESSKEY=${data.QINIU_ACCESSKEY}
QINIU_SECRETKEY=${data.QINIU_SECRETKEY}
QINIU_BUCKET=${data.QINIU_BUCKET}
QINIU_DOMAIN=${data.QINIU_DOMAIN}

# 分页
PAGE_SIZE=${data.PAGE_SIZE}

# jwt配置
JWT_SECRET=${data.JWT_SECRET}
JWT_EXPIRESIN=${data.JWT_EXPIRESIN}

# 微信开放平台
OPEN_APPID=${data.OPEN_APPID}
OPEN_APPSECRET=${data.OPEN_APPSECRET}
OPEN_TOKEN=${data.OPEN_TOKEN}
OPEN_ENCODINGAESKEY=${data.OPEN_ENCODINGAESKEY}

# 微信服务号
WX_APPID=${data.WX_APPID}
WX_APPSECRET=${data.WX_APPSECRET}
WX_TOKEN=${data.WX_TOKEN}
WX_ENCODINGAESKEY${data.WX_ENCODINGAESKEY}

# 支付宝支付
ALIPAY_ACCOUNT=${data.ALIPAY_ACCOUNT}
ALIPAY_PARTNER=${data.ALIPAY_PARTNER}
ALIPAY_KEY=${data.ALIPAY_KEY}

# 阿里云短信
ALISMS_APPKEY=${data.ALISMS_APPKEY}
ALISMS_APPSECRET=${data.ALISMS_APPSECRET}
ALISMS_FREE_SIGN_NAME=${data.ALISMS_FREE_SIGN_NAME}
ALISMS_TEMPLATE_CODE=${data.ALISMS_TEMPLATE_CODE}

# 常用命令
CMD_RESTART=${data.CMD_RESTART}
CMD_INSTALL=${data.CMD_INSTALL}
            `;
        await fs.writeFileSync(
            path.resolve(__dirname, "../../../../.env"),
            string
        );

        await fs.writeFileSync(
            path.resolve(__dirname, "../../../../.env.web"),
            web_string
        );

        // 创建文件
        await fs.writeFileSync(
            path.resolve(__dirname, "../../../../install.lock"),
            "系统信息配制完成"
        );

        if (data) {
            process.env = Object.assign(process.env, data);
        }

        console.log("process.env-->", process.env);
        this.success(process.env);
    }
};
