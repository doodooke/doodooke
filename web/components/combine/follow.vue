<template>
    <el-row @mouseenter.native='showBorder=true' @mouseleave.native='showBorder=false' class="components">
        <el-row class='border-select' style="z-index:1" v-show='itemData.id==$store.state.componentId'></el-row>
        <el-row class='border-select' style="z-index:1" v-show='showBorder'></el-row>
        <el-row :style="{paddingLeft:formProps.marginLeft+'px',paddingRight:formProps.marginRight+'px'}">
            <div style="padding:10px;display:flex;align-items:center" :style="{width:375-formProps.marginLeft-formProps.marginRight+'px'}">
                <div style="background-color:#E6F2FF;text-align: center;width:50px;height:50px;line-height:50px;border-radius:50%">
                    <i class="iconfont" style="color:#fff;font-size:30px;">&#xe77d;</i>
                </div>
                <div style="flex:1;padding:0 10px">
                    <div style="font-weight:500">公众号名称</div>
                    <div style="font-size:14px;color:#777">公众号简介</div>
                </div>
                <div style="width:46px;height:24px;line-height:22px;border:1px solid #1aad19;border-radius:3px;font-size:14px;color:#1aad19;text-align:center">关注</div>
            </div>
        </el-row>
        <el-row v-if="itemData.id==$store.state.componentId" class="config" :style="{left: configOffsetLeft + 'px'}">
            <el-row class="config-title">关注公众号</el-row>
            <el-form label-width="70px">
                <el-form-item label="左边距">
                    <el-slider v-model="formProps.marginLeft" :min="0" :max="50" show-input></el-slider>
                </el-form-item>
                <el-form-item label="右边距">
                    <el-slider v-model="formProps.marginRight" :min="0" :max="50" show-input></el-slider>
                </el-form-item>
                <div style="font-size:13px;color:#777"> 使用组件前，需前往小程序后台，在“设置”->“接口设置”->“公众号关注组件”中设置要展示的公众号。</div>
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
                marginLeft: 0,
                marginRight: 0
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