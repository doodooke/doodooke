<template>
  <div v-loading="loading" :element-loading-text="loadingText">
    <el-alert title="您已进入多多客应用商店，请使用多多客账号登录使用" type="warning" center show-icon :closable="false"></el-alert>
    <iframe
      id="myIframe"
      :src="src"
      scrolling="auto"
      frameborder="0"
      style="min-width:1200px;width:100%;background-color:#ffffff;"
    ></iframe>
    <el-dialog title="安全码" :visible.sync="showCode">
      <div>{{securityCode}}</div>
    </el-dialog>
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
import layout from "../../components/layout.vue";
import uuid from "uuid";
export default {
    layout: "empty",
    data() {
        return {
            loading: false,
            loadingText: "正在下载中",
            src: "https://www.doodooke.com/market",
            securityCode: "",
            showCode: false,
            showLogs: false,
            logsData: "",
            uid: uuid(),
            autoScroll: true,
            showDebug: false,
            debugPaths: []
        };
    },
    mounted() {
        this.changeFrameHeight();

        this.src += `?hostUrl=${location.origin}`;

        if (this.$route.query.jump === "user") {
            this.src = "https://www.doodooke.com/market/user/order";
        }
        window.addEventListener(
            "message",
            async e => {
                let data = e.data;

                if (e.data.type == "homePage") {
                    layout.methods.homePage.call(this);
                    return;
                }
                if (e.data.type == "webBuild") {
                    this.loadingText =
                        "正在编译，请稍等！该过程比较耗时，大概2~20分钟！编译完成请重启";
                    layout.methods.webBuild.call(this);
                    return;
                }
                if (e.data.type == "reStart") {
                    this.loadingText =
                        "正在重启，请稍等！该过程大概1~2分钟，请手动刷新页面确定是否重启完成";
                    layout.methods.reStart.call(this);
                    return;
                }
                if (e.data.type == "getLogs") {
                    this.getLogs();
                }
                if (e.data.type == "getPlugin") {
                    layout.methods.getPlugin.call(this);
                    return;
                }
                if (e.data.type == "getSecurityCode") {
                    this.getSecurityCode();
                }
                if (e.data.type == "debug") {
                    this.debug();
                }

                //下载 更新
                if (data.type == "doodooke") {
                    this.$prompt("请输入安全码 Security Code", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消"
                    })
                        .then(async ({ value }) => {
                            if (!value) {
                                this.$message.warning(
                                    "请输入安全码 Security Code"
                                );
                                return;
                            }
                            this.$message.warning("开始安装");
                            this.loading = true;
                            this.loadingText = "正在下载中";
                            let url = `/api/admin/install/installModule?id=${
                                data.app_id
                            }&Token=${data.token}&securityCode=${value.trim()}`;
                            const res = await this.$axios.$get(url);
                            if (res && res.errmsg === "ok") {
                                this.loading = false;
                                this.$message.success(res.data);
                            } else {
                                this.loading = false;
                            }
                        })
                        .catch(() => {});
                }
            },
            false
        );
    },
    methods: {
        changeFrameHeight() {
            var ifm = document.getElementById("myIframe");
            ifm.height = document.documentElement.clientHeight - 40;
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

            // this.scoket.on("connection",()=>{
            await this.$axios.$get(
                `/api/admin/system/connectPm2Logs?uid=${this.uid}`
            );
            // })
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
                this.$message.warning("请输入调试路径");
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
                this.$message.success("保存成功");
                this.showDebug = false;
            }
        }
    }
};
</script>
<style scoped>
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
</style>

<style>
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

