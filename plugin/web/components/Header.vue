<template>
    <el-row style="min-width:1200px;height: 70px;border-bottom: 1px solid hsla(0, 0%, 63%, .1);transition: all .2s ease-in-out;background-color:#ffffff;border-color:#ffffff">

        <el-row style="width: 1200px;margin:0 auto;">
            <!-- logo -->
            <el-col :span="4">
                <img src="/api/app/home/public/logo" style="height: 40px;margin-top: 15px;float: left" @click="clickLogo" />
            </el-col>

            <!-- 装修设置 -->
            <slot name="center"></slot>
            <!-- 登录注册 -->
            <slot name="right"></slot>
        </el-row>

    </el-row>
</template>
<script>
export default {
    methods: {
        clickLogo() {
            if (!this.$cookies.get("Token") || !this.$cookies.get("AppToken")) {
                return;
            }
            let layout = this.$cookies.get("layout");
            switch (layout) {
                case "diy":
                    this.$cookies.set("header", "首页", {
                        path: "/",
                        maxAge: 60 * 10
                    });
                    this.$router.push("/app/dashboard");
                    break;
                case "shop":
                    this.$cookies.set("header", "首页", {
                        path: "/",
                        maxAge: 60 * 10
                    });
                    this.$router.push("/app/dashboard");
                    break;
                case "agent":
                    this.$cookies.set("header", "首页", {
                        path: "/",
                        maxAge: 60 * 10
                    });
                    this.$router.push("/agent/dashboard");
                    break;
                default:
                    this.$router.push("/");
                    break;
            }
        }
    }
};
</script>

