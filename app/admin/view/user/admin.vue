<template>
    <el-row>
        <el-button type="primary" @click="addAdmin">新增</el-button>
        <el-table :data="adminData" stripe style="margin-top:24px">
            <el-table-column prop="nickname" label="用户" align="center">
            </el-table-column>
            <el-table-column prop="phone" label="手机号" align="center">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" align="center">
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scoped">
                    <el-row style="font-weight:700;color:#19be6b" v-if="scoped.row.status">开启</el-row>
                    <el-row style="font-weight:700;color:#f50" v-else>关闭</el-row>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-tooltip content="编辑">
                        <i class="iconfont icon-bianji1" @click='editCategory(scope.row)' style="font-size:26px;cursor:pointer;color:rgb(158, 167, 179)"></i>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :visible.sync="showModal" title="超管管理" width="600px">
            <el-form label-width='80px' :model="form" ref="form" :rules="rules">
                <el-form-item label='名称' prop="nickname">
                    <el-input v-model="form.nickname" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label='密码'>
                    <el-input v-model="form.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label='手机号' prop="phone">
                    <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label='邮箱'>
                    <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label='状态'>
                    <el-switch v-model='form.status'></el-switch>
                </el-form-item>
            </el-form>
            <p slot='footer'>
                <el-button size="medium" @click="cancel('form')">取消</el-button>
                <el-button type='primary' size="medium" @click="ok('form')">确定</el-button>
            </p>
        </el-dialog>
    </el-row>
</template>
<script>
export default {
    layout: "admin",
    data() {
        return {
            adminData: [],
            showModal: false,
            form: {
                id: 0,
                nickname: "",
                password: "",
                phone: "",
                email: "",
                status: true
            },
            rules: {
                nickname: [
                    {
                        required: true,
                        message: "请输入名称",
                        trigger: "change"
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    async asyncData({ app }) {
        let data = {};
        let res = await app.$axios.$get("/api/admin/user/adminInfo");
        if (res && res.errmsg === "ok") {
            data.adminData = res.data;
        }
        return data;
    },
    methods: {
        async getData() {
            let res = await this.$axios.$get("/api/admin/user/adminInfo");
            if (res && res.errmsg === "ok") {
                this.adminData = res.data;
            }
        },
        addAdmin() {
            this.showModal = true;
            this.form.id = 0;
            this.form.nickname = "";
            this.form.password = "";
            this.form.phone = "";
            this.form.email = "";
            this.form.status = true;
        },
        async editCategory(row) {
            this.showModal = true;
            let res = await this.$axios.$get(
                `/api/admin/user/editAdmin?id=${row.id}`
            );
            if (res && res.errmsg === "ok") {
                this.form = res.data;
                this.form.status = row.status ? true : false;
            }
        },
        ok(form) {
            this.$refs[form].validate(valid => {
                if (valid) {
                    this.submit();
                } else {
                    return false;
                }
            });
        },
        async submit() {
            if (!this.form.id && !this.form.password) {
                this.$message.warning("请输入密码");
                return;
            }
            let data = {
                id: this.form.id,
                nickname: this.form.nickname,
                password: this.form.password,
                phone: this.form.phone,
                email: this.form.email,
                status: this.form.status
            };
            const res = await this.$axios.$post(
                "/api/admin/user/updataAdmin",
                data
            );
            if (res && res.errmsg === "ok") {
                this.showModal = false;
                this.$message.success("保存成功");
                this.getData();
            }
        },
        cancel(form) {
            this.$refs[form].resetFields();
            this.showModal = false;
        }
    }
};
</script>

