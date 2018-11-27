<template>
    <el-row>
        <nuxt />
    </el-row>
</template>
<script>
export default {
    head() {
        return {
            title: this.$store.state.env.HEAD_TITLE,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.$store.state.env.HEAD_META_DESCRIPTION
                },
                {
                    hid: "keywords",
                    name: "keywords",
                    content: this.$store.state.env.HEAD_META_KEYWORDS
                }
            ]
        };
    }
};
</script>

