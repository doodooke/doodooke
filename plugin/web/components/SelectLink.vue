<template>
  <el-row>
    <el-dialog
      title="选择绑定事件"
      :visible.sync="showLink"
      @close="cancel"
      width="800px"
      top="20px"
      :modal-append-to-body="false"
    >
      <el-tabs v-model="tabname" type="card" @tab-click="changeTabs">
        <el-tab-pane label="页面" name="1">
          <el-table :data="pageData" stripe style="margin-bottom:60px">
            <el-table-column prop="name" label="页面" align="center"></el-table-column>
            <el-table-column label="创建时间" align="center">
              <template slot-scope="scope">
                <el-row>{{format(scope.row.created_at)}}</el-row>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="selectPage(scope.row)">选择</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="营销" name="2">
          <el-row style="border:1px solid #eee">
            <el-col :span="17" class="ump">
              <div
                class="ump-comp"
                v-for="(item,index) in umpData"
                :key="index"
                :style="{borderColor:item.id==umpSelect?'#06a0fd':'#eee'}"
                @click="selectUmp(item.id,index)"
                v-if="item.status"
              >
                <img :src="item.icon">
                <div style="text-align: center">{{item.name}}</div>
              </div>
            </el-col>
            <el-col :span="7" style="padding:0 10px">
              <div style="font-size: 14px;margin:8px 0">示例</div>
              <div style="width:100%;">
                <img :src="umpData[umpSelectIndex].img" style="width:100%;height:100%">
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <p slot="footer">
        <el-button type="primary" v-show="tabname==2" @click="okUmp">确定</el-button>
      </p>
    </el-dialog>
    <!-- 集赞 -->
    <el-dialog
      title="集赞活动"
      :visible.sync="jizanModal"
      width="800px"
      top="20px"
      :modal-append-to-body="false"
    >
      <el-alert
        title="提示"
        :closable="false"
        show-icon
        v-show="!jizanData.length"
        style="margin-bottom:24px"
      >
        <p>暂无活动，请先去
          <nuxt-link to="/jizan/config">设置活动</nuxt-link>
        </p>
      </el-alert>
      <el-table :data="jizanData" stripe>
        <el-table-column prop="name" label="活动名称" align="center"></el-table-column>
        <el-table-column prop="time" label="时间" align="center">
          <template slot-scope="scoped">
            <el-row>{{format(scoped.row.started_at)}}</el-row>
            <el-row>{{format(scoped.row.ended_at)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scoped">
            <el-row style="font-weight:700;color:#19be6b" v-if="scoped.row.status">开启</el-row>
            <el-row style="font-weight:700;color:#f50" v-else>关闭</el-row>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="selectedJizan(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-pagination
          background
          layout="total,prev,pager,next"
          :current-page.sync="pagination.page"
          :total="pagination.rowCount"
          :page-size="pagination.pageSize"
          @current-change="changePage"
          style="float:right;margin:24px 0"
        ></el-pagination>
      </el-row>
      <p slot="footer"></p>
    </el-dialog>
    <!-- 小程序 -->
    <el-dialog
      title="小程序"
      :visible.sync="wxaModal"
      width="800px"
      top="20px"
      :modal-append-to-body="false"
    >
      <el-alert
        title="提示"
        :closable="false"
        show-icon
        v-show="!wxaData.length"
        style="margin-bottom:24px"
      >
        <p>暂无小程序，请先去
          <nuxt-link to="/miniapps">设置小程序</nuxt-link>
        </p>
      </el-alert>
      <el-table :data="wxaData" stripe>
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="appid" label="appid" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="selectWxa(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-pagination
          background
          layout="total,prev,pager,next"
          :current-page.sync="pagination.page"
          :total="pagination.rowCount"
          :page-size="pagination.pageSize"
          @current-change="changePage"
          style="float:right;margin:24px 0"
        ></el-pagination>
      </el-row>
      <p slot="footer"></p>
    </el-dialog>
    <!-- 拨号 -->
    <el-dialog
      title="拨号"
      :visible.sync="phoneModal"
      width="800px"
      top="20px"
      :modal-append-to-body="false"
    >
      <el-alert
        title="提示"
        :closable="false"
        show-icon
        v-show="!phoneData.length"
        style="margin-bottom:24px"
      >
        <p>暂无联系人，请先去
          <nuxt-link to="/contacts">设置联系人</nuxt-link>
        </p>
      </el-alert>
      <el-table :data="phoneData" stripe>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="phone" label="电话" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="selectPhone(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-pagination
          background
          layout="total,prev,pager,next"
          :current-page.sync="pagination.page"
          :total="pagination.rowCount"
          :page-size="pagination.pageSize"
          @current-change="changePage"
          style="float:right;margin:24px 0"
        ></el-pagination>
      </el-row>
      <p slot="footer"></p>
    </el-dialog>
    <!-- 小程序插件 -->
    <el-dialog
      title="小程序插件"
      :visible.sync="pluginModal"
      width="800px"
      top="20px"
      :modal-append-to-body="false"
    >
      <el-alert
        title="提示"
        :closable="false"
        show-icon
        v-show="!pluginData.length"
        style="margin-bottom:24px"
      >
        <p>暂无小程序插件，请先去
          <nuxt-link to="/plugin">设置小程序插件</nuxt-link>
        </p>
      </el-alert>
      <el-table :data="pluginData" stripe>
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="appid" label="appid" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="selectPlugin(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-pagination
          background
          layout="total,prev,pager,next"
          :current-page.sync="pagination.page"
          :total="pagination.rowCount"
          :page-size="pagination.pageSize"
          @current-change="changePage"
          style="float:right;margin:24px 0"
        ></el-pagination>
      </el-row>
      <p slot="footer"></p>
    </el-dialog>
    <!-- 商品 -->
    <el-dialog
      title="选择商品"
      :visible.sync="showProduct"
      width="800px"
      top="20px"
      :modal-append-to-body="false"
    >
      <el-alert
        title="提示"
        :closable="false"
        show-icon
        v-show="!productData.length"
        style="margin-top:-24px"
      >
        <p>暂无商品，请先去
          <nuxt-link to="/plugin">设置商品</nuxt-link>
        </p>
      </el-alert>
      <el-row style="padding:24px;background:#f8f8f8;margin:10px 0">
        <el-col :span="13">
          <span style="font-size:14px">商品名称：</span>
          <el-input style="width:280px" v-model="keyword" size="small" placeholder="请输入关键字搜索"></el-input>
        </el-col>
        <el-col :span="10">
          <el-button type="primary" size="small" @click="searchProduct">搜索</el-button>
          <el-button type="text" size="small" @click="clearSearch">清空</el-button>
        </el-col>
      </el-row>
      <el-table :data="productData" stripe>
        <el-table-column label="商品" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.img_url" alt style="width:50px;height:50px">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="price" label="价格" align="center"></el-table-column>
        <el-table-column label="商品类型" align="center">
          <template slot-scope="scope">
            <el-tag size="mini" v-if="scope.row.type == 0">普通商品</el-tag>
            <el-tag size="mini" type="warning" v-if="scope.row.type == 1">分销商品</el-tag>
            <el-tag size="mini" type="danger" v-else-if="scope.row.type == 2">拼团商品</el-tag>
            <el-tag size="mini" type="info" v-else-if="scope.row.type == 3">预售商品</el-tag>
            <el-tag size="mini" type="success" v-else-if="scope.row.type == 4">集赞商品</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="selectProduct(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-pagination
          background
          layout="total,prev,pager,next"
          :current-page.sync="pagination.page"
          :total="pagination.rowCount"
          :page-size="pagination.pageSize"
          @current-change="changePage"
          style="float:right;margin:24px 0"
        ></el-pagination>
      </el-row>
      <p slot="footer"></p>
    </el-dialog>
    <!-- 文章 -->
    <el-dialog
      title="选择文章"
      :visible.sync="showArticle"
      width="800px"
      top="20px"
      :modal-append-to-body="false"
    >
      <el-alert
        title="提示"
        :closable="false"
        show-icon
        v-show="!articleData.length"
        style="margin-top:-24px"
      >
        <p>暂无文章，请先去
          <nuxt-link to="/article">添加文章</nuxt-link>
        </p>
      </el-alert>
      <el-table :data="articleData" stripe style="margin-top:24px">
        <el-table-column prop="content" label="内容" header-align="center" width="400">
          <template slot-scope="scope">
            <div style="display:flex">
              <img
                :src="scope.row.img[0].img_url"
                alt
                style="width:120px;height:100px"
                v-if="scope.row.img.length"
              >
              <img src="/assets/default.png" alt style="width:120px;height:100px" v-else>
              <div style="flex:1;padding:0 7px">
                <el-row class="text_overflow text_overflow_line_1 title">{{scope.row.title}}</el-row>
                <el-row class="text_overflow text_overflow_line_2 info">{{scope.row.info}}</el-row>
                <el-row>
                  <el-col :span="8">{{scope.row.view_num}} 浏览量</el-col>
                  <el-col :span="8">{{scope.row.comment_num}} 评论数</el-col>
                  <el-col :span="8">{{scope.row.like_num}} 喜欢数</el-col>
                </el-row>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="pay_num" label="购买数" align="center"></el-table-column>
        <el-table-column prop="rank" label="排序" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scoped">
            <el-row style="font-weight:700;color:#19be6b" v-if="scoped.row.status">开启</el-row>
            <el-row style="font-weight:700;color:#f50" v-else>关闭</el-row>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="selectArticle(scope.row)"
              v-if="scope.row.status"
            >选择</el-button>
            <el-button type="text" v-else>-</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-pagination
          background
          layout="total,prev,pager,next"
          :current-page.sync="pagination.page"
          :total="pagination.rowCount"
          :page-size="pagination.pageSize"
          @current-change="changePage"
          style="float:right;margin:24px 0"
        ></el-pagination>
      </el-row>
      <p slot="footer"></p>
    </el-dialog>
    <!-- 投票 -->
    <el-dialog
      title="投票活动"
      :visible.sync="voteModal"
      width="800px"
      top="20px"
      :modal-append-to-body="false"
    >
      <el-alert
        title="提示"
        :closable="false"
        show-icon
        v-if="!voteData.length"
        style="margin-bottom:24px"
      >
        <p>暂无活动，请先去
          <nuxt-link to="/vote/config">设置活动</nuxt-link>
        </p>
      </el-alert>
      <el-table :data="voteData" stripe>
        <el-table-column prop="name" label="活动名称" align="center"></el-table-column>
        <el-table-column prop="time" label="时间" align="center">
          <template slot-scope="scoped">
            <el-row>{{format(scoped.row.started_at)}}</el-row>
            <el-row>{{format(scoped.row.ended_at)}}</el-row>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="selectedVote(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <p slot="footer"></p>
    </el-dialog>
  </el-row>
</template>
<script>
export default {
    props: {
        showModal: {
            default: false
        }
    },
    watch: {
        showModal(newVal, oldVal) {
            this.showLink = newVal;
            this.tabname = "1";
            if (newVal) {
                this.getPage();
            }
        }
    },
    data() {
        return {
            showLink: false,
            tabname: "1",
            pageData: [],
            //营销组件
            umpData: [
                {
                    id: 18,
                    name: "意见反馈",
                    icon: "/assets/feedback-img.png",
                    img: "/assets/ump_18.jpg",
                    status: true
                }
            ],
            umpSelect: 1,
            umpSelectIndex: 0,
            jizanModal: false,
            jizanData: [],
            pagination: {
                page: 1,
                pageCount: 0,
                pageSize: 0,
                rowCount: 0
            },
            wxaModal: false,
            wxaData: [],
            phoneModal: false,
            phoneData: [],
            pluginModal: false,
            pluginData: [],
            showProduct: false,
            keyword: "",
            productData: [],
            showArticle: false,
            articleData: [],
            voteModal: false,
            voteData: []
        };
    },
    created() {
        this.$hook.run("yingxiao", this.umpData, this);
    },
    methods: {
        changeTabs(tab) {
            this.pagination.page = 1;
            if (this.tabname == 1) {
                this.getPage();
            }
            if (this.tabname == 2) {
                this.umpSelect = 18;
            }
        },
        async getPage() {
            const page = await this.$axios.$get("/api/diy/home/page/index");
            if (page && page.errmsg === "ok") {
                this.pageData = page.data;
            }
        },
        //选择页面
        selectPage(item) {
            this.$emit("on-select", {
                targetUrl: "/pages/index/index?id=" + item.id,
                targetType: "page"
            });
        },
        //选择营销组件
        selectUmp(id,index) {
            this.umpSelect = id;
            this.umpSelectIndex = index;
        },
        okUmp() {
            this.pagination.page = 1;
            if (this.umpSelect == 1) {
                //社区
                this.$emit("on-select", {
                    targetUrl: "/pages/bbs/index/index",
                    targetType: "page"
                });
            }
            if (this.umpSelect == 2) {
                //集赞
                this.jizanModal = true;
                this.getJizan();
            }
            if (this.umpSelect == 3) {
                //文章
                this.$confirm("请选择跳转到 文章列表页 或 文章详情页", "提示", {
                    distinguishCancelAndClose: true,
                    confirmButtonText: "文章列表",
                    cancelButtonText: "文章详情"
                })
                    .then(() => {
                        this.$emit("on-select", {
                            targetUrl: "/pages/article/index",
                            targetType: "page"
                        });
                    })
                    .catch(action => {
                        if (action == "cancel") {
                            this.showArticle = true;
                            this.getArticle();
                        }
                    });
            }
            if (this.umpSelect == 4) {
                //小程序
                this.wxaModal = true;
                this.getWxa();
            }
            if (this.umpSelect == 5) {
                //拨号
                this.phoneModal = true;
                this.getPhone();
            }
            if (this.umpSelect == 6) {
                //到店付
                this.$emit("on-select", {
                    targetUrl: "/pages/bill/index",
                    targetType: "page"
                });
            }
            if (this.umpSelect == 7) {
                //wifi
                this.$emit("on-select", {
                    targetUrl: "/pages/wifi/index/index",
                    targetType: "page"
                });
            }
            if (this.umpSelect == 8) {
                //小程序插件
                this.pluginModal = true;
                this.getPlugin();
            }
            if (this.umpSelect == 9) {
                this.$emit("on-select", {
                    targetUrl: "添加到我的小程序",
                    targetType: "addMyMiniapp"
                });
            }
            if (this.umpSelect == 10) {
                //商品详情
                this.showProduct = true;
                this.getProduct();
            }
            if (this.umpSelect == 11) {
                //红包
                this.$emit("on-select", {
                    targetUrl: "/pages/shop/coupons/open/index",
                    targetType: "page"
                });
            }
            if (this.umpSelect == 12) {
                //我的
                this.$emit("on-select", {
                    targetUrl: "/pages/shop/user/index",
                    targetType: "switchTab"
                });
            }
            if (this.umpSelect == 13) {
                //购物车
                this.$emit("on-select", {
                    targetUrl: "/pages/shop/cart/index",
                    targetType: "switchTab"
                });
            }
            if (this.umpSelect == 14) {
                //会员卡
                this.$emit("on-select", {
                    targetUrl: "/pages/shop/user/getVip/index",
                    targetType: "page"
                });
            }
            if (this.umpSelect == 15) {
                //优惠券
                this.$confirm("请选择跳转到 领券中心 或 优惠券列表", "提示", {
                    distinguishCancelAndClose: true,
                    confirmButtonText: "优惠券列表",
                    cancelButtonText: "领券中心"
                })
                    .then(() => {
                        this.$emit("on-select", {
                            targetUrl: "/pages/shop/coupons/index",
                            targetType: "page"
                        });
                    })
                    .catch(action => {
                        if (action == "cancel") {
                            this.$emit("on-select", {
                                targetUrl:
                                    "/pages/shop/coupons/getCoupons/index",
                                targetType: "page"
                            });
                        }
                    });
            }
            if (this.umpSelect == 16) {
                //分销
                this.$emit("on-select", {
                    targetUrl: "/pages/fx/index",
                    targetType: "page"
                });
            }
            if (this.umpSelect == 17) {
                //客服聊天
                this.$emit("on-select", {
                    targetUrl: "contact",
                    targetType: "open"
                });
            }
            if (this.umpSelect == 18) {
                //意见反馈
                this.$emit("on-select", {
                    targetUrl: "feedback",
                    targetType: "open"
                });
            }
            if (this.umpSelect == 19) {
                //集赞
                this.voteModal = true;
                this.getVote();
            }
        },
        //集赞
        async getJizan() {
            let jizan_data = await this.$axios.$get(
                `/api/jizan/home/jizan/index?page=${this.pagination.page}`
            );
            if (jizan_data && jizan_data.errmsg === "ok") {
                this.jizanData = jizan_data.data.data;
                this.pagination = jizan_data.data.pagination;
            }
        },
        selectedJizan(item) {
            this.$emit("on-select", {
                targetUrl: `/pages/jizan/index?id=${item.id}`,
                targetType: "page"
            });
            this.jizanModal = false;
        },
        //投票
        async getVote() {
            let res = await this.$axios.$get(
                `/api/plugin/baas/vote/home/vote_config/fetchAll?where=status,1`
            );
            if (res && res.errmsg === "ok") {
                this.voteData = res.data;
            }
        },
        selectedVote(item) {
            this.$emit("on-select", {
                targetUrl: `/pages/vote/index/index?id=${item.id}`,
                targetType: "page"
            });
            this.voteModal = false;
        },
        //小程序列表
        async getWxa() {
            const res = await this.$axios.$get(
                `/api/miniapps/home/miniapps/index?page=${this.pagination.page}`
            );
            if (res && res.errmsg === "ok") {
                this.wxaData = res.data.data;
                this.pagination = res.data.pagination;
            }
        },
        selectWxa(item) {
            this.$emit("on-select", {
                targetUrl: item.appid,
                targetType: "wxa"
            });
            this.wxaModal = false;
        },
        //联系人列表
        async getPhone() {
            const res = await this.$axios.$get(
                `/api/contacts/home/contacts/index?page=${this.pagination.page}`
            );
            if (res && res.errmsg === "ok") {
                this.phoneData = res.data.data;
                this.pagination = res.data.pagination;
            }
        },
        selectPhone(item) {
            this.$emit("on-select", {
                targetUrl: item.phone,
                targetType: "tel"
            });
            this.phoneModal = false;
        },
        //小程序插件列表
        async getPlugin() {
            const res = await this.$axios.$get(
                `/api/wxaplugins/home/wxaplugins/index?page=${
                    this.pagination.page
                }`
            );
            if (res && res.errmsg === "ok") {
                this.pluginData = res.data.data;
            }
        },
        selectPlugin(item) {
            this.$emit("on-select", {
                targetUrl: item.appid,
                targetType: "plugin"
            });
            this.pluginModal = false;
        },
        changePage(page) {
            this.pagination.page = page;
            if (this.umpSelect == 2) {
                this.getJizan();
            }
            if (this.umpSelect == 3) {
                this.getArticle();
            }
            if (this.umpSelect == 4) {
                this.getWxa();
            }
            if (this.umpSelect == 5) {
                this.getPhone();
            }
            if (this.umpSelect == 8) {
                this.getPlugin();
            }
            if (this.umpSelect == 10) {
                this.getProduct();
            }
        },
        //商品
        async getProduct() {
            let url = `/api/shop/home/shop/product/product/index?page=${
                this.pagination.page
            }`;
            if (this.keyword) {
                url += `&keyword=${this.keyword}`;
            }
            const product = await this.$axios.$get(url);
            if (product && product.errmsg === "ok") {
                this.productData = product.data.data;
                this.pagination = product.data.pagination;
            }
        },
        //搜索
        searchProduct() {
            this.pagination.page = 1;
            this.getProduct();
        },
        clearSearch() {
            this.keyword = "";
            this.pagination.page = 1;
            this.getProduct();
        },
        selectProduct(row) {
            this.$emit("on-select", {
                targetUrl: `${
                    row.type == 2
                        ? "/pages/pintuan/product/index"
                        : "/pages/shop/product/product-detail/index"
                }?id=${row.id}`,
                targetType: "page"
            });
            this.showProduct = false;
        },
        //文章
        async getArticle() {
            const res = await this.$axios.$get(
                `/api/article/home/article/index?page=${this.pagination.page}`
            );
            if (res && res.errmsg === "ok") {
                this.articleData = res.data.data;
                this.pagination = res.data.pagination;
            }
        },
        selectArticle(row) {
            this.$emit("on-select", {
                targetUrl: `/pages/article/detail?id=${row.id}`,
                targetType: "page"
            });
            this.showArticle = false;
        },
        //取消
        cancel() {
            this.$emit("on-select", false);
        }
    }
};
</script>
<style scoped>
.ump {
    height: 450px;
    padding: 12px;
    border-right: 1px solid #eee;
    max-height: 500px;
    overflow: auto;
}

.ump::-webkit-scrollbar {
    display: none;
}

.ump-comp {
    width: 118px;
    height: 110px;
    padding: 10px 20px;
    border: 1px solid #eee;
    overflow: hidden;
    text-align: center;
    display: inline-block;
    margin-right: 12px;
    margin-bottom: 12px;
}

.ump-comp:nth-child(4n) {
    margin-right: 0;
}

.ump-comp img {
    width: 50px;
    height: 50px;
}
.title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 6px;
    color: rgb(70, 76, 91);
}
.info {
    color: rgb(101, 113, 128);
    font-size: 14px;
    height: 42px;
    margin-bottom: 10px;
}
</style>


