<template>
    <el-row @mouseenter.native='showBorder=true' @mouseleave.native='showBorder=false' class="components">
        <el-row class='border-select' v-show='itemData.id==$store.state.componentId'></el-row>
        <el-row class='border-select' v-show='showBorder'></el-row>
        <div style="width:375px;overflow:hidden">

            <div class="good_flex">
                <div style='width:375px;padding:0 12px;display:flex;align-items:center' :style='{
						height:formProps.height+"px",
						backgroundImage:formProps.theme_imgurl?`url(${formProps.theme_imgurl})`:"",
						backgroundSize:"100% 100%",
						backgroundRepeat:"no-repeat",
                        backgroundColor:formProps.theme_imgurl?"transparent":"#E6F2FF"
					}'>
                    <div style='display:flex;align-items:center;padding:0 12px'>
                        <div>
                            <img :src="formProps.shop_logo" class='shop_logo' v-if="formProps.shop_logo">
                            <div v-else style="background-color:#f8f8f8;text-align: center;width:60px;height:60px;line-height:60px;border-radius:5px">
                                <i class="iconfont" style="color:#fff;font-size:40px;">&#xe77d;</i>
                            </div>
                        </div>
                        <div style='width:270px;margin-left: 9px'>
                            <div class='text_ellipsis shop_name'>{{formProps.shop_name || "店铺名称"}}</div>
                            <div class='text_ellipsis shop_sub'>{{formProps.shop_sub || "店铺简介"}}</div>
                        </div>
                    </div>
                </div>
                <div style='display: flex;background:#fff;padding-top: 6px;padding-left:6px' v-if='products.length'>
                    <!-- 商品列表-->
                    <div class='good_wrap' v-for='(item,index) in products' :key='index'>
                        <div style='width:108px;height: 108px;margin-right:6px;position:relative;line-height: 1'>
                            <img :src="item.img_url">
                            <div v-show='formProps.label_icon!=0'>
                                <i class='iconfont' :class='{
										"icon-biaoqian8":formProps.label_icon==1,
										"icon-biaoqian":formProps.label_icon==2,
										"icon-biaoqian4":formProps.label_icon==3,
										"icon-biaoqian1":formProps.label_icon==4,
										"icon-biaoqian11":formProps.label_icon==5}' style='position:absolute;left:0;top:2px;font-size:60px' :style='{color:formProps.label_icon_color}'>
                                </i>
                                <div style='width:26px;text-align: center;position:absolute;font-size:12px' :style='{
									color:formProps.label_color,
									top:formProps.label_icon==3?"9px":(formProps.label_icon==4||formProps.label_icon==5?"7px":"16px"),
									left:formProps.label_icon==1?"4px":(formProps.label_icon==2?"10px":"2px"),
									transform:(formProps.label_icon==3||formProps.label_icon==4||formProps.label_icon==5)?"rotate(-45deg)":"",
									}'>{{formProps.label_name}}
                                </div>
                            </div>
                        </div>
                        <div style='padding:10px 7px;width:108px;position:relative;overflow:hidden' :style='{textAlign:formProps.product_type==1?"center":"left"}'>
                            <div class='text_ellipsis' style='font-size:14px;color:#222;margin-bottom: 5px'>{{item.name}}</div>
                            <div class='good_price'>
                                <span class='good_price_symbol'>¥</span>{{item.price}}
                            </div>

                            <div style='position:absolute;right:3px;bottom:7px;line-height: 1' v-show='formProps.product_type==0'>
                                <i class='iconfont' :class='{
										"icon-cart1":formProps.cart_icon==0,
										"icon-cart3":formProps.cart_icon==1,
										"icon-cart":formProps.cart_icon==2,
										"icon-cart2":formProps.cart_icon==3,
										"icon-gouwuche6":formProps.cart_icon==4,
										"icon-gouwuche5":formProps.cart_icon==5}' style='font-size:30px' :style='{color:formProps.cart_icon_color}'></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div style='display: flex;background:#fff;padding-top: 6px;padding-left:6px' v-else>
                    <!-- 商品列表-->
                    <div class='good_wrap' v-for='(item,index) in 4' :key='index'>
                        <div style='width:108px;height: 108px;margin-right:6px;position:relative;line-height: 1'>
                            <div style="background-color:#E6F2FF;text-align: center;width:100%;height:100%;line-height:108px;">
                                <i class="iconfont" style="color:#fff;font-size:68px;">&#xe77d;</i>
                            </div>
                            <div v-show='formProps.label_icon!=0'>
                                <i class='iconfont' :class='{
										"icon-biaoqian8":formProps.label_icon==1,
										"icon-biaoqian":formProps.label_icon==2,
										"icon-biaoqian4":formProps.label_icon==3,
										"icon-biaoqian1":formProps.label_icon==4,
										"icon-biaoqian11":formProps.label_icon==5}' style='position:absolute;left:0;top:2px;font-size:60px' :style='{color:formProps.label_icon_color}'>
                                </i>
                                <div style='width:26px;text-align: center;position:absolute;font-size:12px' :style='{
									color:formProps.label_color,
									top:formProps.label_icon==3?"9px":(formProps.label_icon==4||formProps.label_icon==5?"7px":"16px"),
									left:formProps.label_icon==1?"4px":(formProps.label_icon==2?"10px":"2px"),
									transform:(formProps.label_icon==3||formProps.label_icon==4||formProps.label_icon==5)?"rotate(-45deg)":"",
									}'>{{formProps.label_name}}
                                </div>
                            </div>
                        </div>
                        <div style='padding:10px 7px;width:108px;position:relative;overflow:hidden' :style='{textAlign:formProps.product_type==1?"center":"left"}'>
                            <div class='text_ellipsis' style='font-size:14px;color:#222;margin-bottom: 5px'>商品名称</div>
                            <div class='good_price'>
                                <span class='good_price_symbol'>¥</span>100
                            </div>

                            <div style='position:absolute;right:3px;bottom:7px;line-height: 1' v-show='formProps.product_type==0'>
                                <i class='iconfont' :class='{
										"icon-cart1":formProps.cart_icon==0,
										"icon-cart3":formProps.cart_icon==1,
										"icon-cart":formProps.cart_icon==2,
										"icon-cart2":formProps.cart_icon==3,
										"icon-gouwuche6":formProps.cart_icon==4,
										"icon-gouwuche5":formProps.cart_icon==5}' style='font-size:30px' :style='{color:formProps.cart_icon_color}'></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-row v-if="itemData.id==$store.state.componentId" class="config" :style="{left: configOffsetLeft + 'px'}">
            <el-row class="config-title">店铺商品</el-row>
            <el-form label-width="100px">
                <el-tabs type="card">
                    <el-tab-pane label="内容" name="0">
                        <el-button size="small" @click="selectShop" style="margin-bottom:10px">选择店铺</el-button>
                        <el-button size="small" @click="addProduct" style="margin-bottom:10px" v-if="appToken">添加商品</el-button>
                        <el-row class="product-list" style="margin-bottom:5px" v-for="(item,index) in products" :key="index">
                            <el-col :span="4">
                                <img :src="item.img_url" alt="">
                            </el-col>
                            <el-col :span="19">
                                <el-row class="product-list text_ellipsis">名称：{{item.name}}</el-row>
                                <el-row class="product-list" style="margin-top:5px">价格：¥{{item.price}}</el-row>
                            </el-col>
                            <i class="el-icon-circle-close" @click="delProduct(index)"></i>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="样式" name="1">
                        <el-form-item label="背景图片" required>
                            <div class="upload-list" v-if='formProps.theme_imgurl'>
                                <img :src="formProps.theme_imgurl">
                                <div class="upload-list-cover">
                                    <i class="el-icon-edit" @click="handleEdit"></i>
                                    <i class="el-icon-delete" @click="handleDel"></i>
                                </div>
                            </div>
                            <div @click='uploadImg' class='upload-img' v-else>
                                <i class='el-icon-upload'></i>
                            </div>
                            <div style='clear: both'>最佳尺寸：375*{{formProps.height}}px</div>
                        </el-form-item>
                        <el-form-item label="图片高度">
                            <el-slider v-model="formProps.height" :min="70" :max="300" show-input></el-slider>
                        </el-form-item>
                        <el-form-item label="商品样式">
                            <el-radio-group v-model="formProps.product_type" size="small">
                                <el-radio-button :label="0">居左</el-radio-button>
                                <el-radio-button :label="1">居中</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="购物车样式">
                            <el-radio-group v-model="formProps.cart_icon" size="small">
                                <el-radio :label="0">样式一</el-radio>
                                <el-radio :label="1">样式二</el-radio>
                                <el-radio :label="2">样式三</el-radio>
                                <el-radio :label="3" style="margin-left:0">样式四</el-radio>
                                <el-radio :label="4">样式五</el-radio>
                                <el-radio :label="5">样式六</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="购物车颜色">
                            <el-color-picker v-model="formProps.cart_icon_color"></el-color-picker>
                        </el-form-item>
                        <el-form-item label="标签样式">
                            <el-radio-group v-model="formProps.label_icon" size="small">
                                <el-radio :label="0">无样式</el-radio>
                                <el-radio :label="1">样式一</el-radio>
                                <el-radio :label="2">样式二</el-radio>
                                <el-radio :label="3" style="margin-left:0">样式三</el-radio>
                                <el-radio :label="4">样式四</el-radio>
                                <el-radio :label="5">样式五</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="标签颜色" v-show='formProps.label_icon!=0'>
                            <el-color-picker v-model="formProps.label_icon_color"></el-color-picker>
                        </el-form-item>
                        <el-form-item label="标签名称" v-show='formProps.label_icon!=0'>
                            <el-input v-model="formProps.label_name" :maxlength="2" clearable size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="标签文字颜色" v-show='formProps.label_icon!=0'>
                            <el-color-picker v-model="formProps.label_color"></el-color-picker>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
                <el-form-item style="text-align:right">
                    <el-button size="mini" @click.stop="cancel">取消</el-button>
                    <el-button type="primary" size="mini" plain @click.stop="save">保存</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row class="config-arrow" v-if="itemData.id==$store.state.componentId" :style="{left: configOffsetLeft - 6 + 'px'}"></el-row>
        <el-row class="config-del">
            <span style="margin-right:3px" @click.stop="copyComponent">复制</span>
            <span @click.stop="delComponent">删除</span>
        </el-row>
        <!-- 店铺列表 -->
        <el-dialog title="选择店铺" :visible.sync="showShopModal" top="10px" width="800px">
            <el-table :data="shopData" stripe style="margin-top:10px">
                <el-table-column label="店铺信息" width="290" header-align="center">
                    <template slot-scope="scope">
                        <div style="display:flex">
                            <img :src="scope.row.subShop.img_url" alt="" style="width:100px;height:100px" v-if="scope.row.subShop.img_url">
                            <img src="/assets/default.png" alt="" style="width:100px;height:100px" v-else>
                            <div style="flex:1;padding:0 7px">
                                <el-row class="text_overflow text_overflow_line_1 title">名称：{{scope.row.subShop.name}}</el-row>
                                <el-row class="text_overflow text_overflow_line_2" style="height:44px">简介：{{scope.row.subShop.info || "-"}}</el-row>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="店铺电话" header-align="center">
                    <template slot-scope="scope">
                        <el-row>{{scope.row.subShop.tel}}</el-row>
                    </template>
                </el-table-column>
                <el-table-column label="店铺地址" header-align="center">
                    <template slot-scope="scope">
                        <el-row>{{scope.row.subShop.address}}</el-row>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="100">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="shopSelected(scope.row)">选择</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row style="margin-top:10px">
                <el-col :span="24" style="text-align:right">
                    <el-pagination background layout="total,prev,pager,next" :total="shopPage.rowCount" :page-size="shopPage.pageSize" @current-change="changeShopPage"></el-pagination>
                </el-col>
            </el-row>
        </el-dialog>
        <!-- 商品列表 -->
        <el-dialog title="选择商品" :visible.sync="showModal" top="10px" width="800px">
            <el-row style="padding:10px 24px;background:#f8f8f8;margin-top:-24px">
                <el-col :span="24">
                    <span style="font-size:14px">商品名称：</span>
                    <el-input style="width:300px" v-model="keyword" size="small" placeholder="请输入关键字搜索"></el-input>
                </el-col>
                <el-col :span="24" style="margin-top:10px">
                    <el-button type="primary" size="small" @click="searchProduct" style="margin-left:70px">搜索</el-button>
                    <el-button type="text" size="small" @click="clearSearch">清空</el-button>
                </el-col>
            </el-row>
            <el-table :data="productData" stripe style="margin-top:10px" @selection-change="selectionChange">
                <el-table-column type="selection" width="50">
                </el-table-column>
                <el-table-column label="商品" header-align="center" align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.img_url" alt="" style="width:50px;height:50px">
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="名称" header-align="center" align="center">
                </el-table-column>
                <el-table-column prop="price" label="价格" header-align="center" align="center">
                </el-table-column>
                <el-table-column label="类型" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-tag size="mini" v-if="scope.row.type == 0">普通商品</el-tag>
                        <el-tag size="mini" type="warning" v-if="scope.row.type == 1">分销商品</el-tag>
                        <el-tag size="mini" type="danger" v-else-if="scope.row.type == 2">拼团商品</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" header-align="center" align="center">
                    <template slot-scope="scoped">
                        <el-row style="font-weight:700;color:#19be6b" v-if="scoped.row.status">开启</el-row>
                        <el-row style="font-weight:700;color:#f50" v-else>关闭</el-row>
                    </template>
                </el-table-column>
            </el-table>
            <el-row style="margin-top:10px">
                <el-col :span="12">
                    <el-button size="small" type="primary" @click="handleOk">选取</el-button>
                    <el-button size="small" @click="handleCancel">取消</el-button>
                </el-col>
                <el-col :span="12" style="text-align:right">
                    <el-pagination background layout="total,prev,pager,next" :total="pagination.rowCount" :page-size="pagination.pageSize" @current-change="changePage"></el-pagination>
                </el-col>
            </el-row>
        </el-dialog>
        <Upload :show="showUpload" @on-selected="selectImg" @on-cancel="cancelUpload"></Upload>
    </el-row>
</template>

<script>
import axios from "axios";
export default {
    props: {
        itemData: {
            default: {}
        }
    },
    data() {
        return {
            showBorder: false,
            configOffsetLeft: 0,
            showUpload: false,
            showModal: false,
            productData: [],
            pagination: {
                page: 1
            },
            keyword: "",
            selectProduct: [],
            shopData: [],
            shopPage: {},
            showShopModal: false,
            formProps: {},
            formRelations: [],
            formPropsDefault: {
                product_id: [], // 商品id集合
                product_type: 0, // 商品样式
                // style_type: 0, //样式
                theme_imgurl: "", //主题背景
                shop_id: 0, //店铺id
                shop_logo: "", //店铺logo
                shop_sub: "", //店铺活动简介
                shop_name: "", //店铺名称
                label_name: "新品", // 标签名称
                label_color: "#fff", // 标签颜色
                label_icon: 0, // 标签样式
                label_icon_color: "#f40", // 图标颜色
                cart_icon: 0, // 购物车样式
                cart_icon_color: "#f40", // 购物车颜色
                height: 100
            },
            products: [],
            appToken: ""
        };
    },
    watch: {
        itemData(val) {
            this.formProps = Object.assign(
                {},
                this.formPropsDefault,
                this.itemData.props ? JSON.parse(this.itemData.props) : {}
            );
            this.configOffsetLeft = this.getDiyComponentConfigOffset(this.$el);
            this.products = [];
            if (this.itemData.relation) {
                this.formRelations = this.itemData.relation;
                if (this.formRelations.length) {
                    for (let key in this.formRelations) {
                        if (
                            this.formRelations[key].relation_type ==
                            "shop_product"
                        ) {
                            this.products.push({
                                name: this.formRelations[key].relation.name,
                                info: this.formRelations[key].relation.info,
                                price: this.formRelations[key].relation.price,
                                price_org: this.formRelations[key].relation
                                    .price_org,
                                sale: this.formRelations[key].relation.sale,
                                img_url: this.formRelations[key].relation
                                    .img_url,
                                type: this.formRelations[key].relation.type
                            });
                        }
                        if (this.formRelations[key].relation_type == "shop") {
                            this.formProps.shop_id = this.formRelations[
                                key
                            ].relation.id;
                            this.formProps.shop_logo = this.formRelations[
                                key
                            ].relation.img_url;
                            this.formProps.shop_sub = this.formRelations[
                                key
                            ].relation.info;
                            this.formProps.shop_name = this.formRelations[
                                key
                            ].relation.name;
                        }
                    }
                }
            }
        }
    },
    mounted() {
        this.formProps = Object.assign(
            {},
            this.formPropsDefault,
            this.itemData.props ? JSON.parse(this.itemData.props) : {}
        );
        this.configOffsetLeft = this.getDiyComponentConfigOffset(this.$el);

        if (this.itemData.relation) {
            this.formRelations = this.itemData.relation;
            if (this.formRelations.length) {
                for (let key in this.formRelations) {
                    if (
                        this.formRelations[key].relation_type == "shop_product"
                    ) {
                        this.products.push({
                            name: this.formRelations[key].relation.name,
                            info: this.formRelations[key].relation.info,
                            price: this.formRelations[key].relation.price,
                            price_org: this.formRelations[key].relation
                                .price_org,
                            sale: this.formRelations[key].relation.sale,
                            img_url: this.formRelations[key].relation.img_url,
                            type: this.formRelations[key].relation.type
                        });
                    }
                    if (this.formRelations[key].relation_type == "shop") {
                        this.formProps.shop_id = this.formRelations[
                            key
                        ].relation.id;
                        this.formProps.shop_logo = this.formRelations[
                            key
                        ].relation.img_url;
                        this.formProps.shop_sub = this.formRelations[
                            key
                        ].relation.info;
                        this.formProps.shop_name = this.formRelations[
                            key
                        ].relation.name;
                    }
                }
            }
        }
    },
    methods: {
        uploadImg() {
            this.showUpload = true;
        },
        handleEdit() {
            this.showUpload = true;
        },
        selectImg(res) {
            this.showUpload = false;
            if (res.id > 0) {
                this.formProps.theme_imgurl = res.url;
            }
        },
        cancelUpload() {
            this.showUpload = false;
        },
        handleDel() {
            this.formProps.theme_imgurl = "";
        },
        //选择店铺
        selectShop() {
            this.showShopModal = true;
            this.getShopLIst();
        },
        async getShopLIst() {
            const res = await this.$axios.$get(
                `/api/multi/home/shop/list?page=${this.pagination.page}`
            );
            if (res && res.errmsg === "ok") {
                this.shopData = res.data.data;
                this.shopPage = res.data.pagination;
            }
        },
        changeShopPage(page) {
            this.shopPage.page = page;
            this.getShopLIst();
        },
        shopSelected(row) {
            this.showShopModal = false;
            this.formProps.shop_id = row.subShop.id;
            this.formProps.shop_logo = row.subShop.img_url;
            this.formProps.shop_sub = row.subShop.info;
            this.formProps.shop_name = row.subShop.name;
            this.appToken = row.subToken;
            this.products = [];
            this.formProps.product_id = [];
        },
        //添加商品
        addProduct() {
            this.showModal = true;
            this.getProduct();
        },
        handleCancel() {
            this.showModal = false;
        },
        //商品列表
        async getProduct() {
            let url = `/api/shop/home/shop/product/product/index?page=${
                this.pagination.page
            }`;
            if (this.keyword) {
                url += `&keyword=${this.keyword}`;
            }

            axios({
                headers: {
                    PageToken: this.$cookies.get("PageToken"),
                    ProjectToken: this.$cookies.get("ProjectToken"),
                    Token: this.$cookies.get("Token"),
                    AppToken: this.appToken
                },
                method: "get",
                url: url
            }).then(res => {
                if (res.data && res.data.errmsg === "ok") {
                    this.productData = res.data.data.data;
                    // for (let key in this.productData) {
                    //     if (
                    //         this.productData[key].sku_status &&
                    //         this.productData[key].sku.length
                    //     ) {
                    //         this.productData[key].price = Math.min.apply(
                    //             Math,
                    //             this.productData[key].sku.map(function(o) {
                    //                 return o.price;
                    //             })
                    //         );
                    //     }
                    // }
                    this.pagination = res.data.data.pagination;
                }
            });
        },
        changePage(page) {
            this.pagination.page = page;
            this.getProduct();
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
        //选择商品
        selectionChange(val) {
            this.selectProduct = val;
        },
        handleOk() {
            if (this.selectProduct.length) {
                for (let key in this.selectProduct) {
                    this.formProps.product_id.push(this.selectProduct[key].id);

                    // if (
                    //     this.selectProduct[key].sku_status &&
                    //     this.selectProduct[key].sku.length
                    // ) {
                    //     this.selectProduct[key].price = Math.min.apply(
                    //         Math,
                    //         this.selectProduct[key].sku.map(function(o) {
                    //             return o.price;
                    //         })
                    //     );
                    // }

                    this.products.push({
                        id: this.selectProduct[key].id,
                        price_org: this.selectProduct[key].price_org,
                        img_url: this.selectProduct[key].img_url,
                        name: this.selectProduct[key].name,
                        info: this.selectProduct[key].info,
                        price: this.selectProduct[key].price,
                        sale: this.selectProduct[key].sale,
                        type: this.selectProduct[key].type
                    });
                }
            }
            this.showModal = false;
        },
        //删除商品
        delProduct(index) {
            this.formProps.product_id.splice(index, 1);
            this.products.splice(index, 1);
        },
        cancel() {
            this.$store.commit("SET_COMPONENT_ID", 0);
        },
        save() {
            let data = {
                id: this.itemData.id,
                name: "multi",
                props: JSON.stringify(this.formProps),
                relations: [
                    {
                        product_id: this.formProps.product_id,
                        shop_id: this.formProps.shop_id
                    }
                ]
            };
            this.$emit("save-comp", data);
            this.$store.commit("SET_COMPONENT_ID", 0);
        },
        delComponent() {
            this.$confirm("是否删除该组件", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$emit("del-comp", this.itemData);
                })
                .catch(() => {});
        },
        copyComponent() {
            this.$emit("copy-comp", this.itemData);
        }
    }
};
</script>
<style scoped>
.product-list {
    border: 1px solid #eee;
    padding: 5px;
    font-size: 12px;
    position: relative;
}
.product-list img {
    width: 60px;
    height: 60px;
    display: block;
}
.product-list i {
    font-size: 18px;
    color: #ccc;
    position: absolute;
    right: 3px;
    top: 0;
}
.good_flex {
    overflow: hidden;
}
.good_price_symbol {
    font-size: 13px;
}
.good_price {
    font-size: 15px;
    margin-right: 5px;
    color: #f22823;
}
.good_name {
    font-size: 17px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.good_wrap img {
    width: 100%;
    height: 100%;
}
.shop_logo {
    width: 60px;
    height: 60px;
    margin: 5px auto;
    border-radius: 5px;
}
.shop_name {
    font-size: 16px;
    color: #fff;
    line-height: 22px;
    height: 22px;
}
.shop_sub {
    font-size: 14px;
    color: #fff;
    line-height: 20px;
    height: 22px;
}
</style>
