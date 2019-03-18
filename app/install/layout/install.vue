<template>
  <div id="layout">
    <qingful-header :logo="logo">
      <el-col slot="right" :span="6" :offset="14">
        <el-row style="text-align: right;">
          <el-row style="line-height:70px;">
            <el-button type="primary" class="btn-portal" @click="go('/portal')">多多客官网</el-button>
            <el-button type="primary" class="btn-github" @click="go('/portal')">GitHub</el-button>
          </el-row>
        </el-row>
      </el-col>
    </qingful-header>
    <el-row class="content">
      <div style="display:flex">
        <div class="content-left">
          <div class="content-left-title">安装步骤</div>
          <div style="height:128px;">
            <el-timeline class="content-left-timeline">
              <el-timeline-item v-for="(item, index) in timeline" :key="index">
                {{item.content}}
                <div slot="dot" class="dot" :style="{borderColor:active==index?'#36f1cd':'#fff'}">
                  <div class="dot-inner" :style="{background:active==index?'#36f1cd':'#fff'}"></div>
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
        <div style="flex:1;background:#fff;padding:32px 24px;">
          <nuxt/>
        </div>
      </div>
    </el-row>
    <qingful-footer></qingful-footer>
  </div>
</template>

<script>
import Header from "doodoo-plugin-web/components/Header.vue";
import Footer from "doodoo-plugin-web/components/Footer.vue";
export default {
    components: {
        "qingful-header": Header,
        "qingful-footer": Footer
    },
    data() {
        return {
            logo: this.$store.state.env.LOGO,
            active: 0,
            timeline: [
                {
                    content: "许可协议"
                },
                {
                    content: "环境检测"
                },
                {
                    content: "参数配置"
                },
                {
                    content: "安装完成"
                }
            ]
        };
    },
    mounted() {
        this.$bus.on("active", res => {
            this.active = res;
        });

        let path = this.$route.path;
        if (path == "/install") {
            this.active = 0;
        } else if (path == "/install/info") {
            this.active = 1;
        } else if (path == "/install/config") {
            this.active = 2;
        } else {
            this.active = 3;
        }
    },
    methods: {}
};
</script>

<style scoped>
.btn-portal {
    height: 32px;
    width: 102px;
    border-radius: 0;
    padding: 0;
    background: #3399ff;
    border-color: #3399ff;
}
.btn-github {
    height: 32px;
    width: 84px;
    border-radius: 0;
    padding: 0;
    background: #fff;
    color: #3399ff;
    border-color: #3399ff;
}
.content {
    width: 1200px;
    margin: 40px auto;
    padding: 0 100px;
}
.content-left {
    width: 220px;
    min-height: 600px;
    background: #4b6285 url("../www/bg.png") no-repeat 0 100%;
    background-size: 220px;
    padding: 16px;
}
.content-left-title {
    font-size: 18px;
    color: #fff;
    margin-bottom: 78px;
}
.dot {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid #fff;
    padding: 3px;
    background: #fff;
}
.dot-inner {
    width: 7px;
    height: 7px;
    border-radius: 50%;
}
</style>
<style>
.content-left-timeline .el-timeline-item__content {
    color: #fff;
}
.content-left-timeline .el-timeline-item__dot {
    left: -2px;
}
</style>

