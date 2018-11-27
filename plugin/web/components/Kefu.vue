<template>
    <el-row>
        <!-- 客服弹出框 -->
        <el-row class="kefu" :class="{'active':kefu}">
            <el-card style="width:100%;height:100%">
                <el-row style="float: right;cursor:pointer" @click.native="changeKefu">
                    <i class="el-icon-close" style="color:#bfbfbf;"></i>
                </el-row>
                <el-row style="color: #222222;margin-top:10px;">
                    联系我们
                </el-row>
                <el-row style="font-size: 28px;margin-top:6px;color: #222222;">
                    {{$store.state.env.TEL}}
                </el-row>
                <el-row style="margin-top:20px;font-size:14px;color: #666666;">
                    或者填写你的联系方式，我们会主动与你联系：
                </el-row>
                <el-row style="margin-top:16px;">
                    <el-form :model="kefuForm" id="kefu-form">
                        <el-form-item>
                            <el-input type="text" v-model="kefuForm.username" auto-complete="off" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input type="text" v-model="kefuForm.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input type="text" v-model="kefuForm.company" auto-complete="off" placeholder="请输入公司名称（选填）"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" style="width:100%;border-radius:3px;margin:10px 0 16px" @click="onSubmitContactUs">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-row>
                <el-row style="height: 2px;background-color:#dddee1;opacity:0.3">
                </el-row>
                <el-row style="text-align:center;margin-top:20px;">
                    <img :src="$store.state.env.WX_KEFU" style="width:126px;height:126px;">
                </el-row>
                <el-row style="margin-top:10px;text-align:center;font-size:14px;">
                    扫一扫 咨询微信客服
                </el-row>
            </el-card>
        </el-row>

        <!-- 客服按钮 -->
        <el-row style="position: fixed;bottom:130px;right:30px;z-index: 10;">
            <el-row @click.native="changeKefu" style="cursor:pointer;width:60px;height:60px;background-color: #3399ff;border-radius:50%;text-align: center;box-shadow: 0px 2px 4px 0px rgba(51, 153, 255, 0.5);">
                <i class="iconfont" style="font-size:48px;color:#ffffff;line-height: 60px;">&#xe779;</i>
            </el-row>
        </el-row>
    </el-row>
</template>
<script>
export default {
    data() {
        return {
            kefuForm: {
                username: "",
                phone: "",
                company: ""
            },
            kefu: false
        };
    },
    methods: {
        changeKefu() {
            this.kefu = !this.kefu;
        },
        async onSubmitContactUs() {
            const form = await this.$axios.$post(
                "/api/cms/home/form/add",
                this.kefuForm
            );
            if (form && form.errmsg === "ok") {
                this.$message.success("提交成功");
                this.kefu = false;
                this.kefuForm = {};
            }
        }
    }
};
</script>
<style scoped>
#kefu-form .el-form-item {
    margin-bottom: 10px;
}
.kefu {
    width: 288px;
    height: 630px;
    position: fixed;
    background-color: #ffffff;
    bottom: 60px;
    right: 114px;
    z-index: 10;
    transform: scale(0) translateY(-10px);
    transform-origin: right bottom;
    transition: all 0.3s ease;
    opacity: 0;
}
.kefu.active {
    transform: scale(1) translateY(-10px);
    opacity: 1;
}
</style>

