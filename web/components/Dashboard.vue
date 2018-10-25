<template>
    <el-card shadow="never">
        <el-container style="min-height:600px;">
            <el-aside width="200px" style="background-color: #ffffff">
                <!-- 菜单 -->
                <el-menu :router="true" style="border-right:0px;" :default-active="$route.path" active-text-color="#08b8fd">
                    <div v-for="(item, index) in menu" :key="index">
                        <!-- 菜单组 -->
                        <el-menu-item-group v-if="item.sub && item.sub.length" :key="index">
                            <template slot="title">
                                <i class="iconfont" :class="item.icon" style="margin-right:6px;font-size:18px;"></i>
                                <span style="font-size:18px">{{item.name}}</span>
                            </template>
                            <el-menu-item :index="_item.url" v-for="(_item, _index) in item.sub" :key="_index" :route="{path:_item.url}" style="margin-left:20px;" @click="selectMenu(_item)">{{_item.name}}</el-menu-item>
                        </el-menu-item-group>
                        <!-- 菜单 -->
                        <el-menu-item v-if="!(item.sub && item.sub.length)" :index="item.url" :key="index" :style="{marginTop:item.marginTop}" :route="{path:item.url}" @click="selectMenu(item)" class="text_ellipsis" :title="item.name">
                            <template slot="title">
                                <i class="iconfont" :class="item.icon" style="margin-right:6px;font-size:18px;width:auto" v-if="item.icon"></i>
                                <img :src="item.img" alt="" style="width:16px;margin-right:8px;" v-else>
                                <span style="font-size:18px">{{item.name}}</span>
                            </template>
                        </el-menu-item>
                    </div>

                </el-menu>
            </el-aside>

            <el-container style="margin-left:20px;padding-left:20px;border-left: 1px solid #ebeef5">
                <el-header>
                    {{header}}
                </el-header>

                <slot></slot>
            </el-container>
        </el-container>
    </el-card>
</template>

<script>
export default {
    props: {
        menu: {
            default: function() {
                return [
                    {
                        name: "首页",
                        icon: "el-icon-menu",
                        url: "/app/dashboard"
                    }
                ];
            }
        }
    },
    data() {
        return {
            header: this.$cookies.get("header")
        };
    },
    methods: {
        getSubMenuIndex(index, _index) {
            return `${index}-${_index}`;
        },
        selectMenu(item) {
            this.$cookies.set("header", item.name, {
                path: "/",
                maxAge: 60 * 10
            });
            this.getHeader();
        },
        getHeader() {
            return (this.header = this.$cookies.get("header"));
        }
    }
};
</script>


<style scoped>
.el-header {
    color: #333;
    padding-left: 0px;
    line-height: 60px;
    font-size: 18px;
    border-bottom: 1px solid #ebeef5;
    margin-bottom: 24px;
}

.el-aside {
    color: #333;
}
</style>