<template>
  <el-row style="line-height:70px;">
    <el-col :span="4" @click.native="dashboard" class="col-list">
      <i class="iconfont icon-shouye"></i>
      <span class="col-list-span">首页</span>
    </el-col>
    <el-col :span="4" @click.native="decorate" class="col-list">
      <i class="iconfont icon-zhuangxiu"></i>
      <span class="col-list-span">装修</span>
    </el-col>
    <el-col :span="4" v-popover:color class="col-list">
      <i class="iconfont icon-color"></i>
      <span class="col-list-span">主题</span>
      <el-popover trigger="click" ref="color" popper-class="el-popover-color">
        <div style="padding:10px;display:flex;justify-content:space-around;cursor:pointer;">
          <div
            class="color-div"
            :style="{backgroundColor:item.color}"
            v-for="(item,index) in templateWxa"
            :key="index"
            @click="setColor(item)"
          >
            <div class="color-border" :style="{borderColor:item.color}"></div>
          </div>
        </div>
      </el-popover>
    </el-col>
    <el-col :span="4" @click.native="preview" v-popover:popover class="col-list">
      <i class="iconfont icon-Eye"></i>
      <span class="col-list-span">预览</span>
      <el-popover trigger="click" width="500" ref="popover">
        <el-row style="padding:8px 0px;display:flex;flex-wrap:wrap">
          <div
            v-for="(item,index) in appXcxs"
            :key="index"
            style="width:74px;margin-bottom:16px;cursor:pointer;text-align:center"
            :style="{marginRight:index%5==4?'0':'24px'}"
            @click="selectXcx(item,index)"
          >
            <img
              :src="getAvaterUrl(item.head_img)"
              alt
              style="width:40px;height:40px;border-radius:50%;margin:0 auto;display:block;border:1px solid #F2F6FC"
              :style="{opacity:xcxActive==index?1:0.5}"
            >
            <el-tooltip :content="item.nick_name">
              <div
                style="font-size:14px;margin-top:10px"
                :style="{color:xcxActive==index?'#303133':'#95989e',fontWeight:xcxActive==index?500:'normal'}"
                class="text_ellipsis"
              >{{item.nick_name || "匿名小程序"}}</div>
            </el-tooltip>
          </div>
        </el-row>
        <el-row style="padding:10px 0;" :gutter="10" v-if="xcxActive != -1">
          <el-col :span="8" style="text-align:center">
            <el-row style="width:152px;height:152px">
              <img
                :src="qrcode_img"
                alt
                style="width:100%;height:100%;margin:0 auto;margin-top:-8px"
                class="qrcode"
              >
            </el-row>
            <el-row
              v-if="qrcode_img"
            >{{selectType == "wx" ? '微信':selectType == "swan"?'百度':'支付宝'}}扫描二维码预览</el-row>
            <el-row style="margin:10px 0;" v-else>您还没有绑定小程序</el-row>
          </el-col>
          <el-col :span="16">
            <el-row>
              <!-- 微信体验者 -->
              <el-row v-if="selectType == 'wx'">
                <el-input
                  placeholder="请输入微信号，按Enter(回车)键"
                  v-model="wechatid"
                  @keyup.enter.native="bindWeixin"
                  style="width:280px"
                ></el-input>
                <el-popover width="300" trigger="hover">
                  <p>1. 预览流程：输入微信号 - 按Enter(回车)键 - 微信同意小程序体验者绑定邀请 - 扫描二维码，即可体验小程序。</p>
                  <p>2. 体验二维码功能仅用于体验小程序，不适用于公众传播，体验二维码会在短期内失效</p>
                  <i class="el-icon-info" slot="reference" style="font-size:18px"></i>
                </el-popover>
                <el-row style="margin-top:10px">
                  <el-tag
                    size="small"
                    closable
                    v-for="(item,index) in weixinTester"
                    :key="index"
                    @close="unbindWeixin(item.wechatid)"
                    type="success"
                  >{{item.wechatid}}</el-tag>
                </el-row>
              </el-row>
              <!-- 支付宝体验者 -->
              <el-row v-if="selectType == 'alipay'">
                <el-input
                  placeholder="请输入支付宝号，按Enter(回车)键"
                  v-model="logon_id"
                  @keyup.enter.native="bindAlipay"
                  style="width:280px"
                ></el-input>
                <el-popover width="300" trigger="hover">
                  <p>1. 预览流程：输入支付宝号 - 按Enter(回车)键 - 支付宝同意小程序体验者绑定邀请 - 扫描二维码，即可体验小程序。</p>
                  <p>2. 体验二维码功能仅用于体验小程序，不适用于公众传播，体验二维码会在短期内失效</p>
                  <i class="el-icon-info" slot="reference" style="font-size:18px"></i>
                </el-popover>
                <el-row style="margin-top:10px">
                  <el-tag
                    size="small"
                    closable
                    v-for="(item,index) in alipayTester"
                    :key="index"
                    @close="unbindAlipay(item)"
                    type="primary"
                  >{{item.logonId}}</el-tag>
                </el-row>
              </el-row>
            </el-row>
          </el-col>
        </el-row>
      </el-popover>
    </el-col>
    <el-col :span="4" @click.native="issue" class="col-list">
      <i class="iconfont icon-Release"></i>
      <span class="col-list-span">发布</span>
    </el-col>
    <el-dialog :visible.sync="issueDialog" width="500px" style="line-height:1">
      <p slot="title" style="text-align:center">发布</p>
      <el-alert
        title="提示：选择小程序，填写信息后发布"
        type="warning"
        :closable="false"
        style="margin:-8px 0 16px;height:44px;font-size:16px"
      ></el-alert>
      <el-row style="display:flex;flex-wrap:wrap;">
        <div
          v-for="(item,index) in appXcxs"
          :key="index"
          style="width:72.5px;margin-bottom:16px;cursor:pointer;text-align:center"
          :style="{marginRight:index%5==4?'0':'24px'}"
          @click="selectXcx(item,index)"
        >
          <img
            :src="getAvaterUrl(item.head_img)"
            alt
            style="width:40px;height:40px;border-radius:50%;diaplay:block;border:1px solid #F2F6FC"
            :style="{opacity:xcxActive==index?1:0.5}"
          >
          <el-tooltip :content="item.nick_name">
            <div
              style="font-size:14px;margin-top:10px"
              class="text_ellipsis"
              :style="{color:xcxActive==index?'#303133':'#95989e',fontWeight:xcxActive==index?500:'normal'}"
            >{{item.nick_name || "匿名小程序"}}</div>
          </el-tooltip>
        </div>
      </el-row>
      <el-row v-if="xcxActive != -1">
        <p
          style="font-size:16px;color:#303133;margin:24px 0;font-weight:600"
        >{{selectType == "wx" ? '微信小程序信息':selectType == 'swan'?'百度小程序信息':'支付宝小程序信息'}}</p>
        <el-form
          label-width="80px"
          :model="form"
          :rules="rules"
          ref="form"
          style="margin-bottom:-30px"
        >
          <el-form-item label="服务类目" prop="class" v-if="selectType == 'wx'">
            <el-select v-model="form.class" style="width:100%">
              <el-option
                v-for="(item,index) in category"
                :key="index"
                :value="selectedCategory(item)"
              >{{selectedCategory(item)}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题" prop="title" v-if="selectType == 'wx'">
            <el-input v-model="form.title" placeholder="请填写标题" :maxlength="32"></el-input>
            <el-row>小程序页面的标题，标题长度不超过32</el-row>
          </el-form-item>
          <el-form-item label="标签" prop="tag" v-if="selectType == 'wx'">
            <el-input v-model="form.tag" placeholder="多个标签用空格分隔"></el-input>
            <el-row style="line-height:20px;margin-top:10px">小程序的标签，多个标签用空格分隔，标签不能多于10个，标签长度不超过20</el-row>
          </el-form-item>
          <!-- 百度 -->
          <el-form-item label="简介" prop="user_desc" v-if="selectType == 'swan'">
            <el-input v-model="form.user_desc" placeholder="请填写简介" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="送审描述" prop="content" v-if="selectType == 'swan'">
            <el-input v-model="form.content" placeholder="请填写送审描述" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark" v-if="selectType == 'swan'">
            <el-input v-model="form.remark" placeholder="请填写备注" type="textarea"></el-input>
          </el-form-item>
          <!-- 支付宝 -->
          <el-form-item label="描述" prop="version_desc" v-if="selectType == 'alipay'">
            <el-input
              v-model="form.version_desc"
              placeholder="小程序版本描述"
              type="textarea"
              :maxlength="500"
              :rows="5"
            ></el-input>
            <el-row style="line-height:20px;margin-top:10px">小程序版本描述，30-500个字符</el-row>
          </el-form-item>
        </el-form>
      </el-row>
      <span slot="footer" v-if="xcxActive != -1">
        <el-button @click="issueDialog = false">取 消</el-button>
        <el-button type="primary" @click="issueOk('form')">确 定</el-button>
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
            logon_id: "",
            alipayTester: [],
            issueDialog: false, //发布
            category: [], //服务类目
            form: {
                address: "pages/index/index",
                class: "",
                title: "",
                tag: "",
                user_desc: "",
                content: "",
                remark: "",
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
                user_desc: [
                    {
                        required: true,
                        message: "请填写简介",
                        trigger: "change"
                    }
                ],
                content: [
                    {
                        required: true,
                        message: "请填写送审描述",
                        trigger: "change"
                    }
                ],
                remark: [
                    {
                        required: true,
                        message: "请填写备注",
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
            xcxActive: -1,
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
            this.appXcxs.map(item => {
                if (item.type == "swan" && item.head_img) {
                    item.head_img = JSON.parse(item.head_img)[0].cover;
                }
            });
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
            //判断是否授权小程序
            const checkWxa = await this.$axios.$get(
                "/api/app/home/app/checkWxa"
            );
            if (checkWxa && checkWxa.errmsg === "ok") {
                if (!checkWxa.data) {
                    this.toAuth();
                }
            }
        },
        //微信预览二维码
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
                this.qrcode_img = this.getAppWxaTokenUrl(
                    `/app/home/wxa/code/getExpQrcode?path=${encodeURIComponent(
                        `/pages/index/index?id=${this.$store.state.pageId}`
                    )}`
                );
                this.getWxTest();
            }
        },
        //支付宝预览二维码
        async getAlipayQrcode() {
            this.qrcode_img = this.getAppWxaTokenUrl(
                `/minialipay/home/wxa/code/getExpQrcode`
            );
            this.getAlipayTest();
        },
        //百度预览二维码
        async getSwanQrcode() {
            const package_id = await this.getPackageId();
            this.qrcode_img = this.getAppWxaTokenUrl(
                `/swan/home/swanConfig/qrcode?path=${encodeURIComponent(
                    `/pages/index/index?id=${this.$store.state.pageId}`
                )}&package_id=${package_id}`
            );
        },
        async getPackageId() {
            const res = await this.$axios.$get(
                `/api/swan/home/pkg/pkgGetTrial`
            );
            if (res && res.errmsg === "ok") {
                return res.data.package_id;
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
        //选择小程序
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
            if (this.selectType == "alipay") {
                this.getAlipayQrcode();
            }
            if (this.selectType == "swan") {
                this.getSwanQrcode();
            }
        },
        //绑定微信
        async getWxTest() {
            const res = await this.$axios.$get("/api/app/home/wxa/user/tester");
            if (res && res.errmsg === "ok") {
                this.weixinTester = res.data;
            }
        },
        async bindWeixin() {
            const wechat_tester = await this.$axios.$get(
                "/api/app/home/wxa/user/bindTester?wechatid=" + this.wechatid
            );
            if (wechat_tester && wechat_tester.errmsg === "ok") {
                this.weixinTester.push({ wechatid: this.wechatid });
                this.wechatid = "";
            } else {
                this.wechatid = "";
                this.$message.warning(wechat_tester.errmsg);
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
        //支付宝体验者
        async getAlipayTest() {
            const res = await this.$axios.$get(
                "/api/minialipay/home/wxa/user/membersQuery?role=EXPERIENCER"
            );
            if (res && res.errmsg === "ok") {
                this.alipayTester = res.data;
            }
        },
        async bindAlipay() {
            const res = await this.$axios.$get(
                `/api/minialipay/home/wxa/user/membersCreate?logon_id=${
                    this.logon_id
                }&role=EXPERIENCER`
            );
            if (res && res.errmsg === "ok") {
                this.getAlipayTest();
                this.logon_id = "";
            } else {
                this.logon_id = "";
                this.$message.warning(res.errmsg);
            }
        },
        async unbindAlipay(item) {
            const res = await this.$axios.$get(
                `/api/minialipay/home/wxa/user/membersDelete?user_id=${
                    item.userId
                }&role=EXPERIENCER`
            );
            if (res && res.errmsg === "ok") {
                for (let key in this.alipayTester) {
                    if (this.alipayTester[key].logonId == item.logonId) {
                        this.alipayTester.splice(key, 1);
                        this.$message.success("删除成功");
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
                if (!checkWxa.data) {
                    this.toAuth();
                } else {
                    this.issueDialog = true;
                }
            }
        },
        async getWxIssue() {
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
            let url = "";
            let data = {};
            if (this.selectType == "wx") {
                url = `/api/app/home/wxa/code/submitAudit`;
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
                data = {
                    user_desc: "",
                    audit_items: audit_data
                };
            } else if (this.selectType == "alipay") {
                url = `/api/minialipay/home/wxa/code/submitAudit`;
                data = {
                    user_desc: this.form.version_desc
                };
            } else {
                const package_id = await this.getPackageId();
                url = `/api/swan/home/pkg/submitAudit`;
                data = {
                    user_desc: this.form.user_desc,
                    package_id: package_id,
                    content: this.form.content,
                    remark: this.form.remark
                };
            }

            const release = await this.$axios.$post(url, data);
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



