<template>
  <el-row>
    <el-row style="width:360px;margin:7% auto;">
      <el-row style="text-align:center;margin-bottom:32px">
        <img
          :src="$store.state.env.LOGO"
          alt=""
        >
      </el-row>
      <el-row class="login">
        <el-row style="text-align:center;margin:16px 0 16px">
          <span
            class="login-title"
            :class="type == 1?'login-type':''"
            @click="type = 1"
          >安全码登录</span>
          <span style="margin:0 16px;color:#606266">/</span>
          <span
            class="login-title"
            :class="type == 2?'login-type':''"
            @click="type = 2"
          >账号登录</span>
        </el-row>
        <el-form
          :model="login"
          v-if="type == 1"
        >
          <el-form-item label="安全码">
            <el-input
              v-model="login.code"
              placeholder="请输入安全码"
              auto-complete="off"
            >
              <i
                slot="suffix"
                class="iconfont icon-anquanma"
                style="font-size:18px"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width: 100%"
              @click="onLogin(1)"
            >登录</el-button>
          </el-form-item>
          <el-row style="font-size:13px;color:#909399;text-align:center;margin-top:84px">
            <span>还不知道安全码(SecurityCode) ？</span>
            <a
              :href="$store.state.env.QQ_URL"
              target="_blank"
            >联系客服</a>
          </el-row>
        </el-form>
        <el-form
          :model="login"
          v-if="type == 2"
        >
          <el-form-item label="用户名">
            <el-input
              type="text"
              v-model="login.nickname"
              suffix-icon="el-icon-mobile-phone"
              placeholder="请输入用户名"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              type="password"
              v-model="login.password"
              placeholder="请输入密码"
              suffix-icon="el-icon-view"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width: 100%"
              @click="onLogin(2)"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
export default {
    layout: "empty",
    data() {
        return {
            login: {
                nickname: "",
                password: "",
                captcha: "",
                captchaUuid: "",
                code: ""
            },
            captchaSvg: "",
            type: 1,
            menu: []
        };
    },
    async mounted() {
        this.$cookies.remove("Token", {
            path: "/"
        });
        const res = await this.$axios.$get("/api/admin/public/connectedMysql");
        if (res && res.errmsg === "error") {
            this.$confirm("数据库未连接", "提示", {
                type: "warning",
                showClose: false,
                closeOnClickModal: false,
                closeOnPressEscape: false,
                showCancelButton: false,
                showConfirmButton: false
            });
        }
    },
    methods: {
        async onLogin(type) {
            let data = {},
                url = "";

            if (type == 1) {
                if (!this.login.code) {
                    this.$message.error("请输入安全码");
                    return;
                }
                data.code = this.login.code;
                url = "/api/admin/public/codeLogin";
            } else {
                if (!this.login.nickname) {
                    this.$message.error("请输入用户名");
                    return;
                }
                if (!this.login.password) {
                    this.$message.error("请输入密码");
                    return;
                }
                data.nickname = this.login.nickname;
                data.password = this.login.password;
                url = "/api/admin/public/login";
            }

            const login = await this.$axios.$post(url, data);
            if (login && login.errmsg === "ok") {
                this.$message({
                    message: "登录成功",
                    type: "success"
                });
                this.$cookies.set(
                    "admin",
                    type == 1 ? "安全码" : this.login.nickname,
                    {
                        path: "/",
                        maxAge: 60 * 60 * 24 * 7
                    }
                );
                this.$cookies.set("Token", login.data.token, {
                    path: "/",
                    maxAge: 60 * 60 * 24 * 7
                });
                this.$cookies.set("header", "超管管理", {
                    path: "/",
                    maxAge: 60 * 60 * 24 * 7
                });
                const res = await this.$axios.$get("/api/admin/menu/index");
                if (res && res.errmsg === "ok") {
                    this.menu = res.data;
                    this.$cookies.set("homePage", this.menu[0].sub[0].url, {
                        path: "/",
                        maxAge: 60 * 60 * 24 * 7
                    });
                }
                this.$router.push(this.menu[0].sub[0].url);
            }
        }
    }
};
</script>

<style scoped>
.login {
    height: 360px;
    background: #fff;
    padding: 20px;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
}

.login-title {
    color: #606266;
    font-size: 16px;
    cursor: pointer;
}
.login-type {
    color: #303133;
    font-size: 20px;
    font-weight: 500;
}
</style>
