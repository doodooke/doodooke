<template>
    <div v-loading="loading" element-loading-text="正在下载中">
        <iframe id="myIframe" :src="src" scrolling="auto" frameborder="0" style="min-width:1200px;width:100%;background-color:#ffffff;"></iframe>
    </div>
</template>
<script>
export default {
    layout: "plugin",
    data() {
        return {
            loading: false,
            src: "https://www.doodooke.com/addon"
        };
    },
    mounted() {
        this.changeFrameHeight();

        this.src += `?hostUrl=${location.origin}`;

        if (this.$route.query.jump === "user") {
            this.src = "https://www.doodooke.com/addon/user/order";
        }
        window.addEventListener(
            "message",
            async e => {
                let data = e.data;

                //获取更新模块
                if (data.type == "module") {
                    const modules = await this.$axios.$get(
                        `/api/admin/install/moduleVersion?Token=${data.token}`
                    );
                    if (modules && modules.errmsg === "ok") {
                        var iframeWin = document.getElementById("myIframe")
                            .contentWindow;
                        iframeWin.postMessage(modules.data, "*");
                    }
                }

                //下载 更新
                if (data.type == "doodooke" || data.type == "update") {
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
                            this.$message.warning(
                                data.type == "doodooke"
                                    ? "开始下载"
                                    : "开始更新"
                            );
                            this.loading = true;
                            let url =
                                data.type == "doodooke"
                                    ? `/api/admin/install/installModule?module=${
                                          data.name
                                      }&Token=${
                                          data.token
                                      }&securityCode=${value.trim()}`
                                    : `/api/admin/install/updateModule?cid=${
                                          data.cid
                                      }&pid=${data.pid}&Token=${
                                          data.token
                                      }&securityCode=${value.trim()}`;

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
</style>

