<template>
    <el-row @mouseenter.native='showBorder=true' @mouseleave.native='showBorder=false' class="components">
        <el-row class='border-select' style="z-index:1" v-show='itemData.id==$store.state.componentId'></el-row>
        <el-row class='border-select' style="z-index:1" v-show='showBorder'></el-row>
        <el-row>
            <div style="background-color:#E6F2FF;text-align: center;padding:20px">
                <i class="iconfont" style="color:#fff;font-size: 68px">&#xe77d;</i>
                <div style="position:absolute;top:5px;left:5px;background:rgba(0,0,0,.3);color:#fff;font-size:12px;padding:2px">广告</div>
            </div>
        </el-row>
        <el-row v-if="itemData.id==$store.state.componentId" class="config" :style="{left: configOffsetLeft + 'px'}">
            <el-row class="config-title">广告</el-row>
            <el-form label-width="70px">
                <el-form-item label="unit-id" required>
                    <el-input placeholder="请填写广告单元id" v-model="formProps.unitId" clearable>
                    </el-input>
                    <div style="font-size:13px;color:#777">广告单元id，可在
                        <a href="https://mp.weixin.qq.com/wxopen/home?lang=zh_CN" target="_blank">小程序管理后台</a> 的流量主模块新建</div>
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
                unitId: ""
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