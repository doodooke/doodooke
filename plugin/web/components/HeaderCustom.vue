<template>
    <el-row style="color: #657180;font-size:14px;text-align: right;">
        <el-dropdown placement="bottom">
            <img :src="getAvaterUrl($store.state.custom.avater_url)" style="width:30px;height:30px;border-radius:50%;margin-top: 20px;">
            <el-dropdown-menu slot="dropdown" style="width:100px">
                <el-dropdown-item style="text-align:center" disabled>
                    <img :src="getAvaterUrl($store.state.custom.avater_url)" style="width:30px;height:30px;border-radius:50%;margin-top:10px;">
                </el-dropdown-item>
                <el-dropdown-item class="text_ellipsis" style="width:100%;text-align:center;color: #606266;margin-top:-6px;" disabled>{{$store.state.custom.nickname}}</el-dropdown-item>
                <el-dropdown-item style="margin-top:12px;" @click.native="go('/app/apps')">
                    切换应用
                </el-dropdown-item>
                <el-dropdown-item @click.native="go('/app/account')">
                    账号设置
                </el-dropdown-item>
                <el-dropdown-item divided @click.native="go('/public/login')">
                    退出登录
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-row>
</template>

