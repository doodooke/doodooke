<template>
    <el-row>
        <el-row>服务器信息</el-row>
        <el-row style="margin-top:24px;font-size:14px;font-weight:500;">
            <el-col :span="5">参数</el-col>
            <el-col :span="16" :offset="1">值</el-col>
        </el-row>
        <el-row style="font-size:14px;margin-top:12px;" v-for="(item,index) in system" :key="index">
            <el-col :span="5">{{index}}</el-col>
            <el-col :span="16" :offset="1" style="color:#606266">{{item}}</el-col>
        </el-row>
        <el-row style="margin-top:36px;font-size:14px;font-weight:500;">目录权限检测</el-row>
        <el-row style="font-size:14px;margin-top:12px;">
            <el-col :span="5">目录</el-col>
            <el-col :span="16" :offset="1" style="color:#606266">读写权限</el-col>
        </el-row>
        <el-row
            style="font-size:14px;margin-top:12px;"
            v-for="(item,index) in catalog"
            :key="index"
        >
            <el-col :span="5">{{index}}</el-col>
            <el-col :span="16" :offset="1" style="color:#606266">{{item}}</el-col>
        </el-row>
        <el-row>
            <el-button
                type="primary"
                style="width:100px;height:36px;line-height:12px;margin-top:88px;"
                @click="next"
            >继续</el-button>
        </el-row>
    </el-row>
</template>
<script>
export default {
    layout: "install",
    data() {
        return {
            system: {
                node: process.version,
                platform: process.platform,
                cwd: process.cwd()
            },
            catalog: {
                app: true
            }
        };
    },
    async asyncData({ app }) {
        let data = {};
        const res = await app.$axios.$get("/api/install/home/public/setup1");
        if (res && res.errmsg === "ok") {
            data.system = res.data.system;
            data.catalog = res.data.catalog;
        }
        return data;
    },
    methods: {
        next() {
            this.$bus.emit("active", 2);
            this.$router.push("/install/config");
        }
    }
};
</script>