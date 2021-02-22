<template>
  <div>
    <div class="edit-header">
      <el-row>
        <el-col :span="5"></el-col>
        <el-col :span="12">
          <div class="header">
            <i class="el-icon-arrow-left"></i> 返回个人主页
          </div>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="5"></el-col>
      <el-col :span="13">
        <div class="person-box">
          <el-card>
            <div slot="header" class="title">个人资料</div>
            <div>
              <div class="avatar">
                <div class="image">头像</div>
                <img :src="imageUrl" alt />
                <el-upload
                  class="upload-demo"
                  action="/api/uploads/addpic"
                  :show-file-list="false"
                  :headers="headers"
                  :on-success="handleAvatarSuccess"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB!</div>
                </el-upload>
              </div>
              <div class="nickname">
                <div class="item">名字</div>
                <div>
                  <el-input v-model="nickname" placeholder="填写你的名字"></el-input>
                </div>
                <div class="edit" @click="updateUserInfo({nickname:nickname})">保存</div>
              </div>
              <div class="job">
                <div class="item">职业</div>
                <div>
                  <el-input v-model="job" placeholder="填写你的职业"></el-input>
                </div>
                <div class="edit" @click="updateUserInfo({job:job})">保存</div>
              </div>
              <div class="describe">
                <div class="item">个人介绍</div>
                <div>
                  <el-input v-model="describe" placeholder="填写你的介绍"></el-input>
                </div>
                <div class="edit" @click="updateUserInfo({describe:describe})">保存</div>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script>
import { Base64 } from "js-base64";
import { editUserInfo,getUserInfo } from "@/api/user";
export default {
  data() {
    return {
      imageUrl: "",
      nickname: "",
      job:"",
      describe:"",
      headers: {
        Authorization:
          "Basic " + Base64.encode(localStorage.getItem("token") + ":"),
      },
    };
  },
  mounted(){
    getUserInfo().then(res=>{
      if(res.code===200){
        this.imageUrl = res.data.avatar
        this.job = res.data.job || ''
        this.describe = res.data.describe || ''
        this.nickname = res.data.nickname
      }
    })
  },
  methods: {
    updateUserInfo(item){
      editUserInfo(item).then(res=>{
        console.log(res)
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.data;
      editUserInfo({ avatar: res.data }).then((res) => {
        console.log(res);
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPng = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPng) {
        this.$message.error("上传封面图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传封面图片大小不能超过 2MB!");
      }
      return (isJPG && isLt2M) || (isPng && isLt2M);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-input{
  font-size: 16px;
  color: #909090;
}
::v-deep .el-input__inner{
  border: 0;
  width: 300px;
}
::v-deep .el-input.is-active .el-input__inner, .el-input__inner:focus{
  border-color: rgba(0, 0, 0, 0);
}
.avatar {
  display: flex;
  align-items: center;
  padding: 10px 30px;
  height: 80px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  .image{
    width: 65px;
    margin-left: 10px;
  }
  img {
    height: 80px;
    width: 80px;
    margin-left: 100px;
    margin-right: 20px;
  }
}
.describe,
.job,
.nickname {
  padding: 10px 30px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-left: 10px;
  .item{
    width: 65px;
  }
  .edit{
    font-size: 14px;
    cursor: pointer;
    &:hover{
      color: #007fff;
    }
  }
}
.edit-header {
  background-color: #fff;
  margin-top: 1px;
  .header {
    padding: 5px 20px;
    font-size: 14px;
    color: #909090;
    cursor: pointer;
    &:hover {
      color: #007fff;
    }
  }
}
.person-box {
  margin-top: 10px;
  .title {
    padding-top: 20px;
    font-size: 22px;
    font-weight: 600;
  }
}
</style>