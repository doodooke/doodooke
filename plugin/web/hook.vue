<template>
  <div>
    <component v-for="(item,index) in components" :key="index" :is="item" v-bind="componentsProps" v-on="componentsMethods"><slot/></component>
  </div>
</template>

<script>
export default {
    props: ["name"],

    data() {
        return {
            components: [],
            componentsProps: {},
            componentsMethods: {}
        };
    },

    watch: {
        $attrs: function(val) {
            this.componentsProps = val;
        },
        $listeners: function(val) {
            this.componentsMethods = val;
        }
    },

    created() {
        this.components = this.$hook.components[this.name];
        this.componentsProps = this.$attrs;
        this.componentsMethods = this.$listeners;
    }
};
</script>
