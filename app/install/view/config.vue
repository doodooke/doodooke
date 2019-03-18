<template>
  <el-row>
    <el-row style="font-weight:500;margin-bottom:28px;">数据库配置</el-row>
    <el-row style="padding:8px 20px;border:1px solid #ebeef5">
      <el-row style="color:#222;margin-bottom:16px">MySQL</el-row>
      <el-form label-width="100px" :model="mysql">
        <el-form-item label="数据库主机">
          <el-input v-model="mysql.host" placeholder="请输入数据库主机"></el-input>
        </el-form-item>
        <el-form-item label="数据库端口号">
          <el-input v-model="mysql.port" placeholder="请输入数据库端口号"></el-input>
        </el-form-item>
        <el-form-item label="数据库用户">
          <el-input v-model="mysql.user" placeholder="请输入数据库用户"></el-input>
        </el-form-item>
        <el-form-item label="数据库密码">
          <el-input v-model="mysql.password" placeholder="请输入数据库密码"></el-input>
        </el-form-item>
        <el-form-item label="数据库名称">
          <el-input v-model="mysql.database" placeholder="请输入数据库名称"></el-input>
        </el-form-item>
      </el-form>
      <el-row style="color:#222;margin-bottom:16px">Redis</el-row>
      <el-form label-width="100px" :model="redis">
        <el-form-item label="数据库主机">
          <el-input v-model="redis.host" placeholder="请输入数据库主机"></el-input>
        </el-form-item>
        <el-form-item label="数据库端口号">
          <el-input v-model="redis.port" placeholder="请输入数据库端口号"></el-input>
        </el-form-item>
        <el-form-item label="数据库前缀">
          <el-input v-model="redis.prefix" placeholder="请输入数据库前缀"></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row style="padding:8px 20px;border:1px solid #ebeef5;margin-top:8px">
      <el-row style="color:#222;margin-bottom:16px">管理选项</el-row>
      <el-form label-width="100px">
        <el-form-item label="管理员账号">
          <el-input v-model="admin_username" placeholder="请输入管理员账号"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码">
          <el-input v-model="admin_password" type="password" placeholder="请输入管理员密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="confirm_password" type="password" placeholder="确认密码"></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-button type="primary" class="btn-next" @click="next">继续</el-button>
    </el-row>
  </el-row>
</template>
<script>
export default {
    layout: "install",
    data() {
        return {
          mysql: {
              host: '127.0.0.1',
              user: 'root',
              password: '',
              database: 'doodooke',
              port: '3306'
          },
          redis: {
              host: '127.0.0.1',
              port: '6379',
              prefix: 'doodooke:'
          },
          admin_username: '',
          admin_password: '',
          confirm_password: ''
        };
    },
    methods: {
        async next() {
            const res = await this.$axios.$post(`/api/install/home/public/setup2`, {
              mysql: this.mysql,
              redis: this.redis,
              admin_username: this.admin_username,
              admin_password: this.admin_password,
              confirm_password: this.confirm_password
            });
            if (res && res.errmsg === "ok") {
              this.$bus.emit("active", 3);
              this.$router.push("/install/complete");
            }
        },
    }
};
</script>
<style scoped>
.btn-next {
    width: 100px;
    height: 36px;
    line-height: 12px;
    margin: 24px 0 18px;
}
</style>

