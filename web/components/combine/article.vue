<template>
    <el-row @mouseenter.native='showBorder=true' @mouseleave.native='showBorder=false' class="components">
        <el-row class='border-select' style="z-index:1" v-show='itemData.id==$store.state.componentId'></el-row>
        <el-row class='border-select' style="z-index:1" v-show='showBorder'></el-row>
        <el-row>
            <!-- 大图 -->
            <div v-show='formProps.type==0'>
                <div v-if='articleData.length'>
                    <div class='article-wrap' v-for='(item,index) in articleData' :key='index'>
                        <div class='article-title text_overflow text_overflow_line_2' style='margin-bottom: 5px'>{{item.title}}</div>
                        <div>
                            <img :src="item.img[0].img_url" v-if='item.img.length' class='article-img1'>
                            <div v-else style="background-color:#E6F2FF;text-align: center;height:175px;line-height:175px;">
                                <i class="iconfont" style="color:#fff;font-size:68px;">&#xe77d;</i>
                            </div>
                        </div>
                        <div style='color:#8a8a8a'>
                            <span style='margin-right: 5px'>{{item.comment_num}}评论</span>
                            <span>{{item.time}}</span>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class='article-wrap'>
                        <div class='article-title text_overflow text_overflow_line_2' style='margin-bottom: 5px'>文章标题</div>
                        <div style="background-color:#E6F2FF;text-align: center;height:175px;line-height:175px;margin-bottom:5px">
                            <i class="iconfont" style="color:#fff;font-size:68px;">&#xe77d;</i>
                        </div>
                        <div style='color:#8a8a8a'>
                            <span style='margin-right: 5px'>0评论</span>
                            <span>1小时前</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 一图左 -->
            <div v-show='formProps.type==1'>
                <div v-if='articleData.length'>
                    <div class='article-wrap' style='display:flex' v-for='(item,index) in articleData' :key='index'>
                        <img :src="item.img[0].img_url" v-if='item.img.length' class='article-img3' style='margin-right: 10px'>
                        <div v-else style="background-color:#E6F2FF;text-align: center;width:113px;height:113px;line-height:113px;margin-right: 10px">
                            <i class="iconfont" style="color:#fff;font-size:68px;">&#xe77d;</i>
                        </div>
                        <div style='flex:1;padding:3px 0'>
                            <div class='article-title text_overflow text_overflow_line_2' style='margin-bottom: 8px;height:40px'>{{item.title}}</div>
                            <div class='article-describe text_overflow text_overflow_line_2' style='margin-bottom: 8px;word-break: break-all;height:32px'>{{item.info}}</div>
                            <div style='color:#8a8a8a'>
                                <span style='margin-right: 5px'>{{item.comment_num}}评论</span>
                                <span>{{item.time}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class='article-wrap' style='display:flex'>
                        <div style="background-color:#E6F2FF;text-align: center;width:113px;height:113px;line-height:113px;margin-right: 10px">
                            <i class="iconfont" style="color:#fff;font-size:68px;">&#xe77d;</i>
                        </div>
                        <div style='flex:1;padding:3px 0'>
                            <div class='article-title text_overflow text_overflow_line_2' style='margin-bottom: 8px;height:40px'>文章标题</div>
                            <div class='article-describe text_overflow text_overflow_line_2' style='margin-bottom: 8px;word-break: break-all;height:32px'>文章简介</div>
                            <div style='color:#8a8a8a'>
                                <span style='margin-right: 5px'>0评论</span>
                                <span>1小时前</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- 一图右 -->
            <div v-show='formProps.type==2'>
                <div v-if='articleData.length'>
                    <div class='article-wrap' style='display:flex' v-for='(item,index) in articleData' :key='index'>
                        <div style='flex:1;margin-right: 10px;padding:3px 0'>
                            <div class='article-title text_overflow text_overflow_line_2' style='margin-bottom: 8px;height:40px'>{{item.title}}</div>
                            <div class='article-describe text_overflow text_overflow_line_2' style='margin-bottom: 8px;word-break: break-all;height:32px'>{{item.info}}</div>
                            <div style='color:#8a8a8a'>
                                <span style='margin-right: 5px'>{{item.comment_num}}评论</span>
                                <span>{{item.time}}</span>
                            </div>
                        </div>
                        <img :src="item.img[0].img_url" v-if='item.img.length' class='article-img3'>
                        <div v-else style="background-color:#E6F2FF;text-align: center;width:113px;height:113px;line-height:113px;">
                            <i class="iconfont" style="color:#fff;font-size:68px;">&#xe77d;</i>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class='article-wrap' style='display:flex'>
                        <div style='flex:1;margin-right: 10px;padding:3px 0'>
                            <div class='article-title text_overflow text_overflow_line_2' style='margin-bottom: 8px;height:40px'>文章标题</div>
                            <div class='article-describe text_overflow text_overflow_line_2' style='margin-bottom: 8px;word-break: break-all;height:32px'>文章简介</div>
                            <div style='color:#8a8a8a'>
                                <span style='margin-right: 5px'>0评论</span>
                                <span>1小时前</span>
                            </div>
                        </div>
                        <div style="background-color:#E6F2FF;text-align: center;width:113px;height:113px;line-height:113px;">
                            <i class="iconfont" style="color:#fff;font-size:68px;">&#xe77d;</i>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 三图 -->
            <div v-show='formProps.type==3'>
                <div v-if='articleData.length'>
                    <div class='article-wrap' v-for='(item,index) in articleData' :key='index'>
                        <div class='article-title text_overflow text_overflow_line_2' style='margin-bottom: 5px'>{{item.title}}</div>
                        <div style='display:flex'>
                            <div v-for='(img,i) in item.img' :key='i' style='margin-right: 6px'>
                                <img :src="img.img_url" class='article-img3' v-if='img.img_url'>
                                <div v-else style="background-color:#E6F2FF;text-align: center;width:113px;height:113px;line-height:113px;">
                                    <i class="iconfont" style="color:#fff;font-size:68px;">&#xe77d;</i>
                                </div>
                            </div>
                        </div>
                        <div style='color:#8a8a8a'>
                            <span style='margin-right: 5px'>{{item.comment_num}}评论</span>
                            <span>{{item.time}}</span>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class='article-wrap'>
                        <div class='article-title text_overflow text_overflow_line_2' style='margin-bottom: 5px'>文章标题</div>
                        <div style='display:flex;margin-bottom:5px'>
                            <div v-for='(img,i) in 3' :key='i' style='margin-right: 6px'>
                                <div style="background-color:#E6F2FF;text-align: center;width:113px;height:113px;line-height:113px;">
                                    <i class="iconfont" style="color:#fff;font-size:68px;">&#xe77d;</i>
                                </div>
                            </div>
                        </div>
                        <div style='color:#8a8a8a'>
                            <span style='margin-right: 5px'>0评论</span>
                            <span>1小时前</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 无图 -->
            <div v-show='formProps.type==4'>
                <div v-if='articleData.length'>
                    <div class='article-wrap' style='margin-top: 0;padding:5px 10px' v-for='(item,index) in articleData' :key='index'>
                        <div class='article-title text_ellipsis' style='width:100%;line-height: 22px'>{{item.title}}</div>
                    </div>
                </div>
                <div v-else>
                    <div class='article-wrap' style='margin-top: 0;padding:5px 10px'>
                        <div class='article-title text_ellipsis' style='width:100%;line-height: 22px'>文章标题</div>
                    </div>
                </div>
            </div>
        </el-row>
        <el-row v-if="itemData.id==$store.state.componentId" class="config" :style="{left: configOffsetLeft + 'px'}">
            <el-row class="config-title">文章</el-row>
            <el-form label-width="50px">
                <el-form-item label="样式">
                    <el-radio-group v-model="formProps.type">
                        <el-radio label="0">样式一</el-radio>
                        <el-radio label="1">样式二</el-radio>
                        <el-radio label="2" style="margin-right:20px">样式三</el-radio>
                        <el-radio label="3" style="margin-left:0">样式四</el-radio>
                        <el-radio label="4">样式五</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select v-model="formProps.category_id" @change="selectCategory">
                        <el-option v-for='(item,index) in menus' :key='index' :value='item.id' :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input-number v-model="formProps.show_num" :min="1" @change='changeNums'></el-input-number>
                </el-form-item>
                <el-form-item>
                    <p v-show='!menus.length'>暂无数据，请点击添加数据</p>
                    <el-button type='primary' size="small" @click='go("/article")'>添加数据</el-button>
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
    </el-row>
</template>

<script>
import moment from "moment";
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
                type: "0",
                category_id: 0,
                show_num: 10
            },
            menus: [],
            articleData: []
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

            if (this.formProps && this.formProps.category_id) {
                this.getContent(this.formProps.category_id);
            }
            this.getMenus();
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

        if (this.formProps && this.formProps.category_id) {
            this.getContent(this.formProps.category_id);
        }
        this.getMenus();
        moment.locale("zh-cn");
    },
    methods: {
        async getMenus() {
            const res = await this.$axios.$get(
                "/api/article/home/category/index"
            );
            if (res && res.errmsg === "ok") {
                this.menus = res.data;
                let ids = [];
                for (let key in this.menus) {
                    ids.push(this.menus[key].id);
                }
                if (ids.indexOf(this.formProps.category_id) == -1) {
                    this.articleData = [];
                    this.formProps.category_id = "";
                }
            }
        },
        async getContent(id) {
            const res = await this.$axios.$get(
                `/api/article/home/article/index?article_category_id=${id}&pageSize=${
                    this.formProps.show_num
                }&status=1`
            );
            if (res && res.errmsg === "ok") {
                this.articleData = res.data.data;
                for (let key in this.articleData) {
                    this.articleData[key].time = moment(
                        this.articleData[key].created_at
                    ).fromNow();
                }
            }
        },
        selectCategory(id) {
            this.getContent(id);
        },
        changeNums(num) {
            this.getContent(this.formProps.category_id);
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
<style scoped>
.article-wrap {
    padding: 10px;
    background: #fff;
    margin-bottom: 5px;
    font-size: 12px;
}
.article-wrap:last-child {
    margin-bottom: 0;
}
.article-title {
    color: #222;
    font-size: 14px;
}
.article-describe {
    color: #8a8a8a;
}
.article-img1 {
    width: 100%;
    height: 175px;
}
.article-img3 {
    width: 113px;
    height: 113px;
}
</style>
