<template>
    <el-row>
        <qingful-header>
            <el-col slot="center" :span="12" :offset="this.$store.state.env.WWW_DOMAIN == 'www.doodooke.com'?3:4">
                <el-row style="line-height:70px;color: #222222;font-size: 14px;">
                    <el-col :span="4">
                        <a href="/" :style="{color:$route.path=='/portal'?'#fc5151':'#222'}">首页</a>
                    </el-col>
                    <el-col :span="4">
                        <el-dropdown trigger="hover" style="cursor:pointer">
                            <span class="el-dropdown-link" :style="{color:($route.path=='/portal/shop' || $route.path=='/portal/weizhan' || $route.path=='/portal/canyin')?'#fc5151':'#222'}">
                                产品
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown" style="width:100%;height:300px;border-radius:0;margin-left:-5px!important;margin-top:0px;box-shadow:none;">
                                <el-row style="width:1200px;margin:0 auto;margin-top:80px;">
                                    <el-col :span="8" @click.native="go('/portal/shop')">
                                        <el-row style="margin-left:78px;cursor:pointer">
                                            <el-col :span="5">
                                                <img src="/www/img/store3-icon.png" style="width:36px;height:36px;">
                                            </el-col>
                                            <el-col :span="16">
                                                <el-row style="font-size:16px;">
                                                    新零售
                                                </el-row>
                                                <el-row style="font-size:14px;color: #666666;">
                                                    打通线上线下
                                                </el-row>
                                            </el-col>
                                        </el-row>
                                    </el-col>

                                    <el-col :span="8" @click.native="go('/portal/diy')">
                                        <el-row style="margin-left:78px;cursor:pointer">
                                            <el-col :span="5">
                                                <img src="/www/img/wz3-icon.png" style="width:36px;height:36px;">
                                            </el-col>
                                            <el-col :span="16">
                                                <el-row style="font-size:16px;">
                                                    新微站
                                                </el-row>
                                                <el-row style="font-size:14px;color: #666666;">
                                                    让所有人DIY小程序
                                                </el-row>
                                            </el-col>
                                        </el-row>
                                    </el-col>

                                    <!-- <el-col :span="6" @click.native="go('/portal/canyin')">
                                        <el-row style="margin-left:78px;cursor:pointer">
                                            <el-col :span="5">
                                                <img src="/www/img/canyin3-icon.png" style="width:36px;height:36px;">
                                            </el-col>
                                            <el-col :span="16">
                                                <el-row style="font-size:16px;">
                                                    新餐饮
                                                </el-row>
                                                <el-row style="font-size:14px;color: #666666;">
                                                    让餐饮变得更简单
                                                </el-row>
                                            </el-col>
                                        </el-row>
                                    </el-col> -->

                                    <el-col :span="8">
                                        <el-row style="margin-left:78px;cursor:pointer">
                                            <el-col :span="5">
                                                <i class="el-icon-more" style="font-size:24px;color:#999999"></i>
                                            </el-col>
                                            <el-col :span="16">
                                                <el-row style="font-size:16px;">
                                                    更多
                                                </el-row>
                                                <el-row style="font-size:14px;color: #666666;">
                                                    敬请期待
                                                </el-row>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                    <!-- <el-col :span="4">
                        <a href="/portal/agent" :style="{color:$route.path=='/portal/agent'?'#fc5151':'#222'}">代理商</a>
                    </el-col> -->
                    <el-col :span="4" style="display:none">关于我们</el-col>
                    <el-col :span="4" v-if="this.$store.state.env.DOMAIN == 'www.doodooke.com'">
                        <a href="/addon" :style="{color:$route.path=='/cases'?'#fc5151':'#222'}">插件市场</a>
                    </el-col>
                    <el-col :span="4">
                        <a href="/portal/cases" :style="{color:$route.path=='/cases'?'#fc5151':'#222'}">行业模板</a>
                    </el-col>
                    <el-col :span="4">
                        <a href="/cms/cms" :style="{color:$route.path=='/cms/cms'?'#fc5151':'#222'}">商家社区</a>
                    </el-col>
                </el-row>
            </el-col>

            <el-col slot="right" :span="4" style="float: right;text-align: center;height: 70px;">
                <el-row style="line-height:70px;" v-if="!$store.state.custom.phone">
                    <el-col :span="12">
                        <el-button type="primary" style="height:32px;width:84px;border-radius:0;padding: 0;" @click="goLogin">立即登录</el-button>
                    </el-col>
                    <el-col :span="12">
                        <el-button style="height:32px;width:84px;border-radius:0;padding: 0;color: #3399ff;border-color:#3399ff" @click="goRegister">免费注册</el-button>
                    </el-col>
                </el-row>

                <el-row style="cursor:pointer" v-if="$store.state.custom.phone">
                    <el-dropdown>
                        <el-row style="line-height:70px;">
                            <el-col :span="4">
                                <img :src="getAvaterUrl($store.state.custom.avater_url)" style="float: right;height:24px;width:24px;border-radius:50%;margin-top:23px;" />
                            </el-col>
                            <el-col :span="18" style="color: rgb(34, 34, 34);font-size:14px;text-align:center">{{$store.state.custom.phone}}</el-col>
                            <el-col :span="2">
                                <i class="el-icon-arrow-down el-icon--right" style="font-size:14px;margin-left:0;"></i>
                            </el-col>
                        </el-row>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="go('/app/apps')">进入后台</el-dropdown-item>
                            <el-dropdown-item @click.native="go('/public/login')" divided>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-row>
            </el-col>
        </qingful-header>

        <nuxt></nuxt>

        <!-- 客服弹出框 -->
        <el-row class="kefu" :class="{'active':kefu}">
            <el-card style="width:100%;height:100%">
                <el-row style="float: right;cursor:pointer" @click.native="changeKefu">
                    <i class="el-icon-close" style="color:#bfbfbf;"></i>
                </el-row>
                <el-row style="color: #222222;margin-top:10px;">
                    联系我们
                </el-row>
                <el-row style="font-size: 28px;margin-top:6px;color: #222222;">
                    {{$store.state.env.TEL}}
                </el-row>
                <el-row style="margin-top:20px;font-size:14px;color: #666666;">
                    或者填写你的联系方式，我们会主动与你联系：
                </el-row>
                <el-row style="margin-top:16px;">
                    <el-form :model="kefuForm" id="kefu-form">
                        <el-form-item>
                            <el-input type="text" v-model="kefuForm.username" auto-complete="off" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input type="text" v-model="kefuForm.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input type="text" v-model="kefuForm.company" auto-complete="off" placeholder="请输入公司名称（选填）"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" style="width:100%;border-radius:3px;margin:10px 0 16px" @click="onSubmitContactUs">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-row>
                <el-row style="height: 2px;background-color:#dddee1;opacity:0.3">
                </el-row>
                <el-row style="text-align:center;margin-top:20px;">
                    <img :src="$store.state.env.WX_KEFU" style="width:126px;height:126px;">
                </el-row>
                <el-row style="margin-top:10px;text-align:center;font-size:14px;">
                    扫一扫 咨询微信客服
                </el-row>
            </el-card>
        </el-row>

        <!-- 客服按钮 -->
        <el-row style="position: fixed;bottom:130px;right:30px;z-index: 10;">
            <el-row @click.native="changeKefu" style="cursor:pointer;width:60px;height:60px;background-color: #3399ff;border-radius:50%;text-align: center;box-shadow: 0px 2px 4px 0px rgba(51, 153, 255, 0.5);">
                <i class="iconfont" style="font-size:48px;color:#ffffff;line-height: 60px;">&#xe779;</i>
            </el-row>
        </el-row>

        <!-- 底部 -->
        <el-row style="height:467px;background-color:#363c44;color:#ffffff;min-width:1200px;margin-top:-4px">
            <div style="width:1200px;margin:0 auto; ">
                <el-row style="margin-top:60px;text-align:center;height:244px; ">
                    <el-col :span="4 ">
                        <el-row style="font-size: 20px;margin-bottom:20px;font-weight:500 ">
                            产品
                        </el-row>
                        <el-row style="margin-top:20px;cursor:pointer" @click.native="go('/portal/shop')">
                            新零售
                        </el-row>
                        <!-- <el-row style="margin-top:20px;cursor:pointer" @click.native="go('/portal/canyin')">
                            新餐饮
                        </el-row> -->
                        <el-row style="margin-top:20px;cursor:pointer" @click.native="go('/portal/diy')">
                            新微站
                        </el-row>
                        <!-- <el-row style="margin-top:20px;cursor:pointer" @click.native="go('/portal/samecity')">
                            新同城
                        </el-row> -->
                    </el-col>
                    <el-col :span="8 ">
                        <el-row style="font-size: 20px;margin-bottom:20px;font-weight:500 ">
                            最新动态
                        </el-row>
                        <el-row style="margin-top:20px;cursor:pointer;text-align:left" class="text_ellipsis" v-for="(item,index) in recentArticle" :key="index">
                            <router-link :to="'/cms/article/'+item.pinyin" style="color:#fff">{{item.title}}</router-link>
                        </el-row>
                    </el-col>
                    <el-col :span="6 ">
                        <el-row style="font-size: 20px;margin-bottom:20px;font-weight:500 ">
                            联系我们
                        </el-row>
                        <el-row style="margin-top:20px ">
                            {{$store.state.env.KAIDIAN_ZIXUN}}
                        </el-row>
                        <el-row style="margin-top:20px ">
                            {{$store.state.env.WORK_TIME}}
                        </el-row>
                        <el-row style="margin-top:20px ">
                            <el-col :span="6" :offset="3">
                                <el-popover trigger="hover">
                                    <img style="width:140px;height:140px;" :src="$store.state.env.WX_QRCODE_URL">
                                    <i class="iconfont" style="font-size:60px;cursor:pointer" slot="reference">&#xe77b;</i>
                                </el-popover>
                            </el-col>
                            <el-col :span="6">
                                <a :href="$store.state.env.QQ_URL" target="_blank">
                                    <i class="iconfont" style="font-size:60px;cursor:pointer;color:#fff">&#xe76f;</i>
                                </a>
                            </el-col>
                            <el-col :span="6">
                                <a :href="$store.state.env.WEIBO_URL" target="_blank">
                                    <i class="iconfont" style="font-size:60px;cursor:pointer;color:#fff">&#xe77a;</i>
                                </a>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="6 ">
                        <el-row>
                            <img style="width:140px;height:140px;" :src="$store.state.env.WX_QRCODE_URL">
                        </el-row>
                        <el-row style="margin-top:24px;font-size: 28px;">
                            {{$store.state.env.TEL}}
                        </el-row>
                        <el-row style="margin-top:10px;">
                            {{$store.state.env.FUWU_ZIXUN}}
                        </el-row>
                    </el-col>
                </el-row>

                <el-row style="height:1px;background-color:#4c545d;margin-top:60px; ">
                </el-row>

                <el-row style="margin-top:30px;text-align:center;font-size: 14px;opacity:0.8">
                    <el-row>
                        {{$store.state.env.COPYRIGHT}} <a href="http://www.miitbeian.gov.cn/">{{$store.state.env.ICP}}</a>
                    </el-row>
                    <el-row>友情链接：
                        <a :href="$store.state.env.LINK_URL">{{$store.state.env.LINK_NAME}}</a> {{$store.state.env.GONGAN_ICP}} </el-row>
                </el-row>
            </div>
        </el-row>

        <!-- 返回顶部 -->
        <qingful-gotop></qingful-gotop>
    </el-row>
</template>

<script>
import Header from "./../components/Header.vue";
import Footer from "./../components/Footer.vue";
import HeaderNoLogin from "./../components/HeaderNoLogin.vue";
import GoTop from "../components/GoTop.vue";
export default {
    layout: "empty",
    components: {
        "qingful-header": Header,
        "qingful-footer": Footer,
        "qingful-header-nologin": HeaderNoLogin,
        "qingful-gotop": GoTop
    },
    data() {
        return {
            kefuForm: {
                username: "",
                phone: "",
                company: ""
            },
            kefu: false,
            recentArticle: []
        };
    },
    mounted() {
        this.getArticle();
    },
    methods: {
        goLogin() {
            this.$router.push("/public/login");
        },
        goRegister() {
            this.$router.push("/public/login");
        },
        changeKefu() {
            this.kefu = !this.kefu;
        },
        async onSubmitContactUs() {
            const form = await this.$axios.$post(
                "/api/cms/home/form/add",
                this.kefuForm
            );
            if (form && form.errmsg === "ok") {
                this.$message.success("提交成功");
                this.kefu = false;
                this.kefuForm = {};
            }
        },
        async getArticle() {
            //最新动态
            const recentArticle = await this.$axios.$get(
                "/api/cms/home/article/recent?limit=5"
            );
            if (recentArticle && recentArticle.errmsg === "ok") {
                this.recentArticle = recentArticle.data;
            }
        }
    }
};
</script>

<style scoped>
#kefu-form .el-form-item {
    margin-bottom: 10px;
}
.kefu {
    width: 288px;
    height: 630px;
    position: fixed;
    background-color: #ffffff;
    bottom: 60px;
    right: 114px;
    z-index: 10;
    transform: scale(0) translateY(-10px);
    transform-origin: right bottom;
    transition: all 0.3s ease;
    opacity: 0;
}
.kefu.active {
    transform: scale(1) translateY(-10px);
    opacity: 1;
}
</style>
