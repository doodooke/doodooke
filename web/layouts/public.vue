<template>
    <div id="layout">

        <qingful-header>
            <el-col slot="right" :span="2" :offset="18">
                <qingful-header-nologin></qingful-header-nologin>
            </el-col>
        </qingful-header>

        <div style="width: 1200px;margin: 0 auto;margin-top: 40px;min-height:500px;">
            <nuxt/>
        </div>

        <qingful-footer></qingful-footer>

    </div>
</template>

<script>
import Header from "./../components/Header.vue";
import HeaderNoLogin from "./../components/HeaderNoLogin.vue";
import Footer from "./../components/Footer.vue";
export default {
    components: {
        "qingful-header": Header,
        "qingful-header-nologin": HeaderNoLogin,
        "qingful-footer": Footer
    }
};
</script>
