<template>
    <el-row @mouseenter.native='showBorder=true' @mouseleave.native='showBorder=false' class="components">
        <el-row class='border-select' style="z-index:1" v-show='itemData.id==$store.state.componentId'></el-row>
        <el-row class='border-select' style="z-index:1" v-show='showBorder'></el-row>
        <el-row :style='{paddingLeft:formProps.padding+"px",paddingRight:formProps.padding+"px"}'>
            <div :style='{background:formProps.bg_color,paddingBottom:formProps.show_scroll==1?"10px":0}'>
                <div class='menu_flex'>
                    <div class='menu_icon' v-for='(item,index) in formProps.menu' :key='index' v-show='index<formProps.line_num*formProps.show_line' :style='{
                            width:(375-2*formProps.padding)/formProps.line_num+"px",
                            marginBottom:(formProps.show_line-1)*formProps.line_num-(index+1)>0?"16px":"0"
                        }'>
                        <img :src="item.imgUrl" v-if='item.imgUrl' :style='{marginLeft:((375-2*formProps.padding)/formProps.line_num-44)/2+"px",borderRadius:formProps.border_radius+"px"}'>
                        <div v-else style="background-color:#E6F2FF;text-align: center;width:44px;height:44px;line-height:44px;margin-bottom:5px" :style='{marginLeft:((375-2*formProps.padding)/formProps.line_num-44)/2+"px",borderRadius:formProps.border_radius+"px"}'>
                            <i class="iconfont" style="color:#fff;font-size:32px;">&#xe77d;</i>
                        </div>
                        <p :style='{color:item.name_color,width:(375-2*formProps.padding)/formProps.line_num+"px"}'>{{item.name}}</p>
                    </div>
                </div>
                <div class='menu_slide' v-show='formProps.show_scroll==1'>
                    <div class='menu_slide_show'></div>
                </div>
            </div>
        </el-row>
        <el-row v-if="itemData.id==$store.state.componentId" class="config" :style="{left: configOffsetLeft + 'px'}">
            <el-row class="config-title">快捷菜单</el-row>
            <el-form label-width="70px">
                <el-tabs type="card">
                    <el-tab-pane label="内容" name="0">
                        <draggable v-model="formProps.menu">
                            <el-collapse v-for="(item,index) in formProps.menu" :key="index" style="margin-bottom:10px">
                                <el-collapse-item>
                                    <template slot="title">
                                        <span style="margin:0 10px">{{item.name || '图片'+(index+1)}}</span>
                                        <i class="el-icon-delete" @click="delMenu(index)"></i>
                                    </template>
                                    <el-row>
                                        <el-form-item label="图片">
                                            <div class="upload-list" v-if="item.imgUrl">
                                                <img :src="item.imgUrl">
                                                <div class="upload-list-cover">
                                                    <i class="el-icon-edit" @click="handleEdit(index)"></i>
                                                    <i class="el-icon-delete" @click="handleDel(index)"></i>
                                                </div>
                                            </div>
                                            <div @click='handleEdit(index)' class='upload-img' v-else>
                                                <i class='el-icon-upload'></i>
                                            </div>
                                        </el-form-item>
                                        <el-form-item label="名称">
                                            <el-input placeholder="最多四个字" :maxlength="4" v-model="item.name" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="名称颜色">
                                            <el-color-picker v-model="item.name_color"></el-color-picker>
                                        </el-form-item>
                                        <el-form-item label="点击事件">
                                            <el-input placeholder="请选择绑定事件" v-model="item.targetUrl" clearable>
                                                <el-button slot="append" @click="handleLink(index)">选择</el-button>
                                            </el-input>
                                        </el-form-item>
                                    </el-row>
                                </el-collapse-item>
                            </el-collapse>
                        </draggable>
                        <el-button @click="addMenu">添加菜单</el-button>
                    </el-tab-pane>
                    <el-tab-pane label="样式" name="1">
                        <el-form-item label="每行个数">
                            <el-radio-group v-model="formProps.line_num">
                                <el-radio label="5">五个</el-radio>
                                <el-radio label="4">四个</el-radio>
                                <el-radio label="3">三个</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="行数">
                            <el-radio-group v-model="formProps.show_line">
                                <el-radio label="1">一行</el-radio>
                                <el-radio label="2">两行</el-radio>
                                <el-radio label="3">三行</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="滚动条">
                            <el-radio-group v-model="formProps.show_scroll">
                                <el-radio label="1">显示</el-radio>
                                <el-radio label="0">隐藏</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="背景颜色">
                            <el-color-picker v-model="formProps.bg_color"></el-color-picker>
                        </el-form-item>
                        <el-form-item label="边距">
                            <el-slider v-model="formProps.padding" :min="0" :max="50" style="width:90%"></el-slider>
                        </el-form-item>
                        <el-form-item label="圆角">
                            <el-slider v-model="formProps.border_radius" :min="0" :max="24" style="width:90%"></el-slider>
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
        <Upload :show="showUpload" @on-selected="selectImg" @on-cancel="cancelUpload"></Upload>
        <qingful-link :show-modal='showLink' @on-select='selectedLink'></qingful-link>
    </el-row>
</template>

<script>
import draggable from "vuedraggable";
export default {
    components: {
        draggable
    },
    props: {
        itemData: {
            default: {}
        }
    },
    data() {
        return {
            showBorder: false,
            showUpload: false,
            showLink: false,
            configOffsetLeft: 0,
            formProps: {},
            formRelations: [],
            formPropsDefault: {
                line_num: "3", //每行显示个数
                show_line: "1", //显示行数
                show_scroll: "0", //显示滚动条
                bg_color: "#fff",
                border_radius: 24,
                padding: 0,
                menu: [
                    {
                        imgUrl: "",
                        name: "快捷菜单",
                        name_color: "#222",
                        targetType: "",
                        targetUrl: ""
                    },
                    {
                        imgUrl: "",
                        name: "快捷菜单",
                        name_color: "#222",
                        targetType: "",
                        targetUrl: ""
                    },
                    {
                        imgUrl: "",
                        name: "快捷菜单",
                        name_color: "#222",
                        targetType: "",
                        targetUrl: ""
                    }
                ]
            }
        };
    },
    watch: {
        itemData(val) {
            this.formProps = Object.assign(
                {},
                this.formPropsDefault,
                this.itemData.props ? JSON.parse(this.itemData.props) : {}
            );
            this.formRelations = this.itemData.relation;
            this.configOffsetLeft = this.getDiyComponentConfigOffset(this.$el);
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
    },
    methods: {
        addMenu() {
            this.formProps.menu.push({
                imgUrl: "",
                name: "快捷菜单",
                name_color: "#222",
                targetType: "",
                targetUrl: ""
            });
        },
        delMenu(index) {
            this.formProps.menu.splice(index, 1);
        },
        handleEdit(index) {
            this.showUpload = true;
            this.editImg = true;
            this.index = index;
        },
        selectImg(res) {
            this.showUpload = false;
            if (res.id > 0) {
                this.formProps.menu[this.index].imgUrl = res.url;
            }
        },
        cancelUpload() {
            this.showUpload = false;
        },
        handleDel(index) {
            this.formProps.menu[index].imgUrl = "";
        },
        //选择链接
        handleLink(index) {
            this.showLink = true;
            this.index = index;
        },
        selectedLink(item) {
            this.showLink = false;
            if (item) {
                this.formProps.menu[this.index].targetType = item.targetType;
                this.formProps.menu[this.index].targetUrl = item.targetUrl;
            }
        },
        clearLink(index) {
            this.formProps.imgs[index].targetType = "";
        },
        cancel() {
            this.$store.commit("SET_COMPONENT_ID", 0);
        },
        save() {
            let data = {
                id: this.itemData.id,
                props: JSON.stringify(this.formProps)
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
.menu_flex {
    width: 100%;
    padding: 11px 0;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    line-height: 1;
}
.menu_icon {
    margin-bottom: 21px;
}
.menu_icon img {
    width: 44px;
    height: 44px;
    margin-bottom: 5px;
    overflow: hidden;
}
.menu_icon p {
    text-align: center;
    font-size: 13px;
    color: #222;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.menu_slide {
    width: 100px;
    height: 2px;
    border-radius: 2px;
    margin: 0 auto;
    background: #e6e6e6;
}
.menu_slide_show {
    width: 60px;
    height: 2px;
    background: #d9d8d8;
    border-radius: 2px;
}
</style>
