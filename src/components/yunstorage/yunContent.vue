<template>
  <div class="content-box">
    <el-card class="card-box">
      <div class="card-header">
        <div class="catalog">
          <span
            v-for="(cata,index) in cataLog"
            :key="index"
            @click="Jumpcata(cata.id)"
          >{{cata.origin_name}}/</span>
        </div>
        <div class="up-btn">
          <!-- webkitdirectory -->
          <div style="margin-right: 20px;" v-show="isSelect">
            <el-button type="warning" size="small" @click="handleMoveFile">
              <i class="el-icon-sort"></i> 移动到
            </el-button>
            <div class="move">
              <el-dialog
              title="移动到"
              :visible.sync="dialogVisible1"
              width="width"
              >
              <div>
                <el-tree
                  :data="data"
                  :props="defaultProps"
                  @node-click="nodeClick">
                </el-tree>
              </div>
              <div slot="footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="CurrentMove">确 定</el-button>
              </div>
            </el-dialog>
            </div>
          </div>
          <div style="margin-right: 20px;" v-show="isSelect">
            <el-button type="danger" size="small" @click="handleDeleteFiles(ids)">
              <i class="el-icon-delete"></i> 删除
            </el-button>
          </div>
          <div style="margin-right: 20px;">
            <el-upload
              class="upload-demo"
              :headers="headers"
              action="/api/uploads/addfile"
              multiple
              :show-file-list="false"
              :limit="5"
              :on-success="handleFileSuccess"
              :on-exceed="handleExceed"
            >
              <el-button size="small">
                <i class="el-icon-upload"></i>上传文件
              </el-button>
            </el-upload>
          </div>
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
        </div>
        <div slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="createFolders(currentid)">确 定</el-button>
        </div>
      </el-dialog>
      <div class="content">
        <el-table
          :data="tableData"
          style="width: 100%"
          height="420"
          @select="handleSelectFile"
          @select-all="handleSelectAll"
          ref="FileTable"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="文件名" min-width="60%">
            <template slot-scope="scope">
              <img :src="scope.row.path || getPng(scope.row)" class="file-pic" />
              <span
                style="padding-left: 1px; text-align: center; cursor: pointer;"
                @click="selectDir(scope.row.id,scope.row.mimetype,scope.row.origin_path,scope.row.origin_name,scope.row.filename)"
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
          <el-table-column prop="prop" label="操作" min-width="20%">
            <!-- <template slot-scope="scope">
              <span class="option">
                <img src="../../assets/header/op.png" alt style="height:10px" />
              </span>
            </template> -->
          </el-table-column>
        </el-table>
      </div>
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
  getFolderId,
  getCateFile,
  deleteFile,
  getAllCate,
  moveFile
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
      catetype: [],
      ids: [],
      cataLog: [{ origin_name: "...", id: 0 }],
      currentid: 0,
      tableData: [],
      isSelect: false, // 判断是否选中文件
      isMove: false, //判断是否移动文件
      defaultProps: {
        children: 'children',
        label: 'origin_name'
      },
      data:[],
      moveId:[],
      currentId:0, 
      filedata:[] // 文件分片
    };
  },
  mounted() {
    if (this.$route.params.id) {
      let params = {
        organize_id:this.$route.params.id||0
      }
      this.initFileList(params)
    } else {
      this.initFileList()
    }
    this.$bus.$on("catetype", (type) => {
      this.catetype = type;
      getCateFile({ type: JSON.stringify(type),organize_id:this.$route.params.id||0}).then((res) => {
        this.tableData = res.data;
      });
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
    // 生成文件碎片
    createFileChunk(file, length = 10) {
      const fileChunkList = [];
      const chunkSize = Math.ceil(file.size / length);
      let cur = 0;
      while (cur < file.size) {
        fileChunkList.push({ file: file.slice(cur, cur + chunkSize) });
        cur += chunkSize;
      }
      return fileChunkList;
    },
    // 上传切片
    async uploadChunks() {
      const requestList = this.filedata
        .map(({ chunk }) => {
          const formData = new FormData();
          formData.append("chunk", chunk);
					formData.append("hash", hash);
          formData.append("filename", this.container.file.name);
          return { formData };
        })
        .map(async ({ formData }) =>
          this.request({
            url: "http://localhost:3000",
            data: formData
          })
        );
      await Promise.all(requestList); // 并发切片
    },
    // 上传文件分片
    async handleUpload() {
      if (!this.container.file) return;
      const fileChunkList = this.createFileChunk(this.container.file);
      this.filedata = fileChunkList.map(({ file },index) => ({
        chunk: file,
        hash: this.container.file.name + "-" + index // 文件名 + 数组下标
       }));
      await this.uploadChunks();
    },
    // 初始化文件列表
    initFileList(params={}){
      getFileList(params).then((res) => {
        this.tableData = res.data;
      });
    },
    CurrentMove(){
      let data = {
        moveId:this.moveId,
        currentId:this.currentid
      }
      moveFile(data).then(res=>{
        this.dialogVisible1 = false
        this.$router.go(0)
      })
    },
    nodeClick(val){
      console.log(val)
      this.currentid = val.id
    },
    // 获取文件层级
    getFileCate(){
      if(this.$route.params.id){
        let params = {
          organize_id:this.$route.params.id,
          ids:JSON.stringify(this.moveId)
        }
        getAllCate(params).then(res=>{
          this.data = res.data
        })
      }else{
        let params = {
          ids:JSON.stringify(this.moveId)
        }
        getAllCate(params).then(res=>{
          console.log(res)
          this.data = res.data
        })
      }
    },
    toggleSelection(){

    },
    handleMoveFile() {
      this.dialogVisible1 = true
      this.getFileCate()
    },
    // 删除文件
    handleDeleteFiles(ids) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteFile({ ids: ids,organize_id:this.$route.params.id }).then((res) => {
          getFileList({organize_id:this.$route.params.id||0}).then((res) => {
            this.tableData = res.data;
            this.isSelect = false;
          });
        });
      });
    },
    handleSelectAll(selection) {
      console.log(selection);
      this.isSelect = true;
      if (selection.length === 0) {
        this.isSelect = false;
      }
    },
    handleSelectFile(selection, row) {
      // this.$refs.FileTable.toggleRowSelection(this.tableData[0])
      let indexof = this.ids.indexOf(row.id);
      if (indexof != -1) {
        this.ids.splice(indexof, 1);
      } else {
        this.ids.push(row.id);
      }
      if (this.catetype.length == 0) {
        this.isSelect = true;
      }
      if (selection.length === 0) {
        this.isMove = false;
        this.isSelect = false;
      }
      this.moveId = []
      for(let item of selection){
        console.log(item.id)
        this.moveId.push(item.id)
      }
      console.log(this.moveId)
    },
    // 文件上传成功
    async handleFileSuccess(res, files) {
      this.isSelect = false
      this.isMove = false
      let data = {
        origin_name: files.name,
        filename: res.data.filename,
        mimetype: files.raw.type.split("/").pop() || files.name.split(".").pop(),
        size: res.data.size,
        parent_fileid: this.currentid,
        organize_id: this.$route.params.id || 0,
      };
      if(files.raw.type.length==0){
        data.mimetype = files.name.split(".").pop()
      }
      await createFolder(data).then((res) => {});
      await getFileList({ id: this.currentid,organize_id:this.$route.params.id||0}).then(
        (res) => (this.tableData = res.data)
      );
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    // 文件导航
    Jumpcata(id) {
      this.isMove = false
      this.isSelect = false
      this.currentid = id;
      getFileList({ id: id,organize_id:this.$route.params.id||0}).then((res) => {
        this.tableData = res.data;
      });
      getCataLog({ parent_fileid: id }).then((res) => {
        this.cataLog = [{ origin_name: "...", id: 0 }];
        this.cataLog = this.cataLog.concat(res.data);
      });
    },
    // 日期格式化
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
    // 进入文件夹
    selectDir(id, type, origin_path, filename, ofilename) {
      this.isMove = false
      this.isSelect = false
      if (type === "dir") {
        this.currentid = id;
        let params = {
          id: id,
          organize_id:this.$route.params.id||0
        };
        getFileList(params).then((res) => {
          this.tableData = res.data;
        });
        getCataLog({ parent_fileid: id }).then((res) => {
          this.cataLog = [{ origin_name: "...", id: 0 }];
          this.cataLog = this.cataLog.concat(res.data);
        });
      } else {
        let url = `${process.env.VUE_APP_BASE_API}/files/${origin_path}/${ofilename}`;
        fetch(url)
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
      }
    },
    // 创建文件夹
    async createFolders(id) {
      this.dialogVisible = false;
      let data = {
        parent_fileid: id,
        filename: this.pathName,
        organize_id: this.$route.params.id || 0,
      };
      await createFolder(data).then((res) => {
        console.log(res);
      });
      await getFileList({ id: id,organize_id:this.$route.params.id||0}).then((res) => {
        this.tableData = res.data;
      });
    },
    createPath() {
      this.isMove = false
      this.dialogVisible = true;
    },
    async changeData(event, id) {
      this.isMove = false
      this.isSelect = false
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
          organize_id: this.$route.params.id || 0,
        };
        await createFolder(data).then(async (res) => {
          let self = this;
          await getFileList({ id: this.currentid,organize_id:this.$route.params.id||0}).then((res) => {
            this.tableData = res.data;
          });
          let tempList = []; // 临时存储已经创建的文件
          for (let i = 0; i < files.length; i++) {
            let formdata = new FormData();
            formdata.append("file", files[i]);
            formdata.append("organize_id",this.$route.params.id || 0)
            await uploadFile(formdata).then(async (cres) => {
              // 每上传一个文件 刷新一次
              await getFileList({ id: this.currentid,organize_id:this.$route.params.id||0}).then((res) => {
                this.tableData = res.data;
              });
              this.zid = res.data.id;
              let folderlist = files[i].webkitRelativePath
                .split("/")
                .slice(1, -1);
              for (let folder of folderlist) {
                let flag = false;
                let data1 = {
                  parent_fileid: this.zid,
                  filename: folder,
                  organize_id: this.$route.params.id || 0,
                };
                for (let temp of tempList) {
                  if (
                    temp.parent_fileid === data1.parent_fileid &&
                    temp.filename === data1.filename
                  ) {
                    flag = true;
                    break;
                  }
                }
                if (flag) {
                  await getFolderId(data1).then((res) => {
                    this.zid = res.data.id;
                  });
                  continue;
                }
                tempList.push(data1);
                await createFolder(data1).then((res) => {
                  this.zid = res.data.id;
                  console.log(this.zid);
                });
              }
              let data = {
                origin_name: files[i].name,
                filename: cres.data.filename,
                mimetype: files[i].type.split("/").pop()|| files.name.split(".").pop(),
                size: files[i].size,
                parent_fileid: this.zid,
                organize_id: this.$route.params.id || 0,
              };
              await createFolder(data).then((res) => {});
            });
            console.log(files[i]);
          }
          await getFileList({ id: this.currentid,organize_id:this.$route.params.id||0}).then((res) => {
            this.tableData = res.data;
          });
        });
      }
    },
    getPng(row) {
      try {
        return require("../../assets/header/" + row.mimetype + ".png");
      } catch (error) {
        return require("../../assets/header/default.png");
      }
    },
  },
  watch: {
    // tableData(){
    //    this.$nextTick(function() {
    //     this.$refs.tableData.toggleRowSelection(this.tableData[0])
    //   })
    // }
  },
};
</script>

<style lang="scss" scoped>
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
  .content {
    .file-pic {
      vertical-align: middle;
      margin-right: 10px;
      height: 35px;
      width: 35px;
    }
    .option {
      margin-left: 10px;
      cursor: pointer;
    }
  }
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
      margin-top: 5px;
      display: flex;
      .commit {
        margin-right: 20px;
      }
      .move{
        .el-dialog__wrapper{
          .el-dialog__body div{
              overflow: scroll;
              height: 100%;
              overflow-x: hidden;
              overflow-y: hidden;
              .el-tree{
                overflow-y: scroll;
              }
          }
        }
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