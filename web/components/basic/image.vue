<template>
    <el-row @mouseenter.native='showBorder=true' @mouseleave.native='showBorder=false' class="components">
        <el-row class='border-select' style="z-index:1" v-show='itemData.id==$store.state.componentId'></el-row>
        <el-row class='border-select' style="z-index:1" v-show='showBorder'></el-row>
        <el-row>
            <img :src="formProps.imgUrl" alt="" style="width:100%;display:block;" :style="{height:formProps.height+'px'}" v-if="formProps.imgUrl">
            <div v-else style="background-color:#E6F2FF;text-align: center;" :style="{height:formProps.height+'px',lineHeight:formProps.height+'px'}">
                <i class="iconfont" style="color:#fff;font-size: 68px;">&#xe77d;</i>
            </div>
        </el-row>
        <el-row v-if="itemData.id==$store.state.componentId" class="config" :style="{left: configOffsetLeft + 'px'}">
            <el-row class="config-title">图片</el-row>
            <el-form label-width="70px">
                <el-form-item label="图片" required>
                    <div class="upload-list" v-if='formProps.imgUrl'>
                        <img :src="formProps.imgUrl">
                        <div class="upload-list-cover">
                            <i class="el-icon-edit" @click="handleEdit"></i>
                            <i class="el-icon-delete" @click="handleDel"></i>
                        </div>
                    </div>
                    <div @click='uploadImg' class='upload-img' v-else>
                        <i class='el-icon-upload'></i>
                    </div>
                </el-form-item>
                <el-form-item label="点击事件">
                    <el-input placeholder="请选择绑定事件" v-model="formProps.targetUrl" clearable @clear="clearLink">
                        <el-button slot="append" @click="handleLink">选择</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="高度">
                    <el-slider v-model="formProps.height" :min="1" :max="1000" show-input></el-slider>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input placeholder="用于发送模板消息" v-model="formProps.title"></el-input>
                </el-form-item>
                <el-form-item label="模板消息">
                    <el-radio-group v-model="formProps.formType">
                        <el-radio label="submit">开启</el-radio>
                        <el-radio label="">关闭</el-radio>
                    </el-radio-group>
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
            <span @click.stop="delComponent">删除</span>
        </el-row>
        <Upload :show="showUpload" @on-selected="selectImg" @on-cancel="cancelUpload"></Upload>
        <qingful-link :show-modal='showLink' @on-select='selectedLink'></qingful-link>
    </el-row>

</template>

<script>
export default {
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
                imgUrl: "",
                targetType: "",
                targetUrl: "",
                height: 200,
                title: "",
                formId: 0,
                formType: ""
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
        uploadImg() {
            this.showUpload = true;
        },
        handleEdit() {
            this.showUpload = true;
        },
        selectImg(res) {
            this.showUpload = false;
            if (res.id > 0) {
                this.formProps.imgUrl = res.url;
            }
        },
        cancelUpload() {
            this.showUpload = false;
        },
        handleDel() {
            this.formProps.imgUrl = "";
        },
        cancel() {
            this.$store.commit("SET_COMPONENT_ID", 0);
        },
        //选择链接
        handleLink() {
            this.showLink = true;
        },
        selectedLink(item) {
            this.showLink = false;
            if (item) {
                this.formProps.targetType = item.targetType;
                this.formProps.targetUrl = item.targetUrl;
            }
        },
        clearLink() {
            this.formProps.targetType = "";
        },
        async save() {
            if (!this.formProps.imgUrl) {
                this.$message.warning("请上传图片");
                return;
            }
            if (this.formProps.formType) {
                if (!this.formProps.title) {
                    this.$message.warning("请填写名称");
                    return;
                }
                const res = await this.$axios.$post("/api/form/home/form/add", {
                    id: this.formProps.formId,
                    title: this.formProps.title,
                    status: 1,
                    hidden: 0
                });
                if (res && res.errmsg === "ok") {
                    this.formProps.formId = res.data.id;
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