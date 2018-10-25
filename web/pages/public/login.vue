<template>
    <el-row>
        <el-col :span="12" :offset="2">
            <el-carousel height="520px">
                <el-carousel-item v-for="(item, index) in ads" :key="index">
                    <img :src="item.img_url" @click="go(item.url)" />
                </el-carousel-item>
            </el-carousel>
        </el-col>
        <el-col :span="8">
            <el-card shadow="never" style="height: 520px;margin-left: 6px;border: 1px solid #eee;" v-if="loginType == 'phone'">
                <el-row style="margin-left:  -20px;margin-right:  -20px;margin-top:  -20px;">
                    <el-col :span="10" style="color: #5195f1;margin-top: 30px;border-left: 3px solid #5195f1;padding-left: 30px;margin-bottom: 36px;height: 30px;line-height: 30px;font-size: 24px;">登录</el-col>
                    <el-col :span="14" @click.native="showScanLogin">
                        <span class="rt_text">扫描二维码登陆</span>
                        <i class="r_jt"></i>
                        <img class="rh_img" src="/assets/scan.png" alt="">
                        <span class="bg_fff"></span>
                        <i class="scanimg"></i>
                    </el-col>
                </el-row>

                <el-form :model="login">
                    <el-form-item label="手机号">
                        <el-input type="text" v-model="login.phone" :maxlength="11" suffix-icon="el-icon-mobile-phone" placeholder="请输入手机号" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input type="password" v-model="login.password" placeholder="请输入密码" suffix-icon="el-icon-message" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码">
                        <el-input type="text" v-model="login.captcha" placeholder="请输入验证码" auto-complete="off">
                            <i class="captchaImagelogin" slot="suffix" v-html="captchaSvg" @click="getCaptcha"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width: 100%" @click="onLogin">登录</el-button>
                    </el-form-item>
                </el-form>
                <el-row style="color:#515151">
                    <el-col :span="6">
                        <span @click="goPassword" style="cursor: pointer;">忘记密码?</span>
                    </el-col>
                    <el-col :span="6" :offset="12" style="text-align: right">
                        <span @click="goRegister" style="cursor: pointer;">立即注册</span>
                    </el-col>
                </el-row>
            </el-card>
            <el-card shadow="never" style="height: 520px;margin-left: 6px;border: 1px solid #eee;" v-else>
                <el-row style="margin-left:  -20px;margin-right:  -20px;margin-top:  -20px;">
                    <el-col :span="10" style="color: #5195f1;margin-top: 30px;border-left: 3px solid #5195f1;padding-left: 30px;margin-bottom: 36px;height: 30px;line-height: 30px;font-size: 24px;">登录</el-col>
                    <el-col :span="14" @click.native="showPhoneLogin">
                        <span class="rt_text">账号登录点击这里</span>
                        <i class="r_jt"></i>
                        <img class="rh_img" src="/assets/television-screen.png" alt="">
                        <span class="bg_fff"></span>
                        <i class="scanimg"></i>
                    </el-col>
                </el-row>
                <el-row style="text-align:center">
                    <img :src="getQrcodeUrl()" alt="" style="width:180px;height:180px;margin:30px auto">
                    <div>微信扫描二维码登录</div>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import uuid from "uuid";
export default {
    layout: "public",
    data() {
        return {
            loginType: "phone",
            login: {
                phone: "",
                password: "",
                captcha: "",
                captchaUuid: ""
            },
            captchaSvg: "",
            ads: [],
            agent: true
        };
    },
    async asyncData({ app }) {
        const captcha = await app.$axios.$get("/api/app/home/public/captcha");
        const ads = await app.$axios.$get("/api/app/home/public/ads");

        return {
            captchaSvg: captcha.data.svg,
            login: {
                captchaUuid: captcha.data.uuid
            },
            uid: uuid(),
            ads: ads.data
        };
    },
    mounted() {
        this.$cookies.remove("Token", {
            path: "/"
        });
        this.$cookies.remove("AppToken", {
            path: "/"
        });
        this.$cookies.remove("custom", {
            path: "/"
        });
        this.agent = this.isAgent();
        this.$bus.on("flag", res => {
            if (res == "login") {
                this.showPhoneLogin();
            } else {
                this.showScanLogin();
            }
        });
    },
    methods: {
        getQrcodeUrl() {
            return `/api/app/home/public/wxQrcodeLogin?uid=${this.uid}`;
        },
        socketConnect() {
            this.socket = io.connect(this.getUrl(`?uid=${this.uid}`));
            this.socket.on("wxLoginSuccess", data => {
                if (data.event === "login") {
                    this.$store.commit("SET_CUSTOM", data.custom);
                    this.$cookies.set("custom", data.custom, {
                        path: "/",
                        maxAge: 60 * 60 * 24 * 7
                    });
                    this.$cookies.set("Token", data.token, {
                        path: "/",
                        maxAge: 60 * 60 * 24 * 7
                    });
                    this.$router.push("/app/apps");
                }
                if (data.event === "register") {
                    this.$cookies.set("wxUserToken", data.wxUserToken, {
                        path: "/",
                        maxAge: 60 * 60 * 24 * 7
                    });
                    this.$router.push("/public/register");
                }
            });
        },
        showScanLogin() {
            this.loginType = "qrcode";
            this.socketConnect();
        },
        showPhoneLogin() {
            this.loginType = "phone";
        },
        async goRegister() {
            // if (!this.agent) {
            this.showScanLogin();
            // } else {
            //     this.$router.push("/public/register");
            // }
        },
        async goPassword() {
            this.$router.push("/public/forget_pwd");
        },
        async onLogin() {
            if (!this.login.phone) {
                this.$message.error("请输手机号");
                return;
            }
            if (this.login.phone.length !== 11) {
                this.$message.error("手机号输入有误");
                return;
            }
            if (!this.login.password) {
                this.$message.error("请输入密码");
                return;
            }
            if (!this.login.captcha) {
                this.$message.error("请输入验证码");
                return;
            }

            const login = await this.$axios.$post(
                "/api/app/home/public/login",
                {
                    phone: this.login.phone,
                    password: this.login.password,
                    captcha: this.login.captcha,
                    captchaUuid: this.login.captchaUuid
                }
            );
            if (login && login.errmsg === "ok") {
                this.$message({
                    message: "登录成功",
                    type: "success"
                });
                this.$store.commit("SET_CUSTOM", login.data.custom);
                this.$cookies.set("custom", login.data.custom, {
                    path: "/",
                    maxAge: 60 * 60 * 24 * 7
                });
                this.$cookies.set("Token", login.data.token, {
                    path: "/",
                    maxAge: 60 * 60 * 24 * 7
                });
                this.$router.push("/app/apps");
            } else {
                this.getCaptcha();
            }
        },
        async getCaptcha() {
            const captcha = await this.$axios.$get(
                "/api/app/home/public/captcha"
            );
            this.captchaSvg = captcha.data.svg;
            this.login.captchaUuid = captcha.data.uuid;
        }
    }
};
</script>

<style scoped>
.rh_img {
    width: 46px;
    height: 46px;
    position: absolute;
    top: 10px;
    right: 11px;
    z-index: 1;
}

.r_jt {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-top: 1px solid #5095f1;
    border-right: 1px solid #5095f1;
    background: #fff;
    position: absolute;
    top: 43px;
    right: 57px;
    transform: rotate(44deg);
    z-index: 11;
}

.bg_fff {
    display: inline-block;
    width: 0;
    height: 0;
    border-width: 48px;
    border-style: solid;
    border-color: #fff transparent transparent transparent;
    transform: rotate(46deg);
    position: absolute;
    top: 18px;
    right: 22px;
    z-index: 10;
}

.scanimg {
    display: inline-block;
    width: 0;
    height: 0;
    border-width: 48px;
    border-style: solid;
    border-color: #eaf4fe transparent transparent transparent;
    transform: rotate(-135deg);
    position: absolute;
    top: -48px;
    right: -48px;
}

.rt_text {
    display: inline-block;
    width: 122px;
    height: 32px;
    font-size: 12px;
    line-height: 32px;
    color: #39f;
    border: 1px solid #39f;
    margin: 30px 60px 0 0;
    text-align: center;
    position: absolute;
    right: 0;
    z-index: 11;
}

.rt_text:hover {
    color: #5cadff;
    border-color: #5cadff;
}
</style>
