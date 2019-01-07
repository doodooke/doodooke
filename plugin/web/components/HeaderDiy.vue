<template>
  <el-row style="line-height:70px;">
    <el-col
      :span="4"
      @click.native="dashboard"
      class="col-list"
    >
      <i class="iconfont icon-shouye"></i>
      <span class="col-list-span">首页</span>
    </el-col>
    <el-col
      :span="4"
      @click.native="decorate"
      class="col-list"
    >
      <i class="iconfont icon-zhuangxiu"></i>
      <span class="col-list-span">装修</span>
    </el-col>
    <el-col
      :span="4"
      v-popover:color
      class="col-list"
    >
      <i class="iconfont icon-color"></i>
      <span class="col-list-span">主题</span>
      <el-popover
        trigger="click"
        ref="color"
        popper-class="el-popover-color"
      >
        <div style='padding:10px;display:flex;justify-content:space-around;cursor:pointer;'>
          <div
            class='color-div'
            :style='{backgroundColor:item.color}'
            v-for='(item,index) in templateWxa'
            :key='index'
            @click='setColor(item)'
          >
            <div
              class="color-border"
              :style='{borderColor:item.color}'
            ></div>
          </div>
        </div>
      </el-popover>
    </el-col>
    <el-col
      :span="4"
      @click.native="preview"
      v-popover:popover
      class="col-list"
    >
      <i class='iconfont icon-Eye'></i>
      <span class="col-list-span">预览</span>
      <el-popover
        trigger="click"
        width="500"
        ref="popover"
      >
        <el-row style="padding:8px 10px;display:flex;flex-wrap:wrap">
          <div
            v-for="(item,index) in appXcxs"
            :key="index"
            style="display:flex;align-items:center;margin-bottom:12px;cursor:pointer"
            @click="selectXcx(item,index)"
          >
            <img
              :src="item.head_img"
              alt=""
              style="width:40px;height:40px;border-radius:50%;border:1px solid transparent"
              :style="{borderColor:xcxActive==index?'#303133':'transparent',opacity:xcxActive==index?1:0.8}"
            >
            <span
              style="font-size:16px;margin:0 16px 0 12px"
              :style="{color:xcxActive==index?'#303133':'#95989e',fontWeight:xcxActive==index?500:'normal'}"
            >{{item.nick_name}}</span>
          </div>
        </el-row>
        <el-row
          style="padding:10px 0;"
          :gutter="10"
        >
          <el-col
            :span="8"
            style="text-align:center"
          >
            <img
              :src="qrcode_img"
              alt=""
              style="width:100%;height:100%;margin:0 auto;margin-top:-8px"
              class="qrcode"
            >
            <el-row v-if="qrcode_img">用{{selectType == "wx" ? '微信':selectType == "swan"?'百度':'支付宝'}}扫描二维码预览</el-row>
            <el-row
              style="margin:10px 0;"
              v-else
            >您还没有绑定小程序</el-row>
          </el-col>
          <el-col :span="16">
            <el-row>
              <!-- <el-input
                :placeholder="select == 'wx' ? '输入微信号按Enter(回车)键':select == 'swan' ?'输入百度账号按Enter(回车)键':'输入支付宝号按Enter(回车)键'"
                class="input-with-select"
                size="small"
                v-model="wechatid"
                @keyup.enter.native="bindWeixin"
                style="width:280px"
              >
                <el-select
                  v-model="select"
                  slot="prepend"
                  style="width:73px;"
                >
                  <el-option
                    label="微信"
                    value="wx"
                  ></el-option>
                  <el-option
                    label="百度"
                    value="swan"
                  ></el-option>
                  <el-option
                    label="支付宝"
                    value="alipay"
                  ></el-option>
                </el-select>
              </el-input> -->

              <el-input
                placeholder="请输入微信号，按Enter(回车)键"
                v-model="wechatid"
                @keyup.enter.native="bindWeixin"
                style="width:280px"
              ></el-input>
              <el-popover
                width="300"
                trigger="hover"
              >
                <p>1. 预览流程：输入微信号 - 按Enter(回车)键 - 微信同意小程序体验者绑定邀请 - 扫描二维码，即可体验小程序。</p>
                <p>2. 体验二维码功能仅用于体验小程序，不适用于公众传播，体验二维码会在短期内失效</p>
                <i
                  class="el-icon-info"
                  slot="reference"
                  style="font-size:18px"
                  v-if="select == 'wx'"
                ></i>
              </el-popover>
            </el-row>
            <el-row style="margin-top:10px">
              <el-tag
                size="small"
                closable
                v-for='(item,index) in weixinTester'
                :key='index'
                @close="unbindWeixin(item.wechatid)"
                type="success"
              >{{item.wechatid}}</el-tag>

              <!-- <el-tag
                size="small"
                closable
                v-for='(item,index) in alipayTester'
                :key='index'
                @close="unbindWeixin(item.wechatid)"
              >{{item.wechatid}}</el-tag> -->
            </el-row>
          </el-col>
        </el-row>
      </el-popover>

    </el-col>
    <el-col
      :span="4"
      @click.native="issue"
      class="col-list"
    >
      <i class='iconfont icon-Release'></i>
      <span class="col-list-span">发布</span>
    </el-col>
    <el-dialog
      :visible.sync="issueDialog"
      width="500px"
      style="line-height:1"
    >
      <p
        slot="title"
        style="text-align:center"
      >发布</p>
      <el-alert
        title="提示：选择小程序，填写信息后发布"
        type="warning"
        :closable="false"
        style="margin:-8px 0 16px;height:44px;font-size:16px"
      >
      </el-alert>
      <el-row style="display:flex;flex-wrap:wrap;">
        <div
          v-for="(item,index) in appXcxs"
          :key="index"
          style="display:flex;align-items:center;margin-bottom:12px;cursor:pointer"
          @click="selectXcx(item,index)"
        >
          <img
            :src="item.head_img"
            alt=""
            style="width:40px;height:40px;border-radius:50%;border:1px solid transparent"
            :style="{borderColor:xcxActive==index?'#419efb':'transparent',opacity:xcxActive==index?1:0.8}"
          >
          <span
            style="font-size:16px;margin:0 16px 0 12px"
            :style="{color:xcxActive==index?'#419efb':'#95989e',fontWeight:xcxActive==index?500:'normal'}"
          >{{item.nick_name}}</span>
        </div>
      </el-row>
      <p style="font-size:16px;color:#303133;margin:24px 0;font-weight:600">
        {{selectType == "wx" ? '微信小程序信息':selectType == 'swan'?'百度小程序信息':'支付宝小程序信息'}}
      </p>
      <el-form
        label-width="80px"
        :model="form"
        :rules="rules"
        ref="form"
        style="margin-bottom:-30px"
      >
        <el-form-item
          label="服务类目"
          prop="class"
          v-if="selectType == 'wx'"
        >
          <el-select
            v-model="form.class"
            style="width:100%"
          >
            <el-option
              v-for="(item,index) in category"
              :key="index"
              :value="selectedCategory(item)"
            >{{selectedCategory(item)}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="标题"
          prop="title"
          v-if="selectType == 'wx'"
        >
          <el-input
            v-model="form.title"
            placeholder='请填写标题'
            :maxlength="32"
          ></el-input>
          <el-row>小程序页面的标题，标题长度不超过32</el-row>
        </el-form-item>
        <el-form-item
          label="标签"
          prop="tag"
          v-if="selectType == 'wx'"
        >
          <el-input
            v-model="form.tag"
            placeholder='多个标签用空格分隔'
          ></el-input>
          <el-row style="line-height:20px;margin-top:10px">小程序的标签，多个标签用空格分隔，标签不能多于10个，标签长度不超过20</el-row>
        </el-form-item>
        <!-- 百度 -->
        <el-form-item
          label="代码包id"
          prop="package_id"
          v-if="selectType == 'swan'"
        >
          <el-input
            v-model="form.package_id"
            placeholder='代码包id'
          ></el-input>
        </el-form-item>
        <!-- 支付宝 -->
        <el-form-item
          label="描述"
          prop="version_desc"
          v-if="selectType == 'alipay'"
        >
          <el-input
            v-model="form.version_desc"
            placeholder='小程序版本描述'
            type="textarea"
            :maxlength="500"
            :rows="5"
          ></el-input>
          <el-row style="line-height:20px;margin-top:10px">小程序版本描述，30-500个字符</el-row>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="issueDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="issueOk('form')"
        >确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
export default {
    data() {
        return {
            qrcode_img: "",
            template_wxa_id: 0,
            wechatid: "", //微信号
            weixinTester: [],
            alipayTester: [],
            issueDialog: false, //发布
            category: [], //服务类目
            form: {
                address: "pages/index/index",
                class: "",
                title: "",
                tag: "",
                package_id: "",
                version_desc: ""
            },
            rules: {
                class: [
                    {
                        required: true,
                        message: "请选择服务类目",
                        trigger: "change"
                    }
                ],
                title: [
                    {
                        required: true,
                        message: "请填写标题",
                        trigger: "change"
                    }
                ],
                tag: [
                    {
                        required: true,
                        message: "请填写标签",
                        trigger: "change"
                    }
                ],
                package_id: [
                    {
                        required: true,
                        message: "请填写代码包id",
                        trigger: "change"
                    }
                ],
                version_desc: [
                    {
                        required: true,
                        message: "请填写小程序版本描述",
                        trigger: "change"
                    },
                    {
                        min: 30,
                        max: 500,
                        message: "长度在 30 到 500 个字符",
                        trigger: "change"
                    }
                ]
            },
            templateWxa: [],
            template_id: 0,
            xcxActive: 0,
            xcxType: [
                {
                    type: "wx",
                    name: "微信小程序",
                    img: "/assets/wx-logo.png"
                },
                {
                    type: "swan",
                    name: "百度小程序",
                    img: "/assets/baidu-logo.png"
                },
                {
                    type: "alipay",
                    name: "支付宝小程序",
                    img: "/assets/alipay-logo.png"
                }
            ],
            selectType: "wx",
            select: "wx",
            appXcxs: []
        };
    },
    async mounted() {
        const getAppInfo = await this.$axios.$get(
            "/api/app/home/base/getAppInfo"
        );
        if (getAppInfo && getAppInfo.errmsg === "ok") {
            this.template_id = getAppInfo.data.template_id;
            this.appXcxs = getAppInfo.data.wxa;
        }
        //获取应用的小程序模版
        const templateWxa = await this.$axios.$get(
            `/api/app/home/app/templateWxa?template_id=${this.template_id}`
        );
        if (templateWxa && templateWxa.errmsg === "ok") {
            this.templateWxa = templateWxa.data;
        }
    },
    methods: {
        dashboard() {
            this.$router.push("/app/dashboard");
        },
        //装修
        decorate() {
            this.$router.push("/diy/project");
        },
        //主题
        async setColor(item) {
            const res = await this.$axios.$get(
                `/api/app/home/app/setTemplateWxa?id=${item.id}`
            );
            if (res && res.errmsg === "ok") {
                this.$message.success({
                    message: "主题设置成功",
                    duration: 1000
                });
                this.$store.commit("SET_COLOR", item.color);
            }
        },
        //预览
        async preview() {
            //百度
            // const res = await this.$axios.$get(
            //     `/api/swan/home/pkg/pkgGetTrial`
            // );
            // if (res && res.errmsg === "ok") {
            //     this.qrcode_img = this.getAppTokenUrl(
            //         `/swan/home/swanConfig/qrcode?path=${encodeURIComponent(
            //             `/pages/index/index?id=${this.$store.state.pageId}`
            //         )}&package_id=${res.data.package_id}`
            //     );
            // }

            const checkWxa = await this.$axios.$get(
                "/api/app/home/app/checkWxa"
            );
            if (checkWxa && checkWxa.errmsg === "ok") {
                if (checkWxa.data) {
                    if (this.appXcxs[0].type == "wx") {
                        this.$cookies.set(
                            "WxaToken",
                            this.appXcxs[0].WxaToken,
                            {
                                path: "/",
                                maxAge: 60 * 60 * 24 * 7
                            }
                        );
                        this.getWxQrcode();
                    }
                } else {
                    this.toAuth();
                }
            }
        },
        async getWxQrcode() {
            let func_info_id = 0;
            const wxaInfo = await this.$axios.$get(
                "/api/app/home/base/getWxaInfo"
            );
            if (wxaInfo && wxaInfo.errmsg === "ok") {
                let func_info = JSON.parse(wxaInfo.data.func_info);

                for (let key in func_info) {
                    if (
                        func_info[key].funcscope_category.id == 17 ||
                        func_info[key].funcscope_category.id == 18
                    ) {
                        func_info_id += 1;
                    }
                }
            }
            if (func_info_id < 2) {
                this.$message.warning("请重新授权");
                window.open(`${this.getCoryright()}/app/wxa_info`, "_self");
                return;
            } else {
                this.qrcode_img = this.getAppTokenUrl(
                    `/app/home/wxa/code/getExpQrcode?path=${encodeURIComponent(
                        `/pages/index/index?id=${this.$store.state.pageId}`
                    )}&WxaToken=${this.$cookies.get("WxaToken")}`
                );
                const wechat_tester = await this.$axios.$get(
                    "/api/app/home/wxa/user/tester"
                );
                if (wechat_tester && wechat_tester.errmsg === "ok") {
                    this.weixinTester = wechat_tester.data;
                }
            }
        },
        toAuth() {
            this.$confirm("当前应用未绑定小程序，请去先绑定小程序", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.$router.push("/app/apps");
            });
        },
        selectXcx(item, index) {
            this.xcxActive = index;
            this.selectType = item.type;

            this.$cookies.set("WxaToken", item.WxaToken, {
                path: "/",
                maxAge: 60 * 60 * 24 * 7
            });

            if (this.selectType == "wx") {
                this.getWxQrcode();
            }
        },
        //绑定微信
        async bindWeixin() {
            //微信
            if (this.select == "wx") {
                const wechat_tester = await this.$axios.$get(
                    "/api/app/home/wxa/user/bindTester?wechatid=" +
                        this.wechatid
                );
                if (wechat_tester && wechat_tester.errmsg === "ok") {
                    this.weixinTester.push({ wechatid: this.wechatid });
                    this.wechatid = "";
                } else {
                    this.wechatid = "";
                    this.$message.warning(wechat_tester.errmsg);
                }
            } else {
                //支付宝
            }
        },
        async unbindWeixin(wechatid) {
            const wechat_tester = await this.$axios.$get(
                "/api/app/home/wxa/user/unbindTester?wechatid=" + wechatid
            );
            if (wechat_tester && wechat_tester.errmsg === "ok") {
                for (let key in this.weixinTester) {
                    if (this.weixinTester[key].wechatid == wechatid) {
                        this.weixinTester.splice(key, 1);
                    }
                }
            }
        },
        //发布
        async issue() {
            const checkWxa = await this.$axios.$get(
                "/api/app/home/app/checkWxa"
            );
            if (checkWxa && checkWxa.errmsg === "ok") {
                if (checkWxa.data) {
                    if (this.appXcxs[0].type == "wx") {
                        this.$cookies.set(
                            "WxaToken",
                            this.appXcxs[0].WxaToken,
                            {
                                path: "/",
                                maxAge: 60 * 60 * 24 * 7
                            }
                        );

                        let func_info_id = 0;
                        const wxaInfo = await this.$axios.$get(
                            "/api/app/home/base/getWxaInfo"
                        );
                        if (wxaInfo && wxaInfo.errmsg === "ok") {
                            let func_info = JSON.parse(wxaInfo.data.func_info);

                            for (let key in func_info) {
                                if (
                                    func_info[key].funcscope_category.id ==
                                        17 ||
                                    func_info[key].funcscope_category.id == 18
                                ) {
                                    func_info_id += 1;
                                }
                            }
                        }
                        if (func_info_id < 2) {
                            this.$message.warning("请重新授权");
                            window.open(
                                `${this.getCoryright()}/app/wxa_info`,
                                "_self"
                            );
                            return;
                        } else {
                            //最后审核状态
                            const latestAuditstatus = await this.$axios.$get(
                                "/api/app/home/wxa/code/latestAuditstatus"
                            );
                            if (latestAuditstatus.data.status === 2) {
                                this.$message.warning("小程序正在审核中");
                                return;
                            }
                            //获取服务类目
                            const category = await this.$axios.$get(
                                "/api/app/home/wxa/code/category"
                            );
                            if (category && category.errmsg === "ok") {
                                this.category = category.data.category_list;
                                if (this.category.length) {
                                    this.issueDialog = true;
                                } else {
                                    this.$confirm(
                                        "请去微信公众平台完善小程序信息",
                                        "提示",
                                        {
                                            confirmButtonText: "确定",
                                            cancelButtonText: "取消",
                                            type: "warning"
                                        }
                                    );
                                }
                            }
                        }
                    }
                } else {
                    this.toAuth();
                }
            }
        },
        selectedCategory(item) {
            let selected = item.first_class;
            if (item.second_class) {
                selected += " - " + item.second_class;
            }
            if (item.third_class) {
                selected += " - " + item.third_class;
            }
            return selected;
        },
        issueOk(form) {
            this.$refs[form].validate(valid => {
                if (valid) {
                    this.submit();
                } else {
                    return false;
                }
            });
        },
        async submit() {
            let audit_data = [];
            let audit_class = this.form.class.split(" - ");
            audit_data.push({
                title: this.form.title,
                address: this.form.address,
                tag: this.form.tag,
                first_class: audit_class[0] || "",
                second_class: audit_class[1] || "",
                third_class: audit_class[2] || ""
            });

            const release = await this.$axios.$post(
                `/api/app/home/wxa/code/submitAudit`,
                {
                    user_desc: "",
                    audit_items: audit_data
                }
            );
            if (release && release.errmsg === "ok") {
                this.issueDialog = false;
                this.$message.success("提交成功");
            } else {
                this.$message.warning(release.errmsg);
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
.el-tag {
    margin: 2px;
}
.color-div {
    width: 24px;
    height: 24px;
    background-color: #fc4c4e;
    border-radius: 50%;
    margin-right: 16px;
}
.color-div:last-child {
    margin-right: 0;
}

.color-div .color-border {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid;
    opacity: 0;
}

.color-div:hover .color-border {
    transition: all 0.3s ease;
    transform: scale(1.5);
    opacity: 1;
}
.qrcode:after {
    content: url("/assets/default_code.png");
    display: block;
    background-color: #fff;
}
</style>
<style>
.el-popover-color {
    background: #ebeef5;
}
.el-popover-color.el-popover .popper__arrow::after {
    border-bottom-color: #ebeef5;
}
</style>



