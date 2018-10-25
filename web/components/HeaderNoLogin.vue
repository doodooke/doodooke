<template>
    <el-row style="height: 70px;line-height: 70px;color: #657180;font-size:14px;text-align: right;">
        <el-col :span="12" @click.native="login">
            <router-link to="/public/login" style="color: #657180;">登录</router-link>
        </el-col>
        <el-col :span="12" @click.native="register">
            <router-link to="/public/login" style="color: #657180;">注册</router-link>
        </el-col>
    </el-row>
</template>
<script>
export default {
    methods: {
        login() {
            this.$bus.emit("flag", "login");
        },
        register() {
            this.$bus.emit("flag", "register");
        }
    }
};
</script>

