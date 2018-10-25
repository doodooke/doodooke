<template>
    <Ueditor :config="editorConfig" ueditorPath='/ueditor' :plugins="editorPlugins" :onChange="updateEditorContentWrap" :uploadImage="uploadImage" :value="value" :progress="progress" />
</template>

<script>
export default {
    props: {
        editorConfig: {},
        editorPlugins: {},
        uploadImage: {},
        value: {},
        progress: {},
        extra: {}
    },
    methods: {
        updateEditorContentWrap(content) {
            this.$emit("onChange", content, this.extra);
        }
    }
};
</script>
