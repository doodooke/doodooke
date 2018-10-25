<template>
    <div id="layout">
        <qingful-header>
            <el-col slot="center" :span="14" :offset="3">
                <qingful-header-diy></qingful-header-diy>
            </el-col>

            <el-col slot="right" :span="3">
                <qingful-header-custom></qingful-header-custom>
            </el-col>
        </qingful-header>

        <div style="width: 1200px;margin: 0 auto;margin-top: 40px;min-height:500px;">

            <qingful-dashboard :menu="menu">
                <nuxt />
            </qingful-dashboard>
        </div>

        <qingful-footer></qingful-footer>
        <qingful-gotop></qingful-gotop>

        <qingful-pay-dialog></qingful-pay-dialog>
        <qingful-update-dialog></qingful-update-dialog>
    </div>
</template>

<script>
import Header from "./../components/Header.vue";
import HeaderDiy from "./../components/HeaderDiy.vue";
import HeaderCustom from "./../components/HeaderCustom.vue";
import Dashboard from "./../components/Dashboard.vue";
import Footer from "./../components/Footer.vue";
import GoTop from "../components/GoTop.vue";
import PayDialog from "../components/PayDialog.vue";
import UpdateDialog from "../components/UpdateDialog.vue";
export default {
    components: {
        "qingful-header": Header,
        "qingful-footer": Footer,
        "qingful-header-diy": HeaderDiy,
        "qingful-header-custom": HeaderCustom,
        "qingful-dashboard": Dashboard,
        "qingful-gotop": GoTop,
        "qingful-pay-dialog": PayDialog,
        "qingful-update-dialog": UpdateDialog
    },
    data() {
        return {
            menu: [
                {
                    name: "首页",
                    icon: "icon-gaishu1",
                    url: "/app/dashboard"
                },
                {
                    name: "商品",
                    icon: "icon-shangpin",
                    sub: [
                        {
                            name: "商品管理",
                            url: "/shop/product/product"
                        }
                    ]
                },
                {
                    name: "订单",
                    icon: "icon-dingdan",
                    sub: [
                        {
                            name: "订单管理",
                            url: "/shop/order/order"
                        },
                        {
                            name: "售后管理",
                            url: "/shop/order/service"
                        },
                        {
                            name: "评论管理",
                            url: "/shop/order/comment"
                        }
                    ]
                },
                {
                    name: "客户",
                    icon: "icon-kehu",
                    sub: [
                        {
                            name: "客户管理",
                            url: "/shop/user/user"
                        }
                    ]
                },
                {
                    name: "数据",
                    icon: "icon-tongji",
                    sub: [
                        {
                            name: "商品分析",
                            url: "/shop/analysis/product"
                        },
                        {
                            name: "交易分析",
                            url: "/shop/analysis/trade"
                        },
                        {
                            name: "客户分析",
                            url: "/shop/analysis/user"
                        }
                    ]
                },
                // {
                //     name: "资产",
                //     icon: "icon-zichan",
                //     sub: [
                //         {
                //             name: "资产概况",
                //             url: ""
                //         },
                //         {
                //             name: "账单明细",
                //             url: ""
                //         }
                //     ]
                // },
                {
                    name: "设置",
                    icon: "icon-shezhi",
                    sub: [
                        {
                            name: "店铺信息",
                            url: "/shop/setting"
                        }
                    ]
                },
                {
                    name: "营销",
                    icon: "",
                    img: "/assets/yingxiao.png",
                    marginTop: "40px",
                    url: "/app/ump"
                }
            ]
        };
    }
};
</script>