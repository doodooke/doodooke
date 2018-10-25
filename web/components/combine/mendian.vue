<template>
    <el-row @mouseenter.native='showBorder=true' @mouseleave.native='showBorder=false' class="components">
        <el-row class='border-select' style="z-index:1" v-show='itemData.id==$store.state.componentId'></el-row>
        <el-row class='border-select' style="z-index:1" v-show='showBorder'></el-row>
        <el-row class='wrap'>
            <div style='background:#fff;padding:5px 8px' :style='{marginLeft:formProps.padding+"px",marginRight:formProps.padding+"px",width:375-2*formProps.padding+"px"}'>
                <div style='overflow: hidden' v-show='formProps.style_type!=6'>
                    <div class='shop_img'>
                        <img :src="formProps.logo" v-if='formProps.logo'>
                        <div v-else style="background-color:#E6F2FF;text-align: center;width:60px;height:60px;line-height:60px;border-radius:50%">
                            <i class="iconfont" style="color:#fff;font-size:42px;">&#xe77d;</i>
                        </div>
                    </div>
                    <div style='float:left;margin-left: 10px' :style='{width:280-2*formProps.padding+"px"}'>
                        <div class='shop_title'>{{formProps.name?formProps.name:'店铺名称'}}</div>
                        <div class='shop_desc'>{{formProps.summary?formProps.summary:'店铺简介'}}</div>
                    </div>
                </div>

                <div class='shop_list' v-show='formProps.style_type==1||formProps.style_type==5'>
                    <i class='iconfont icon-dizhi1 shop_dizhi' :style='{color:formProps.icon_color}' :class='{"right":formProps.style_type==5}'></i>
                    <div class='shop_addr' :style='{width:329-2*formProps.padding+"px"}'>{{formProps.address?formProps.address:'店铺地址'}}</div>
                </div>
                <div class='shop_list' v-show='formProps.style_type==1||formProps.style_type==5' style='margin-top: 0'>
                    <i class='iconfont icon-dianhua1 shop_dizhi' :style='{color:formProps.icon_color}' :class='{"right":formProps.style_type==5}'></i>
                    <div class='shop_addr' :style='{width:329-2*formProps.padding+"px"}'>{{formProps.phone?formProps.phone:'店铺电话'}}</div>
                </div>

                <div class='shop_list' v-show='formProps.style_type==2'>
                    <i class='iconfont icon-dizhi1 shop_dizhi' :style='{color:formProps.icon_color}'></i>
                    <div class='shop_addr' :style='{width:329-2*formProps.padding+"px"}'>{{formProps.address?formProps.address:'店铺地址'}}</div>
                </div>

                <div class='shop_list' v-show='formProps.style_type==3'>
                    <i class='iconfont icon-dianhua1 shop_dizhi' :style='{color:formProps.icon_color}'></i>
                    <div class='shop_addr' :style='{width:329-2*formProps.padding+"px"}'>{{formProps.phone?formProps.phone:'店铺电话'}}</div>
                </div>

                <div class='shop_list' :class='{"shop_list1":formProps.style_type==6}' v-show='formProps.style_type==4||formProps.style_type==6'>
                    <i class='iconfont icon-dizhi1 shop_dizhi' :style='{color:formProps.icon_color}'></i>
                    <div class='shop_addr' :style='{width:305-2*formProps.padding+"px"}'>{{formProps.address?formProps.address:'店铺地址'}}</div>
                    <i class='iconfont icon-dianhua1 shop_dizhi' style='float:right' :style='{color:formProps.icon_color}'></i>
                </div>
            </div>
        </el-row>
        <el-row v-if="itemData.id==$store.state.componentId" class="config" :style="{left: configOffsetLeft + 'px'}">
            <el-row class="config-title">门店</el-row>
            <el-form label-width="70px">
                <el-tabs type="card">
                    <el-tab-pane label="内容" name="0">
                        <el-form-item label="图片">
                            <div class="upload-list" v-if="formProps.logo">
                                <img :src="formProps.logo">
                                <div class="upload-list-cover">
                                    <i class="el-icon-edit" @click="handleEdit"></i>
                                    <i class="el-icon-delete" @click="handleDel"></i>
                                </div>
                            </div>
                            <div @click='handleEdit' class='upload-img' v-else>
                                <i class='el-icon-upload'></i>
                            </div>
                        </el-form-item>
                        <el-form-item label="名称">
                            <el-input placeholder='请输入店铺名称,最多15字' :maxlength='15' v-model="formProps.name" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="简介">
                            <el-input type='textarea' placeholder='请输入店铺名称,最多15字' :maxlength='15' v-model="formProps.summary"></el-input>
                        </el-form-item>
                        <el-form-item label="地址">
                            <el-button size="small" @click='selectAddr'>点击选择地址</el-button>
                            <el-input type='textarea' placeholder='请选择地址' v-model="formProps.address"></el-input>
                        </el-form-item>
                        <el-form-item label="电话">
                            <el-input placeholder='请输入电话号码' :maxlength='13' v-model="formProps.phone" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="图标颜色">
                            <el-color-picker v-model="formProps.icon_color"></el-color-picker>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="设置" name="1">
                        <el-form-item label="样式">
                            <el-radio-group v-model="formProps.style_type">
                                <el-radio label="1">样式一</el-radio>
                                <el-radio label="2">样式二</el-radio>
                                <el-radio label="3">样式三</el-radio>
                                <el-radio label="4" style="margin-left:0">样式四</el-radio>
                                <el-radio label="5">样式五</el-radio>
                                <el-radio label="6">样式六</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="边距">
                            <el-slider v-model="formProps.padding" :min="0" :max="50" style="width:90%"></el-slider>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
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
        <!-- 地图 -->
        <el-dialog title="地址" width='800px' :visible.sync='showMap'>
            <div v-if='showMap'>
                <el-input v-model='formProps.address' placeholder='请点击地图选择地址'></el-input>
                <div class="amap-wrapper">
                    <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult" :events="events"></el-amap-search-box>
                    <el-amap vid="amapDemo" :zoom="zoom" :center="center" :plugin="plugin" :events="events">
                        <el-amap-marker v-for="(marker,index) in markers" :key='index' :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
                    </el-amap>
                </div>
            </div>
            <p slot='footer'>
                <el-button type="primary" @click="ok">确定</el-button>
            </p>
        </el-dialog>
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
        let self = this;
        return {
            showBorder: false,
            showUpload: false,
            configOffsetLeft: 0,
            formProps: {},
            formRelations: [],
            formPropsDefault: {
                logo: "",
                name: "",
                summary: "",
                address: "",
                phone: "",
                icon_color: "#3399ff",
                lat: "",
                lng: "",
                style_type: "4", //样式
                padding: 0 //左右边距
            },
            //地图
            showMap: false,
            zoom: 12,
            center: [113.657202, 34.821166],
            events: {
                click(e) {
                    let { lng, lat } = e.lnglat;
                    self.markers[0].position = [lng, lat];
                    self.formProps.lng = lng;
                    self.formProps.lat = lat;
                    self.center = [lng, lat];
                    // 这里通过高德 SDK 完成。
                    var geocoder = new AMap.Geocoder({
                        radius: 1000,
                        extensions: "all"
                    });
                    geocoder.getAddress([lng, lat], function(status, result) {
                        if (status === "complete" && result.info === "OK") {
                            if (result && result.regeocode) {
                                self.formProps.address =
                                    result.regeocode.formattedAddress;
                                self.$nextTick();
                            }
                        }
                    });
                }
            },
            plugin: [
                {
                    // 工具条
                    pName: "ToolBar"
                },
                {
                    // 比例尺
                    pName: "Scale"
                }
            ],
            markers: [
                {
                    position: [113.657202, 34.821166],
                    visible: true,
                    draggable: false
                }
            ],
            searchOption: {
                city: "",
                citylimit: false
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
    },
    methods: {
        handleEdit() {
            this.showUpload = true;
        },
        selectImg(res) {
            this.showUpload = false;
            if (res.id > 0) {
                this.formProps.logo = res.url;
            }
        },
        cancelUpload() {
            this.showUpload = false;
        },
        handleDel() {
            this.formProps.logo = "";
        },
        selectAddr() {
            this.showMap = true;
        },
        ok() {
            this.showMap = false;
        },
        //地图搜索
        onSearchResult(pois) {
            let latSum = 0;
            let lngSum = 0;
            if (pois.length > 0) {
                pois.forEach(poi => {
                    let { lng, lat } = poi;
                    lngSum += lng;
                    latSum += lat;
                    this.markers[0].position = [poi.lng, poi.lat];
                });
                let center = {
                    lng: lngSum / pois.length,
                    lat: latSum / pois.length
                };
                this.center = [center.lng, center.lat];
                this.markers[0].position = [center.lng, center.lat];
                this.formProps.address = pois[0].name;
                this.formProps.lng = center.lng.toFixed(6);
                this.formProps.lat = center.lat.toFixed(6);
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
        },
        copyComponent() {
            this.$emit("copy-comp", this.itemData);
        }
    }
};
</script>
<style scoped>
.shop_img {
    width: 60px;
    height: 60px;
    float: left;
}
.shop_img img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.shop_title {
    width: 100%;
    font-size: 16px;
    color: #333;
    margin-top: 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.shop_desc {
    width: 100%;
    font-size: 14px;
    color: #666;
    margin-top: 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.shop_dizhi {
    color: #08b8fd;
    font-size: 23px;
    float: left;
}
.shop_addr {
    font-size: 14px;
    color: #333;
    float: left;
    width: 300px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.shop_dianhua {
    color: #08b8fd;
    font-size: 24px;
    float: right;
}
.shop_list {
    overflow: hidden;
    line-height: 40px;
    border-top: 1px solid rgb(250, 240, 250);
    margin-top: 10px;
}
.shop_list1 {
    border-top: 0;
    margin-top: 0;
}
.right {
    float: right;
}
.amap-wrapper {
    width: 100%;
    height: 450px;
    margin-top: 20px;
    position: relative;
    overflow: hidden;
}
.search-box {
    position: absolute;
    top: 15px;
    left: 80px;
}
</style>
<style>
.el-radio {
    line-height: 25px;
}
</style>
