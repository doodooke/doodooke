<template>
    <el-row>
        <el-tabs type="card" v-model="tabType" @tab-click="handleClick">
            <el-tab-pane label="数据" name="1"></el-tab-pane>
            <el-tab-pane :label="isEdit?'编辑数据':'新建数据'" name="2"></el-tab-pane>
        </el-tabs>
        <el-row v-if="tabType == 1">
            <el-row style="padding:20px;background:#f8f8f8">
                <el-tabs v-model="activeName">
                    <!-- <el-tab-pane label="选择" name="1"></el-tab-pane> -->
                    <el-tab-pane label="搜索" name="2"></el-tab-pane>
                    <el-tab-pane label="排序" name="3"></el-tab-pane>
                </el-tabs>
                <el-col :span="12" v-if="activeName == 1">
                    <el-row style="margin-bottom:16px" v-for="(item,index) in select" :key="index">
                        <el-select style="width:180px" v-model="item.func" @change="selectArr">
                            <el-option-group label="函数">
                                <el-option
                                    v-for="(i,index) in searchConfigData.functions"
                                    :key="index"
                                    :label="i"
                                    :value="i"
                                ></el-option>
                            </el-option-group>
                            <el-option-group label="集合">
                                <el-option
                                    v-for="(i,index) in searchConfigData.grouping"
                                    :key="index"
                                    :label="i"
                                    :value="i"
                                ></el-option>
                            </el-option-group>
                        </el-select>
                        <el-select
                            style="width:180px;margin:0 10px"
                            v-model="item.column"
                            @change="selectArr"
                        >
                            <el-option
                                v-for="(i,index) in searchConfigData.fields"
                                :key="index"
                                :label="i.Field"
                                :value="i.Field"
                            ></el-option>
                        </el-select>
                        <el-button
                            icon="el-icon-delete"
                            circle
                            v-if="select.length>1"
                            @click="searchDel(1,index)"
                        ></el-button>
                    </el-row>
                </el-col>
                <el-col :span="17" v-if="activeName == 2">
                    <el-row style="margin-bottom:16px" v-for="(item,index) in where" :key="index">
                        <el-select style="width:180px" v-model="item.column" @change="whereArr">
                            <el-option
                                v-for="(i,index) in searchConfigData.fields"
                                :key="index"
                                :label="i.Comment || i.Field"
                                :value="i.Field"
                            ></el-option>
                        </el-select>
                        <el-select
                            style="width:150px;margin:0 10px"
                            v-model="item.func"
                            @change="whereArr"
                        >
                            <el-option
                                v-for="(i,index) in searchConfigData.operators"
                                :key="index"
                                :label="i"
                                :value="i"
                            ></el-option>
                        </el-select>
                        <el-input style="width:180px;" v-model="item.value"></el-input>
                        <el-button
                            icon="el-icon-delete"
                            circle
                            v-if="where.length>1"
                            style="margin-left:10px"
                            @click="searchDel(2,index)"
                        ></el-button>
                    </el-row>
                </el-col>
                <el-col :span="9" v-if="activeName == 3">
                    <el-row style="margin-bottom:16px" v-for="(item,index) in order" :key="index">
                        <el-select
                            style="width:190px;margin-right:16px"
                            v-model="item.column"
                            @change="orderArr"
                        >
                            <el-option
                                v-for="(i,index) in searchConfigData.fields"
                                :key="index"
                                :label="i.Comment || i.Field"
                                :value="i.Field"
                            ></el-option>
                        </el-select>
                        <el-checkbox v-model="item.desc">降序</el-checkbox>
                        <el-button
                            icon="el-icon-delete"
                            circle
                            v-if="order.length>1"
                            style="margin-left:10px"
                            @click="searchDel(3,index)"
                        ></el-button>
                    </el-row>
                </el-col>
                <span style="font-size:14px">范围：</span>
                <el-input-number
                    style="width:100px;margin-right:16px"
                    controls-position="right"
                    :min="1"
                    v-model="pagination.pageSize"
                ></el-input-number>
                <el-button type="primary" @click="search">选择</el-button>
            </el-row>
            <el-table
                :data="tableData"
                stripe
                border
                style="margin-top:24px"
                @selection-change="SelectionChange"
            >
                <el-table-column
                    type="selection"
                    width="50"
                    v-if="tableData.length && tableData[0].id"
                    fixed="left"
                ></el-table-column>
                <el-table-column
                    v-for="(item,index) in tableFields"
                    :key="index"
                    :label="item.Comment || item.Field"
                    :prop="item.Field"
                    header-align="center"
                    align="center"
                    :resizable="true"
                    show-overflow-tooltip
                    min-width="160"
                ></el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    header-align="center"
                    fixed="right"
                    v-if="tableData.length && tableData[0].id"
                >
                    <template slot-scope="scope">
                        <el-tooltip content="编辑">
                            <i
                                class="iconfont icon-bianji1"
                                @click="tableEdit(scope.row)"
                                style="font-size:26px;cursor:pointer;color:rgb(158, 167, 179)"
                            ></i>
                        </el-tooltip>
                        <el-tooltip content="删除">
                            <i
                                class="iconfont icon-shanchu2"
                                @click="tableDel(scope.row)"
                                style="font-size:26px;cursor:pointer;color:rgb(158, 167, 179)"
                            ></i>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <el-row style="margin:24px 0">
                <el-col :span="12">
                    <el-button type="primary" @click="tableDel(0)">删除</el-button>
                </el-col>
                <el-col :span="12" style="text-align:right">
                    <el-pagination
                        background
                        layout="total,prev,pager,next"
                        :current-page="pagination.page"
                        :total="pagination.rowCount"
                        :page-size="pagination.pageSize"
                        @current-change="changePage"
                    ></el-pagination>
                </el-col>
            </el-row>
        </el-row>
        <el-row v-else>
            <el-row>
                <el-table :data="newData" stripe :show-header="false" border>
                    <el-table-column
                        prop="column_name"
                        header-align="center"
                        align="center"
                        width="120"
                    >
                        <template slot-scope="scope">
                            <el-row>
                                <span
                                    v-if="scope.row.column_required"
                                    style="color:#f50;margin-right:3px"
                                >*</span>
                                {{scope.row.column_comment || scope.row.column_name}}
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column prop="column_value" header-align="center">
                        <template slot-scope="scope">
                            <el-input
                                v-if="scope.row.column_input == 'string'"
                                v-model="scope.row.column_value"
                                type="textarea"
                                :rows="3"
                            ></el-input>

                            <el-input-number
                                v-if="scope.row.column_input == 'int'"
                                v-model="scope.row.column_value"
                                controls-position="right"
                                :disabled="scope.row.column_name == 'id'"
                            ></el-input-number>

                            <el-date-picker
                                v-if="scope.row.column_input == 'dateTimePicker'"
                                v-model="scope.row.column_value"
                                type="datetime"
                                placeholder="选择日期时间"
                            ></el-date-picker>

                            <div
                                @click="handleUpload(scope)"
                                v-if="scope.row.column_input == 'upload'"
                            >
                                <el-upload
                                    :action="uploadUrl"
                                    :on-success="handleAddSuccess"
                                    :headers="uploadHeaders()"
                                    :show-file-list="false"
                                >
                                    <el-button size="small" style="margin-bottom:10px">点击上传</el-button>
                                </el-upload>
                                <el-input
                                    v-model="scope.row.column_value"
                                    type="textarea"
                                    :rows="3"
                                ></el-input>
                            </div>

                            <el-row v-if="scope.row.column_input == 'editor'">
                                <el-button
                                    @click="editContent(scope)"
                                    style="margin-bottom:10px"
                                >编辑内容</el-button>
                                <el-row v-html="scope.row.column_value"></el-row>
                            </el-row>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row style="margin-top:20px">
                <el-button type="primary" @click="newdataSave(1)">保存</el-button>
                <el-button @click="newdataSave(2)">保存并插入下一个</el-button>
            </el-row>
        </el-row>
        <!-- 编辑器 -->
        <el-dialog title="编辑内容" :visible.sync="showEditor" width="800px">
            <el-row style="width:760px">
                <Ueditor
                    :config="editorConfig"
                    ueditorPath="/ueditor"
                    :plugins="editorPlugins"
                    @onChange="updateEditorContent"
                    :uploadImage="uploadImage"
                    :value="initContent"
                    :progress="progress"
                />
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showEditor = false">取 消</el-button>
                <el-button type="primary" @click="showEditor = false">确 定</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>
<script>
export default {
    layout: "admin",
    data() {
        return {
            tableName: "",
            tabType: "1",
            activeName: "2",
            //搜索
            searchConfigData: {},
            select: [
                {
                    func: "",
                    column: ""
                }
            ],
            where: [
                {
                    column: "",
                    func: "=",
                    value: ""
                }
            ],
            order: [
                {
                    column: "",
                    desc: ""
                }
            ],
            tableFields: [],
            tableData: [],
            pagination: {
                page: 1,
                pageSize: 50
            },
            selectionData: [],
            newData: [],
            showEditor: false,
            progress: -1,
            initContent: "",
            isEdit: false
        };
    },
    async asyncData({ app, params }) {
        //搜索条件
        const search = await app.$axios.$get(
            `/api/admin/table/searchInfo?table=${params.name}`
        );
        //数据表数据
        const res = await app.$axios.$post("/api/admin/table/data", {
            table: params.name
        });
        let fields = res.data.fields;
        for (let i = fields.length - 1; i >= 0; i--) {
            if (fields[i].Field == "created_at") {
                fields[i].Comment = "创建时间";
            }
            if (
                fields[i].Field == "updated_at" ||
                fields[i].Field == "deleted_at"
            ) {
                fields.splice(i, 1);
            }
        }
        return {
            tableName: params.name,
            searchConfigData: search.data,
            tableFields: fields,
            tableData: res.data.data,
            pagination: res.data.pagination
        };
    },
    computed: {
        uploadUrl() {
            return `/api/admin/file/add`;
        },
        editorConfig() {
            return {
                zIndex: 1001
            };
        },
        editorPlugins() {
            return ["uploadImage", "insertCode", "uploadVideo", "uploadAudio"];
        }
    },
    methods: {
        async handleClick() {
            this.isEdit = false;
            if (this.tabType == 2) {
                this.getNewData();
            } else {
                this.getData();
            }
        },
        async getNewData() {
            const res = await this.$axios.$get(
                `/api/admin/table/edit?table=${this.tableName}`
            );
            if (res && res.errmsg === "ok") {
                this.newData = [];
                let arr = ["id", "created_at", "updated_at", "deleted_at"];
                for (let key in res.data) {
                    if (arr.indexOf(res.data[key].column_name) == -1) {
                        this.newData.push(res.data[key]);
                    }
                }
            }
        },
        selectArr(select) {
            for (let key in this.select) {
                if (!this.select[key].func && !this.select[key].column) {
                    return;
                }
            }
            this.select.push({
                func: "",
                column: ""
            });
        },
        whereArr(select) {
            for (let key in this.where) {
                if (!this.where[key].value && !this.where[key].column) {
                    return;
                }
            }
            this.where.push({
                column: "",
                func: "=",
                value: ""
            });
        },
        orderArr(name) {
            if (name) {
                for (let key in this.order) {
                    if (!this.order[key].column) {
                        return;
                    }
                }
                this.order.push({
                    column: "",
                    desc: 0
                });
            }
        },
        searchDel(type, index) {
            if (type == 1) {
                this.select.splice(index, 1);
            } else if (type == 2) {
                this.where.splice(index, 1);
            } else {
                this.order.splice(index, 1);
            }
        },
        search() {
            this.pagination.page = 1;
            this.getData();
        },
        async getData() {
            const res = await this.$axios.$post("/api/admin/table/data", {
                table: this.tableName,
                select: this.select,
                where: this.where,
                order: this.order,
                limit: this.pagination.pageSize,
                page: this.pagination.page
            });
            if (res && res.errmsg === "ok") {
                let fields = res.data.fields;
                for (let i = fields.length - 1; i >= 0; i--) {
                    if (fields[i].Field == "created_at") {
                        fields[i].Comment = "创建时间";
                    }
                    if (
                        fields[i].Field == "updated_at" ||
                        fields[i].Field == "deleted_at"
                    ) {
                        fields.splice(i, 1);
                    }
                }
                this.tableFields = fields;
                this.tableData = res.data.data;
                this.pagination = res.data.pagination;
            }
        },
        changePage(page) {
            this.pagination.page = page;
            this.getData();
        },
        SelectionChange(selection) {
            this.selectionData = selection;
        },
        async tableEdit(row) {
            this.isEdit = true;
            const res = await this.$axios.$get(
                `/api/admin/table/edit?table=${this.tableName}&id=${row.id}`
            );
            if (res && res.errmsg === "ok") {
                this.tabType = "2";
                this.newData = [];
                let arr = ["created_at", "updated_at", "deleted_at"];
                for (let key in res.data) {
                    if (arr.indexOf(res.data[key].column_name) == -1) {
                        this.newData.push(res.data[key]);
                    }
                }
            }
        },
        //数据保存或编辑
        async newdataSave(type) {
            let obj = {};
            for (let key in this.newData) {
                obj[this.newData[key].column_name] =
                    this.newData[key].column_input == "dateTimePicker"
                        ? this.format(this.newData[key].column_value)
                        : this.newData[key].column_value;
            }
            const res = await this.$axios.$post(`/api/admin/table/add`, {
                table: this.tableName,
                data: obj
            });
            if (res && res.errmsg === "ok") {
                this.$notify({
                    title: "温馨提示",
                    message: "保存成功",
                    type: "success"
                });
                if (type == 1) {
                    this.tabType = "1";
                    this.isEdit = false;
                    this.getData();
                } else {
                    this.getNewData();
                }
            }
        },
        //删除
        async tableDel(row) {
            let data_ids = 0;
            if (row) {
                data_ids = row.id;
            } else {
                if (!this.selectionData.length) {
                    this.$notify({
                        title: "温馨提示",
                        message: "开始安装",
                        type: "warning"
                    });
                    ("请选择数据");
                    return;
                }
                let ids = [];
                for (let key in this.selectionData) {
                    ids.push(this.selectionData[key].id);
                }
                data_ids = ids.join();
            }

            const res = await this.$axios.$get(
                `/api/admin/table/del?table=${this.tableName}&ids=${data_ids}`
            );
            if (res && res.errmsg === "ok") {
                this.$notify({
                    title: "温馨提示",
                    message: "删除成功",
                    type: "success"
                });
                this.getData();
            }
        },
        //上传图片
        handleUpload(scope) {
            this.index = scope.$index;
        },
        handleAddSuccess(res, file) {
            if (res && res.errmsg === "ok") {
                this.newData[this.index].column_value = res.data;
            }
        },
        editContent(scope) {
            this.showEditor = true;
            this.initContent = scope.row.column_value;
            this.index = scope.$index;
        },
        //编辑器
        updateEditorContent(content, extra) {
            this.newData[this.index].column_value = content;
        },
        uploadImage(e) {
            let file = e.target.files[0];
            let param = new FormData(); // 创建form对象
            param.append("file", file, file.name); // 通过append向form对象添加数据
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            };
            return this.$axios.$post(
                "/api/admin/file/add?type=1",
                param,
                config
            );
        }
    }
};
</script>