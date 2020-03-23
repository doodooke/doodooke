<template>
    <qingful-layout>
        <div style="width: 1200px;margin: 0 auto;margin-top: 40px;min-height:500px;">
            <qingful-dashboard :menu="menu">
                <nuxt />
            </qingful-dashboard>
        </div>
    </qingful-layout>
</template>

<script>
import Dashboard from "doodoo-plugin-web/components/Dashboard.vue";
import Layout from "../components/layout.vue";
export default {
    components: {
        "qingful-dashboard": Dashboard,
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
    },
    data() {
        return {
            menu: []
        };
    },
    async mounted() {
        const res = await this.$axios.$get("/api/admin/menu/index");
        if (res && res.errmsg === "ok") {
            this.menu = res.data;
        }
    }
};
</script>
