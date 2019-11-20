<template>
  <el-row>
    <el-dialog
      :visible.sync="showModal"
      title="图片上传管理器"
      @close="cancelImage"
      width="700px"
      :modal-append-to-body="false"
      :append-to-body="true"
    >
      <el-row style="margin-top:-24px">
        <el-upload
          :action="uploadUrl"
          :on-success="handleAddSuccess"
          multiple
          drag
          :show-file-list="false"
          :headers="uploadHeaders()"
          style="width:200px"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
      </el-row>
      <el-row>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="我的图片" name="0">
            <el-row style="min-height:324px">
              <el-row v-if="file.length">
                <el-col
                  :span="4"
                  style="text-align: center;float: left;margin-bottom:8px"
                  v-for="(item,index) in file"
                  :key="index"
                >
                  <img
                    class="upload-img"
                    :src="item.url"
                    @click="selectImage(item,0)"
                    style="width:100px;height:100px"
                  >
                </el-col>
              </el-row>
              <el-row v-else style="text-align:center;line-height: 120px;">
                <span style="font-size: 16px">暂无数据</span>
              </el-row>
            </el-row>
            <el-row>
              <template>
                <el-pagination
                  background
                  :total="pagination.rowCount"
                  :page-size="pagination.pageSize"
                  :current-page="pagination.page"
                  layout="prev,pager,next"
                  style="float: right;margin: 10px"
                  @current-change="changePage"
                ></el-pagination>
              </template>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="图片库" name="1">
            <el-row style="min-height:324px">
              <el-row v-if="icons.length">
                <el-col
                  :span="2"
                  style="text-align: center;float: left;margin-bottom:8px"
                  v-for="(item,index) in icons"
                  :key="index"
                >
                  <img
                    class="upload-img"
                    :src="item"
                    @click="selectImage(item,1)"
                    style="width:45px;height:45px"
                  >
                </el-col>
              </el-row>
              <el-row v-else style="text-align:center;line-height: 120px;">
                <span style="font-size: 16px">暂无数据</span>
              </el-row>
            </el-row>
            <el-row>
              <template>
                <el-pagination
                  background
                  :total="pagination.rowCount"
                  :page-size="pagination.pageSize"
                  :current-page="pagination.page"
                  layout="prev,pager,next"
                  style="float: right;margin: 10px"
                  @current-change="changePage"
                ></el-pagination>
              </template>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script>
export default {
    data() {
        return {
            activeName: "0",
            selected: {
                id: 0
            },
            file: [],
            pagination: {
                page: 1,
                pageCount: 0,
                pageSize: 0,
                rowCount: 0
            },
            showModal: false,
            icons: []
        };
    },

    props: {
        show: {
            default: false
        }
    },

    watch: {
        show(newVal, oldVal) {
            this.showModal = newVal;
            this.selected = {
                id: 0
            };
            if (this.showModal) {
                this.search();
            }
            this.activeName = "0";
            this.pagination.page = 1;
        }
    },
    computed: {
        uploadUrl() {
            return `/api/app/home/file/add`;
        }
    },

    methods: {
        handleClick() {
            this.pagination.page = 1;
            if (this.activeName == "0") {
                this.search();
            } else {
                this.getIcons();
            }
        },
        async getIcons() {
            const res = await this.$axios.$get(
                `/api/icon/images/index?page=${this.pagination.page}`
            );
            if (res && res.errmsg === "ok") {
                this.icons = res.data.data;
                this.pagination = res.data.pagination;
            }
        },
        selectImage(item, type) {
            if (item.id == this.selected.id) {
                this.selected = {
                    id: 0
                };
                return;
            }
            if (type == 0) {
                this.$emit("on-selected", item);
            } else {
                this.$emit("on-selected", { id: 1, url: item });
            }
        },

        cancelImage() {
            this.$emit("on-cancel", true);
        },

        changePage(page) {
            this.pagination.page = page;
            if (this.activeName == "0") {
                this.search();
            } else {
                this.getIcons();
            }
        },
        async search() {
            const res = await this.$axios.$get(
                `/api/app/home/file/index?page=${this.pagination.page}`
            );
            if (res && res.errmsg === "ok") {
                this.file = res.data.data;
                this.pagination = res.data.pagination;
            }
        },
        async handleAddSuccess(res, file) {
            this.search();
        }
    }
};
</script>
<style>
.el-upload-dragger {
    width: 300px;
    height: 120px;
}
.el-upload-dragger i {
    margin-top: 20px !important;
}
.upload-list {
    float: left;
    border: 1px solid #eee;
    margin-right: 10px;
    margin-bottom: 10px;
    width: 80px;
    height: 80px;
    text-align: center;
    position: relative;
    box-sizing: border-box;
}
.upload-list img {
    width: 100%;
    height: 100%;
}
.upload-list-cover {
    width: 100%;
    height: 25px;
    line-height: 28px;
    display: none;
    position: absolute;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
}
.upload-list:hover .upload-list-cover {
    display: block;
}
.upload-list-cover i {
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    margin: 0 2px;
}
.upload-img {
    float: left;
    width: 80px;
    height: 80px;
    border-radius: 4px;
    border: dashed 1px #d7dde5;
    text-align: center;
    color: #9ea7b3;
    cursor: pointer;
}
.upload-img i {
    font-size: 30px;
    margin-top: 22px;
}
</style>
