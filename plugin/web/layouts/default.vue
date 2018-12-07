<template>
    <div id="layout">

        <qingful-header>
            <el-col slot="center" :span="6" :offset="5">
                <el-row style="line-height:70px;text-align:center">
                    <el-col :span="24" v-if="$store.state.custom.group_id === 3" @click.native="toAgent">
                        <router-link to="/agent/dashboard">
                            <i class="el-icon-document"></i> 代理商</router-link>
                    </el-col>
                    <el-col :span="24" v-if="$store.state.custom.group_id === 2">
                        <router-link to="/addon/user/admin">
                            <i class="el-icon-document"></i> 开发者</router-link>
                    </el-col>
                </el-row>
                &nbsp;
            </el-col>

            <el-col slot="right" :span="3" :offset="6">
                <qingful-header-custom></qingful-header-custom>
            </el-col>
        </qingful-header>

        <div style="width: 1200px;margin: 0 auto;margin-top: 40px;min-height:500px;">
            <nuxt />
        </div>

        <qingful-footer></qingful-footer>

    </div>
</template>

<script>
import Header from "./../components/Header.vue";
import HeaderCustom from "./../components/HeaderCustom.vue";
import Footer from "./../components/Footer.vue";
export default {
    head() {
        return {
            title: this.$store.state.env.HEAD_TITLE,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.$store.state.env.HEAD_META_DESCRIPTION
                },
                {
                    hid: "keywords",
                    name: "keywords",
                    content: this.$store.state.env.HEAD_META_KEYWORDS
                }
            ]
        };
    },
    components: {
        "qingful-header": Header,
        "qingful-footer": Footer,
        "qingful-header-custom": HeaderCustom
    },
    methods: {
        toAgent() {
            this.$cookies.set("header", "首页", {
                path: "/",
                maxAge: 60 * 60 * 24 * 7
            });
        }
    }
};
</script>

