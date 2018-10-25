<template>
    <el-row @mouseenter.native='showBorder=true' @mouseleave.native='showBorder=false' class="components">
        <el-row class='border-select' style="z-index:1" v-show='itemData.id==$store.state.componentId'></el-row>
        <el-row class='border-select' style="z-index:1" v-show='showBorder'></el-row>
        <el-row>
            <el-row style="padding:10px 10px 0">
                <!-- 大图一列 -->
                <div class='good_wrap' style="padding:5px" v-for='(item,index) in products' :key='index' v-if="formProps.product_type==0&&products.length">
                    <div style="width:340px;height:340px;position:relative">
                        <img :src="item.img_url">
                        <div v-show='formProps.label_icon!=0'>
                            <i class='iconfont' :class='{
                                "icon-biaoqian8":formProps.label_icon==1,
                                "icon-biaoqian":formProps.label_icon==2,
                                "icon-biaoqian4":formProps.label_icon==3,
                                "icon-biaoqian1":formProps.label_icon==4,
                                "icon-biaoqian11":formProps.label_icon==5}' style='position:absolute;left:0;top:0;font-size:60px' :style='{color:formProps.label_icon_color}'>
                            </i>
                            <div style='width:24px;text-align: center;position:absolute;font-size:12px' :style='{
                                color:formProps.label_color,
                                top:formProps.label_icon==3?"9px":(formProps.label_icon==4||formProps.label_icon==5?"7px":"16px"),
                                left:formProps.label_icon==1?"6px":(formProps.label_icon==2?"10px":"2px"),
                                transform:(formProps.label_icon==3||formProps.label_icon==4||formProps.label_icon==5)?"rotate(-45deg)":"",
                            }'>{{formProps.label_name}}
                            </div>
                        </div>
                    </div>
                    <div style='padding:10px 8px;height:64px;background:#fff;position:relative'>
                        <div :style='{textAlign:formProps.show_type==2?"center":"left"}'>
                            <div class='good_name' :style="{width:formProps.show_type==2?'330px':'260px'}">
                                <i class="iconfont icon-fenxiao" :style='{color:formProps.cart_icon_color}' v-if="item.type == 1"></i>
                                <!-- <span v-if="item.type == 2" :style="{color:formProps.cart_icon_color}">[2人团]</span> -->
                                {{item.name}}</div>
                            <div style='margin-top:4px' :style='{textAlign:formProps.show_type==2?"center":"left"}'>
                                <span class='good_price' :style='{color:$store.state.color}'>
                                    <span class='good_price_symbol'>¥</span>{{item.price}}</span>
                                <del class='good_price_org'>¥{{item.price_org}}</del>
                            </div>
                        </div>
                        <div style='position:absolute;right:0;text-align:center' :style='{width:formProps.show_type==0?"100px":"34px",top:formProps.show_type==0?"4px":"20px"}' v-show='formProps.show_type!=2 && item.type!=2'>
                            <i class='iconfont' :class='{
                                "icon-cart1":formProps.cart_icon==0,
                                "icon-cart3":formProps.cart_icon==1,
                                "icon-cart":formProps.cart_icon==2,
                                "icon-cart2":formProps.cart_icon==3,
                                "icon-gouwuche6":formProps.cart_icon==4,
                                "icon-gouwuche5":formProps.cart_icon==5}' style='font-size:34px' :style='{color:formProps.cart_icon_color}'></i>
                        </div>
                        <div style='position:absolute;right:0;text-align:center' :style='{width:formProps.show_type==0?"100px":"60px",top:formProps.show_type==0?"10px":"25px"}' v-show='formProps.show_type!=2 && item.type==2'>
                            <div class="group-btn" :style="{background:formProps.cart_icon_color}">去开团</div>
                        </div>
                        <div style='text-align:center;width:100px;position:absolute;bottom:0;right:0' v-show='formProps.show_type==0'>
                            <div class='good_sale'>已有{{item.sale}}人购买</div>
                        </div>
                    </div>
                </div>
                <div class='good_wrap' style="padding:5px" v-if="formProps.product_type==0&&!products.length">
                    <div style="width:340px;height:340px;position:relative">
                        <div style="background-color:#E6F2FF;text-align: center;width:340;height:340px;line-height:340px;">
                            <i class="iconfont" style="color:#fff;font-size:68px;">&#xe77d;</i>
                        </div>
                        <div v-show='formProps.label_icon!=0'>
                            <i class='iconfont' :class='{
                                "icon-biaoqian8":formProps.label_icon==1,
                                "icon-biaoqian":formProps.label_icon==2,
                                "icon-biaoqian4":formProps.label_icon==3,
                                "icon-biaoqian1":formProps.label_icon==4,
                                "icon-biaoqian11":formProps.label_icon==5}' style='position:absolute;left:0;top:0;font-size:60px' :style='{color:formProps.label_icon_color}'>
                            </i>
                            <div style='width:24px;text-align: center;position:absolute;font-size:12px' :style='{
                                color:formProps.label_color,
                                top:formProps.label_icon==3?"9px":(formProps.label_icon==4||formProps.label_icon==5?"7px":"16px"),
                                left:formProps.label_icon==1?"6px":(formProps.label_icon==2?"10px":"2px"),
                                transform:(formProps.label_icon==3||formProps.label_icon==4||formProps.label_icon==5)?"rotate(-45deg)":"",
                            }'>{{formProps.label_name}}
                            </div>
                        </div>
                    </div>
                    <div style='padding:10px 8px;height:64px;background:#fff;position:relative'>
                        <div :style='{textAlign:formProps.show_type==2?"center":"left"}'>
                            <div class='good_name' :style="{width:formProps.show_type==2?'330px':'260px'}">商品名称</div>
                            <div style='margin-top:4px' :style='{textAlign:formProps.show_type==2?"center":"left"}'>
                                <span class='good_price'>
                                    <span class='good_price_symbol'>¥</span>0</span>
                                <del class='good_price_org'>¥0</del>
                            </div>
                        </div>
                        <div style='position:absolute;top:4px;right:0;text-align:center' :style='{width:formProps.show_type==0?"100px":"34px",top:formProps.show_type==0?"4px":"20px"}' v-show='formProps.show_type!=2'>
                            <i class='iconfont' :class='{
                                "icon-cart1":formProps.cart_icon==0,
                                "icon-cart3":formProps.cart_icon==1,
                                "icon-cart":formProps.cart_icon==2,
                                "icon-cart2":formProps.cart_icon==3,
                                "icon-gouwuche6":formProps.cart_icon==4,
                                "icon-gouwuche5":formProps.cart_icon==5}' style='font-size:34px' :style='{color:formProps.cart_icon_color}'></i>
                        </div>
                        <div style='text-align:center;width:100px;position:absolute;bottom:0;right:0' v-show='formProps.show_type==0'>
                            <div class='good_sale'>已有0人购买</div>
                        </div>
                    </div>
                </div>
                <!-- 列表显示 -->
                <div class='good_wrap' v-for='(item,index) in products' :key='index' style='width:100%;display:flex;padding:5px' v-if="formProps.product_type==1&&products.length">
                    <div style='width:115px;height:115px;position:relative'>
                        <img :src="item.img_url">
                        <div v-show='formProps.label_icon!=0'>
                            <i class='iconfont' :class='{
                                "icon-biaoqian8":formProps.label_icon==1,
                                "icon-biaoqian":formProps.label_icon==2,
                                "icon-biaoqian4":formProps.label_icon==3,
                                "icon-biaoqian1":formProps.label_icon==4,
                                "icon-biaoqian11":formProps.label_icon==5}' style='position:absolute;left:0;top:-2px;font-size:60px' :style='{color:formProps.label_icon_color}'>
                            </i>
                            <div style='width:24px;text-align: center;position:absolute;font-size:12px' :style='{
                                color:formProps.label_color,
                                top:formProps.label_icon==3?"7px":(formProps.label_icon==4||formProps.label_icon==5?"5px":"14px"),
                                left:formProps.label_icon==1?"6px":(formProps.label_icon==2?"10px":"2px"),
                                transform:(formProps.label_icon==3||formProps.label_icon==4||formProps.label_icon==5)?"rotate(-45deg)":"",
                            }'>{{formProps.label_name}}
                            </div>
                        </div>
                    </div>
                    <div style='padding:2px 2px 2px 10px;background:#fff;position:relative;flex:1'>
                        <div>
                            <div style='font-size:17px;color:#222;' class='text_overflow' :class='{text_overflow_line_2:formProps.show_type==3,text_overflow_line_1:formProps.show_type==4}' :style='{height:formProps.show_type==3?"47px":"24px"}'>
                                <i class="iconfont icon-fenxiao" :style='{color:formProps.cart_icon_color}' v-if="item.type == 1"></i>
                                <!-- <span v-if="item.type == 2" :style="{color:formProps.cart_icon_color}">[2人团]</span> -->
                                {{item.name}}</div>
                            <div style='font-size:14px;color:#8a8a8a;margin-bottom: 5px;height:41px' class='text_overflow text_overflow_line_2' v-show='formProps.show_type == 4'>{{item.info}}</div>
                            <div style='margin-top: 16px'>
                                <span class='good_price' :style='{color:$store.state.color}'>
                                    <span class='good_price_symbol'>¥</span>{{item.price}}</span>
                                <del class='good_price_org'>¥{{item.price_org}}</del>
                            </div>
                            <div class='good_sale' v-show='formProps.show_type==3'>已有{{item.sale}}人购买</div>
                        </div>
                        <div style='position:absolute;bottom:0;right:0;line-height: 1' v-if='item.type!=2'>
                            <i class='iconfont' :class='{
                                "icon-cart1":formProps.cart_icon==0,
                                "icon-cart3":formProps.cart_icon==1,
                                "icon-cart":formProps.cart_icon==2,
                                "icon-cart2":formProps.cart_icon==3,
                                "icon-gouwuche6":formProps.cart_icon==4,
                                "icon-gouwuche5":formProps.cart_icon==5}' style='font-size:34px' :style='{color:formProps.cart_icon_color}'></i>
                        </div>
                        <div style='position:absolute;bottom:0;right:0;text-align:center' v-else>
                            <div class="group-btn" :style="{background:formProps.cart_icon_color}">去开团</div>
                        </div>
                    </div>
                </div>
                <div class='good_wrap' style='width:100%;display:flex;padding:5px' v-if="formProps.product_type==1&&!products.length">
                    <div style='width:115px;height:115px;position:relative'>
                        <div style="background-color:#E6F2FF;text-align: center;width:100%;height:100%;line-height:115px;">
                            <i class="iconfont" style="color:#fff;font-size:68px;">&#xe77d;</i>
                        </div>
                        <div v-show='formProps.label_icon!=0'>
                            <i class='iconfont' :class='{
                                "icon-biaoqian8":formProps.label_icon==1,
                                "icon-biaoqian":formProps.label_icon==2,
                                "icon-biaoqian4":formProps.label_icon==3,
                                "icon-biaoqian1":formProps.label_icon==4,
                                "icon-biaoqian11":formProps.label_icon==5}' style='position:absolute;left:0;top:-2px;font-size:60px' :style='{color:formProps.label_icon_color}'>
                            </i>
                            <div style='width:24px;text-align: center;position:absolute;font-size:12px' :style='{
                                color:formProps.label_color,
                                top:formProps.label_icon==3?"7px":(formProps.label_icon==4||formProps.label_icon==5?"5px":"14px"),
                                left:formProps.label_icon==1?"6px":(formProps.label_icon==2?"10px":"2px"),
                                transform:(formProps.label_icon==3||formProps.label_icon==4||formProps.label_icon==5)?"rotate(-45deg)":"",
                            }'>{{formProps.label_name}}
                            </div>
                        </div>
                    </div>
                    <div style='padding:2px 2px 2px 10px;background:#fff;position:relative;flex:1'>
                        <div>
                            <div style='font-size:17px;color:#222;' class='text_overflow' :class='{text_overflow_line_2:formProps.show_type==3,text_overflow_line_1:formProps.show_type==4}' :style='{height:formProps.show_type==3?"47px":"24px"}'>商品名称</div>
                            <div style='font-size:14px;color:#8a8a8a;margin-bottom: 5px;height:41px' class='text_overflow text_overflow_line_2' v-show='formProps.show_type == 4'>商品简介</div>
                            <div style='margin-top: 16px'>
                                <span class='good_price'>
                                    <span class='good_price_symbol'>¥</span>0</span>
                                <del class='good_price_org'>¥0</del>
                            </div>
                            <div class='good_sale' v-show='formProps.show_type==3'>已有0人购买</div>
                        </div>
                        <div style='position:absolute;bottom:0;right:0;line-height: 1'>
                            <i class='iconfont' :class='{
                                "icon-cart1":formProps.cart_icon==0,
                                "icon-cart3":formProps.cart_icon==1,
                                "icon-cart":formProps.cart_icon==2,
                                "icon-cart2":formProps.cart_icon==3,
                                "icon-gouwuche6":formProps.cart_icon==4,
                                "icon-gouwuche5":formProps.cart_icon==5}' style='font-size:34px' :style='{color:formProps.cart_icon_color}'></i>
                        </div>
                    </div>
                </div>
                <!-- 双列 -->
                <div class='good_wrap' v-for='(item,index) in products' :key='index' style="width:172.5px;padding:5px;" :style="{marginRight:index%2==0?'10px': '0'}" v-if="formProps.product_type==2&&products.length">
                    <div style='position:relative;width:162.5px;height:162.5px'>
                        <img :src="item.img_url">
                        <div v-show='formProps.label_icon!=0'>
                            <i class='iconfont' :class='{
                                "icon-biaoqian8":formProps.label_icon==1,
                                "icon-biaoqian":formProps.label_icon==2,
                                "icon-biaoqian4":formProps.label_icon==3,
                                "icon-biaoqian1":formProps.label_icon==4,
                                "icon-biaoqian11":formProps.label_icon==5}' style='position:absolute;left:0;top:0;font-size:60px' :style='{color:formProps.label_icon_color}'>
                            </i>
                            <div style='width:24px;text-align: center;position:absolute;font-size:12px' :style='{
                                color:formProps.label_color,
                                top:formProps.label_icon==3?"9px":(formProps.label_icon==4||formProps.label_icon==5?"7px":"16px"),
                                left:formProps.label_icon==1?"6px":(formProps.label_icon==2?"10px":"2px"),
                                transform:(formProps.label_icon==3||formProps.label_icon==4||formProps.label_icon==5)?"rotate(-45deg)":"",
                                }'>{{formProps.label_name}}
                            </div>
                        </div>
                    </div>
                    <div style='padding:8px 8px 0 8px;width:100%;position:relative;overflow:hidden'>
                        <div class='text_overflow text_overflow_line_2' style='font-size:15px;color:#222;height:41px;margin-bottom: 5px'>
                            <i class="iconfont icon-fenxiao" :style='{color:formProps.cart_icon_color}' v-if="item.type == 1"></i>
                            <!-- <span v-if="item.type == 2" :style="{color:formProps.cart_icon_color}">[2人团]</span> -->
                            {{item.name}}</div>
                        <div style='font-size:14px;color:#8a8a8a;margin-bottom: 5px;height:21px' class='text_ellipsis' v-show='formProps.show_type == 6'>{{item.info}}</div>
                        <div class='good_price' :style='{color:$store.state.color}'>
                            <span class='good_price_symbol'>¥</span>{{item.price}}
                        </div>

                        <div style='position:absolute;right:3px;bottom:-2px' v-if="item.type != 2">
                            <i class='iconfont' :class='{
                            "icon-cart1":formProps.cart_icon==0,
                            "icon-cart3":formProps.cart_icon==1,
                            "icon-cart":formProps.cart_icon==2,
                            "icon-cart2":formProps.cart_icon==3,
                            "icon-gouwuche6":formProps.cart_icon==4,
                            "icon-gouwuche5":formProps.cart_icon==5}' style='font-size:34px' :style='{color:formProps.cart_icon_color}'></i>
                        </div>
                        <div style='position:absolute;bottom:0;right:0;text-align:center' v-else>
                            <div class="group-btn" :style="{background:formProps.cart_icon_color}">去开团</div>
                        </div>
                    </div>
                </div>
                <div class='good_wrap' v-if="formProps.product_type==2&&!products.length" style="width:172.5px;padding:5px;" :style="{marginRight:index%2==0?'10px': '0'}" v-for="(item,index) in 2" :key="item">
                    <div style='position:relative;width:162.5px;height:162.5px'>
                        <div style="background-color:#E6F2FF;text-align: center;width:100%;height:100%;line-height:162.5px;">
                            <i class="iconfont" style="color:#fff;font-size:68px;">&#xe77d;</i>
                        </div>
                        <div v-show='formProps.label_icon!=0'>
                            <i class='iconfont' :class='{
                                "icon-biaoqian8":formProps.label_icon==1,
                                "icon-biaoqian":formProps.label_icon==2,
                                "icon-biaoqian4":formProps.label_icon==3,
                                "icon-biaoqian1":formProps.label_icon==4,
                                "icon-biaoqian11":formProps.label_icon==5}' style='position:absolute;left:0;top:0;font-size:60px' :style='{color:formProps.label_icon_color}'>
                            </i>
                            <div style='width:24px;text-align: center;position:absolute;font-size:12px' :style='{
                                color:formProps.label_color,
                                top:formProps.label_icon==3?"9px":(formProps.label_icon==4||formProps.label_icon==5?"7px":"16px"),
                                left:formProps.label_icon==1?"6px":(formProps.label_icon==2?"10px":"2px"),
                                transform:(formProps.label_icon==3||formProps.label_icon==4||formProps.label_icon==5)?"rotate(-45deg)":"",
                                }'>{{formProps.label_name}}
                            </div>
                        </div>
                    </div>
                    <div style='padding:8px 8px 0 8px;width:100%;position:relative;overflow:hidden'>
                        <div class='text_overflow text_overflow_line_2' style='font-size:15px;color:#222;height:41px;margin-bottom: 5px'>商品名称</div>
                        <div style='font-size:14px;color:#8a8a8a;margin-bottom: 5px;height:21px' class='text_ellipsis' v-show='formProps.show_type == 6'>商品简介</div>
                        <div class='good_price'>
                            <span class='good_price_symbol'>¥</span>0
                        </div>

                        <div style='position:absolute;right:3px;bottom:-2px'>
                            <i class='iconfont' :class='{
                            "icon-cart1":formProps.cart_icon==0,
                            "icon-cart3":formProps.cart_icon==1,
                            "icon-cart":formProps.cart_icon==2,
                            "icon-cart2":formProps.cart_icon==3,
                            "icon-gouwuche6":formProps.cart_icon==4,
                            "icon-gouwuche5":formProps.cart_icon==5}' style='font-size:34px' :style='{color:formProps.cart_icon_color}'></i>
                        </div>
                    </div>
                </div>
                <!-- 三列 -->
                <div class='good_wrap' style="width:111px;padding:5px" :style="{marginRight:index%3==2?'0': '10px'}" v-for='(item,index) in products' :key='index' v-if='formProps.product_type==3&&products.length'>
                    <div style='position:relative;width:101px;height:101px;'>
                        <img :src="item.img_url">
                        <div v-show='formProps.label_icon!=0'>
                            <i class='iconfont' :class='{
                                "icon-biaoqian8":formProps.label_icon==1,
                                "icon-biaoqian":formProps.label_icon==2,
                                "icon-biaoqian4":formProps.label_icon==3,
                                "icon-biaoqian1":formProps.label_icon==4,
                                "icon-biaoqian11":formProps.label_icon==5}' style='position:absolute;left:0;top:-2px;font-size:60px' :style='{color:formProps.label_icon_color}'>
                            </i>
                            <div style='width:24px;text-align: center;position:absolute;font-size:12px' :style='{
                                color:formProps.label_color,
                                top:formProps.label_icon==3?"7px":(formProps.label_icon==4||formProps.label_icon==5?"5px":"14px"),
                                left:formProps.label_icon==1?"6px":(formProps.label_icon==2?"10px":"2px"),
                                transform:(formProps.label_icon==3||formProps.label_icon==4||formProps.label_icon==5)?"rotate(-45deg)":"",
                                }'>{{formProps.label_name}}
                            </div>
                        </div>
                    </div>
                    <div style='padding:8px 8px 0 8px;width:100%;position:relative;overflow:hidden' :style='{textAlign:formProps.show_type==8?"center":"left"}'>
                        <div class='text_overflow text_overflow_line_2' style='font-size:14px;color:#222;height:41px;margin-bottom: 5px;word-break:break-all'>
                            <i class="iconfont icon-fenxiao" :style='{color:formProps.cart_icon_color}' v-if="item.type == 1"></i>
                            <!-- <span v-if="item.type == 2" :style="{color:formProps.cart_icon_color}">[2人团]</span> -->
                            {{item.name}}</div>
                        <div style='font-size:14px;color:#8a8a8a;margin-bottom: 5px;height:21px' class='text_ellipsis' v-show='formProps.show_type == 6'>{{item.info}}</div>
                        <div class='good_price' :style='{color:$store.state.color}'>
                            <span class='good_price_symbol'>¥</span>{{item.price}}
                        </div>
                        <div style='position:absolute;right:3px;bottom:-2px;line-height: 1' v-show='formProps.show_type==7 && item.type !=2'>
                            <i class='iconfont' :class='{
                                "icon-cart1":formProps.cart_icon==0,
                                "icon-cart3":formProps.cart_icon==1,
                                "icon-cart":formProps.cart_icon==2,
                                "icon-cart2":formProps.cart_icon==3,
                                "icon-gouwuche6":formProps.cart_icon==4,
                                "icon-gouwuche5":formProps.cart_icon==5}' style='font-size:34px' :style='{color:formProps.cart_icon_color}'></i>
                        </div>
                        <div style='position:absolute;bottom:2px;right:3px;text-align:center' v-show='formProps.show_type==7 && item.type ==2'>
                            <div style="width: 46px;height: 20px;line-height:20px;borderRadius: 10px;color:#fff;font-size:12px;" :style="{background:formProps.cart_icon_color}">去开团</div>
                        </div>
                    </div>
                </div>
                <div class='good_wrap' style="width:111px;padding:5px" v-for="(item,index) in 3" :key="index" :style="{marginRight:index%3==2?'0': '10px'}" v-if='formProps.product_type==3&&!products.length'>
                    <div style='position:relative;width:101px;height:101px;'>
                        <div style="background-color:#E6F2FF;text-align: center;width:100%;height:100%;line-height:101px;">
                            <i class="iconfont" style="color:#fff;font-size:68px;">&#xe77d;</i>
                        </div>
                        <div v-show='formProps.label_icon!=0'>
                            <i class='iconfont' :class='{
                                "icon-biaoqian8":formProps.label_icon==1,
                                "icon-biaoqian":formProps.label_icon==2,
                                "icon-biaoqian4":formProps.label_icon==3,
                                "icon-biaoqian1":formProps.label_icon==4,
                                "icon-biaoqian11":formProps.label_icon==5}' style='position:absolute;left:0;top:-2px;font-size:60px' :style='{color:formProps.label_icon_color}'>
                            </i>
                            <div style='width:24px;text-align: center;position:absolute;font-size:12px' :style='{
                                color:formProps.label_color,
                                top:formProps.label_icon==3?"7px":(formProps.label_icon==4||formProps.label_icon==5?"5px":"14px"),
                                left:formProps.label_icon==1?"6px":(formProps.label_icon==2?"10px":"2px"),
                                transform:(formProps.label_icon==3||formProps.label_icon==4||formProps.label_icon==5)?"rotate(-45deg)":"",
                                }'>{{formProps.label_name}}
                            </div>
                        </div>
                    </div>
                    <div style='padding:8px 8px 0 8px;width:100%;position:relative;overflow:hidden' :style='{textAlign:formProps.show_type==8?"center":"left"}'>
                        <div class='text_overflow text_overflow_line_2' style='font-size:15px;color:#222;height:41px;margin-bottom: 5px'>
                            商品名称</div>
                        <div style='font-size:14px;color:#8a8a8a;margin-bottom: 5px;height:21px' class='text_ellipsis' v-show='formProps.show_type == 6'>商品简介</div>
                        <div class='good_price'>
                            <span class='good_price_symbol'>¥</span>0
                        </div>
                        <div style='position:absolute;right:3px;bottom:-2px;line-height: 1' v-show='formProps.show_type==7'>
                            <i class='iconfont' :class='{
                                "icon-cart1":formProps.cart_icon==0,
                                "icon-cart3":formProps.cart_icon==1,
                                "icon-cart":formProps.cart_icon==2,
                                "icon-cart2":formProps.cart_icon==3,
                                "icon-gouwuche6":formProps.cart_icon==4,
                                "icon-gouwuche5":formProps.cart_icon==5}' style='font-size:34px' :style='{color:formProps.cart_icon_color}'></i>
                        </div>
                    </div>
                </div>
            </el-row>
        </el-row>
        <el-row v-if="itemData.id==$store.state.componentId" class="config" :style="{left: configOffsetLeft + 'px'}">
            <el-row class="config-title">商品</el-row>
            <el-form label-width="100px">
                <el-tabs type="card">
                    <el-tab-pane label="内容" name="0">
                        <el-button size="small" @click="addProduct" style="margin-bottom:10px">添加商品</el-button>
                        <draggable v-model="products">
                            <el-row class="product-list" style="margin-bottom:5px" v-for="(item,index) in products" :key="index">
                                <el-col :span="4">
                                    <img :src="item.img_url" alt="">
                                </el-col>
                                <el-col :span="19">
                                    <el-row class="product-list text_ellipsis">名称：{{item.name}}</el-row>
                                    <el-row class="product-list" style="margin-top:5px">价格：¥{{item.price}}</el-row>
                                </el-col>
                                <i class="el-icon-circle-close" @click="delProduct(index)"></i>
                            </el-row>
                        </draggable>
                    </el-tab-pane>
                    <el-tab-pane label="样式" name="1">
                        <el-form-item label="显示样式">
                            <el-radio-group v-model="formProps.product_type" size="small" @change="selectStyle">
                                <el-radio-button :label="0">大图</el-radio-button>
                                <el-radio-button :label="1">列表</el-radio-button>
                                <el-radio-button :label="2">双列</el-radio-button>
                                <el-radio-button :label="3">三列</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="样式" v-show="formProps.product_type == 0">
                            <el-radio-group v-model="formProps.show_type" size="small">
                                <el-radio-button :label="0">样式一</el-radio-button>
                                <el-radio-button :label="1">样式二</el-radio-button>
                                <el-radio-button :label="2">样式三</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="样式" v-show="formProps.product_type == 1">
                            <el-radio-group v-model="formProps.show_type" size="small">
                                <el-radio-button :label="3">样式一</el-radio-button>
                                <el-radio-button :label="4">样式二</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="样式" v-show="formProps.product_type == 2">
                            <el-radio-group v-model="formProps.show_type" size="small">
                                <el-radio-button :label="5">样式一</el-radio-button>
                                <el-radio-button :label="6">样式二</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="样式" v-show="formProps.product_type == 3">
                            <el-radio-group v-model="formProps.show_type" size="small">
                                <el-radio-button :label="7">样式一</el-radio-button>
                                <el-radio-button :label="8">样式二</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="购物车样式" v-show='formProps.show_type!=2&&formProps.show_type!=8'>
                            <el-radio-group v-model="formProps.cart_icon" size="small">
                                <el-radio :label="0">样式一</el-radio>
                                <el-radio :label="1">样式二</el-radio>
                                <el-radio :label="2">样式三</el-radio>
                                <el-radio :label="3" style="margin-left:0">样式四</el-radio>
                                <el-radio :label="4">样式五</el-radio>
                                <el-radio :label="5">样式六</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="购物车颜色" v-show='formProps.show_type!=2&&formProps.show_type!=8'>
                            <el-color-picker v-model="formProps.cart_icon_color"></el-color-picker>
                        </el-form-item>
                        <el-form-item label="标签样式">
                            <el-radio-group v-model="formProps.label_icon" size="small">
                                <el-radio :label="0">无样式</el-radio>
                                <el-radio :label="1">样式一</el-radio>
                                <el-radio :label="2">样式二</el-radio>
                                <el-radio :label="3" style="margin-left:0">样式三</el-radio>
                                <el-radio :label="4">样式四</el-radio>
                                <el-radio :label="5">样式五</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="标签颜色" v-show='formProps.label_icon!=0'>
                            <el-color-picker v-model="formProps.label_icon_color"></el-color-picker>
                        </el-form-item>
                        <el-form-item label="标签名称" v-show='formProps.label_icon!=0'>
                            <el-input v-model="formProps.label_name" :maxlength="2" clearable size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="标签文字颜色" v-show='formProps.label_icon!=0'>
                            <el-color-picker v-model="formProps.label_color"></el-color-picker>
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
        <!-- 商品列表 -->
        <el-dialog title="选择商品" :visible.sync="showModal" top="10px">
            <el-row style="padding:10px 24px;background:#f8f8f8;margin-top:-24px">
                <el-col :span="24">
                    <span style="font-size:14px">商品名称：</span>
                    <el-input style="width:300px" v-model="keyword" size="small" placeholder="请输入关键字搜索"></el-input>
                </el-col>
                <el-col :span="24" style="margin-top:10px">
                    <el-button type="primary" size="small" @click="searchProduct" style="margin-left:70px">搜索</el-button>
                    <el-button type="text" size="small" @click="clearSearch">清空</el-button>
                </el-col>
            </el-row>
            <el-table :data="productData" stripe style="margin-top:10px" @selection-change="selectionChange">
                <el-table-column type="selection" width="50">
                </el-table-column>
                <el-table-column label="商品" header-align="center" align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.img_url" alt="" style="width:50px;height:50px">
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="名称" header-align="center" align="center">
                </el-table-column>
                <el-table-column prop="price" label="价格" header-align="center" align="center">
                </el-table-column>
                <el-table-column label="类型" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-tag size="mini" v-if="scope.row.type == 0">普通商品</el-tag>
                        <el-tag size="mini" type="warning" v-if="scope.row.type == 1">分销商品</el-tag>
                        <el-tag size="mini" type="danger" v-else-if="scope.row.type == 2">拼团商品</el-tag>
                        <el-tag size="mini" type="info" v-else-if="scope.row.type == 3">预售商品</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" header-align="center" align="center">
                    <template slot-scope="scoped">
                        <el-row style="font-weight:700;color:#19be6b" v-if="scoped.row.status">开启</el-row>
                        <el-row style="font-weight:700;color:#f50" v-else>关闭</el-row>
                    </template>
                </el-table-column>
            </el-table>
            <el-row style="margin-top:10px">
                <el-col :span="12">
                    <el-button size="small" type="primary" @click="handleOk">选取</el-button>
                    <el-button size="small" @click="handleCancel">取消</el-button>
                </el-col>
                <el-col :span="12" style="text-align:right">
                    <el-pagination background layout="total,prev,pager,next" :total="pagination.rowCount" :page-size="pagination.pageSize" @current-change="changePage"></el-pagination>
                </el-col>
            </el-row>
        </el-dialog>
    </el-row>
</template>

<script>
import draggable from "vuedraggable";
export default {
    components: {
        draggable
    },
    props: {
        itemData: {
            default: {}
        }
    },
    data() {
        return {
            showBorder: false,
            //商品列表
            showModal: false,
            configOffsetLeft: 0,
            productData: [],
            pagination: {
                page: 1
            },
            keyword: "",
            selectProduct: [],
            formProps: {},
            formRelations: [],
            formPropsDefault: {
                products: [],
                product_type: 0,
                label_icon: 0,
                label_name: "新品",
                show_type: 0,
                cart_icon: 1,
                cart_icon_color: "#fc4c4f",
                label_icon_color: "#fc4c4f",
                label_color: "#fff"
            },
            products: []
        };
    },
    watch: {
        itemData(val) {
            this.formProps = Object.assign(
                {},
                this.formPropsDefault,
                this.itemData.props ? JSON.parse(this.itemData.props) : {}
            );
            this.configOffsetLeft = this.getDiyComponentConfigOffset(this.$el);
            this.products = [];
            if (this.itemData.relation) {
                this.formRelations = this.itemData.relation;
                if (this.formRelations.length) {
                    for (let key in this.formRelations) {
                        // if (
                        //     this.formRelations[key].relation.sku_status &&
                        //     this.formRelations[key].relation.sku.length
                        // ) {
                        //     this.formRelations[
                        //         key
                        //     ].relation.price = Math.min.apply(
                        //         Math,
                        //         this.formRelations[key].relation.sku.map(
                        //             function(o) {
                        //                 return o.price;
                        //             }
                        //         )
                        //     );
                        // }
                        this.products.push({
                            name: this.formRelations[key].relation.name,
                            info: this.formRelations[key].relation.info,
                            price: this.formRelations[key].relation.price,
                            price_org: this.formRelations[key].relation
                                .price_org,
                            sale: this.formRelations[key].relation.sale,
                            img_url: this.formRelations[key].relation.img_url,
                            type: this.formRelations[key].relation.type
                        });
                    }
                }
            }
        }
    },
    mounted() {
        this.formProps = Object.assign(
            {},
            this.formPropsDefault,
            this.itemData.props ? JSON.parse(this.itemData.props) : {}
        );
        this.configOffsetLeft = this.getDiyComponentConfigOffset(this.$el);
        if (this.itemData.relation) {
            this.formRelations = this.itemData.relation;
            if (this.formRelations.length) {
                for (let key in this.formRelations) {
                    // if (
                    //     this.formRelations[key].relation.sku_status &&
                    //     this.formRelations[key].relation.sku.length
                    // ) {
                    //     this.formRelations[key].relation.price = Math.min.apply(
                    //         Math,
                    //         this.formRelations[key].relation.sku.map(function(
                    //             o
                    //         ) {
                    //             return o.price;
                    //         })
                    //     );
                    // }

                    this.products.push({
                        name: this.formRelations[key].relation.name,
                        info: this.formRelations[key].relation.info,
                        price: this.formRelations[key].relation.price,
                        price_org: this.formRelations[key].relation.price_org,
                        sale: this.formRelations[key].relation.sale,
                        img_url: this.formRelations[key].relation.img_url,
                        type: this.formRelations[key].relation.type
                    });
                }
            }
        }
    },
    methods: {
        //添加商品
        addProduct() {
            this.showModal = true;
            this.getProduct();
        },
        handleCancel() {
            this.showModal = false;
        },
        //商品列表
        async getProduct() {
            let url = `/api/shop/home/shop/product/product/index?page=${
                this.pagination.page
            }`;
            if (this.keyword) {
                url += `&keyword=${this.keyword}`;
            }
            const product = await this.$axios.$get(url);
            if (product && product.errmsg === "ok") {
                this.productData = product.data.data;
                for (let key in this.productData) {
                    // if (
                    //     this.productData[key].sku_status &&
                    //     this.productData[key].sku.length
                    // ) {
                    //     this.productData[key].price = Math.min.apply(
                    //         Math,
                    //         this.productData[key].sku.map(function(o) {
                    //             return o.price;
                    //         })
                    //     );
                    // }
                }
                this.pagination = product.data.pagination;
            }
        },
        changePage(page) {
            this.pagination.page = page;
            this.getProduct();
        },
        //搜索
        searchProduct() {
            this.pagination.page = 1;
            this.getProduct();
        },
        clearSearch() {
            this.keyword = "";
            this.pagination.page = 1;
            this.getProduct();
        },
        //选择商品
        selectionChange(val) {
            this.selectProduct = val;
        },
        handleOk() {
            if (this.selectProduct.length) {
                for (let key in this.selectProduct) {
                    this.formProps.products.push(this.selectProduct[key].id);

                    // if (
                    //     this.selectProduct[key].sku_status &&
                    //     this.selectProduct[key].sku.length
                    // ) {
                    //     this.selectProduct[key].price = Math.min.apply(
                    //         Math,
                    //         this.selectProduct[key].sku.map(function(o) {
                    //             return o.price;
                    //         })
                    //     );
                    // }

                    this.products.push({
                        id: this.selectProduct[key].id,
                        price_org: this.selectProduct[key].price_org,
                        img_url: this.selectProduct[key].img_url,
                        name: this.selectProduct[key].name,
                        info: this.selectProduct[key].info,
                        price: this.selectProduct[key].price,
                        sale: this.selectProduct[key].sale,
                        type: this.selectProduct[key].type
                    });
                }
            }
            this.showModal = false;
        },
        //删除商品
        delProduct(index) {
            this.formProps.products.splice(index, 1);
            this.products.splice(index, 1);
        },
        selectStyle(style) {
            if (style == 0) {
                this.formProps.show_type = 0;
            }
            if (style == 1) {
                this.formProps.show_type = 3;
            }
            if (style == 2) {
                this.formProps.show_type = 5;
            }
            if (style == 3) {
                this.formProps.show_type = 7;
            }
        },
        cancel() {
            this.$store.commit("SET_COMPONENT_ID", 0);
        },
        save() {
            let data = {
                id: this.itemData.id,
                name: "product",
                props: JSON.stringify(this.formProps),
                relations: this.formProps.products
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
.product-list {
    border: 1px solid #eee;
    padding: 5px;
    font-size: 12px;
    position: relative;
}
.product-list img {
    width: 60px;
    height: 60px;
    display: block;
}
.product-list i {
    font-size: 18px;
    color: #ccc;
    position: absolute;
    right: 3px;
    top: 0;
}
.good_wrap {
    background: #fff;
    padding-bottom: 10px;
    margin-bottom: 10px;
    float: left;
}
.good_price_symbol {
    font-size: 13px;
}
.good_price {
    font-size: 20px;
    margin-right: 5px;
    color: #f22823;
}
.good_price_org {
    font-size: 13px;
    color: #c8c8c8;
}
.good_name {
    font-size: 17px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.good_sale {
    color: #999999;
    font-size: 14px;
}
.good_wrap img {
    width: 100%;
    height: 100%;
}
.group-btn {
    width: 60px;
    height: 25px;
    line-height: 25px;
    border-radius: 18px;
    color: #fff;
    font-size: 14px;
    margin: 0 auto;
}
</style>
<style>
.el-radio {
    line-height: 25px;
}
</style>

