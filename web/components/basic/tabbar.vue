<template>
    <el-row @mouseenter.native='showBorder=true' @mouseleave.native='showBorder=false' class="components">
        <el-row class='tabBar' @click.native='showTabbar' :style='{borderColor:$store.state.componentId == -1?"#06a0fd":""}'>
            <div class='tabBar-wrap' v-if="formProps.data && formProps.data.length" :style='{borderColor:formProps.borderStyle,background:formProps.backgroundColor}'>
                <div class='tabBar-item' v-for="(item,index) in formProps.data" :key="index" @click='selectTabbar(index)'>
                    <div v-if="selectTabbarIndex==index">
                        <img :src="item.selectedIconPath" alt="" v-if="item.selectedIconPath">
                        <i class='el-icon-picture-outline' :style="{color:formProps.selectedColor}" v-else></i>
                    </div>
                    <div v-else>
                        <img :src="item.iconPath" alt="" v-if="item.iconPath">
                        <i class='el-icon-picture-outline' :style="{color:formProps.color}" v-else></i>
                    </div>
                    <div style="font-size:12px" :style="{color:selectTabbarIndex==index?formProps.selectedColor:formProps.color}">{{item.text}}</div>
                </div>
            </div>
            <div style='text-align:center;margin-top: 12px' v-else>
                <i class="el-icon-plus" style="font-size:24px"></i>
            </div>
        </el-row>
        <el-row class="tabBar-config" v-if="$store.state.componentId == -1">
            <el-row class="config-title">底部导航</el-row>
            <el-form label-width="90px">
                <el-tabs type="card">
                    <el-tab-pane label="内容" name="0">
                        <draggable v-model="formProps.data">
                            <el-collapse v-for="(item,index) in formProps.data" :key="index" style="margin-bottom:10px">
                                <el-collapse-item>
                                    <template slot="title">
                                        <span style="margin:0 10px">第{{index+1}}项</span>
                                        <i class="el-icon-delete" @click.stop="delTabbar(index)"></i>
                                    </template>
                                    <el-row>
                                        <el-form-item label="未选中状态图片" required>
                                            <div class="upload-list" v-if="item.iconPath">
                                                <img :src="item.iconPath">
                                                <div class="upload-list-cover">
                                                    <i class="el-icon-edit" @click="handleEdit(1,index)"></i>
                                                    <i class="el-icon-delete" @click="handleDel(1,index)"></i>
                                                </div>
                                            </div>
                                            <div @click='handleEdit(1,index)' class='upload-img' v-else>
                                                <i class='el-icon-upload'></i>
                                            </div>
                                        </el-form-item>
                                        <el-form-item label="选中状态图片" required>
                                            <div class="upload-list" v-if="item.selectedIconPath">
                                                <img :src="item.selectedIconPath">
                                                <div class="upload-list-cover">
                                                    <i class="el-icon-edit" @click="handleEdit(2,index)"></i>
                                                    <i class="el-icon-delete" @click="handleDel(2,index)"></i>
                                                </div>
                                            </div>
                                            <div @click='handleEdit(2,index)' class='upload-img' v-else>
                                                <i class='el-icon-upload'></i>
                                            </div>
                                        </el-form-item>
                                        <el-form-item label="文字">
                                            <el-input placeholder="最多四个字" v-model="item.text" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="点击事件">
                                            <el-input placeholder="请选择绑定事件" v-model="item.targetUrl" clearable @clear="clearLink(index)">
                                                <el-button slot="append" @click="handleLink(index)">选择</el-button>
                                            </el-input>
                                        </el-form-item>
                                    </el-row>
                                </el-collapse-item>
                            </el-collapse>
                        </draggable>
                        <el-button @click="addTabbar" v-show='formProps.data.length<5'>添加导航</el-button>
                    </el-tab-pane>
                    <el-tab-pane label="样式" name="1">
                        <el-form-item label="背景颜色">
                            <el-color-picker v-model="formProps.backgroundColor"></el-color-picker>
                        </el-form-item>
                        <el-form-item label="边框颜色">
                            <el-color-picker v-model="formProps.borderStyle"></el-color-picker>
                        </el-form-item>
                        <el-form-item label="文字颜色">
                            <el-color-picker v-model="formProps.color"></el-color-picker>
                        </el-form-item>
                        <el-form-item label="选中颜色">
                            <el-color-picker v-model="formProps.selectedColor"></el-color-picker>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
                <el-form-item style="text-align:right">
                    <el-button size="mini" @click.stop="cancel">取消</el-button>
                    <el-button type="primary" size="mini" plain @click.stop="save">保存</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row class="tabBar-arrow" v-if="$store.state.componentId == -1"></el-row>
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
            showUpload: false,
            showLink: false,
            showBorder: false,
            formProps: {},
            formRelations: [],
            formPropsDefault: {
                data: [],
                color: "#222",
                backgroundColor: "#fff",
                borderStyle: "#fff",
                selectedColor: "#06a0fd"
            },
            selectTabbarIndex: 0
        };
    },
    watch: {
        itemData(val) {
            this.formProps = Object.assign(
                {},
                this.formPropsDefault,
                this.itemData.props ? JSON.parse(this.itemData.props) : {}
            );
        }
    },
    mounted() {
        this.formProps = Object.assign(
            {},
            this.formPropsDefault,
            this.itemData.props ? JSON.parse(this.itemData.props) : {}
        );
    },
    methods: {
        showTabbar() {
            this.$store.commit("SET_COMPONENT_ID", -1);
        },
        //选中tabbar
        selectTabbar(index) {
            this.selectTabbarIndex = index;
        },
        addTabbar() {
            this.formProps.data.push({
                iconPath: "",
                selectedIconPath: "",
                text: "菜单",
                targetType: "",
                targetUrl: ""
            });
        },
        delTabbar(index) {
            this.formProps.data.splice(index, 1);
        },
        handleEdit(type, index) {
            this.showUpload = true;
            this.editImg = true;
            this.index = index;
            this.uploadType = type;
        },
        selectImg(res) {
            this.showUpload = false;
            if (res.id > 0) {
                if (this.uploadType == 1) {
                    this.formProps.data[this.index].iconPath = res.url;
                } else {
                    this.formProps.data[this.index].selectedIconPath = res.url;
                }
            }
        },
        cancelUpload() {
            this.showUpload = false;
        },
        handleDel(type, index) {
            if (type == 1) {
                this.formProps.data[index].iconPath = "";
            } else {
                this.formProps.data[index].selectedIconPath = "";
            }
        },
        //选择链接
        handleLink(index) {
            this.showLink = true;
            this.index = index;
        },
        selectedLink(item) {
            this.showLink = false;
            if (item) {
                this.formProps.data[this.index].targetType = item.targetType;
                this.formProps.data[this.index].targetUrl = item.targetUrl;
            }
        },
        clearLink(index) {
            this.formProps.data[index].targetType = "";
        },
        cancel() {
            this.$store.commit("SET_COMPONENT_ID", 0);
        },
        save() {
            let data = {
                name: "tabbar",
                id: this.itemData.id,
                pid: 0,
                props: JSON.stringify(this.formProps)
            };
            this.$emit("save-comp", data);
            this.$store.commit("SET_COMPONENT_ID", 0);
        }
    }
};
</script>
<style scoped>
.tabBar {
    width: 375px;
    height: 50px;
    line-height: 1;
    box-sizing: border-box;
    border: 2px dashed #fff;
    background: #fff;
    box-shadow: 0 0 12px 0 #dcefff;
    position: absolute;
    bottom: 0px;
    z-index: 98;
}

.tabBar-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    border-top: 1px solid #fff;
}

.tabBar-item {
    text-align: center;
    flex: 1;
    cursor: pointer;
}

.tabBar-item img {
    width: 20px;
    height: 20px;
}

.tabBar-item i {
    font-size: 24px;
}
.tabBar-config {
    position: absolute;
    left: 400px;
    bottom: 0;
    width: 400px;
    background: #fff;
    padding: 10px;
    max-height: 580px;
    overflow: auto;
}
.tabBar-config::-webkit-scrollbar {
    display: none;
}
.tabBar-arrow {
    position: absolute;
    left: 394px;
    bottom: 20px;
    background-color: #fff;
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
}
</style>
