<template>
    <el-row @mouseenter.native='showBorder=true' @mouseleave.native='showBorder=false' class="components">
        <el-row class='border-select' v-show='itemData.id==$store.state.componentId'></el-row>
        <el-row class='border-select' v-show='showBorder'></el-row>
        <el-row style="margin:8px 2px;padding-left:6px;border-left-width:4px solid;border-left-style:solid" class="text_ellipsis" :style="{borderLeftColor:formProps.style == 2 ? formProps.color : 'transparent'}">{{formProps.content}}</el-row>
        <el-row v-if="itemData.id==$store.state.componentId" class="config" :style="{left: configOffsetLeft + 'px'}">
            <el-row class="config-title">标题</el-row>
            <el-form label-width="60px">
                <el-tabs type="card">
                    <el-tab-pane label="内容">
                        <el-form-item label="标题" required>
                            <el-input v-model="formProps.content" placeholder="请输入标题" clearable></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="设置">
                        <el-form-item label="样式">
                            <el-radio-group v-model="formProps.style">
                                <el-radio-button :label="1">样式一</el-radio-button>
                                <el-radio-button :label="2">样式二</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="颜色" v-if="formProps.style == 2">
                            <el-color-picker v-model="formProps.color"></el-color-picker>
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
            configOffsetLeft: 0,
            formProps: {},
            formRelations: [],
            formPropsDefault: {
                content: "标题文字",
                style: 1,
                color: "#3399ff"
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
            if (!this.formProps.content) {
                this.$message.warning("请填写标题文字");
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