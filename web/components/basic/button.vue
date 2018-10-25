<template>
    <el-row @mouseenter.native='showBorder=true' @mouseleave.native='showBorder=false' class="components">
        <el-row class='border-select' style="z-index:1" v-show='itemData.id==$store.state.componentId'></el-row>
        <el-row class='border-select' style="z-index:1" v-show='showBorder'></el-row>
        <el-row class="zan-btn" :class="{'zan-btn--large':formProps.size == 'large','zan-btn--small':formProps.size == 'small','zan-btn--mini':formProps.size == 'mini','zan-btn--plain':formProps.plain}" :style="{color:formProps.color,background:formProps.bgColor}">{{formProps.text}}</el-row>
        <el-row v-if="itemData.id==$store.state.componentId" class="config" :style="{left: configOffsetLeft + 'px'}">
            <el-row class="config-title">按钮</el-row>
            <el-form label-width="70px">
                <el-form-item label="文字" required>
                    <el-input v-model="formProps.text" placeholder="请输入按钮文字" :maxlength="10" clearable></el-input>
                </el-form-item>
                <el-form-item label="大小">
                    <el-radio-group v-model="formProps.size">
                        <el-radio-button label="">中等</el-radio-button>
                        <el-radio-button label="large">大型</el-radio-button>
                        <!-- <el-radio-button label="small">小型</el-radio-button>
                        <el-radio-button label="mini">超小</el-radio-button> -->
                    </el-radio-group>
                </el-form-item>
                <!-- <el-form-item label="镂空">
                    <el-radio-group v-model="formProps.plain">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                </el-form-item> -->
                <el-form-item label="背景颜色" style="height:40px">
                    <el-color-picker v-model="formProps.bgColor"></el-color-picker>
                </el-form-item>
                <el-form-item label="文字颜色" style="height:40px">
                    <el-color-picker v-model="formProps.color"></el-color-picker>
                </el-form-item>
                <el-form-item label="点击事件">
                    <el-input placeholder="请选择绑定事件" v-model="formProps.targetUrl" clearable @clear="clearLink">
                        <el-button slot="append" @click="handleLink">选择</el-button>
                    </el-input>
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
            showLink: false,
            configOffsetLeft: 0,
            formProps: {},
            formRelations: [],
            formPropsDefault: {
                targetType: "",
                targetUrl: "",
                size: "",
                plain: false,
                text: "按钮",
                height: 0,
                padding: 0,
                bgColor: "#fff",
                color: "#222",
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
        cancel() {
            this.$store.commit("SET_COMPONENT_ID", 0);
        },
        async save() {
            if (!this.formProps.text) {
                this.$message.warning("请填写文字");
                return;
            }

            if (this.formProps.formType) {
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
<style scoped>
.zan-btn {
    position: relative;
    color: #333;
    background-color: #fff;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 2px;
    border: 1px solid #eee;
    font-size: 16px;
    line-height: 45px;
    height: 45px;
    box-sizing: border-box;
    text-decoration: none;
    text-align: center;
    vertical-align: middle;
    overflow: visible;
}
.zan-btn--large {
    border-radius: 0;
    border: none;
    line-height: 50px;
    height: 50px;
}
.zan-btn--small {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
}
.zan-btn--mini {
    display: inline-block;
    line-height: 21px;
    height: 22px;
    font-size: 10px;
    padding-left: 5px;
    padding-right: 5px;
}

.zan-btn--plain.zan-btn {
    background-color: transparent;
}
</style>
