<template>
    <el-dialog title="温馨提示" :visible.sync="modal" width="380px">
        <el-row style="margin-bottom:10px">您的小程序有新的版本，是否升级？</el-row>
        <span slot="footer" class="dialog-footer">
            <el-button @click="modal = false">取 消</el-button>
            <el-button type="primary" @click="updateSure">立即升级</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    data() {
        return {
            modal: false
        };
    },
    async mounted() {
        const res = await this.$axios.$get("/api/app/home/wxa/update/check");
        if (res && res.errmsg === "ok") {
            this.modal = res.data;
        }
    },
    methods: {
        async updateSure() {
            const res = await this.$axios.$get(
                `/api/app/home/wxa/update/execute`
            );
            if (res && res.errmsg === "ok") {
                this.$message.success("提交审核成功");
                this.modal = false;
            }
        }
    }
};
</script>

