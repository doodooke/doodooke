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
            <nuxt />
        </div>

        <qingful-footer></qingful-footer>
        <qingful-gotop></qingful-gotop>
    </div>
</template>

<script>
import Header from "./../components/Header.vue";
import HeaderDiy from "./../components/HeaderDiy.vue";
import HeaderCustom from "./../components/HeaderCustom.vue";
import Footer from "./../components/Footer.vue";
import GoTop from "../components/GoTop.vue";
export default {
    components: {
        "qingful-header": Header,
        "qingful-footer": Footer,
        "qingful-header-diy": HeaderDiy,
        "qingful-header-custom": HeaderCustom,
        "qingful-gotop": GoTop
    },
    data() {
        return {};
    }
};
</script>

