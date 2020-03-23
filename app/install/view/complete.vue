<template>
    <el-row style="text-align:center">
        <img src="../www/complete.png" alt class="img" />
        <el-row class="text">恭喜您已安装完成，现在可以</el-row>
        <el-row>
            <el-button type="primary" class="btn-admin" @click="next">进入管理后台</el-button>
            <el-button type="primary" class="btn-buy" @click="buy">购买授权</el-button>
        </el-row>
    </el-row>
</template>
<script>
export default {
    layout: "install",
    data() {
        return {};
    },
    methods: {
        next() {
            this.$router.push("/admin/public/login");
        },
        buy() {
            window.open("https://www.doodooke.com/market");
        }
    }
};
</script>
<style scoped>
.img {
    width: 251px;
    margin-top: 114px;
}
.text {
    font-size: 14px;
    margin-top: 20px;
    margin-bottom: 60px;
}
.btn-admin {
    width: 124px;
    height: 36px;
    line-height: 12px;
}
.btn-buy {
    width: 124px;
    height: 36px;
    line-height: 12px;
    background: #fc4c4f;
    border-color: #fc4c4f;
}
</style>
