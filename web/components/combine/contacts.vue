<template>
    <el-row @mouseenter.native='showBorder=true' @mouseleave.native='showBorder=false' class="components">
        <el-row class='border-select' style="z-index:1" v-show='itemData.id==$store.state.componentId'></el-row>
        <el-row class='border-select' style="z-index:1" v-show='showBorder'></el-row>
        <el-row class='wrap' :style='{marginLeft:formProps.padding+"px",marginRight:formProps.padding+"px",width:375-2*formProps.padding+"px"}'>
            <div style='padding:10px'>
                <div style='display: flex;align-items:center;float: left'>
                    <div style='width:50px;height:50px;border-radius:50%;overflow:hidden;margin-right: 10px'>
                        <img :src="formProps.left_img" style='width:100%;height:100%' v-if='formProps.left_img'>
                        <div v-else style="background-color:#E6F2FF;text-align: center;width:50px;height:50px;line-height:50px;border-radius:50%">
                            <i class="iconfont" style="color:#fff;font-size:38px;">&#xe77d;</i>
                        </div>
                    </div>
                    <div style='float: left'>
                        <p style='font-size: 16px;font-weight: 500;line-height:30px'>{{formProps.name?formProps.name:'联系人名称'}}</p>
                        <span style='font-size:12px;margin-right: 3px;padding:0 4px;border-radius:2px;background:#eee;color:#657180;display:inline-block' v-for='(item,index) in labels' :key='index'>{{item}}</span>
                    </div>
                </div>
                <div class='icon-phone'>
                    <i class='iconfont icon-dianhua1'></i>
                </div>
                <div style='clear: both'></div>
                <div style='margin-top: 10px;overflow:hidden;line-height: 27px;font-size:14px;border-top:1px solid rgb(250, 240, 250)'>
                    <i class='iconfont icon-dizhi1' style='float:left;font-size: 20px;color:#06a0fd;'></i>
                    <div class='address' :style='{width:270-2*formProps.padding+"px"}'>{{formProps.address?formProps.address:'联系人地址'}}</div>
                    <span style='float: right;color:#657180'>距离12km</span>
                </div>
            </div>
        </el-row>
        <el-row v-if="itemData.id==$store.state.componentId" class="config" :style="{left: configOffsetLeft + 'px'}">
            <el-row class="config-title">通讯录</el-row>
            <el-form label-width="70px">
                <el-tabs type="card">
                    <el-tab-pane label="内容" name="0">
                        <el-form-item label="图片">
                            <div class="upload-list" v-if="formProps.left_img">
                                <img :src="formProps.left_img">
                                <div class="upload-list-cover">
                                    <i class="el-icon-edit" @click="handleEdit"></i>
                                    <i class="el-icon-delete" @click="handleDel"></i>
                                </div>
                            </div>
                            <div @click='handleEdit' class='upload-img' v-else>
                                <i class='el-icon-upload'></i>
                            </div>
                            <span style="margin-left:16px"> 最佳尺寸：120*120px</span>
                        </el-form-item>
                        <el-form-item label="名称">
                            <el-input placeholder='请输入店铺名称,最多12字' :maxlength='12' v-model="formProps.name" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="标签">
                            <el-tag :key="index" v-for="(tag,index) in labels" closable :disable-transitions="false" @close="handleClose(tag)" style="margin-right:6px">
                                {{tag}}
                            </el-tag>
                            <el-input placeholder='请输入标签,最多5个字' :maxlength='5' v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                            </el-input>
                            <el-button size="small" @click="showInput" v-if="!inputVisible && labels.length<3">添加标签</el-button>
                        </el-form-item>
                        <el-form-item label="地址">
                            <el-button size="small" @click='selectAddr'>点击选择地址</el-button>
                            <el-input type='textarea' placeholder='请选择地址' v-model="formProps.address"></el-input>
                        </el-form-item>
                        <el-form-item label="电话">
                            <el-input placeholder='请输入电话号码' :maxlength='13' v-model="formProps.phone" clearable></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="设置" name="1">
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
                left_img: "",
                name: "",
                label: [],
                address: "",
                phone: "",
                lat: "",
                lng: "",
                padding: 0 //左右边距
            },
            labels: [],
            inputVisible: false,
            inputValue: "",
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

            if (this.formProps.label) {
                this.labels = this.formProps.label;
            }
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

        if (this.formProps.label) {
            this.labels = this.formProps.label;
        }
    },
    methods: {
        handleEdit() {
            this.showUpload = true;
        },
        selectImg(res) {
            this.showUpload = false;
            if (res.id > 0) {
                this.formProps.left_img = res.url;
            }
        },
        cancelUpload() {
            this.showUpload = false;
        },
        handleDel(index) {
            this.formProps.left_img = "";
        },
        selectAddr() {
            this.showMap = true;
        },
        //标签
        handleClose(tag) {
            this.labels.splice(this.labels.indexOf(tag), 1);
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.labels.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = "";
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
            this.formProps.label = this.labels;
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
.wrap {
    background: #fff;
    overflow: hidden;
}

.address {
    float: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #000;
}

.icon-phone i {
    color: #06a0fd;
    font-size: 28px;
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
