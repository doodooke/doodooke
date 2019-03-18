<template>
  <div v-loading="loading" element-loading-text="正在下载中">
    <iframe
      id="myIframe"
      :src="src"
      scrolling="auto"
      frameborder="0"
      style="min-width:1200px;width:100%;background-color:#ffffff;"
    ></iframe>
  </div>
</template>
<script>
import layout from "../../components/layout.vue";
export default {
    layout: "empty",
    data() {
        return {
            loading: false,
            src: "https://www.doodooke.com/market"
        };
    },
    mounted() {
        this.changeFrameHeight();

        this.src += `?hostUrl=${location.origin}`;

        if (this.$route.query.jump === "user") {
            this.src = "https://www.doodooke.com/market/user/order";
        }
        window.addEventListener(
            "message",
            async e => {
                let data = e.data;

                if (e.data.type == "homePage") {
                    layout.methods.homePage.call(this);
                    return;
                }
                if (e.data.type == "webBuild") {
                    layout.methods.webBuild.call(this);
                    return;
                }
                if (e.data.type == "reStart") {
                    layout.methods.reStart.call(this);
                    return;
                }
                if (e.data.type == "getLogs") {
                    let iframeWin = document.getElementById("myIframe")
                        .contentWindow;
                    iframeWin.postMessage("getLogs", "*");
                }
                if (e.data.type == "getPlugin") {
                    layout.methods.getPlugin.call(this);
                    return;
                }
                if (e.data.type == "getSecurityCode") {
                    let iframeWin = document.getElementById("myIframe")
                        .contentWindow;
                    iframeWin.postMessage("getSecurityCode", "*");
                }
                if (e.data.type == "debug") {
                    let iframeWin = document.getElementById("myIframe")
                        .contentWindow;
                    iframeWin.postMessage("debug", "*");
                }

                //下载 更新
                if (data.type == "doodooke") {
                    this.$prompt("请输入安全码 Security Code", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消"
                    })
                        .then(async ({ value }) => {
                            if (!value) {
                                this.$message.warning(
                                    "请输入安全码 Security Code"
                                );
                                return;
                            }
                            this.$message.warning("开始安装");
                            this.loading = true;
                            let url = `/api/admin/install/installModule?id=${
                                data.app_id
                            }&Token=${data.token}&securityCode=${value.trim()}`;
                            const res = await this.$axios.$get(url);
                            if (res && res.errmsg === "ok") {
                                this.loading = false;
                                this.$message.success(res.data);
                            } else {
                                this.loading = false;
                            }
                        })
                        .catch(() => {});
                }
            },
            false
        );
    },
    methods: {
        changeFrameHeight() {
            var ifm = document.getElementById("myIframe");
            ifm.height = document.documentElement.clientHeight;
        }
    }
};
</script>
<style>
.el-loading-spinner {
    top: 200px;
}
body {
    overflow: hidden;
}
</style>

