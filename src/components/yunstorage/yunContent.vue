<template>
  <div class="content-box">
    <el-card class="card-box">
      <!-- <div class="content-header">
        <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">知识库</el-menu-item>
        </el-menu>
      </div>-->
      <div class="card-header">
        <div class="catalog">
          <span v-for="(cata,index) in cataLog" :key="index" @click="Jumpcata(cata.id)">{{cata.origin_name}}/</span>
        </div>
        <div class="up-btn">
          <!-- webkitdirectory -->
          <el-button size="small" class="input-file">
            <i class="el-icon-upload"></i> 上传文件夹
            <input
              type="file"
              id="file"
              name="file"
              webkitdirectory
              @change.stop="((val)=>{changeData(val,currentid)})"
              ref="file"
            />
          </el-button>
          <div></div>
          <div>
            <el-button size="small" @click="createPath">
              <i class="el-icon-folder-add" style="margin-right:5px"></i> 新建文件夹
            </el-button>
          </div>
        </div>
      </div>

      <el-dialog title="新建文件夹" :visible.sync="dialogVisible" width="width">
        <div class="create-file">
          <div class="file-name">
            <span>文件夹名字</span>
            <el-input placeholder="文件夹名字" v-model="pathName"></el-input>
          </div>
          <div class="file-path">
            <span>请选择目录</span>
            <!-- <el-select v-model="model" placeholder>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>-->
          </div>
        </div>
        <div slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="createFolders(currentid)">确 定</el-button>
        </div>
      </el-dialog>
      <div class="content">
        <el-table :data="tableData" style="width: 100%" height="420">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="文件名" min-width="60%">
            <template slot-scope="scope">
              <img :src="getPng(scope.row)" style="vertical-align: middle;margin-right: 10px;" />
              <span
                style="padding-left: 1px; text-align: center; cursor: pointer;"
                @click="selectDir(scope.row.id,scope.row.mimetype,scope.row.origin_path,scope.row.origin_name)"
              >{{scope.row.origin_name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="大小" min-width="20%">
            <template slot-scope="scope">
              <span>{{scope.row.size | fileSize}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="日期" min-width="20%">
            <template slot-scope="scope">
              <span>{{getFormatDate(scope.row.createdAt)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" min-width="20%"></el-table-column>
        </el-table>
      </div>
      <el-dialog title="文件下载" :visible.sync="dialogVisible1">
        <div></div>
        <div slot="footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary">下 载</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { Base64 } from "js-base64";
import {
  uploadFile,
  createFolder,
  getFileList,
  getCataLog,
  downloadFile,
  getFolderId
} from "@/api/uploads";
export default {
  data() {
    return {
      headers: {
        Authorization:
          "Basic " + Base64.encode(localStorage.getItem("token") + ":"),
      },
      dialogVisible: false,
      dialogVisible1: false,
      pathName: "新建文件夹",
      loading: true,
      zid: 0,
      cataLog: [{origin_name:"...",id:0}],
      currentid: 0,
      filesList: [],
      files: {
        fileName: "", // 文件名
        filesExtension: "", // 扩展名
        fileDate: "", // 上传时间
        // fileSize: "", // 上传大小
        fileData: "", // 文件数据
      },
      tableData: [],
    };
  },
  mounted() {
    getFileList().then((res) => {
      this.tableData = res.data;
      console.log(res);
    });
  },
  filters: {
    fileSize(val) {
      if (!val) return "";
      if (val < 102.4) {
        return val + " B";
      }
      let num = val / 1024;
      if (num > 1024) {
        num = num / 1024;
        return num.toFixed(2) + " M";
      } else {
        return num.toFixed(2) + " K";
      }
    },
  },
  methods: {
    Jumpcata(id){
      getFileList({id:id}).then(res=>{
        this.tableData = res.data;
      })
      getCataLog({ parent_fileid: id }).then((res) => {
        this.cataLog = [{origin_name:"...",id:0}]
        this.cataLog = this.cataLog.concat(res.data);
      });
    },
    getFormatDate(dates) {
      var date = new Date(dates);
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    selectDir(id, type, origin_path, filename) {
      if (type === "dir") {
        this.currentid = id;
        let params = {
          id: id,
        };
        getFileList(params).then((res) => {
          this.tableData = res.data;
        });
        getCataLog({ parent_fileid: id }).then((res) => {
          this.cataLog = [{origin_name:"...",id:0}]
          this.cataLog = this.cataLog.concat(res.data);
        });
      } else {
        // this.dialogVisible1=true
        fetch(origin_path)
          .then((res) => res.blob())
          .then((blob) => {
            let blobURL = URL.createObjectURL(blob);
            let link = document.createElement("a");
            link.download = filename;
            link.href = blobURL;
            link.click();
            // 释放 blobURL
            URL.revokeObjectURL(blobURL);
          });
        // downloadFile(origin_path,filename).then(res=>{
        //   console.log(res)
        //   window.open(res.data)
        // })
      }
    },
    createFolders(id) {
      this.dialogVisible = false;
      let data = {
        parent_fileid: id,
        filename: this.pathName,
      };
      createFolder(data).then((res) => {
        console.log(res);
      });
    },
    createPath() {
      this.dialogVisible = true;
    },
    async changeData(event, id) {
      // console.log(event.target.value);
      console.log(id);
      let filevalue = event.target.value;
      let files = event.target.files;

      if (files[0] == undefined) {
        this.$message.warning("未上传任何文件！");
      } else {
        if (files.length > 20) {
          this.$message.warning("上传文件数不得超过20个");
          return;
        }
        let data = {
          parent_fileid: id,
          filename: files[0].webkitRelativePath.split("/")[0], //文件夹只存储在数据库
        };
        console.log(files[0]);
        await createFolder(data).then(async (res) => {
          let self = this;
          console.log(res);
          let tempList = []; // 临时存储已经创建的文件
          for (let i = 0; i < files.length; i++) {
            let formdata = new FormData();
            formdata.append("file", files[i]);
            await uploadFile(formdata).then(async (cres) => {
              this.zid = res.data.id;
              let folderlist = files[i].webkitRelativePath
                .split("/")
                .slice(1, -1);
              for (let folder of folderlist) {
                let flag = false;
                let data1 = {
                  parent_fileid: this.zid,
                  filename: folder,
                };
                console.log(data1)
                console.log(this.zid);
                for (let temp of tempList) {
                  if (
                    temp.parent_fileid === data1.parent_fileid &&
                    temp.filename === data1.filename
                  ) {
                    // this.zid = temp.parent_fileid
                    flag = true;
                    break;
                  }
                }
                if (flag) {
                  await getFolderId(data1).then(res=>{
                    this.zid = res.data.id
                  })
                  continue;
                }
                tempList.push(data1);
                await createFolder(data1).then((res) => {
                  this.zid = res.data.id;
                  console.log(this.zid)
                });
              }
              let data = {
                origin_name: files[i].name,
                filename: cres.data.filename,
                mimetype: files[i].type.split("/").pop(),
                size: files[i].size,
                parent_fileid: this.zid,
              };
              await createFolder(data).then((res) => {});
            });
            console.log(files[i]);
          }
        await getFileList().then((res) => {
          this.tableData = res.data;
        });

        });
      }
    },
    getPng(row) {
      return require("../../assets/header/" + row.mimetype + ".png");
    },
    upFile() {},
  },
};
</script>

<style lang="scss" scoped>
// ::v-deep .el-card__body{
//   padding-top: 0;
// }
::v-deep .el-dialog__body {
  height: 200px;
}
::v-deep .el-input {
  width: 200px;
}
::v-deep .el-input__inner {
  width: 200px;
}
.create-file {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  .file-name {
    display: flex;
    align-items: center;
    span {
      width: 100px;
    }
  }
  .file-path {
    margin-top: 20px;
    display: flex;
    align-items: center;
    span {
      width: 100px;
    }
  }
}
.input-file {
  overflow: hidden;
  position: relative;
  margin-right: 20px;
}
.input-file input {
  opacity: 0;
  filter: alpha(opacity=0);
  font-size: 100px;
  position: absolute;
  top: 0;
  right: 0;
}
.content-box {
  margin-top: 15px;
  // display: flex;
  // justify-content: flex-end;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .catalog {
      font-size: 14px;
      color: #909090;
      span {
        cursor: pointer;
        &:hover {
          color: blue;
        }
      }
    }
    .up-btn {
      display: flex;
      justify-content: flex-end;
      // margin-left: 15px;
      margin-top: 5px;
      display: flex;
      .commit {
        margin-right: 20px;
      }
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