<template>
    <div id="layout">

        <qingful-header>
            <el-col slot="center" :span="14" :offset="3">
                <qingful-header-diy></qingful-header-diy>
            </el-col>

            <el-col slot="right" :span="3">
                <qingful-header-custom></qingful-header-custom>
            </el-col>
        </qingful-header>

        <div style="width: 1200px;margin: 0 auto;margin-top: 40px;min-height:500px;">

            <qingful-dashboard :menu="menu">
                <nuxt />
            </qingful-dashboard>
        </div>

        <qingful-footer></qingful-footer>
        <qingful-gotop></qingful-gotop>
        <qingful-pay-dialog></qingful-pay-dialog>
        <qingful-update-dialog></qingful-update-dialog>

    </div>
</template>

<script>
import Header from "./../components/Header.vue";
import HeaderDiy from "./../components/HeaderDiy.vue";
import HeaderCustom from "./../components/HeaderCustom.vue";
import Dashboard from "./../components/Dashboard.vue";
import Footer from "./../components/Footer.vue";
import GoTop from "../components/GoTop.vue";
import PayDialog from "../components/PayDialog.vue";
import UpdateDialog from "../components/UpdateDialog.vue";
export default {
    components: {
        "qingful-header": Header,
        "qingful-footer": Footer,
        "qingful-header-diy": HeaderDiy,
        "qingful-header-custom": HeaderCustom,
        "qingful-dashboard": Dashboard,
        "qingful-gotop": GoTop,
        "qingful-pay-dialog": PayDialog,
        "qingful-update-dialog": UpdateDialog
    },
    data() {
        return {
            menu: [
                {
                    name: "首页",
                    icon: "icon-gaishu1",
                    url: "/app/dashboard"
                },
                {
                    name: "集赞",
                    icon: "icon-dianzan1",
                    sub: [
                        {
                            name: "活动设置",
                            url: "/jizan/config"
                        }
                    ]
                },
                {
                    name: "社区",
                    icon: "icon-shequ",
                    sub: [
                        {
                            name: "社区配置",
                            url: "/bbs/config"
                        },
                        {
                            name: "社区话题",
                            url: "/bbs/topic"
                        },
                        {
                            name: "帖子列表",
                            url: "/bbs/post"
                        }
                    ]
                },
                {
                    name: "文章",
                    icon: "icon-wenzhang",
                    sub: [
                        {
                            name: "文章配置",
                            url: "/article/config"
                        },
                        {
                            name: "分类列表",
                            url: "/article/category"
                        },
                        {
                            name: "文章列表",
                            url: "/article"
                        }
                    ]
                },
                {
                    name: "表单",
                    icon: "icon-biaodan",
                    sub: [
                        {
                            name: "表单列表",
                            url: "/form"
                        }
                    ]
                },
                {
                    name: "营销",
                    icon: "",
                    img: "/assets/yingxiao.png",
                    marginTop: "40px",
                    url: "/app/ump"
                }
                // {
                //     name: "设置",
                //     icon: "icon-shezhi",
                //     url: "/home/app/addon/setting",
                // }
            ]
        };
    }
};
</script>