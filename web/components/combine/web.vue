<template>
    <el-row @mouseenter.native='showBorder=true' @mouseleave.native='showBorder=false' class="components">
        <el-row class='border-select' v-show='itemData.id==$store.state.componentId'></el-row>
        <el-row class='border-select' v-show='showBorder'></el-row>
        <div style="width:100%;height:536px">
            <iframe :src="proxy_domain" sandbox="" security="restricted" scrolling="no" style="width: 100%;height: 100%;border: 0"></iframe>
        </div>
        <el-row v-if="itemData.id==$store.state.componentId" class="config" :style="{left: configOffsetLeft + 'px'}">
            <el-row class="config-title">网页</el-row>
            <el-form label-width="50px">
                <el-form-item label="URL">
                    <el-select v-model="proxy_domain" placeholder="请选择" style="width:100%" @change="changeDomain">
                        <el-option v-for="(item,index) in domainData" :key="index" :label="item.proxy_domain" :value="item.id" :title="item.remark">
                        </el-option>
                    </el-select>
                    <!-- <p style='color:#aaa'>请登录微信小程序后台设置业务域名（个人类型与海外类型的小程序暂不支持使用）</p> -->
                </el-form-item>
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
                url: ""
            },
            domainData: [],
            proxy_domain: ""
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
        this.getData();
    },
    methods: {
        async getData() {
            const res = await this.$axios.$get(
                "/api/webdomain/home/index/index"
            );
            if (res && res.errmsg === "ok") {
                this.domainData = res.data;
                for (let key in this.domainData) {
                    if (
                        this.domainData[key].assign_domain == this.formProps.url
                    ) {
                        this.proxy_domain = this.domainData[key].proxy_domain;
                    }
                }
            }
        },
        changeDomain(val) {
            for (let key in this.domainData) {
                if (this.domainData[key].id == val) {
                    this.formProps.url = this.domainData[key].assign_domain;
                    this.proxy_domain = this.domainData[key].proxy_domain;
                }
            }
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