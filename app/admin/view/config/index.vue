<template>
  <el-row style="padding-right:50px">
    <el-row>
      <el-row class="title">七牛云</el-row>
      <el-form label-width="130px">
        <el-form-item label="AccessKey">
          <el-input v-model="form.QINIU_ACCESSKEY" placeholder="QINIU_ACCESSKEY"></el-input>
        </el-form-item>
        <el-form-item label="SecretKey">
          <el-input v-model="form.QINIU_SECRETKEY" placeholder="QINIU_SECRETKEY"></el-input>
        </el-form-item>
        <el-form-item label="存储空间名">
          <el-input v-model="form.QINIU_BUCKET" placeholder="QINIU_BUCKET"></el-input>
        </el-form-item>
        <el-form-item label="存储域名">
          <el-input v-model="form.QINIU_DOMAIN" placeholder="QINIU_DOMAIN"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="title">分页</el-row>
      <el-form label-width="130px">
        <el-form-item label="分页">
          <el-input v-model="form.PAGE_SIZE" placeholder="PAGE_SIZE"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="title">admin端登陆页logo</el-row>
      <el-form label-width="130px">
        <el-form-item label="logo">
          <el-input value="/assets/logo.png" readonly></el-input>
          <div>
            修改admin端登陆页logo plugin/web/static/assets/logo.png 102x40
            可直接把plugin/web/static/assets/目录下的内容拷贝到www/assets/下修改,防止升级文件覆盖
          </div>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row :span="24" style="padding-left:130px">
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-row>
  </el-row>
</template>

<script>
export default {
    layout: "admin",
    data() {
        return {
            form: {}
        };
    },
    async asyncData({ app }) {
        let data = {};
        data.form = {
            QINIU_ACCESSKEY: "",
            QINIU_SECRETKEY: "",
            QINIU_BUCKET: "",
            QINIU_DOMAIN: "",
            PAGE_SIZE: ""
        };
        let names = [];
        for (let key in data.form) {
            names.push(key);
        }
        const res = await app.$axios.$get(
            `/api/admin/config/index?names=${names.join()}`
        );
        if (res && res.errmsg === "ok" && Object.keys(res.data).length != 0) {
            data.form = res.data;
            data.form.QINIU = data.form.QINIU == 1 ? true : false;
        }
        return data;
    },
    methods: {
        async onSubmit() {
            const res = await this.$axios.$post("/api/admin/config/add", this.form);
            if (res && res.errmsg === "ok") {
                this.$message.success("保存成功");
            }
        }
    }
};
</script>
<style scoped>
.title {
    padding: 10px 20px;
    margin-bottom: 20px;
    font-weight: 500;
    background: #f8f8f8;
}
</style>