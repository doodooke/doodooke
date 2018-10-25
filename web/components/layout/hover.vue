<template>
    <el-row @mouseenter.native='showBorder=true' @mouseleave.native='showBorder=false' class="components" style="width:70px;position:absolute;bottom:70px;right:0;z-index:99">
        <el-row class='border-select' v-show='itemData.id==$store.state.componentId'></el-row>
        <el-row class='border-select' v-show='showBorder'></el-row>
        <div style='padding:15px 5px 10px'>
            <div v-if="formProps.data && formProps.data.length">
                <div class='hover_wrap' v-for='(item,index) in formProps.data' :key='index' :style='{background: formProps.bgColor,borderRadius:formProps.borderRadius+"px",boxShadow:formProps.boxShadow}'>
                    <div class='hover-img'>
                        <img v-if='item.imgUrl' :src="item.imgUrl" :style='{borderRadius:formProps.borderRadius+"px"}'>
                        <div v-else style="background-color:#E6F2FF;text-align: center;height:50px;line-height:50px">
                            <i class="iconfont" style="color:#fff;font-size: 28px;">&#xe77d;</i>
                        </div>
                    </div>
                </div>
            </div>
            <div style='background-color:#E6F2FF;text-align: center;width:50px;height:50px;margin:0 auto;border-radius:50%' v-else>
                <i class="el-icon-plus" style="font-size:24px;margin-top:13px;color:#9ea7b4"></i>
            </div>
        </div>
        <el-row v-if="itemData.id==$store.state.componentId" class="hover-config" :style="{left: configOffsetLeft + 'px'}">
            <el-row class="config-title">悬浮框</el-row>
            <el-form label-width="80px">
                <el-tabs type="card">
                    <el-tab-pane label="内容" name="0">
                        <draggable v-model="formProps.data">
                            <el-collapse v-for="(item,index) in formProps.data" :key="index" style="margin-bottom:10px">
                                <el-collapse-item>
                                    <template slot="title">
                                        <span style="margin:0 10px">第{{index+1}}项</span>
                                        <i class="el-icon-delete" @click.stop="delHover(index)"></i>
                                    </template>
                                    <el-row>
                                        <el-form-item label="图片" required>
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
                                        <el-form-item label="点击事件">
                                            <el-input placeholder="请选择绑定事件" v-model="item.targetUrl" clearable @clear="clearLink">
                                                <el-button slot="append" @click="handleLink(index)">选择</el-button>
                                            </el-input>
                                        </el-form-item>
                                    </el-row>
                                </el-collapse-item>
                            </el-collapse>
                        </draggable>
                        <el-button @click="addHover" v-show='formProps.data.length<4'>添加</el-button>
                    </el-tab-pane>
                    <el-tab-pane label="样式" name="1">
                        <el-form-item label="背景颜色">
                            <el-color-picker v-model="formProps.bgColor"></el-color-picker>
                        </el-form-item>
                        <el-form-item label="圆角">
                            <el-input-number v-model="formProps.borderRadius" :max='50' :min='0' controls-position="right"></el-input-number>
                        </el-form-item>
                        <el-form-item label="阴影">
                            <el-form>
                                <el-form-item label="阴影颜色">
                                    <el-color-picker v-model="shadowColor" @change="shadowChange"></el-color-picker>
                                </el-form-item>
                                <el-form-item label="模糊半径">
                                    <el-input-number v-model="shadowR" :max='20' :min='0' controls-position="right" style="margin-bottom:10px" @change="shadowChange"></el-input-number>
                                </el-form-item>
                                <el-form-item label="X 轴偏移">
                                    <el-input-number v-model="shadowX" :max='20' :min='0' controls-position="right" style="margin-bottom:10px" @change="shadowChange"></el-input-number>
                                </el-form-item>
                                <el-form-item label="Y 轴偏移">
                                    <el-input-number v-model="shadowY" :max='20' :min='0' controls-position="right" style="margin-bottom:10px" @change="shadowChange"></el-input-number>
                                </el-form-item>
                            </el-form>
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
            configOffsetLeft: 0,
            showUpload: false,
            showLink: false,
            formProps: {},
            formRelations: [],
            formPropsDefault: {
                data: [],
                borderRadius: 0, //    边框圆角
                bgColor: "#ffffff", //    背景颜色
                boxShadow: ""
            },
            shadowX: 0,
            shadowY: 0,
            shadowR: 0,
            shadowColor: ""
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
            if (this.formProps.boxShadow) {
                let shadow = this.formProps.boxShadow.split(" ");
                this.shadowX = Number(shadow[0].replace("px", ""));
                this.shadowY = Number(shadow[1].replace("px", ""));
                this.shadowR = Number(shadow[2].replace("px", ""));
                this.shadowColor = shadow[3];
            }
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
        if (this.formProps.boxShadow) {
            let shadow = this.formProps.boxShadow.split(" ");
            this.shadowX = Number(shadow[0].replace("px", ""));
            this.shadowY = Number(shadow[1].replace("px", ""));
            this.shadowR = Number(shadow[2].replace("px", ""));
            this.shadowColor = shadow[3];
        }
    },
    methods: {
        addHover() {
            this.formProps.data.push({
                imgUrl: "",
                targetType: "",
                targetUrl: ""
            });
        },
        delHover(index) {
            this.formProps.data.splice(index, 1);
        },
        handleEdit(index) {
            this.showUpload = true;
            this.index = index;
        },
        selectImg(res) {
            this.showUpload = false;
            if (res.id > 0) {
                this.formProps.data[this.index].imgUrl = res.url;
            }
        },
        cancelUpload() {
            this.showUpload = false;
        },
        handleDel(index) {
            this.formProps.data[index].imgUrl = "";
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
        shadowChange() {
            this.formProps.boxShadow = `${this.shadowX}px ${this.shadowY}px ${
                this.shadowR
            }px ${this.shadowColor}`;
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
        }
    }
};
</script>
<style scoped>
.hover_wrap {
    width: 50px;
    height: 50px;
    margin: 0 auto;
    text-align: center;
    overflow: hidden;
    line-height: 50px;
    margin-top: 10px;
    position: relative;
}
.hover_wrap:first-child {
    margin-top: 0;
}
.hover-img img {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0px;
    left: 0px;
}
.hover-config {
    position: absolute;
    left: 400px;
    bottom: -70px;
    width: 400px;
    background: #fff;
    padding: 10px;
    max-height: 580px;
    overflow: auto;
}
.hover-config::-webkit-scrollbar {
    display: none;
}
</style>
