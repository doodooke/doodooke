<template>
    <el-row style="height: 70px;line-height: 70px;color: #657180;font-size:14px;text-align: right;">
        <el-col :span="12" @click.native="login">
            <div style="color: #657180;cursor:pointer">登录</div>
        </el-col>
        <el-col :span="12" @click.native="register">
            <div style="color: #657180;cursor:pointer">注册</div>
        </el-col>
    </el-row>
</template>
<script>
export default {
    methods: {
        login() {
            if (this.$route.path == "/public/login") {
                this.$router.push(this.$route.fullPath);
            } else {
                this.$router.push("/public/login");
            }
            this.$bus.emit("flag", "login");
        },
        register() {
            if (this.$route.path == "/public/login") {
                this.$router.push(this.$route.fullPath);
            } else {
                this.$router.push("/public/login");
            }
            this.$bus.emit("flag", "register");
        }
    }
};
</script>

