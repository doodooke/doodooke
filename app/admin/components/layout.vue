<template>
    <div id="layout" v-loading="loading" :element-loading-text="loadingText">
        <qingful-header :logo="logo">
            <el-col slot="center" :span="12" :offset="2">
                <el-row>
                    <el-col :span="4" class="col-list" @click.native="homePage">
                        <i class="iconfont icon-shouye"></i>
                        <span class="col-list-span">首页</span>
                    </el-col>
                    <el-col :span="4" class="col-list" @click.native="webBuild">
                        <i class="iconfont icon-bianyi"></i>
                        <span class="col-list-span">编译</span>
                    </el-col>
                    <el-col :span="4" class="col-list" @click.native="reStart">
                        <i class="iconfont icon-zhongqi"></i>
                        <span class="col-list-span">重启</span>
                    </el-col>
                    <!-- <el-col :span="6" class="col-list">
                            <i class="iconfont icon-shouye"></i>
                            <span class="col-list-span">编译并重启</span>
                    </el-col>-->
                    <el-col :span="4" class="col-list" @click.native="getLogs">
                        <i class="iconfont icon-rizhi"></i>
                        <span class="col-list-span">日志</span>
                    </el-col>
                    <el-col
                        :span="4"
                        class="col-list"
                        @click.native="getPlugin"
                        v-if="$store.state.env.marketEntry"
                    >
                        <i class="iconfont icon-chajian1"></i>
                        <span class="col-list-span">应用</span>
                    </el-col>
                    <el-col :span="4" class="col-list">
                        <el-dropdown>
                            <span style="display:flex;">
                                <i class="iconfont icon-gengduo"></i>
                                <span class="col-list-span" style="font-size:16px">更多</span>
                            </span>
                            <el-dropdown-menu slot="dropdown" style="width:100px;text-align:center">
                                <el-dropdown-item @click.native="getSecurityCode">安全码</el-dropdown-item>
                                <el-dropdown-item @click.native="debug">本地调试</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>

                        <el-dialog title="安全码" :visible.sync="showCode">
                            <div style="margin-top:-40px">{{securityCode}}</div>
                        </el-dialog>
                    </el-col>
                </el-row>
            </el-col>
            <el-col slot="right" :span="3" :offset="3">
                <el-row style="color: #657180;font-size:14px;text-align: right;">
                    <el-row style="line-height:70px;" v-if="!$cookies.get('admin')">
                        <el-button
                            type="primary"
                            style="height:32px;width:84px;border-radius:0;padding: 0;"
                            @click="goLogin"
                        >立即登录</el-button>
                    </el-row>
                    <el-dropdown placement="bottom" v-else>
                        <img
                            :src="getAvaterUrl($store.state.custom.avater_url)"
                            style="width:30px;height:30px;border-radius:50%;margin-top: 20px;"
                        />
                        <el-dropdown-menu slot="dropdown" style="width:100px">
                            <el-dropdown-item style="text-align:center" disabled>
                                <img
                                    :src="getAvaterUrl($store.state.custom.avater_url)"
                                    style="width:30px;height:30px;border-radius:50%;margin-top:10px;"
                                />
                            </el-dropdown-item>
                            <el-dropdown-item
                                class="text_ellipsis"
                                style="width:100%;text-align:center;color: #606266;margin-top:-6px;"
                                disabled
                            >{{$cookies.get("admin")}}</el-dropdown-item>
                            <el-dropdown-item divided @click.native="go('/admin/public/login')">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-row>
            </el-col>
        </qingful-header>

        <slot></slot>

        <qingful-footer></qingful-footer>
        <!-- 返回顶部 -->
        <qingful-gotop></qingful-gotop>

        <el-dialog
            title
            :show-close="false"
            :visible.sync="showLogs"
            custom-class="logsModal"
            @close="closeSocket"
        >
            <div id="logs" ref="logs">
                <pre style="white-space: pre-wrap;word-wrap: break-word;line-height:20px">
            {{logsData}}
        </pre>
            </div>
        </el-dialog>

        <el-dialog title="本地调试" :visible.sync="showDebug" width="560px">
            <el-row>
                <el-row
                    style="display:flex;align-items:center;margin-bottom:16px;"
                    v-for="(item,index) in debugPaths"
                    :key="index"
                >
                    <el-input
                        v-model="item.path"
                        placeholder="请输入调试路径"
                        style="width:400px;margin-right:12px;"
                    ></el-input>
                    <el-tooltip :content="item.copy?'复制':'转发'" placement="top">
                        <el-switch v-model="item.copy" style="margin-right:12px;"></el-switch>
                    </el-tooltip>
                    <div>
                        <i
                            class="iconfont icon-Add debug-icon-add"
                            v-if="index == debugPaths.length-1"
                            @click="addPaths(item)"
                        ></i>
                        <i
                            class="iconfont icon-reduce debug-icon-reduce"
                            v-if="debugPaths.length > 1"
                            @click="reducePaths(index)"
                        ></i>
                    </div>
                </el-row>
            </el-row>
            <p slot="footer">
                <el-button @click="showDebug = false">取消</el-button>
                <el-button type="primary" @click="saveDebugPaths">保存</el-button>
            </p>
        </el-dialog>
    </div>
</template>

<script>
import Header from "doodoo-plugin-web/components/Header.vue";
import Footer from "doodoo-plugin-web/components/Footer.vue";
import GoTop from "doodoo-plugin-web/components/GoTop.vue";
import uuid from "uuid";
export default {
    components: {
        "qingful-header": Header,
        "qingful-footer": Footer,
        "qingful-gotop": GoTop
    },
    data() {
        return {
            loading: false,
            loadingText: "",
            showLogs: false,
            logsData: "",
            uid: uuid(),
            logo: this.$store.state.env.LOGO,
            autoScroll: true,
            securityCode: "",
            showCode: false,
            showDebug: false,
            debugPaths: [],
            socket: {}
        };
    },
    methods: {
        homePage() {
            this.$router.push(this.$cookies.get("homePage"));
        },
        //编译
        webBuild() {
            this.$confirm("确定编译吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    this.loading = true;
                    this.loadingText =
                        "正在编译，请稍等！该过程比较耗时，大概2~20分钟！编译完成请重启";
                    const res = await this.$axios.$get(
                        "/api/admin/system/webBuild"
                    );
                    if (res && res.errmsg === "ok") {
                        this.loading = false;
                        this.$notify({
                            title: "温馨提示",
                            message: res.data,
                            type: "success"
                        });
                    } else {
                        this.loading = false;
                    }
                })
                .catch(() => {});
        },
        //重启
        reStart() {
            this.$confirm("确定重启吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    this.loading = true;
                    this.loadingText =
                        "正在重启，请稍等！该过程大概1~2分钟，请手动刷新页面确定是否重启完成";
                    const res = await this.$axios.$get(
                        "/api/admin/system/pm2Restart"
                    );
                    if (res && res.errmsg === "ok") {
                        this.loading = false;
                        this.$notify({
                            title: "温馨提示",
                            message: res.data,
                            type: "success"
                        });
                    } else {
                        this.loading = false;
                    }
                })
                .catch(() => {});
        },
        //日志
        async getLogs() {
            this.socketConnect();
            this.showLogs = true;
            this.$nextTick(() => {
                this.$refs.logs.addEventListener("scroll", this.handleScroll);
            });
        },
        handleScroll() {
            let scrolltop = this.$refs.logs.scrollTop;
            let scrollheight = this.$refs.logs.scrollHeight - 600;
            if (scrolltop < scrollheight) {
                this.autoScroll = false;
            } else {
                this.autoScroll = true;
            }
        },
        async socketConnect() {
            this.socket = io.connect(
                this.$store.state.env.APP_HOST +
                    `?uid=${this.uid}&type=wxLogin`,
                {
                    transports: ["websocket", "polling"]
                }
            );
            this.socket.on("error", error => {
                console.error(error);
            });
            this.socket.on("connect", socket => {
                this.$axios.$get(
                    `/api/admin/system/connectPm2Logs?uid=${this.uid}`
                );
            });
            this.socket.on("pm2Logs", data => {
                this.logsData += data;

                if (this.autoScroll) {
                    this.$nextTick(() => {
                        let logs = this.$refs.logs;
                        logs.scrollTop = logs.scrollHeight;
                    });
                }
            });
        },
        closeSocket() {
            this.socket.disconnect();
            this.logsData = "";
            window.removeEventListener("scroll", this.handleScroll);
        },
        async getPlugin() {
            this.$router.push("/admin/install");
        },
        goLogin() {
            this.$router.push("/admin/public/login");
        },
        async getSecurityCode() {
            this.showCode = true;
            const res = await this.$axios.$get(
                "/api/admin/system/getSecurityCode"
            );
            if (res && res.errmsg == "ok") {
                this.securityCode = res.data;
            }
        },
        //本地调试
        async debug() {
            this.showDebug = true;
            const res = await this.$axios.$get(
                "/api/admin/system/getDebugPaths"
            );
            if (res && res.errmsg == "ok") {
                this.debugPaths = res.data;
                if (!this.debugPaths.length) {
                    this.debugPaths.push({ path: "", copy: true });
                }
            }
        },
        addPaths(item) {
            if (!item.path) {
                this.$notify({
                    title: "温馨提示",
                    message: "请输入调试路径",
                    type: "warning"
                });
                return;
            }
            this.debugPaths.push({
                path: "",
                copy: true
            });
        },
        reducePaths(index) {
            this.debugPaths.splice(index, 1);
        },
        async saveDebugPaths() {
            let data = [];
            this.debugPaths.map(item => {
                if (item.path) {
                    data.push(item);
                }
            });
            const res = await this.$axios.$post(
                "/api/admin/system/saveDebugPaths",
                {
                    paths: data
                }
            );
            if (res && res.errmsg == "ok") {
                this.$notify({
                    title: "温馨提示",
                    message: "保存成功",
                    type: "success"
                });
                this.showDebug = false;
            }
        }
    }
};
</script>

<style scoped>
.col-list {
    display: flex;
    padding: 0 16px;
    cursor: pointer;
    line-height: 70px;
}

.col-list i {
    margin-right: 6px;
    font-size: 26px;
    color: #9ea7b4;
}

.col-list-span {
    color: #657180;
}

.col-list:hover .col-list-span {
    color: rgba(101, 113, 128, 0.8);
}
.debug-icon-add {
    font-size: 24px;
    cursor: pointer;
    color: #576b95;
}
.debug-icon-add:hover {
    color: #455577;
}
.debug-icon-reduce {
    font-size: 24px;
    cursor: pointer;
    color: #fa5151;
}
.debug-icon-reduce:hover {
    color: #c84040;
}
</style><style>
.logsModal {
    min-width: 600px;
    width: 80%;
    height: 600px;
}
#logs {
    width: 100%;
    height: 600px;
    padding-top: 20px;
    overflow-x: hidden;
    overflow-y: auto;
}
.logsModal .el-dialog__body {
    padding: 0 0 0 30px;
}
.logsModal .el-dialog__header {
    padding: 0;
}

.el-loading-spinner {
    top: 200px;
}
</style>
