<template>
  <div class="mavonEditor">
    <div class="edit-header">
      <div class="edit-title">
        <el-input placeholder="请输入文章标题..." v-model="title" maxlength="30"></el-input>
      </div>
      <div class="edit-info">
        <div class="img-btn" @click="imageLoad">
          <img src="../assets/home/upload-pic .png" alt />
          <div class="up-img">
            <el-upload
              class="avatar-uploader"
              drag
              :headers="headers"
              action="/api/uploads/addpic"
              v-show="upimgShow"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                上传封面大图拖到此处，或
                <em>点击上传</em>
              </div>
            </el-upload>
          </div>
        </div>

        <div class="pub">
          <el-button type="primary" @click="dialogFormVisible = true">发布文章</el-button>
          <!-- @click="pub" -->

          <el-dialog title="发布文章" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="活动名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" size="small"></el-input>
              </el-form-item>
              <el-form-item label="活动区域" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false;pub" >确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <div class="person">
          <person></person>
        </div>
      </div>
    </div>
    <div class="edit-content">
      <mavon-editor
        ref="md"
        v-model="value"
        @change="renderValue"
        @imgAdd="$imgAdd"
        @imgDel="$imgDel"
        @navigationToggle="navigationToggle"
      />
    </div>
  </div>
</template>
<script>
import { Base64 } from "js-base64";
import { pubArticle,pubPic } from "@/api/classic";
import Person from "@/components/header/components/Person";
export default {
  data() {
    return {
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
      dialogFormVisible:false,
      imageUrl: '',
      title: "",
      value: "",
      content:"",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization:
          "Basic " + Base64.encode(localStorage.getItem("token") + ":"),
      },
      upimgShow: false,
    };
  },
  components: {
    Person,
  },
  methods: {
    navigationToggle(status,value){
      console.log(value)
    },
    imageLoad() {
      this.upimgShow = !this.upimgShow;
    },
    pub() {
      let data = {
        title:this.title,
        label:"测试",
        content:this.content,
        image:this.imageUrl,
      }
      console.log(this.form)
      // pubArticle(data).then((res)=>{
      //   console.log(res)
      // })
    },
    renderValue(value,render) {
      this.content = render
    },
    $imgAdd(pos, $file) {
      const formdata = new FormData();
      formdata.append("file", $file);
      pubPic(formdata, this.headers).then((res) => {
        console.log(res);
        this.$refs.md.$img2Url(pos, res.data);
      });
    },
    $imgDel(pos) {
      console.log(111);
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      console.log(file)
      this.imageUrl = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPng = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPng) {
        this.$message.error('上传封面图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传封面图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M || isPng && isLt2M
    }
  },
};
</script>

<style scoped lang="scss">
.avatar {
    width: 358px !important;
    height: 178px !important;
    display: block;
  }
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
::v-deep .el-input--small{
  width: 140px;
}
.edit-title ::v-deep .el-input__inner:focus {
  border-color: rgba(#000, 0);
  outline: 0;
}
.edit-title ::v-deep .el-input__inner:hover {
  border: rgba(#000, 0);
}
.edit-title .el-input {
  height: 60px;
  width: 70vw;
}
.edit-title ::v-deep .el-input__inner {
  border: none;
  height: 60px;
  font-size: 26px;
  font-weight: 600;
}

.mavonEditor {
  width: 100%;
  height: 100vh;
  overflow: scroll;
  overflow-x: hidden;
  .edit-header {
    display: flex;
    height: 60px;
    align-items: center;
    background-color: #fff;
    .edit-title{
      flex-basis:100%;
    }
    .edit-info {
      display: flex;
      width: 500px;
      justify-content: space-between;
      align-items: center;
      .img-btn {
        margin: 0 10px;
        cursor: pointer;
        position: relative;
        .up-img {
          position: absolute;
          top: 40px;
          right: -200px;
          z-index: 2000;
        }
        img {
          height: 25px;
          width: 25px;
        }
      }
      .person {
        margin-left: 15px;
      }
    }
  }
}
</style>