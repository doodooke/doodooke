<template>
    <el-row @mouseenter.native='showBorder=true' @mouseleave.native='showBorder=false' class="components">
        <el-row class='border-select' v-show='itemData.id==$store.state.componentId'></el-row>
        <el-row class='border-select' v-show='showBorder'></el-row>
        <el-row style="padding:9px 10px;font-size:12px;display:flex" :style="{backgroundColor:formProps.backgroundColor}">
            <img :src="formProps.leftIcon" alt="" style="width:16px;height:16px;margin:1px 4px 0 0" v-if="formProps.leftIcon">
            <div class="text_ellipsis" :style="{color:formProps.fontColor}">{{formProps.text}}</div>
        </el-row>
        <el-row v-if="itemData.id==$store.state.componentId" class="config" :style="{left: configOffsetLeft + 'px'}">
            <el-row class="config-title">通告栏</el-row>
            <el-form label-width="80px">
                <el-form-item label="内容" required>
                    <el-input type="textarea" v-model="formProps.text" placeholder="请输入公告内容" clearable></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <div class="upload-list" v-if='formProps.leftIcon'>
                        <img :src="formProps.leftIcon">
                        <div class="upload-list-cover">
                            <i class="el-icon-edit" @click="handleEdit"></i>
                            <i class="el-icon-delete" @click="handleDel"></i>
                        </div>
                    </div>
                    <div @click='handleEdit' class='upload-img' v-else>
                        <i class='el-icon-upload'></i>
                    </div>
                </el-form-item>
                <el-form-item label="文字颜色">
                    <el-color-picker v-model="formProps.fontColor"></el-color-picker>
                </el-form-item>
                <el-form-item label="背景颜色">
                    <el-color-picker v-model="formProps.backgroundColor"></el-color-picker>
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
            configOffsetLeft: 0,
            formProps: {},
            formRelations: [],
            formPropsDefault: {
                text: "我是一条通告栏",
                leftIcon:
                    "https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png",
                backgroundColor: "",
                fontColor: ""
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
        handleEdit() {
            this.showUpload = true;
        },
        selectImg(res) {
            this.showUpload = false;
            if (res.id > 0) {
                this.formProps.leftIcon = res.url;
            }
        },
        cancelUpload() {
            this.showUpload = false;
        },
        handleDel() {
            this.formProps.leftIcon = "";
        },
        cancel() {
            this.$store.commit("SET_COMPONENT_ID", 0);
        },
        save() {
            if (!this.formProps.text) {
                this.$message.warning("请填写内容");
                return;
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