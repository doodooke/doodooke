<template>
    <div>
        <el-card shadow="never">
            <div slot="header">系统配置</div>
            <el-tabs v-model="tabName" type="card">
                <el-tab-pane label="后端配置" name="first">
                    <el-row style="margin:24px 50px 50px;">
                        <el-col :span="11">
                            <el-row class="title">应用配置</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="端口号">
                                    <el-input v-model="form.APP_PORT" placeholder="APP_PORT"></el-input>
                                </el-form-item>
                                <el-form-item label="接口地址">
                                    <el-input v-model="form.APP_HOST" placeholder="APP_HOST"></el-input>
                                </el-form-item>
                                <el-form-item label="管理端地址">
                                    <el-input v-model="form.WWW_HOST" placeholder="WWW_HOST"></el-input>
                                </el-form-item>
                            </el-form>

                            <el-row class="title">验证码</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="最大ip限制">
                                    <el-input v-model="form.VERIFY_MAXIP" placeholder="VERIFY_MAXIP"></el-input>
                                </el-form-item>
                                <el-form-item label="最大个数限制">
                                    <el-input v-model="form.VERIFY_MAXPHONE" placeholder="VERIFY_MAXPHONE"></el-input>
                                </el-form-item>
                            </el-form>

                            <el-row class="title">MYSQL数据库链接</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="MYSQL">
                                    <el-switch v-model="form.MYSQL"></el-switch>
                                </el-form-item>
                                <el-form-item label="服务器地址">
                                    <el-input v-model="form.MYSQL_HOST" placeholder="MYSQL_HOST"></el-input>
                                </el-form-item>
                                <el-form-item label="用户名">
                                    <el-input v-model="form.MYSQL_USER" placeholder="MYSQL_USER"></el-input>
                                </el-form-item>
                                <el-form-item label="密码">
                                    <el-input v-model="form.MYSQL_PASSWORD" placeholder="MYSQL_PASSWORD"></el-input>
                                </el-form-item>
                                <el-form-item label="数据库名">
                                    <el-input v-model="form.MYSQL_DATABASE" placeholder="MYSQL_DATABASE"></el-input>
                                </el-form-item>
                                <el-form-item label="端口">
                                    <el-input v-model="form.MYSQL_PORT" placeholder="MYSQL_PORT"></el-input>
                                </el-form-item>
                                <el-form-item label="数据库编码">
                                    <el-input v-model="form.MYSQL_CHARSET" placeholder="MYSQL_CHARSET"></el-input>
                                </el-form-item>
                            </el-form>

                            <el-row class="title">七牛云</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="七牛云状态">
                                    <el-switch v-model="form.QINIU"></el-switch>
                                </el-form-item>
                                <el-form-item label="AccessKey">
                                    <el-input v-model="form.QINIU_ACCESSKEY" placeholder="QINIU_ACCESSKEY"></el-input>
                                </el-form-item>
                                <el-form-item label="SecretKey">
                                    <el-input v-model="form.QINIU_SECRETKEY" placeholder="QINIU_SECRETKEY"></el-input>
                                </el-form-item>
                                <el-form-item label="存储空间名">
                                    <el-input v-model="form.QINIU_BUCKET" placeholder="QINIU_BUCKET"></el-input>
                                </el-form-item>
                                <el-form-item label="存储域名">
                                    <el-input v-model="form.QINIU_DOMAIN" placeholder="QINIU_DOMAIN"></el-input>
                                </el-form-item>
                            </el-form>

                            <el-row class="title">支付宝支付</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="商户号">
                                    <el-input v-model="form.ALIPAY_ACCOUNT" placeholder="ALIPAY_ACCOUNT"></el-input>
                                </el-form-item>
                                <el-form-item label="合作身份者ID">
                                    <el-input v-model="form.ALIPAY_PARTNER" placeholder="ALIPAY_PARTNER"></el-input>
                                </el-form-item>
                                <el-form-item label="MD5密钥">
                                    <el-input v-model="form.ALIPAY_KEY" placeholder="ALIPAY_KEY"></el-input>
                                </el-form-item>
                            </el-form>

                            <el-row class="title">常用命令</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="重启">
                                    <el-input v-model="form.CMD_RESTART" placeholder="CMD_RESTART"></el-input>
                                </el-form-item>
                                <el-form-item label="安装">
                                    <el-input v-model="form.CMD_INSTALL" placeholder="CMD_INSTALL"></el-input>
                                </el-form-item>
                            </el-form>

                        </el-col>
                        <el-col :span="12" :offset="1">
                            <el-row class="title">REDIS链接</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="REDIS">
                                    <el-switch v-model="form.REDIS"></el-switch>
                                </el-form-item>
                                <el-form-item label="主机地址">
                                    <el-input v-model="form.REDIS_HOST" placeholder="REDIS_HOST"></el-input>
                                </el-form-item>
                                <el-form-item label="端口">
                                    <el-input v-model="form.REDIS_PORT" placeholder="REDIS_PORT"></el-input>
                                </el-form-item>
                                <el-form-item label="前缀">
                                    <el-input v-model="form.REDIS_PREFIX" placeholder="REDIS_PREFIX"></el-input>
                                </el-form-item>
                            </el-form>

                            <el-row class="title">分页</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="分页">
                                    <el-input v-model="form.PAGE_SIZE" placeholder="PAGE_SIZE"></el-input>
                                </el-form-item>
                            </el-form>

                            <el-row class="title">jwt配置</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="密钥">
                                    <el-input v-model="form.JWT_SECRET" placeholder="JWT_SECRET"></el-input>
                                </el-form-item>
                                <el-form-item label="过期时间">
                                    <el-input v-model="form.JWT_EXPIRESIN" placeholder="JWT_EXPIRESIN"></el-input>
                                </el-form-item>
                            </el-form>

                            <el-row class="title">微信开放平台</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="AppID">
                                    <el-input v-model="form.OPEN_APPID" placeholder="OPEN_APPID"></el-input>
                                </el-form-item>
                                <el-form-item label="AppSecret">
                                    <el-input v-model="form.OPEN_APPSECRET" placeholder="OPEN_APPSECRET"></el-input>
                                </el-form-item>
                                <el-form-item label="消息校验Token">
                                    <el-input v-model="form.OPEN_TOKEN" placeholder="OPEN_TOKEN"></el-input>
                                </el-form-item>
                                <el-form-item label="消息加解密Key">
                                    <el-input v-model="form.OPEN_ENCODINGAESKEY" placeholder="OPEN_ENCODINGAESKEY"></el-input>
                                </el-form-item>
                            </el-form>

                            <el-row class="title">微信服务号</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="开发者ID">
                                    <el-input v-model="form.WX_APPID" placeholder="WX_APPID"></el-input>
                                </el-form-item>
                                <el-form-item label="开发者密码">
                                    <el-input v-model="form.WX_APPSECRET" placeholder="WX_APPSECRET"></el-input>
                                </el-form-item>
                                <el-form-item label="令牌">
                                    <el-input v-model="form.WX_TOKEN" placeholder="WX_TOKEN"></el-input>
                                </el-form-item>
                                <el-form-item label="消息加解密密钥">
                                    <el-input v-model="form.WX_ENCODINGAESKEY" placeholder="WX_ENCODINGAESKEY"></el-input>
                                </el-form-item>
                            </el-form>

                            <el-row class="title">阿里云短信</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="AppKey">
                                    <el-input v-model="form.ALISMS_APPKEY" placeholder="ALISMS_APPKEY"></el-input>
                                </el-form-item>
                                <el-form-item label="AppSecret">
                                    <el-input v-model="form.ALISMS_APPSECRET" placeholder="ALISMS_APPSECRET"></el-input>
                                </el-form-item>
                                <el-form-item label="签名名称">
                                    <el-input v-model="form.ALISMS_FREE_SIGN_NAME" placeholder="ALISMS_FREE_SIGN_NAME"></el-input>
                                </el-form-item>
                                <el-form-item label="模版CODE">
                                    <el-input v-model="form.ALISMS_TEMPLATE_CODE" placeholder="ALISMS_TEMPLATE_CODE"></el-input>
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="24" style="padding-left:130px">
                            <el-button type="primary" @click="onSubmit">保存</el-button>
                        </el-col>
                    </el-row>

                </el-tab-pane>
                <el-tab-pane label="前端配置" name="second">
                    <el-row style="margin:24px 50px 50px;">
                        <el-col :span="11">
                            <el-row class="title">域名配置</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="域名">
                                    <el-input v-model="form.DOMAIN" placeholder="DOMAIN"></el-input>
                                </el-form-item>
                                <el-form-item label="API_DOMAIN">
                                    <el-input v-model="form.API_DOMAIN" placeholder="API_DOMAIN"></el-input>
                                </el-form-item>
                                <el-form-item label="WWW_DOMAIN">
                                    <el-input v-model="form.WWW_DOMAIN" placeholder="WWW_DOMAIN"></el-input>
                                </el-form-item>
                            </el-form>

                            <el-row class="title">品牌</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="品牌名称">
                                    <el-input v-model="form.BRAND" placeholder="BRAND"></el-input>
                                </el-form-item>
                                <el-form-item label="标题">
                                    <el-input v-model="form.HEAD_TITLE" placeholder="HEAD_TITLE"></el-input>
                                </el-form-item>
                                <el-form-item label="描述">
                                    <el-input v-model="form.HEAD_META_DESCRIPTION" placeholder="HEAD_META_DESCRIPTION"></el-input>
                                </el-form-item>
                                <el-form-item label="关键词">
                                    <el-input v-model="form.HEAD_META_KEYWORDS" placeholder="HEAD_META_KEYWORDS"></el-input>
                                </el-form-item>
                            </el-form>

                            <el-row class="title">服务电话</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="电话">
                                    <el-input v-model="form.TEL"></el-input>
                                </el-form-item>
                            </el-form>

                            <el-row class="title">开店咨询</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="开店咨询">
                                    <el-input v-model="form.KAIDIAN_ZIXUN"></el-input>
                                </el-form-item>
                            </el-form>

                            <el-row class="title">工作时间</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="工作时间">
                                    <el-input v-model="form.WORK_TIME" placeholder="WORK_TIME"></el-input>
                                </el-form-item>
                            </el-form>

                            <el-row class="title">服务咨询</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="服务咨询">
                                    <el-input v-model="form.FUWU_ZIXUN" placeholder="FUWU_ZIXUN"></el-input>
                                </el-form-item>
                            </el-form>

                            <el-row class="title">友情链接</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="链接名字">
                                    <el-input v-model="form.COPYRIGHT" placeholder="COPYRIGHT"></el-input>
                                </el-form-item>
                                <el-form-item label="链接路径">
                                    <el-input v-model="form.LINK_URL" placeholder="LINK_URL"></el-input>
                                </el-form-item>
                            </el-form>

                        </el-col>
                        <el-col :span="12" :offset="1">
                            <el-row class="title">公众号二维码</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="原始ID">
                                    <el-input v-model="form.WX_QRCODE_URL"></el-input>
                                </el-form-item>
                            </el-form>

                            <el-row class="title">微信客服</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="WX_KEFU">
                                    <el-input value="web/static/www/img/kefu/weixin.png 430x430" readonly></el-input>
                                </el-form-item>
                            </el-form>

                            <el-row class="title">admin端登陆页logo</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="logo">
                                    <el-input value="web/static/assets/logo.png 102x40" readonly></el-input>
                                </el-form-item>
                            </el-form>

                            <el-row class="title">qq链接</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="qq链接">
                                    <el-input v-model="form.QQ_URL" placeholder="QQ_URL"></el-input>
                                </el-form-item>
                            </el-form>

                            <el-row class="title">weibo链接</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="weibo链接">
                                    <el-input v-model="form.WEIBO_URL" placeholder="WEIBO_URL"></el-input>
                                </el-form-item>
                            </el-form>

                            <el-row class="title">客服消息接入美洽教程</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="美洽教程">
                                    <el-input v-model="form.MEIQIA_JIAOCHENG" placeholder="MEIQIA_JIAOCHENG"></el-input>
                                </el-form-item>
                            </el-form>

                            <el-row class="title">logo</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="浏览器logo">
                                    <el-input value="data/logo/wxa.png 102x40" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="小程序版权logo">
                                    <el-input value="data/logo/wxa.png 330x120" readonly></el-input>
                                </el-form-item>
                            </el-form>

                            <el-row class="title">版权</el-row>
                            <el-form label-width="130px">
                                <el-form-item label="COPYRIGHT">
                                    <el-input v-model="form.COPYRIGHT" placeholder="COPYRIGHT"></el-input>
                                </el-form-item>
                                <el-form-item label="ICP">
                                    <el-input v-model="form.ICP" placeholder="ICP"></el-input>
                                </el-form-item>
                                <el-form-item label="GONGAN_ICP">
                                    <el-input v-model="form.GONGAN_ICP" placeholder="GONGAN_ICP"></el-input>
                                </el-form-item>
                            </el-form>

                        </el-col>
                        <el-col :span="24" style="padding-left:130px">
                            <el-button type="primary" @click="onSubmit">保存</el-button>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tabName: "first",
            form: {
                APP_PORT: "",
                APP_HOST: "",
                WWW_HOST: "",
                VERIFY_MAXIP: "",
                VERIFY_MAXPHONE: "",
                MYSQL: true,
                MYSQL_HOST: "",
                MYSQL_USER: "",
                MYSQL_PASSWORD: "",
                MYSQL_DATABASE: "",
                MYSQL_PORT: "",
                MYSQL_CHARSET: "",
                REDIS: true,
                REDIS_HOST: "",
                REDIS_PORT: "",
                REDIS_PREFIX: "",
                QINIU: true,
                QINIU_ACCESSKEY: "",
                QINIU_SECRETKEY: "",
                QINIU_BUCKET: "",
                QINIU_DOMAIN: "",
                PAGE_SIZE: "",
                JWT_SECRET: "",
                JWT_EXPIRESIN: "",
                OPEN_APPID: "",
                OPEN_APPSECRET: "",
                OPEN_TOKEN: "",
                OPEN_ENCODINGAESKEY: "",
                WX_APPID: "",
                WX_APPSECRET: "",
                WX_TOKEN: "",
                WX_ENCODINGAESKEY: "",
                ALIPAY_ACCOUNT: "",
                ALIPAY_PARTNER: "",
                ALIPAY_KEY: "",
                ALISMS_APPKEY: "",
                ALISMS_APPSECRET: "",
                ALISMS_FREE_SIGN_NAME: "",
                ALISMS_TEMPLATE_CODE: "",

                DOMAIN: "",
                API_DOMAIN: "",
                WWW_DOMAIN: "",
                BRAND: "",
                HEAD_TITLE: "",
                HEAD_META_DESCRIPTION: "",
                HEAD_META_KEYWORDS: "",
                TEL: "",
                KAIDIAN_ZIXUN: "",
                WORK_TIME: "",
                FUWU_ZIXUN: "",
                WX_QRCODE_URL: "",
                QQ_URL: "",
                WEIBO_URL: "",
                MEIQIA_JIAOCHENG: "",
                COPYRIGHT: "",
                ICP: "",
                GONGAN_ICP: "",
                LINK_NAME: "",
                LINK_URL: "",
                CMD_RESTART: "",
                CMD_INSTALL: ""
            }
        };
    },
    async asyncData({ app }) {
        let data = {};
        const res = await app.$axios.$get(
            "/api/install/home/public/getEnvData"
        );
        if (res && res.errmsg === "ok" && Object.keys(res.data).length != 0) {
            data.form = res.data;
            data.form.MYSQL = data.form.MYSQL == "true" ? true : false;
            data.form.REDIS = data.form.REDIS == "true" ? true : false;
            data.form.QINIU = data.form.QINIU == "true" ? true : false;
        }
        return data;
    },
    methods: {
        async onSubmit() {
            const res = await this.$axios.$post(
                "/api/install/home/public/postEnv",
                this.form
            );

            if (res && res.errmsg === "ok") {
                this.$router.push("/system");
            }
        }
    }
};
</script>
<style scoped>
.title {
    padding: 10px 20px;
    margin-bottom: 20px;
    font-weight: 500;
    background: #f8f8f8;
}
</style>
