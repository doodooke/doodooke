<template>
    <div id="layout">

        <qingful-header>
            <el-col slot="right" :span="3" :offset="17">
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

    </div>
</template>

<script>
import Header from "./../components/Header.vue";
import HeaderDiy from "./../components/HeaderDiy.vue";
import HeaderCustom from "./../components/HeaderCustom.vue";
import Dashboard from "./../components/Dashboard.vue";
import Footer from "./../components/Footer.vue";
import GoTop from "../components/GoTop.vue";
export default {
    components: {
        "qingful-header": Header,
        "qingful-footer": Footer,
        "qingful-header-diy": HeaderDiy,
        "qingful-header-custom": HeaderCustom,
        "qingful-dashboard": Dashboard,
        "qingful-gotop": GoTop
    },
    data() {
        return {
            menu: [
                {
                    name: "首页",
                    icon: "icon-gaishu1",
                    url: "/agent/dashboard"
                },
                {
                    name: "代理商配置",
                    icon: "icon-shezhi",
                    url: "/agent/config"
                },
                {
                    name: "网站配置",
                    icon: "icon-shezhi",
                    url: "/agent/envweb"
                },
                {
                    name: "短信",
                    icon: "icon-duanxin",
                    url: "/agent/sms"
                },
                {
                    name: "应用",
                    icon: "icon-yingyong",
                    url: "/agent/app"
                },
                {
                    name: "报表",
                    icon: "icon-tongji",
                    url: "/agent/log"
                },
                {
                    name: "下级代理商",
                    icon: "icon-kehu",
                    url: "/agent/agent"
                }
            ]
        };
    },
    async mounted() {
        if (this.$store.state.custom.flag === 2) {
            this.menu.push({
                name: "所有代理商",
                icon: "icon-dingdan",
                url: "/agent/log"
            });
        }
    }
};
</script>

