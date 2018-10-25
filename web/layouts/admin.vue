<template>
    <div id="layout">
        <qingful-header>
            <el-col slot="right" :span="3" :offset="17">
                <el-row style="color: #657180;font-size:14px;text-align: right;">
                    <el-dropdown placement="bottom">
                        <img :src="getAvaterUrl($store.state.custom.avater_url)" style="width:30px;height:30px;border-radius:50%;margin-top: 20px;">
                        <el-dropdown-menu slot="dropdown" style="width:100px">
                            <el-dropdown-item style="text-align:center" disabled>
                                <img :src="getAvaterUrl($store.state.custom.avater_url)" style="width:30px;height:30px;border-radius:50%;margin-top:10px;">
                            </el-dropdown-item>
                            <el-dropdown-item class="text_ellipsis" style="width:100%;text-align:center;color: #606266;margin-top:-6px;" disabled>{{$cookies.get("admin")}}</el-dropdown-item>
                            <el-dropdown-item divided @click.native="go('/admin/public/login')">
                                退出登录
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-row>
            </el-col>
        </qingful-header>

        <div style="width: 1200px;margin: 0 auto;margin-top: 40px;min-height:500px;">
            <qingful-dashboard :menu="menu">
                <nuxt/>
            </qingful-dashboard>
        </div>

        <qingful-footer></qingful-footer>
        <!-- 返回顶部 -->
        <qingful-gotop></qingful-gotop>
    </div>
</template>

<script>
import Header from "./../components/Header.vue";
import Dashboard from "./../components/Dashboard.vue";
import Footer from "./../components/Footer.vue";
import GoTop from "../components/GoTop.vue";
export default {
    components: {
        "qingful-header": Header,
        "qingful-footer": Footer,
        "qingful-dashboard": Dashboard,
        "qingful-gotop": GoTop
    },
    data() {
        return {
            menu: []
        };
    },
    async mounted() {
        const res = await this.$axios.$get("/api/admin/table/index");
        if (res && res.errmsg === "ok") {
            for (let key in res.data) {
                if (res.data[key].Comment) {
                    this.menu.push({
                        name: res.data[key].Comment,
                        icon: "icon-dingdan",
                        url: `/admin/table/${res.data[key].Name}`
                    });
                }
            }
        }
    }
};
</script>
