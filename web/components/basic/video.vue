<template>
    <el-row @mouseenter.native='showBorder=true' @mouseleave.native='showBorder=false' class="components" style="padding:2px">
        <el-row class='border-select' v-show='itemData.id==$store.state.componentId'></el-row>
        <el-row class='border-select' v-show='showBorder' style="z-index:0"></el-row>
        <el-row class="video">
            <video :src="tencent_src" width="100%" height="100%" controls autobuffer :poster='formProps.poster'></video>
        </el-row>
        <el-row v-if="itemData.id==$store.state.componentId" class="config" :style="{left: configOffsetLeft + 'px'}">
            <el-row class="config-title">视频</el-row>
            <el-form label-width="50px">
                <el-form-item label="封面">
                    <div class="upload-list" v-if='formProps.poster'>
                        <img :src="formProps.poster">
                        <div class="upload-list-cover">
                            <i class="el-icon-edit" @click="handleEdit"></i>
                            <i class="el-icon-delete" @click="handleDel"></i>
                        </div>
                    </div>
                    <div @click='uploadImg' class='upload-img' v-else>
                        <i class='el-icon-upload'></i>
                    </div>
                </el-form-item>
                <el-form-item label="链接" required>
                    <el-input type="textarea" :rows="5" v-model="formProps.src" placeholder="请填写资源源链接" @change="getTencentUrl"></el-input>
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
                src:
                    "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
                poster: ""
            },
            tencent_src:
                "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
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
            this.getTencentUrl();
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
        this.getTencentUrl();
    },
    methods: {
        async getTencentUrl() {
            if (this.formProps.src.indexOf(".qq.com") === -1) {
                return;
            }
            const res = await this.$axios.$get(
                `/api/video/tencent/getTencentUrl?path=${this.formProps.src}`
            );
            if (res && res.errmsg === "ok") {
                if (res.data && res.data.length) {
                    this.tencent_src = res.data[0];
                } else {
                    this.tencent_src = this.formProps.src;
                }
            }
        },
        uploadImg() {
            this.showUpload = true;
        },
        handleEdit() {
            this.showUpload = true;
        },
        selectImg(res) {
            this.showUpload = false;
            if (res.id > 0) {
                this.formProps.poster = res.url;
            }
        },
        cancelUpload() {
            this.showUpload = false;
        },
        handleDel() {
            this.formProps.poster = "";
        },
        cancel() {
            this.$store.commit("SET_COMPONENT_ID", 0);
        },
        save() {
            if (!this.formProps.src) {
                this.$message.warning("请填写链接");
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
<style scoped>
.video {
    max-width: 100%;
    min-height: 150px;
    /* padding-bottom: 20px; */
}
</style>
