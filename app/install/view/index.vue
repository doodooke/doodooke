<template>
    <div v-loading="loading" element-loading-text="正在下载中">
        <iframe id="myIframe" :src="src" scrolling="no" frameborder="0" style="width:100%;min-width:1200px;height:3000px;background-color:#ffffff"></iframe>
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
                this.$message.warning("开始下载");
                this.loading = true;
                const res = await this.$axios.$get(
                    `/api/install/index/installModule?module=${
                        data.name
                    }&Token=${data.token}`
                );
                if (res && res.errmsg === "ok") {
                    this.loading = false;
                    this.$message.success(res.data);
                }
            },
            false
        );
    }
};
</script>
<style>
.el-loading-spinner {
    top: 200px;
}
</style>

