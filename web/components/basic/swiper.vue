<template>
    <el-row @mouseenter.native='showBorder=true' @mouseleave.native='showBorder=false' class="components">
        <el-row class='border-select' style="z-index:10" v-show='itemData.id==$store.state.componentId'></el-row>
        <el-row class='border-select' style="z-index:10" v-show='showBorder'></el-row>
        <el-row style="position:relative">
            <el-carousel :autoplay="formProps.autoplay" :interval="formProps.interval" arrow="never" indicator-position="none" :height="formProps.height+'px'" @change="swiperChange">
                <el-carousel-item v-for="(item,index) in formProps.imgs" :key="index">
                    <img :src="item.imgUrl" v-if="item.imgUrl" style="width:100%;height:100%">
                    <div v-else style="background-color:#E6F2FF;text-align: center" :style="{height:formProps.height+'px',lineHeight:formProps.height+'px'}">
                        <i class="iconfont" style="color:#fff;font-size: 68px;">&#xe77d;</i>
                    </div>
                </el-carousel-item>
            </el-carousel>
            <ul class='carousel-dot' v-show='formProps.indicatorShow' :style='{textAlign:formProps.indicatorPosition}'>
                <li v-for='(item,index) in formProps.imgs' :key='index' class='carousel-dot-li' :class='{"carousel-dot-li-active":index==formProps.current}' :style='{
                    "background-color":index==formProps.current?formProps.indicatorActiveColor:formProps.indicatorColor,
                    "width":formProps.indicatorType==0?"6px":(index==formProps.current?"14px":"6px")
                }'></li>
            </ul>
        </el-row>
        <el-row v-if="itemData.id==$store.state.componentId" class="config" :style="{left: configOffsetLeft + 'px'}">
            <el-row class="config-title">轮播图</el-row>
            <el-form label-width="90px">
                <el-tabs type="card">
                    <el-tab-pane label="内容" name="0">
                        <draggable v-model="formProps.imgs">
                            <el-collapse v-for="(item,index) in formProps.imgs" :key="index" style="margin-bottom:10px">
                                <el-collapse-item>
                                    <template slot="title">
                                        <span style="margin:0 10px">图片{{index+1}}</span>
                                        <i class="el-icon-delete" @click="delSwiper(index)"></i>
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
                                        <el-form-item label="名称">
                                            <el-input placeholder="用于发送模板消息" v-model="item.title"></el-input>
                                        </el-form-item>
                                        <el-form-item label="模板消息">
                                            <el-radio-group v-model="item.formType">
                                                <el-radio label="submit">开启</el-radio>
                                                <el-radio label="">关闭</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </el-row>
                                </el-collapse-item>
                            </el-collapse>
                        </draggable>
                        <el-button @click="addSwiper">添加轮播</el-button>
                    </el-tab-pane>
                    <el-tab-pane label="样式" name="1">
                        <el-form-item label="图片高度">
                            <el-slider v-model="formProps.height" :min="1" :max="1000" show-input input-size="mini"></el-slider>
                        </el-form-item>
                        <el-form-item label="激活索引">
                            <el-input-number v-model="formProps.current" :min="0" :max="formProps.imgs.length-1" controls-position="right" @change="swiperChange"></el-input-number>
                        </el-form-item>
                        <el-form-item label="自动播放">
                            <el-switch v-model="formProps.autoplay"></el-switch>
                        </el-form-item>
                        <el-form-item label="播放间隔">
                            <el-input-number v-model="formProps.interval" :min="1000" :step="500" controls-position="right"></el-input-number>
                            <span style="margin-left:10px">单位：毫秒</span>
                        </el-form-item>
                        <el-form-item label="滑动时长">
                            <el-input-number v-model="formProps.duration" :min="500" :step="500" controls-position="right"></el-input-number>
                        </el-form-item>
                        <el-form-item label="衔接滑动">
                            <el-switch v-model="formProps.circular"></el-switch>
                        </el-form-item>
                        <el-form-item label="指示点">
                            <el-switch v-model="formProps.indicatorShow"></el-switch>
                        </el-form-item>
                        <el-row v-show="formProps.indicatorShow">
                            <el-form-item label="指示点样式">
                                <el-radio-group v-model="formProps.indicatorType">
                                    <el-radio :label="0">样式一</el-radio>
                                    <el-radio :label="1">样式二</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="指示点位置">
                                <el-radio-group v-model="formProps.indicatorPosition">
                                    <el-radio label="left">左</el-radio>
                                    <el-radio label="center">中</el-radio>
                                    <el-radio label="right">右</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="指示点颜色">
                                <el-form :inline="true">
                                    <el-form-item label="默认">
                                        <el-color-picker v-model="formProps.indicatorColor"></el-color-picker>
                                    </el-form-item>
                                    <el-form-item label="选中">
                                        <el-color-picker v-model="formProps.indicatorActiveColor"></el-color-picker>
                                    </el-form-item>
                                </el-form>
                            </el-form-item>

                        </el-row>
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
                imgs: [
                    {
                        imgUrl: "",
                        targetType: "",
                        targetUrl: "",
                        title: "",
                        formId: 0,
                        formType: ""
                    },
                    {
                        imgUrl: "",
                        targetType: "",
                        targetUrl: "",
                        title: "",
                        formId: 0,
                        formType: ""
                    },
                    {
                        imgUrl: "",
                        targetType: "",
                        targetUrl: "",
                        title: "",
                        formId: 0,
                        formType: ""
                    }
                ],
                autoplay: true,
                current: 0,
                interval: 5000,
                duration: 1000,
                circular: false,
                indicatorShow: true,
                indicatorType: 0,
                indicatorPosition: "center",
                indicatorColor: "rgba(255, 255, 255, 0.8)",
                indicatorActiveColor: "#000000",
                height: 210
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
            this.formProps.indicatorActiveColor = this.$store.state.color;
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
        this.formProps.indicatorActiveColor = this.$store.state.color;
        this.formRelations = this.itemData.relation;
        this.configOffsetLeft = this.getDiyComponentConfigOffset(this.$el);
    },
    methods: {
        swiperChange(index) {
            this.formProps.current = index;
        },
        addSwiper() {
            this.formProps.imgs.push({
                imgUrl: "",
                targetType: "",
                targetUrl: "",
                title: "",
                formId: 0,
                formType: ""
            });
        },
        delSwiper(index) {
            this.formProps.imgs.splice(index, 1);
        },
        handleEdit(index) {
            this.showUpload = true;
            this.editImg = true;
            this.index = index;
        },
        selectImg(res) {
            this.showUpload = false;
            if (res.id > 0) {
                this.formProps.imgs[this.index].imgUrl = res.url;
            }
        },
        cancelUpload() {
            this.showUpload = false;
        },
        handleDel(index) {
            this.formProps.imgs[index].imgUrl = "";
        },
        //选择链接
        handleLink(index) {
            this.showLink = true;
            this.index = index;
        },
        selectedLink(item) {
            this.showLink = false;
            if (item) {
                this.formProps.imgs[this.index].targetType = item.targetType;
                this.formProps.imgs[this.index].targetUrl = item.targetUrl;
            }
        },
        clearLink(index) {
            this.formProps.imgs[index].targetType = "";
        },
        cancel() {
            this.$store.commit("SET_COMPONENT_ID", 0);
        },
        async save() {
            for (let key in this.formProps.imgs) {
                if (!this.formProps.imgs[key].imgUrl) {
                    this.$message.warning("请上传图片");
                    return;
                }
                if (this.formProps.imgs[key].formType) {
                    if (!this.formProps.imgs[key].title) {
                        this.$message.warning("请填写名称");
                        return;
                    }
                    const res = await this.$axios.$post(
                        "/api/form/home/form/add",
                        {
                            id: this.formProps.imgs[key].formId,
                            title: this.formProps.imgs[key].title,
                            status: 1,
                            hidden: 0
                        }
                    );
                    if (res && res.errmsg === "ok") {
                        this.formProps.imgs[key].formId = res.data.id;
                    }
                }
            }

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
.carousel-dot {
    display: block;
    position: absolute;
    bottom: 3px;
    text-align: center;
    width: 100%;
    height: 16px;
    padding: 0 10px;
    z-index: 100;
}
.carousel-dot-li {
    position: relative;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    margin: 0 2px;
    cursor: pointer;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
}
.carousel-dot-li-active {
    width: 14px;
    height: 6px;
    border-radius: 3px;
    background-color: #fff;
}
.el-carousel__item.is-active {
    z-index: 0;
}
</style>

