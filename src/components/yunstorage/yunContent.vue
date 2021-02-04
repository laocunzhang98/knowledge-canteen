<template>
  <div class="content-box">
    <el-card class="card-box">
      <div class="content-header">
        <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">我的云盘</el-menu-item>
        </el-menu>
      </div>
      <div class="up-btn">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="/api/uploads/addfile"
          :headers="headers"
          :on-success="handleSuccess"
          :on-progress="uploadVideoProcess"
          :show-file-list="false"
          :before-upload="handleBeforeUpload"
          multiple
        >
          <div class="commit">
            <el-button type="primary" size="small" @click="upFile">
              <i class="el-icon-upload" style="margin-right:5px"></i>上传
            </el-button>
          </div>
        </el-upload>
        <div></div>
        <el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent" style="position:absolute;margin-top:130px;z-index:9999;margin:auto"></el-progress>
        <div>
          <el-button size="small">
            <i class="el-icon-folder-add" style="margin-right:5px"></i> 新建文件夹
          </el-button>
        </div>
      </div>
      <div class="content">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="文件名" min-width="60%">
            <template slot-scope="scope">
              <img :src="getPng(scope.row)" style="vertical-align: middle;margin-right: 10px;" />
              <span
                style="padding-left: 1px; text-align: center; cursor: pointer;"
              >{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="大小" min-width="20%"></el-table-column>
          <el-table-column prop="prop" label="日期" min-width="20%"></el-table-column>
          <el-table-column prop="prop" label="操作" min-width="20%"></el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Base64 } from "js-base64";
export default {
  data() {
    return {
      videoFlag:false,
      videoUploadPercent:0,
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization:
          "Basic " + Base64.encode(localStorage.getItem("token") + ":"),
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          extName: "dir",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          extName: "dir",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          extName: "dir",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          extName: "dir",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    handleBeforeUpload(file){
      console.log(file)
    },
    uploadVideoProcess(event, file, fileList){
        this.videoFlag = true;
        console.log(file)
        this.videoUploadPercent = parseInt(file.percentage.toFixed(0));
       
    },
    getPng(row) {
      return require("../../assets/header/" + row.extName + ".png");
    },
    upFile() {},
    handleSuccess(response, file) {
      console.log(file);
      this.videoFlag = false;
      if (response.code === 200) {
        this.$message.success(response.message);
      } else {
        this.$message.error(response.message);
      }
      
    },
  },
};
</script>

<style lang="scss" scoped>
.content-box {
  margin-top: 15px;
  .up-btn {
    margin-left: 15px;
    margin-top: 5px;
    display: flex;
    .commit {
      margin-right: 20px;
    }
  }
}
/deep/.el-menu-item {
  font-weight: 600;
  font-size: 20px;
}
.el-menu {
  background-color: #fff !important;
}
/deep/.el-card {
  height: 500px;
}
</style>