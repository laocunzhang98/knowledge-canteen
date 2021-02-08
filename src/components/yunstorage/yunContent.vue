<template>
  <div class="content-box">
    <el-card class="card-box">
      <div class="content-header">
        <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">我的云盘</el-menu-item>
        </el-menu>
      </div>
      <div class="up-btn">
        <!-- webkitdirectory -->
        <el-button size="small" class="input-file"><i class="el-icon-upload"></i> 上传文件<input type="file" id="file" name="file" webkitdirectory   @change.stop="changeData" ref="file" ></el-button>
        <div></div>
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
import {uploadFile} from '@/api/uploads';
export default {
  data() {
    return {
      headers: {
        Authorization:
          "Basic " + Base64.encode(localStorage.getItem("token") + ":"),
      },
      filesList: [],
      files: {
        fileName: '', // 文件名
        filesExtension: '', // 扩展名
        fileDate: '', // 上传时间
        fileSize: '', // 上传大小
        fileData: '' // 文件数据
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
    changeData (event) {
      console.log(event.target.value)
      let filevalue = event.target.value
      let files = event.target.files
      if (files[0] == undefined) {
        this.$message.warning('未上传任何文件！');
      } else{
        if(files.length>20){
          this.$message.warning("上传文件数不得超过20个")
          return 
        }
        for(let i=0;i<files.length;i++){
          console.log(files[0])
          let formdata = new FormData()
          formdata.append("file",files[i])
          uploadFile(formdata).then(res=>{
            console.log(res)
          })
        }
      }
    },
    getPng(row) {
      return require("../../assets/header/" + row.extName + ".png");
    },
    upFile() {},
   
  },
};
</script>

<style lang="scss" scoped>
.input-file {
  overflow:hidden;
  position:relative;
  margin-right: 20px;
}
.input-file input{
  opacity:0;
  filter:alpha(opacity=0);
  font-size:100px;
  position:absolute;
  top:0;
  right:0;
}
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