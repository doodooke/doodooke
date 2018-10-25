<template>
    <el-row @mouseenter.native='showBorder=true' @mouseleave.native='showBorder=false' :style="{height:formProps.height+'px'}" class="components">
        <el-row class='border-select' v-show='itemData.id==$store.state.componentId'></el-row>
        <el-row class='border-select' v-show='showBorder'></el-row>
        <el-row style="display: flex;padding:20px 2px 2px">
            <el-row :style="{flex:formProps.leftFlex}">
                <draggable v-model='leftComponentData' :options="{group:'diy'}" @change='leftChangeComponent' class="layout-components">
                    <transition-group tag="ul" style='width:auto;min-height:100px;padding:0'>
                        <component v-for='(item,index) in leftComponentData' :key='index' :is='item.component' :item-data="item.data" @click.native.stop='clickComponent(item)' @save-comp='addData' @del-comp="delSubComponent" @copy-comp="copySubComponent">
                        </component>
                    </transition-group>
                </draggable>
            </el-row>
            <el-row :style="{flex:100 - formProps.leftFlex}">
                <draggable v-model='rightComponentData' :options="{group:'diy'}" @change='rightChangeComponent' class="layout-components">
                    <transition-group tag="ul" style='width:auto;min-height:100px;padding:0'>
                        <component v-for='(item,index) in rightComponentData' :key='index' :is='item.component' :item-data="item.data" @click.native.stop='clickComponent(item)' @save-comp='addData' @del-comp="delSubComponent" @copy-comp="copySubComponent">
                        </component>
                    </transition-group>
                </draggable>
            </el-row>
        </el-row>
        <el-row v-if="itemData.id==$store.state.componentId" class="config" :style="{left: configOffsetLeft + 'px'}">
            <el-row class="config-title">双栏</el-row>
            <el-form label-width="50px">
                <el-form-item label="位置">
                    <el-slider v-model="formProps.leftFlex" :min="1" :max="100" show-input></el-slider>
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
            leftComponentData: [],
            rightComponentData: [],
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
                leftFlex: 50
            }
        };
    },
    watch: {
        itemData() {
            this.formProps = Object.assign(
                {},
                this.formPropsDefault,
                this.itemData.props ? JSON.parse(this.itemData.props) : {}
            );
            this.formRelations = this.itemData.relation;
            this.configOffsetLeft = this.getDiyComponentConfigOffset(this.$el);
            this.getSubComponent();
            this.$bus.on("updateData", this.getSubComponent);
        }
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
                if (item.flag === "left") {
                    for (let key in this.leftComponentData) {
                        if (this.leftComponentData[key].data.id === item.id) {
                            this.leftComponentData.splice(key, 1);
                        }
                    }
                }
                if (item.flag === "right") {
                    for (let key in this.rightComponentData) {
                        if (this.rightComponentData[key].data.id === item.id) {
                            this.rightComponentData.splice(key, 1);
                        }
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
                if (item.flag === "left") {
                    if (item.name == "flex" || item.name == "panel") {
                        this.$emit("get-component", true);
                    } else {
                        this.getLeftSubComponent();
                    }
                }
                if (item.flag === "right") {
                    if (item.name == "flex" || item.name == "panel") {
                        this.$emit("get-component", true);
                    } else {
                        this.getRightSubComponent();
                    }
                }
            }
        },
        async addData(data) {
            const res = await this.$axios.$post(
                "/api/diy/home/component/add",
                data
            );
            if (res && res.errmsg === "ok") {
                this.getLeftSubComponent();
                this.getRightSubComponent();
            }
        },
        async leftChangeComponent(evt) {
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
                arr.push("panel");

                if (arr.indexOf(evt.added.element.name) == -1) {
                    this.$alert("该组件不能添加到双栏组件内");
                    this.leftComponentData.splice(evt.added.newIndex, 1);
                    return;
                }
                const res = await this.$axios.$post(
                    "/api/diy/home/component/add",
                    {
                        name: evt.added.element.name,
                        title: evt.added.element.title,
                        props: JSON.stringify(evt.added.element.data),
                        rank: evt.added.newIndex,
                        pid: this.itemData.id,
                        flag: "left"
                    }
                );
                if (res && res.errmsg === "ok") {
                    this.leftComponentRank(res.data.id);
                    this.$emit("get-component", true);
                }
            } else {
                this.$store.commit("SET_COMPONENT_ID", 0);
                this.leftComponentRank(0);
            }
        },
        async rightChangeComponent(evt) {
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
                    this.$alert("该组件不能添加到双栏组件内");
                    this.rightComponentData.splice(evt.added.newIndex, 1);
                    return;
                }
                const res = await this.$axios.$post(
                    "/api/diy/home/component/add",
                    {
                        name: evt.added.element.name,
                        title: evt.added.element.title,
                        props: JSON.stringify(evt.added.element.data),
                        rank: evt.added.newIndex,
                        pid: this.itemData.id,
                        flag: "right"
                    }
                );
                if (res && res.errmsg === "ok") {
                    this.rightComponentRank(res.data.id);
                    this.$emit("get-component", true);
                }
            } else {
                this.$store.commit("SET_COMPONENT_ID", 0);
                this.rightComponentRank(0);
            }
        },
        //组件排序
        async leftComponentRank(id) {
            let data = [];
            for (let key in this.leftComponentData) {
                data.push({
                    id: this.leftComponentData[key].data.id
                        ? this.leftComponentData[key].data.id
                        : id,
                    rank: key
                });
            }
            const res = await this.$axios.$post(
                `/api/diy/home/component/rank`,
                data
            );
            if (res && res.errmsg === "ok") {
                this.getLeftSubComponent();
            }
        },
        async rightComponentRank(id) {
            let data = [];
            for (let key in this.rightComponentData) {
                data.push({
                    id: this.rightComponentData[key].data.id
                        ? this.rightComponentData[key].data.id
                        : id,
                    rank: key
                });
            }
            const res = await this.$axios.$post(
                `/api/diy/home/component/rank`,
                data
            );
            if (res && res.errmsg === "ok") {
                this.getRightSubComponent();
            }
        },
        clickComponent(item) {
            this.$store.commit("SET_COMPONENT_ID", item.data.id);
        },
        //获取页面组件
        async getLeftSubComponent() {
            const component = await this.$axios.$get(
                `/api/diy/home/component/subIndex?id=${
                    this.itemData.id
                }&flag=left`
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
                this.$set(this.$data, "leftComponentData", list);
            });
        },
        //获取页面组件
        async getRightSubComponent() {
            const component = await this.$axios.$get(
                `/api/diy/home/component/subIndex?id=${
                    this.itemData.id
                }&flag=right`
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
                this.$set(this.$data, "rightComponentData", list);
            });
        },
        async getSubComponent() {
            let leftList = [];
            let rightList = [];
            let subComponents = this.itemData.sub || [];

            subComponents.forEach(component => {
                this.contents.forEach(element => {
                    element.sub.forEach(item => {
                        if (item.name == component.name) {
                            if (component.flag === "left") {
                                leftList.push({
                                    name: component.name,
                                    component: item.component,
                                    data: component,
                                    rank: component.rank
                                });
                            }
                            if (component.flag === "right") {
                                rightList.push({
                                    name: component.name,
                                    component: item.component,
                                    data: component,
                                    rank: component.rank
                                });
                            }
                        }
                    });
                });
            });

            this.$nextTick(() => {
                this.$set(this.$data, "leftComponentData", leftList);
                this.$set(this.$data, "rightComponentData", rightList);
            });
        }
    }
};
</script>