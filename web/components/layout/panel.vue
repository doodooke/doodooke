<template>
    <el-row @mouseenter.native='showBorder=true' @mouseleave.native='showBorder=false' class="components">
        <el-row class='border-select' v-show='itemData.id==$store.state.componentId'></el-row>
        <el-row class='border-select' v-show='showBorder'></el-row>
        <el-row style="padding:20px 2px 0">
            <el-row :style="{paddingTop:formProps.paddingTop+'px',paddingBottom:formProps.paddingBottom+'px',paddingLeft:formProps.paddingLeft+'px',paddingRight:formProps.paddingRight+'px'}">
                <draggable v-model='componentData' :options="{group:'diy'}" @change='changeComponent' class="layout-components">
                    <transition-group tag="ul" style='width:auto;min-height:100px;padding:0'>
                        <component v-for='(item,index) in componentData' :key='index' :is='item.component' :item-data="item.data" @click.native.stop='clickComponent(item)' @save-comp='addData' @del-comp="delSubComponent" @copy-comp="copySubComponent">
                        </component>
                    </transition-group>
                </draggable>
            </el-row>
        </el-row>
        <el-row v-if="itemData.id==$store.state.componentId" class="config" :style="{left: configOffsetLeft + 'px'}">
            <el-row class="config-title">面板</el-row>
            <el-form label-width="80px">
                <el-form-item label="名称">
                    <el-input v-model="formProps.name"></el-input>
                </el-form-item>
                <el-form-item label="上边距">
                    <el-slider v-model="formProps.paddingTop" :min="0" :max="50" show-input></el-slider>
                </el-form-item>
                <el-form-item label="下边距">
                    <el-slider v-model="formProps.paddingBottom" :min="0" :max="50" show-input></el-slider>
                </el-form-item>
                <el-form-item label="左边距">
                    <el-slider v-model="formProps.paddingLeft" :min="0" :max="50" show-input></el-slider>
                </el-form-item>
                <el-form-item label="右边距">
                    <el-slider v-model="formProps.paddingRight" :min="0" :max="50" show-input></el-slider>
                </el-form-item>
                <el-form-item style="text-align:right">
                    <el-button size="mini" @click.stop="cancel">取消</el-button>
                    <el-button type="primary" size="mini" plain @click.stop="save">保存</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row class="config-arrow" v-if="itemData.id==$store.state.componentId" :style="{left: configOffsetLeft - 6 + 'px'}"></el-row>
        <el-row class="config-del">
            <span style="margin-right:3px" @click.stop="copyComponent">复制</span>
            <span @click.stop="delComponent(itemData)">删除</span>
        </el-row>
    </el-row>
</template>

<script>
import draggable from "vuedraggable";
//基础
import Empty from "../../components/basic/empty.vue";
import Richtext from "../../components/basic/richtext.vue";
import Image from "../../components/basic/image.vue";
import Button from "../../components/basic/button.vue";
import Title from "../../components/basic/title.vue";
import Video from "../../components/basic/video.vue";
import Swiper from "../../components/basic/swiper.vue";
import Notice from "../../components/basic/notice.vue";
import Line from "../../components/basic/line.vue";
//布局
import Flex from "../../components/layout/flex.vue";
import Panel from "../../components/layout/panel.vue";
//组合
import Menus from "../../components/combine/menu.vue";
import Mendian from "../../components/combine/mendian.vue";
import Article from "../../components/combine/article.vue";
import Contacts from "../../components/combine/contacts.vue";
import Web from "../../components/combine/web.vue";
import Form from "../../components/combine/form.vue";
//零售
import Product from "../../components/shop/product.vue";
import Search from "../../components/shop/search.vue";

export default {
    props: {
        itemData: {
            default: {}
        }
    },
    components: {
        draggable
    },
    data() {
        return {
            showBorder: false,
            configOffsetLeft: 0,
            componentData: [],
            contents: [
                {
                    title: "基础",
                    status: 1,
                    sub: [
                        {
                            title: "文本",
                            icon: "icon-wenben",
                            name: "richtext",
                            rank: 0,
                            pid: 0,
                            component: Richtext,
                            data: {},
                            status: true
                        },
                        {
                            title: "图片",
                            icon: "icon-tupian1",
                            name: "image",
                            rank: 0,
                            pid: 0,
                            component: Image,
                            data: {},
                            status: true
                        },
                        {
                            title: "按钮",
                            icon: "icon-anniu",
                            name: "button",
                            rank: 0,
                            pid: 0,
                            component: Button,
                            data: {},
                            status: true
                        },
                        {
                            title: "标题",
                            icon: "icon-biaoti",
                            name: "title",
                            rank: 0,
                            pid: 0,
                            component: Title,
                            data: {},
                            status: true
                        },
                        // {
                        //     title: "音乐",
                        //     name: "music",
                        //     icon: "icon-yinle",
                        //     status: true
                        // },
                        {
                            title: "视频",
                            icon: "icon-shipin",
                            name: "video",
                            rank: 0,
                            pid: 0,
                            component: Video,
                            data: {},
                            status: true
                        },
                        {
                            title: "轮播",
                            icon: "icon-lunbo",
                            name: "swiper",
                            rank: 0,
                            pid: 0,
                            component: Swiper,
                            data: {},
                            status: true
                        },
                        {
                            title: "公告",
                            icon: "icon-gonggao",
                            name: "notice",
                            rank: 0,
                            pid: 0,
                            component: Notice,
                            data: {},
                            status: true
                        },
                        {
                            title: "分割线",
                            icon: "icon-fengexian",
                            name: "line",
                            rank: 0,
                            pid: 0,
                            component: Line,
                            data: {},
                            status: true
                        },
                        {
                            title: "空白",
                            icon: "icon-kongbai",
                            name: "empty",
                            rank: 0,
                            pid: 0,
                            component: Empty,
                            data: {},
                            status: true
                        }
                    ]
                },
                {
                    title: "布局",
                    status: true,
                    sub: [
                        {
                            title: "双栏",
                            icon: "icon-shuanglan",
                            name: "flex",
                            rank: 0,
                            pid: 0,
                            component: Flex,
                            data: {},
                            status: true
                        },
                        {
                            title: "面板",
                            icon: "icon-mianban",
                            name: "panel",
                            rank: 0,
                            pid: 0,
                            component: Panel,
                            data: {},
                            status: true
                        }
                        // {
                        //     title: "弹框",
                        //     icon: "icon-dankuang",
                        //     status: true
                        // }
                    ]
                },
                {
                    title: "组合",
                    status: true,
                    sub: [
                        {
                            title: "菜单",
                            icon: "icon-kuaijiecaidan",
                            name: "menu",
                            rank: 0,
                            pid: 0,
                            component: Menus,
                            data: {},
                            status: true
                        },
                        {
                            title: "门店",
                            icon: "icon-mendian",
                            name: "mendian",
                            rank: 0,
                            pid: 0,
                            component: Mendian,
                            data: {},
                            status: true
                        },
                        {
                            title: "文章",
                            icon: "icon-wenzhang1",
                            name: "article",
                            rank: 0,
                            pid: 0,
                            component: Article,
                            data: {},
                            status: true
                        },
                        {
                            title: "通讯录",
                            icon: "icon-tongxunlu",
                            name: "contacts",
                            rank: 0,
                            pid: 0,
                            component: Contacts,
                            data: {},
                            status: true
                        },
                        {
                            title: "表单",
                            icon: "icon-biaodan1",
                            name: "form",
                            rank: 0,
                            pid: 0,
                            component: Form,
                            data: {},
                            status: true
                        },
                        {
                            title: "网页",
                            icon: "icon-wangye",
                            name: "web",
                            rank: 0,
                            pid: 0,
                            component: Web,
                            data: {},
                            status: true
                        }
                    ]
                },
                {
                    title: "商城",
                    status:
                        this.$cookies.get("layout") == "shop" ? true : false,
                    sub: [
                        {
                            title: "商品",
                            icon: "icon-shangpin1",
                            name: "product",
                            rank: 0,
                            pid: 0,
                            component: Product,
                            data: {},
                            status: true
                        },
                        {
                            title: "搜索框",
                            icon: "icon-sousuo",
                            name: "search",
                            rank: 0,
                            pid: 0,
                            component: Search,
                            data: {},
                            status: true
                        }
                    ]
                }
            ],
            formProps: {},
            formRelations: [],
            formPropsDefault: {
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingBottom: 0,
                name: ""
            }
        };
    },
    mounted() {
        this.formProps = Object.assign(
            {},
            this.formPropsDefault,
            this.itemData.props ? JSON.parse(this.itemData.props) : {}
        );
        this.formRelations = this.itemData.relation;
        this.configOffsetLeft = this.getDiyComponentConfigOffset(this.$el);
        this.getSubComponent();
        this.$bus.on("updateData", this.getSubComponent);
    },
    methods: {
        cancel() {
            this.$store.commit("SET_COMPONENT_ID", 0);
        },
        save() {
            let data = {
                id: this.itemData.id,
                pid: this.itemData.pid,
                props: JSON.stringify(this.formProps)
            };
            this.$emit("save-comp", data);
            this.$store.commit("SET_COMPONENT_ID", 0);
        },
        async delComponent(item) {
            this.$confirm("是否删除该组件", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$emit("del-comp", item);
                })
                .catch(() => {});
        },
        copyComponent() {
            this.$emit("copy-comp", this.itemData);
        },
        async delSubComponent(item) {
            const res = await this.$axios.$get(
                `/api/diy/home/component/del?id=${item.id}`
            );
            if (res && res.errmsg === "ok") {
                for (let key in this.componentData) {
                    if (this.componentData[key].data.id === item.id) {
                        this.componentData.splice(key, 1);
                    }
                }

                this.$store.commit("SET_COMPONENT_ID", 0);
                this.$emit("del-comp", false);
            }
            this.showDel = false;
        },
        async copySubComponent(item) {
            const res = await this.$axios.$get(
                `/api/diy/home/component/copy?id=${item.id}`
            );
            if (res && res.errmsg === "ok") {
                this.$message.success("复制成功");
                this.getComponent();
            }
        },
        async addData(data) {
            const res = await this.$axios.$post(
                "/api/diy/home/component/add",
                data
            );
            if (res && res.errmsg === "ok") {
                this.getComponent();
            }
        },
        async changeComponent(evt) {
            if (evt.added) {
                let arr = [];
                for (let key in this.contents) {
                    if (
                        this.contents[key].title === "基础" ||
                        this.contents[key].title === "布局"
                    ) {
                        this.contents[key].sub.forEach(item => {
                            arr.push(item.name);
                        });
                    }
                }

                if (arr.indexOf(evt.added.element.name) == -1) {
                    this.$alert("该组件不能添加到布局组件内");
                    this.componentData.splice(evt.added.newIndex, 1);
                    return;
                }
                const res = await this.$axios.$post(
                    "/api/diy/home/component/add",
                    {
                        name: evt.added.element.name,
                        title: evt.added.element.title,
                        props: JSON.stringify(evt.added.element.data),
                        rank: evt.added.newIndex,
                        pid: this.itemData.id
                    }
                );
                if (res && res.errmsg === "ok") {
                    this.componentRank(res.data.id);
                    this.$emit("get-component", true);
                }
            } else {
                this.$store.commit("SET_COMPONENT_ID", 0);
                this.componentRank(0);
            }
        },
        //组件排序
        async componentRank(id) {
            let data = [];
            for (let key in this.componentData) {
                data.push({
                    id: this.componentData[key].data.id
                        ? this.componentData[key].data.id
                        : id,
                    rank: key
                });
            }
            const res = await this.$axios.$post(
                `/api/diy/home/component/rank`,
                data
            );
            if (res && res.errmsg === "ok") {
                this.getComponent();
            }
        },
        clickComponent(item) {
            this.$store.commit("SET_COMPONENT_ID", item.data.id);
        },
        //获取页面组件
        async getComponent() {
            const component = await this.$axios.$get(
                `/api/diy/home/component/subIndex?id=${this.itemData.id}`
            );
            let list = [];
            if (component && component.errmsg === "ok") {
                let componentData = component.data.sub;
                componentData.forEach(component => {
                    this.contents.forEach(element => {
                        element.sub.forEach(item => {
                            if (item.name == component.name) {
                                list.push({
                                    name: component.name,
                                    component: item.component,
                                    data: component,
                                    rank: component.rank
                                });
                            }
                        });
                    });
                });
            }
            this.$nextTick(() => {
                this.$set(this.$data, "componentData", list);
            });
        },
        async getSubComponent() {
            let list = [];
            let subComponents = this.itemData.sub || [];

            subComponents.forEach(component => {
                this.contents.forEach(element => {
                    element.sub.forEach(item => {
                        if (item.name == component.name) {
                            list.push({
                                name: component.name,
                                component: item.component,
                                data: component,
                                rank: component.rank
                            });
                        }
                    });
                });
            });

            this.$nextTick(() => {
                this.$set(this.$data, "componentData", list);
            });
        }
    }
};
</script>