<template>
    <div v-loading="loading" element-loading-text="正在下载中">
        <iframe id="myIframe" :src="src" scrolling="auto" frameborder="0" style="min-width:1200px;width:100%;background-color:#ffffff;min-height:100vh;"></iframe>
    </div>
</template>
<script>
export default {
    layout: "empty",
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
                if (data.type !== "doodooke") {
                    return;
                }

                this.$prompt("请输入校验码", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消"
                })
                    .then(async ({ value }) => {
                        if (!value) {
                            this.$message.warning("请输入校验码");
                            return;
                        }
                        this.$message.warning("开始下载");
                        this.loading = true;
                        const res = await this.$axios.$get(
                            `/api/install/index/installModule?module=${
                                data.name
                            }&Token=${data.token}&securityCode=${value}`
                        );
                        if (res && res.errmsg === "ok") {
                            this.loading = false;
                            this.$message.success(res.data);
                        }
                    })
                    .catch(() => {});
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
body {
    overflow-y: hidden;
}
.el-loading-spinner {
    top: 200px;
}
</style>

