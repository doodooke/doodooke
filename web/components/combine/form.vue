<template>
    <el-row @mouseenter.native='showBorder=true' @mouseleave.native='showBorder=false' class="components" style="padding:2px">
        <el-row class='border-select' v-show='itemData.id==$store.state.componentId'></el-row>
        <el-row class='border-select' v-show='showBorder'></el-row>
        <el-row :style="{background:formProps.bg_color}">
            <div style='text-align:center;line-height:40px;height:40px;cursor:pointer;font-size:12px'>
                <div style='color:#06a0fd'>点击编辑</div>
            </div>
            <draggable v-model='forms' @change='onSort'>
                <div v-for='(item,index) in forms' :key='index' class='form' :class='{"form-wrap-active":item.id==$store.state.componentId}' :style='{marginTop:formProps.h_margin+"px"}' @click.stop='formComp(item,index)'>

                    <div class='form-wrap' style='background:transparent;padding-top:10px;padding-bottom: 15px' :style='{		"padding-left":formProps.w_margin+"px","padding-right":formProps.w_margin+"px"}' v-if='item.name=="input"'>

                        <!-- input -->
                        <div v-if='item.props.style_type==1' v-for='(i,idx) in item.props.data' :key='idx' :style='{marginBottom:idx!=item.props.data.length-1?"15px":"0"}'>
                            <p style='margin-bottom: 9px' :style='{color:item.props.title_color}'>{{i.title}}</p>
                            <div style='border:1px solid #eee;padding-left:12px;' :style='{height: item.props.input_line_height+"px",lineHeight:item.props.input_line_height-2*item.props.input_border_width+"px",borderRadius:item.props.input_border_redius+"px",borderWidth:item.props.input_border_width+"px",borderColor:item.props.input_border_color,backgroundColor:item.props.input_bg_color}'>
                                {{i.placeholder}}
                            </div>
                        </div>
                        <div v-if='item.props.style_type==2' v-for='(i,idx) in item.props.data' :key='idx' :style='{marginBottom:idx!=item.props.data.length-1?"15px":"0"}'>
                            <div style='border-bottom: 1px solid #eee;' :style='{height: item.props.input_line_height+"px",lineHeight:item.props.input_line_height-item.props.input_border_width+"px",borderBottomWidth:item.props.input_border_width+"px",borderBottomColor:item.props.input_border_color,color:item.props.input_border_color}'>
                                {{i.placeholder}}
                            </div>
                        </div>
                        <div v-if='item.props.style_type==3' v-for='(i,idx) in item.props.data' :key='idx' :style='{marginBottom:idx!=item.props.data.length-1?"15px":"0"}'>
                            <div style='padding-left: 12px;' :style='{height: item.props.input_line_height+"px",lineHeight:item.props.input_line_height+"px",borderRadius:item.props.input_border_redius+"px",backgroundColor:item.props.input_bg_color}'>
                                <img :src="i.img" v-if='i.img' style='width: 18px;height: 18px;vertical-align: middle'> {{i.placeholder}}
                            </div>
                        </div>
                        <div v-if='item.props.style_type==4'>
                            <div style='padding:0 12px;width:100%;position:relative' v-for='(i,key) in item.props.data' :key='key' :style='{height: item.props.input_line_height+"px",lineHeight:item.props.input_line_height-item.props.input_border_width+"px",backgroundColor:item.props.input_bg_color}'>
                                <img :src="i.img" v-if='i.img' style='width: 18px;height: 18px;float: left;margin-right: 5px' :style='{marginTop:(item.props.input_line_height-18)/2+"px"}'>
                                <span style='color:#222;margin-right: 5px' :style='{color:item.props.title_color}'>{{i.title}}</span> {{i.placeholder}}

                                <div style='height:1px;position:absolute' :style='{width:347-2*formProps.w_margin+"px",background:item.props.input_border_color}' v-show='key!=item.props.data.length-1'></div>
                            </div>
                        </div>

                        <el-row class="form-delete">
                            <span style="margin-right:3px" @click.stop="copyComponent(item,1)">复制</span>
                            <span @click.stop="delComponent(item,1)">删除</span>
                        </el-row>
                        <div v-if='item.id==$store.state.componentId' class='config-arrow' :style="{left:configOffsetLeft - 6 +'px'}"></div>
                        <div class='config' :style="{left:configOffsetLeft+'px'}" v-if='item.id==$store.state.componentId'>
                            <p class='config-title'>单文本</p>
                            <el-tabs type="card">
                                <el-tab-pane label="内容">
                                    <draggable v-model='compData.data'>
                                        <div v-for='(item,index) in compData.data' :key='index' style='margin-bottom: 10px'>
                                            <el-collapse>
                                                <el-collapse-item>
                                                    <template slot="title">
                                                        <span style="margin:0 10px">单文本 {{index+1}}</span>
                                                        <i class="el-icon-delete" @click="delData(index)"></i>
                                                    </template>
                                                    <el-form label-width="80px">
                                                        <el-form-item label="字段名" required>
                                                            <el-input v-model="item.name" placeholder='请输入字段名' clearable :maxlength='15'></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="标题">
                                                            <el-input v-model="item.title" placeholder='请输入标题' clearable :maxlength='15'></el-input>
                                                        </el-form-item>

                                                        <el-form-item label="占位符">
                                                            <el-input v-model="item.placeholder" placeholder='请输入占位符' clearable :maxlength='15'></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="图标" v-show='compData.style_type == 3 || compData.style_type == 4'>
                                                            <div class="upload-list" v-if="item.img">
                                                                <img :src="item.img">
                                                                <div class="upload-list-cover">
                                                                    <i class="el-icon-edit" @click="handleEdit(index)"></i>
                                                                    <i class="el-icon-delete" @click="handleDel(index)"></i>
                                                                </div>
                                                            </div>
                                                            <div @click='handleEdit(index)' class='upload-img' v-else>
                                                                <i class='el-icon-upload'></i>
                                                            </div>
                                                        </el-form-item>
                                                        <el-form-item label="必填项">
                                                            <el-switch v-model="item.required"></el-switch>
                                                        </el-form-item>
                                                    </el-form>
                                                </el-collapse-item>
                                            </el-collapse>
                                        </div>
                                        <el-button size="small" @click='addInput'>添加</el-button>
                                    </draggable>
                                </el-tab-pane>
                                <el-tab-pane label="设置">
                                    <el-form label-width='80px'>
                                        <el-form-item label="类型">
                                            <el-radio-group v-model="compData.style_type" size="mini">
                                                <el-radio-button :label="1">样式一</el-radio-button>
                                                <el-radio-button :label="2">样式二</el-radio-button>
                                                <el-radio-button :label="3">样式三</el-radio-button>
                                                <el-radio-button :label="4">样式四</el-radio-button>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item label="背景色" v-show='compData.style_type!=2'>
                                            <el-color-picker v-model="compData.input_bg_color"></el-color-picker>
                                        </el-form-item>
                                        <el-form-item label="标题颜色" v-show='compData.style_type!=2&&compData.style_type!=3'>
                                            <el-color-picker v-model="compData.title_color"></el-color-picker>
                                        </el-form-item>
                                        <el-form-item label="高度">
                                            <el-slider :max="200" :min="20" v-model="compData.input_line_height" show-input></el-slider>
                                        </el-form-item>
                                        <el-form-item label="圆角" v-show='compData.style_type!=2&&compData.style_type!=4'>
                                            <el-slider :max="20" :min="0" v-model="compData.input_border_redius" show-input></el-slider>
                                        </el-form-item>
                                        <el-form-item label="边框" v-show='compData.style_type!=3'>
                                            <el-row>粗细：
                                                <el-input-number :min='0' :max='10' v-model='compData.input_border_width' size="small"></el-input-number>
                                            </el-row>
                                            <el-row>颜色：
                                                <el-color-picker v-model="compData.input_border_color" style="margin-top:10px"></el-color-picker>
                                            </el-row>
                                        </el-form-item>
                                    </el-form>

                                </el-tab-pane>
                            </el-tabs>
                            <div style='margin-top:10px;text-align: right'>
                                <el-button size="mini" @click.stop="cancel">取消</el-button>
                                <el-button type="primary" size="mini" plain @click.stop="save(1,item)">保存</el-button>
                            </div>
                        </div>

                    </div>
                    <!-- textarea -->
                    <div class='form-wrap' :style='{"padding-left":formProps.w_margin+"px","padding-right":formProps.w_margin+"px"}' v-if='item.name=="textarea"'>

                        <p style='margin:0 0 5px 5px' v-if='item.props.title'>{{item.props.title}}</p>
                        <div style='padding:5px;border:1px solid #eee' :style='{height:item.props.height+"px"}'>
                            {{item.props.placeholder}}
                        </div>
                        <el-row class="form-delete">
                            <span style="margin-right:3px" @click.stop="copyComponent(item,1)">复制</span>
                            <span @click.stop="delComponent(item,1)">删除</span>
                        </el-row>
                        <div v-if='item.id==$store.state.componentId' class='config-arrow' :style="{left:configOffsetLeft - 6 +'px'}"></div>
                        <div class='config' :style="{left:configOffsetLeft+'px'}" v-if='item.id==$store.state.componentId'>
                            <p class='config-title'>文本域</p>
                            <el-tabs type="card">
                                <el-tab-pane label="内容">
                                    <el-form label-width='70px'>
                                        <el-form-item label="字段名" required>
                                            <el-input v-model="item.props.name" placeholder='请输入字段名' :maxlength='15' clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="标题">
                                            <el-input v-model="item.props.title" placeholder='请输入标题' :maxlength='15' clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="占位符">
                                            <el-input v-model="item.props.placeholder" placeholder='请输入占位符' :maxlength='15' clearable></el-input>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                                <el-tab-pane label="设置">
                                    <el-form label-width='60px'>
                                        <el-form-item label="高度">
                                            <el-slider :max="200" :min="30" v-model="item.props.height" show-input style='margin-left: 10px'></el-slider>
                                        </el-form-item>
                                        <el-form-item label="必填项">
                                            <el-switch v-model="item.props.required"></el-switch>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                            </el-tabs>
                            <div style='margin-top:10px;text-align: right'>
                                <el-button size="mini" @click.stop="cancel">取消</el-button>
                                <el-button type="primary" size="mini" plain @click.stop="save(1,item)">保存</el-button>
                            </div>

                        </div>
                    </div>
                    <!-- 单选choose -->
                    <div class='form-wrap' style='padding-top:8px;padding-bottom: 8px' :style='{"padding-left":formProps.w_margin+"px","padding-right":formProps.w_margin+"px"}' v-if='item.name=="choose"'>
                        <div>{{item.props.title}}</div>
                        <div v-for='(i,key) in item.props.data' :key='key' :class='{"border-bottom":key!=item.props.data.length-1}' style='line-height: 35px;'>
                            <span style='color:#222;margin-right: 5px'>{{i.name}}</span>
                            <i class='iconfont icon-size24' :style='{float:item.props.icon_position,color:i.select?item.props.select_color:"#E6E6E6",		opacity:(item.props.icon_type==2&&!i.select)?0:1}' :class='{
                                        "icon-unselected":!i.select&&item.props.icon_type==1,		"icon-selected":i.select&&item.props.icon_type==1,		"icon-xuanzhong1":item.props.icon_type==2,		"icon-icon-test1":!i.select&&item.props.icon_type==3,		"icon-icon-test":i.select&&item.props.icon_type==3}'></i>
                        </div>
                        <el-row class="form-delete">
                            <span style="margin-right:3px" @click.stop="copyComponent(item,1)">复制</span>
                            <span @click.stop="delComponent(item,1)">删除</span>
                        </el-row>
                        <div v-if='item.id==$store.state.componentId' class='config-arrow' :style="{left:configOffsetLeft - 6 +'px'}"></div>
                        <div class='config' :style="{left:configOffsetLeft+'px'}" v-if='item.id==$store.state.componentId'>
                            <p class='config-title'>选项</p>
                            <el-tabs type="card">
                                <el-tab-pane label="内容">
                                    <el-form label-width='70px'>
                                        <draggable v-model='compData.data'>
                                            <div style='margin-bottom: 10px' v-for='(item,i) in compData.data' :key='i'>
                                                <div v-if='compData.type=="radio"' style='display:inline-block;'>
                                                    <el-radio v-model="item.select" @change='radioChoose(i)'>
                                                        <el-input v-model='item.name' style='width:220px' size='small' :maxlength='15' clearable></el-input>
                                                    </el-radio>
                                                </div>
                                                <div v-else style='display:inline-block'>
                                                    <el-checkbox v-model="item.select" style="margin-right:10px"></el-checkbox>
                                                    <el-input v-model='item.name' style='width:220px' size='small' placeholder='请填写名字' :maxlength='15' clearable></el-input>
                                                </div>
                                                <el-button size='small' v-if='compData.data.length>2' @click='delData(i)' style="margin-left:10px">删除</el-button>
                                            </div>
                                        </draggable>
                                        <el-button size="small" @click='addChoose'>添加</el-button>
                                    </el-form>
                                </el-tab-pane>
                                <el-tab-pane label="设置">
                                    <el-form label-width='70px'>
                                        <el-form-item label="字段名" required>
                                            <el-input v-model="compData.name" placeholder='请输入字段名' :maxlength='15' clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="标题">
                                            <el-input v-model="compData.title" placeholder='请输入标题' :maxlength='15' clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="类型">
                                            <el-radio-group v-model="compData.type" @change='chooseType'>
                                                <el-radio label="radio">单选</el-radio>
                                                <el-radio label="checkbox">多选</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item label="样式">
                                            <el-radio-group v-model="compData.icon_type" @change='chooseStyle' size="small">
                                                <el-radio-button :label="1">样式一</el-radio-button>
                                                <el-radio-button :label="2">样式二</el-radio-button>
                                                <el-radio-button :label="3">样式三</el-radio-button>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item label="图标位置">
                                            <el-radio-group v-model="compData.icon_position" size="small">
                                                <el-radio-button label="left">置左</el-radio-button>
                                                <el-radio-button label="right">置右</el-radio-button>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item label="按钮颜色">
                                            <el-color-picker v-model="compData.select_color"></el-color-picker>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                            </el-tabs>
                            <div style='margin-top:10px;text-align: right'>
                                <el-button size="mini" @click.stop="cancel">取消</el-button>
                                <el-button type="primary" size="mini" plain @click.stop="save(1,item)">保存</el-button>
                            </div>
                        </div>
                    </div>
                    <!-- 开启关闭switch -->
                    <div class='form-wrap' :style='{				"padding-left":formProps.w_margin+"px",		"padding-right":formProps.w_margin+"px"}' v-if='item.name=="switch"'>
                        <div style='overflow: hidden;padding:11px 0' v-for='(i,idx) in item.props.data' :key='idx' :class='{"border-bottom":idx!=item.props.data.length-1}'>
                            <span style='color:#222;line-height: 25px'>{{i.title}}</span>
                            <div class='switch' :style='{background:i.select?item.props.color:"#ccc"}'>
                                <div class='switch-inner' :style='{float:i.select?"right":""}'></div>
                            </div>
                        </div>
                        <el-row class="form-delete">
                            <span style="margin-right:3px" @click.stop="copyComponent(item,1)">复制</span>
                            <span @click.stop="delComponent(item,1)">删除</span>
                        </el-row>
                        <div v-if='item.id==$store.state.componentId' class='config-arrow' :style="{left:configOffsetLeft - 6 +'px'}"></div>
                        <div class='config' :style="{left:configOffsetLeft+'px'}" v-if='item.id==$store.state.componentId'>
                            <p class='config-title'>开关</p>
                            <el-tabs type="card">
                                <el-tab-pane label="内容">
                                    <el-form label-width='70px'>
                                        <draggable v-model='compData.data'>
                                            <div v-for='(item,i) in compData.data' :key='i' style='margin-bottom: 5px'>
                                                <el-form-item label="字段名" required>
                                                    <el-input v-model="item.name" placeholder='请输入字段名' size='small' :maxlength='15' clearable></el-input>
                                                </el-form-item>
                                                <div style='margin-top: 10px'>
                                                    <el-switch v-model='item.select' style="margin-left:25px"></el-switch>
                                                    <el-input v-model="item.title" placeholder='请输入名称' size='small' :maxlength='15' clearable style='width:60%;margin:0 5px'>
                                                    </el-input>
                                                    <el-button size='small' v-if='compData.data.length>1' @click='delData(i)'>删除</el-button>
                                                </div>
                                            </div>
                                        </draggable>
                                        <el-button size="small" @click='addSwitch'>添加</el-button>
                                    </el-form>
                                </el-tab-pane>
                                <el-tab-pane label="设置">
                                    <el-form label-width='70px'>
                                        <el-form-item label="按钮颜色">
                                            <el-color-picker v-model="compData.color"></el-color-picker>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                            </el-tabs>
                            <div style='margin-top:10px;text-align: right'>
                                <el-button size="mini" @click.stop="cancel">取消</el-button>
                                <el-button type="primary" size="mini" plain @click.stop="save(1,item)">保存</el-button>
                            </div>

                        </div>
                    </div>
                    <!-- 选择器picker -->
                    <div class='form-wrap' style='padding-top:10px;padding-bottom: 13px' :style='{"padding-left":formProps.w_margin+"px","padding-right":formProps.w_margin+"px"}' v-if='item.name=="picker"'>
                        <div v-for='(i,index) in item.props.data' :key='index' :class='{"border-bottom":index!=item.props.data.length-1}'>
                            <div style='line-height: 35px;' v-if='i.describe_position=="right"'>
                                <span style='color:#222'>{{i.title}}</span>
                                <i class='iconfont icon-lunbo-jiantouyou icon-size24' style='float: right'></i>
                                <span style='float:right'>{{i.describe}}</span>
                            </div>
                            <div style='overflow: hidden;' v-if='i.describe_position=="left"'>
                                <div style='float:left'>
                                    <span style='color:#222'>{{i.title}}</span><br>
                                    <span style='color:rgb(178,178,178)'>{{i.describe}}</span>
                                </div>
                                <i class='iconfont icon-lunbo-jiantouyou icon-size24' style='float: right;margin-top: 5px'></i>
                            </div>
                        </div>
                        <el-row class="form-delete">
                            <span style="margin-right:3px" @click.stop="copyComponent(item,1)">复制</span>
                            <span @click.stop="delComponent(item,1)">删除</span>
                        </el-row>
                        <div v-if='item.id==$store.state.componentId' class='config-arrow' :style="{left:configOffsetLeft - 6 +'px'}"></div>
                        <div class='config' :style="{left:configOffsetLeft+'px'}" v-if='item.id==$store.state.componentId'>
                            <p class='config-title'>选择器</p>
                            <el-form label-width='70px'>
                                <draggable v-model='compData.data'>
                                    <div v-for='(item,index) in compData.data' :key='index' style='margin-bottom: 10px'>
                                        <el-collapse>
                                            <el-collapse-item>
                                                <template slot="title">
                                                    <span style="margin:0 10px">选择器 {{index+1}}</span>
                                                    <i class="el-icon-delete" @click="delData(index)"></i>
                                                </template>
                                                <el-form-item label="字段名" required>
                                                    <el-input v-model="item.name" placeholder='请输入字段名' :maxlength='15' clearable></el-input>
                                                </el-form-item>
                                                <el-form-item label="标题">
                                                    <el-input v-model="item.title" placeholder='请输入标题' :maxlength='15' clearable></el-input>
                                                </el-form-item>
                                                <el-form-item label="描述">
                                                    <el-input v-model="item.describe" placeholder='请输入描述' :maxlength='15' clearable></el-input>
                                                </el-form-item>
                                                <el-form-item label="描述位置">
                                                    <el-radio-group v-model="item.describe_position" size="small">
                                                        <el-radio-button label="left">置左</el-radio-button>
                                                        <el-radio-button label="right">置右</el-radio-button>
                                                    </el-radio-group>
                                                </el-form-item>
                                                <el-form-item label="类型">
                                                    <el-radio-group v-model="item.type" size="small">
                                                        <el-radio-button label="time">时间</el-radio-button>
                                                        <el-radio-button label="date">日期</el-radio-button>
                                                    </el-radio-group>
                                                </el-form-item>
                                            </el-collapse-item>
                                        </el-collapse>
                                    </div>
                                </draggable>
                                <el-button size="small" @click='addPicker'>添加</el-button>
                            </el-form>
                            <div style='margin-top:10px;text-align: right'>
                                <el-button size="mini" @click.stop="cancel">取消</el-button>
                                <el-button type="primary" size="mini" plain @click.stop="save(1,item)">保存</el-button>
                            </div>
                        </div>
                    </div>
                    <!-- 上传 -->
                    <div class='form-wrap' style='padding-top:15px;padding-bottom: 15px' :style='{"padding-left":formProps.w_margin+"px","padding-right":formProps.w_margin+"px"}' v-if='item.name=="upload"'>
                        <div class='form-upload' v-if='item.props.style_type==1'>
                            <!-- <Icon type="plus-round" size='30' color='rgb(204,204,204)' style='margin-top: 14px'></Icon> -->
                            <i class="el-icon-plus" style='margin-top: 14px;color:rgb(204,204,204);font-size:30px'></i>
                        </div>
                        <div class='form-upload' style='background:rgb(238,238,238)' v-else>
                            <i class="el-icon-plus" style='margin-top: 14px;color:rgb(204,204,204);font-size:30px'></i>
                        </div>
                        <div style='font-size:10px;margin-top: 5px'>温馨小提示: 长按可以删除图片哦~</div>
                        <el-row class="form-delete">
                            <span style="margin-right:3px" @click.stop="copyComponent(item,1)">复制</span>
                            <span @click.stop="delComponent(item,1)">删除</span>
                        </el-row>
                        <div v-if='item.id==$store.state.componentId' class='config-arrow' :style="{left:configOffsetLeft - 6 +'px'}"></div>
                        <div class='config' :style="{left:configOffsetLeft+'px'}" v-if='item.id==$store.state.componentId'>
                            <p class='config-title'>上传图片</p>
                            <el-form label-width='70px'>
                                <el-form-item label="样式">
                                    <el-radio-group v-model="compData.style_type" size="small">
                                        <el-radio-button label="1">样式一</el-radio-button>
                                        <el-radio-button label="2">样式二</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="字段名" required>
                                    <el-input v-model="compData.name" placeholder='请输入字段名' :maxlength='15' clearable></el-input>
                                </el-form-item>
                                <el-form-item label="图片数量">
                                    <el-slider v-model="compData.allow_num" :min='1' :max='9' show-input style='margin-left: 10px'></el-slider>
                                </el-form-item>
                                <el-form-item label="必填项">
                                    <el-switch v-model="compData.required"></el-switch>
                                </el-form-item>
                            </el-form>
                            <div style='margin-top:10px;text-align: right'>
                                <el-button size="mini" @click.stop="cancel">取消</el-button>
                                <el-button type="primary" size="mini" plain @click.stop="save(1,item)">保存</el-button>
                            </div>
                        </div>
                    </div>
                    <!-- button -->
                    <div class='form-wrap' style='padding:0;background:transparent' :style='{
							paddingTop:item.props.w_margin+"px",paddingBottom:item.props.w_margin+"px"}' v-if='item.name=="button"'>

                        <div style='text-align:center;margin:0 auto;' :style='{width:item.props.width+"%",
								 height:item.props.height+"px",
								 background:item.props.bg_color,
								 lineHeight:item.props.height+"px",
								 borderRadius:item.props.borderRadius+"px",
								 fontSize:item.props.font_size/2+"px",
								 color:item.props.name_color}'>{{item.props.name}}</div>
                        <!-- <el-row class="form-delete">
                            <i class="el-icon-error" style="color:#bbb" @click.stop="delComponent(item,1)"></i>
                        </el-row> -->
                        <div v-if='item.id==$store.state.componentId' class='config-arrow' :style="{left:configOffsetLeft - 6 +'px'}"></div>
                        <div class='config' :style="{left:configOffsetLeft+'px'}" v-if='item.id==$store.state.componentId'>
                            <p class='config-title'>按钮</p>
                            <el-tabs type="card">
                                <el-tab-pane label="内容">
                                    <el-form label-width='70px'>
                                        <el-form-item label="文字">
                                            <el-input v-model='compData.name' placeholder='请填写按钮文字' :maxlength='10' clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="点击事件">
                                            <el-input placeholder="请选择绑定事件" v-model="compData.targetUrl" clearable>
                                                <el-button slot="append" @click="handleLink(index)">选择</el-button>
                                            </el-input>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                                <el-tab-pane label="设置">
                                    <el-form label-width='70px'>
                                        <el-form-item label="宽度">
                                            <el-slider :max="100" :min="20" v-model="compData.width" show-input style='margin-left: 10px'></el-slider> （宽度按百分比计算）
                                        </el-form-item>
                                        <el-form-item label="高度">
                                            <el-slider :max="100" :min="20" v-model="compData.height" show-input style='margin-left: 10px'></el-slider>
                                        </el-form-item>
                                        <el-form-item label="按钮颜色">
                                            <el-color-picker v-model="compData.bg_color"></el-color-picker>
                                        </el-form-item>
                                        <el-form-item label="圆角">
                                            <el-slider :max="20" :min="0" v-model="compData.borderRadius" show-input style='margin-left: 10px'></el-slider>
                                        </el-form-item>
                                        <el-form-item label="字体大小">
                                            <el-slider :max="40" :min="26" v-model="compData.font_size" show-input style='margin-left: 10px'></el-slider>
                                        </el-form-item>
                                        <el-form-item label="字体颜色">
                                            <el-color-picker v-model="compData.name_color"></el-color-picker>
                                        </el-form-item>
                                        <el-form-item label="上下边距">
                                            <el-slider :max="300" :min="0" v-model="compData.w_margin" show-input></el-slider>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                            </el-tabs>
                            <div style='margin-top:10px;text-align: right'>
                                <el-button size="mini" @click.stop="cancel">取消</el-button>
                                <el-button type="primary" size="mini" plain @click.stop="save(1,item)">保存</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </draggable>
        </el-row>
        <el-row v-if="itemData.id==$store.state.componentId" class="config" :style="{left:configOffsetLeft+'px'}">
            <el-row class="config-title">表单</el-row>
            <div style='margin-bottom: 30px'>
                <div class='form-style' v-for='(item,index) in addComp' :key='index' @click='addComponent(item)' v-show="index < addComp.length - 1">
                    <div>{{item.name_zh}}</div>
                    <div class='form-style-mask'>点击添加</div>
                </div>
            </div>
            <el-form label-width="80px">
                <el-form-item label="标题" required>
                    <el-input v-model="formProps.name" placeholder='请填写表单标题' clearable></el-input>
                </el-form-item>
                <el-form-item label="背景颜色">
                    <el-color-picker v-model="formProps.bg_color"></el-color-picker>
                </el-form-item>
                <el-form-item label="上下边距">
                    <el-slider :max="50" :min="0" v-model="formProps.h_margin" show-input></el-slider>
                </el-form-item>
                <el-form-item label="左右边距">
                    <el-slider :max="50" :min="0" v-model="formProps.w_margin" show-input></el-slider>
                </el-form-item>
                <el-form-item style="text-align:right">
                    <el-button size="mini" @click.stop="cancel">取消</el-button>
                    <el-button type="primary" size="mini" plain @click.stop="save(0,formProps)">保存</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row class="config-arrow" v-if="itemData.id==$store.state.componentId" :style="{left:configOffsetLeft - 6 +'px'}"></el-row>
        <el-row class="config-del">
            <span style="margin-right:3px" @click.stop="copyComponent(itemData,0)">复制</span>
            <span @click.stop="delComponent(itemData,0)">删除</span>
        </el-row>
        <Upload :show="showUpload" @on-selected="selectImg" @on-cancel="cancelUpload"></Upload>
        <qingful-link :show-modal='showLink' @on-select='selectedLink'></qingful-link>
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
            showDel: false,
            showUpload: false,
            showLink: false,
            configOffsetLeft: 0,
            addComp: [
                {
                    name_zh: "单文本",
                    name: "input",
                    data: {
                        style_type: 1,
                        title_color: "#000000", //标题颜色
                        input_line_height: 50, //输入框高度
                        input_border_redius: 0, //输入框圆角
                        input_bg_color: "", //input输入框背景颜色
                        input_border_color: "#eee", //边框颜色
                        input_border_width: 1,
                        data: [
                            {
                                title: "请输入",
                                placeholder: "请输入",
                                img: "",
                                required: false,
                                name: "input"
                            }
                        ]
                    }
                },
                {
                    name_zh: "文本域",
                    name: "textarea",
                    data: {
                        title: "请输入",
                        placeholder: "请输入",
                        height: 80,
                        required: false,
                        name: "textarea"
                    }
                },
                {
                    name_zh: "选项",
                    name: "choose",
                    data: {
                        title: "选择",
                        type: "radio",
                        icon_type: "1",
                        icon_position: "left",
                        select_color: "#06a0fd",
                        name: "choose",
                        data: [
                            {
                                name: "选项",
                                select: false
                            },
                            {
                                name: "选项",
                                select: false
                            }
                        ]
                    }
                },
                {
                    name_zh: "开关",
                    name: "switch",
                    data: {
                        color: "#06a0fd",
                        data: [
                            {
                                title: "开启",
                                select: false,
                                name: "switch"
                            }
                        ]
                    }
                },
                {
                    name_zh: "选择器",
                    name: "picker",
                    data: {
                        data: [
                            {
                                title: "标题",
                                describe: "描述信息",
                                describe_position: "right",
                                type: "time",
                                name: "picker"
                            }
                        ]
                    }
                },
                {
                    name_zh: "上传图片",
                    name: "upload",
                    data: {
                        name: "upload",
                        style_type: "1",
                        allow_num: 1,
                        required: false
                    }
                },
                {
                    name_zh: "提交按钮",
                    name: "button",
                    data: {
                        name: "提交按钮",
                        name_color: "#fff",
                        font_size: 14,
                        bg_color: this.$store.state.color,
                        width: 88,
                        height: 50,
                        borderRadius: 10,
                        w_margin: 20, // 上下距离
                        targetType: "",
                        targetUrl: ""
                    }
                }
            ],
            formProps: {},
            formRelations: [],
            formPropsDefault: {
                formId: 0,
                name: "默认表单",
                bg_color: "#fff",
                w_margin: 24,
                h_margin: 0
            },
            forms: [], //所有子组件
            compData: {} //单个组件数据
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
            if (this.itemData.sub && this.itemData.sub.length) {
                this.forms = this.itemData.sub;
                for (let key in this.forms) {
                    for (let k in this.addComp) {
                        if (this.forms[key].props == "{}") {
                            if (this.addComp[k].name == this.forms[key].name) {
                                this.forms[key].props = this.addComp[k].data;
                            }
                        } else {
                            if (typeof this.forms[key].props == "string") {
                                this.forms[key].props = JSON.parse(
                                    this.forms[key].props
                                );
                            }
                        }
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
        this.formRelations = this.itemData.relation;
        this.configOffsetLeft = this.getDiyComponentConfigOffset(this.$el);

        if (this.itemData.sub && this.itemData.sub.length) {
            this.forms = this.itemData.sub;

            for (let key in this.forms) {
                for (let k in this.addComp) {
                    if (this.forms[key].props == "{}") {
                        if (this.addComp[k].name == this.forms[key].name) {
                            this.forms[key].props = this.addComp[k].data;
                        }
                    } else {
                        if (typeof this.forms[key].props == "string") {
                            this.forms[key].props = JSON.parse(
                                this.forms[key].props
                            );
                        }
                    }
                }
            }
        }
    },
    methods: {
        //获取表单数据
        async getFormData() {
            const res = await this.$axios.$get(
                `/api/diy/home/component/subIndex?id=${this.itemData.id}`
            );
            if (res && res.errmsg === "ok") {
                this.forms = res.data.sub;
                for (let key in this.forms) {
                    for (let k in this.addComp) {
                        if (this.forms[key].props == "{}") {
                            if (this.addComp[k].name == this.forms[key].name) {
                                this.forms[key].props = this.addComp[k].data;
                            }
                        } else {
                            if (typeof this.forms[key].props == "string") {
                                this.forms[key].props = JSON.parse(
                                    this.forms[key].props
                                );
                            }
                        }
                    }
                }
            }
        },
        //添加子组件
        async addComponent(item) {
            const res = await this.$axios.$post("/api/diy/home/component/add", {
                pid: this.itemData.id,
                name: item.name,
                title: item.name_zh,
                props: JSON.stringify(item.data),
                rank: this.forms.length
            });

            if (res && res.errmsg === "ok") {
                this.getFormData();
                this.$emit("get-component", true);
            }
        },
        //点击子组件
        formComp(item, index) {
            this.$store.commit("SET_COMPONENT_ID", item.id);
            this.compData = item.props;
        },
        //子组件排序
        async onSort() {
            let data = [];
            for (let key in this.forms) {
                data.push({
                    id: this.forms[key].id,
                    rank: this.forms[key].name == "button" ? 20 : key
                });
            }
            const res = await this.$axios.$post(
                "/api/diy/home/component/rank",
                data
            );
            if (res && res.errmsg === "ok") {
                this.getFormData();
            }
        },
        //input
        addInput() {
            this.compData.data.push({
                title: "请输入",
                placeholder: "请输入",
                img: "",
                required: false,
                name: ""
            });
        },
        //choose
        addChoose() {
            this.compData.data.push({
                name: "选项",
                select: false
            });
        },
        chooseType(type) {
            if (type == "radio") {
                for (let key in this.compData.data) {
                    this.compData.data[key].select = false;
                }
            }
        },
        chooseStyle(style) {
            if (style == 2) {
                let i = 0;
                for (let key in this.compData.data) {
                    if (!this.compData.data[key].select) {
                        i++;
                    }
                }
                if (i == this.compData.data.length) {
                    this.compData.data[0].select = true;
                }
            }
        },
        //单选
        radioChoose(i) {
            this.compData.data[i].select = true;
            for (let key in this.compData.data) {
                if (key != i) {
                    this.compData.data[key].select = false;
                }
            }
        },
        addSwitch() {
            this.compData.data.push({
                title: "开启",
                name: ""
            });
        },
        addPicker() {
            this.compData.data.push({
                title: "标题",
                describe: "描述信息",
                describe_position: "right",
                type: "time",
                name: ""
            });
        },
        delData(index) {
            this.compData.data.splice(index, 1);
        },
        handleEdit(index) {
            this.showUpload = true;
            this.index = index;
        },
        selectImg(res) {
            this.showUpload = false;
            if (res.id > 0) {
                this.compData.data[this.index].img = res.url;
            }
        },
        cancelUpload() {
            this.showUpload = false;
        },
        handleDel(index) {
            this.compData.data[index].img = "";
        },
        //选择链接
        handleLink() {
            this.showLink = true;
        },
        selectedLink(item) {
            for (let key in this.itemData.sub) {
                if (this.itemData.sub[key].name === "button") {
                    this.$store.commit(
                        "SET_COMPONENT_ID",
                        this.itemData.sub[key].id
                    );
                }
            }
            this.showLink = false;
            if (item) {
                this.compData.targetType = item.targetType;
                this.compData.targetUrl = item.targetUrl;
            }
        },
        cancel() {
            this.$store.commit("SET_COMPONENT_ID", 0);
        },
        save(type, item) {
            let data = {
                id: type ? item.id : this.itemData.id,
                props: type ? JSON.stringify(item.props) : JSON.stringify(item)
            };
            if (type == 0) {
                data.name = "form";
                data.relations = [this.formProps.formId];
            }
            this.$emit("save-comp", data);
            this.$store.commit("SET_COMPONENT_ID", 0);
        },
        delComponent(item, type) {
            this.$confirm("是否删除该组件", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$emit("del-comp", item);
                    this.showDel = false;
                    if (type) {
                        this.getFormData();
                    }
                })
                .catch(() => {});
        },
        async copyComponent(item, type) {
            if (type) {
                const res = await this.$axios.$get(
                    `/api/diy/home/component/copy?id=${item.id}`
                );
                if (res && res.errmsg === "ok") {
                    this.$message.success("复制成功");
                    this.getFormData();
                }
            } else {
                this.$emit("copy-comp", this.itemData);
            }
        }
    }
};
</script>
<style scoped>
.wrap {
    min-height: 50px;
}
.form:hover {
    border: 1px dashed #08b8fd;
}

.form-wrap {
    width: 100%;
    background: #fff;
    color: rgb(178, 178, 178);
    font-size: 14px;
    position: relative;
    padding: 8px 0;
}

.form-delete {
    position: absolute;
    top: 0;
    right: 0;
    display: none;
    cursor: pointer;
}
.form-delete span {
    background: #bbb;
    padding: 0 2px;
    color: #fff;
    font-size: 12px;
}

.form:hover .form-delete {
    display: block;
}

.form-wrap-active {
    border: 1px dashed #08b8fd;
}

.form-style {
    width: 58px;
    height: 60px;
    border: 1px solid #ddd;
    text-align: center;
    line-height: 60px;
    display: inline-block;
    margin: 5px 5px 0 0;
    cursor: pointer;
    position: relative;
    font-size: 12px;
}

.form-style-mask {
    width: 100%;
    height: 100%;
    background: rgba(6, 160, 253, 0.8);
    color: #fff;
    position: absolute;
    top: 0;
    display: none;
}

.form-style:hover .form-style-mask {
    display: block;
}

.form-upload {
    width: 58px;
    height: 58px;
    border: 1px solid #eee;
    text-align: center;
}

.border-bottom {
    border-bottom: 1px solid #eee;
}

.switch {
    width: 48px;
    height: 24px;
    border-radius: 12px;
    padding: 2px;
    float: right;
    margin-top: 3px;
    cursor: pointer;
}

.switch-inner {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
}

.icon-size24 {
    font-size: 24px;
}
</style>
