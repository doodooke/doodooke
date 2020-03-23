<template>
    <qingful-layout>
        <nuxt />
    </qingful-layout>
</template>

<script>
import Layout from "../components/layout.vue";
export default {
    components: {
        "qingful-layout": Layout
    },
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
