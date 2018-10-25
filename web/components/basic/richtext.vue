<template>
    <el-row @mouseenter.native='showBorder=true' @mouseleave.native='showBorder=false' class="components">
        <el-row class='border-select' v-show='itemData.id==$store.state.componentId'></el-row>
        <el-row class='border-select' v-show='showBorder'></el-row>
        <el-row v-html="formProps.text" class="richtext" style="padding:5px 0" :style="{paddingLeft:formProps.padding+'px',paddingRight:formProps.padding+'px'}"></el-row>
        <el-row v-if="itemData.id==$store.state.componentId" class="config" :style="{left: configOffsetLeft + 'px'}">
            <el-row class="config-title">文本</el-row>
            <el-form label-width="70px">
                <el-form-item label="左右边距">
                    <el-slider v-model="formProps.padding" :min="0" :max="50" show-input></el-slider>
                </el-form-item>
                <Ueditor :config="editorConfig" ueditorPath='/ueditor' :plugins="editorPlugins" :onChange="updateEditorContent" :uploadImage="uploadImage" :uploadAudio="uploadAudio" :uploadVideo="uploadVideo" :value="initContent" :progress="progress" />
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
            progress: -1,
            initContent: "",
            configOffsetLeft: 0,
            formProps: {},
            formRelations: [],
            formPropsDefault: {
                text: "我是富文本",
                padding: 0
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
            this.initContent = this.formProps.text;
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
        this.initContent = this.formProps.text;
        this.configOffsetLeft = this.getDiyComponentConfigOffset(this.$el);
    },
    computed: {
        editorConfig() {
            return { zIndex: 1001 };
        },
        editorPlugins() {
            return ["uploadImage", "insertCode", "uploadVideo", "uploadAudio"];
        }
    },
    methods: {
        //编辑器
        updateEditorContent(content) {
            this.formProps.text = content;
        },
        uploadImage(e) {
            console.log(e.target);
            let file = e.target.files[0];
            let param = new FormData(); // 创建form对象
            param.append("file", file, file.name); // 通过append向form对象添加数据
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            return this.$axios.$post(
                "/api/app/home/file/add?type=1",
                param,
                config
            );
        },
        uploadAudio(e) {
            console.log(e.target);
        },
        uploadVideo(e) {
            console.log(e.target);
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
        },
        copyComponent() {
            this.$emit("copy-comp", this.itemData);
        }
    }
};
</script>
<style>
.richtext img {
    max-width: 100%;
}
video {
    width: 100%;
}
</style>



