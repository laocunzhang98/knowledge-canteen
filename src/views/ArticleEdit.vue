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
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                上传封面大图拖到此处，或
                <em>点击上传</em>
              </div>
            </el-upload>
          </div>
        </div>

        <div class="pub">
          <el-button type="primary" @click="prepub">发布文章</el-button>
          <el-dialog title="发布文章" :visible.sync="dialogFormVisible" center>
            <div class="other-info">
              <div class="classify">
                <span>请选择分类</span>
                <div class="category">
                  <div
                    class="category-item"
                    :class="{categoryactive:categoryItem===item}"
                    v-for="(item,index) in category"
                    :key="index"
                    @click="selectCategory(item)"
                  >{{item}}</div>
                </div>
              </div>
              <div class="orgnize" v-show="!isTeamEdit">
                <span style="margin-right:10px">发布的圈子</span>
                <el-select v-model="model" placeholder="选择圈子" clearable @change="handleOrgSelect">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.team_name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
              <div class="label">
                  <span>请添加标签</span>
                  <el-input v-model="label" autocomplete="off" size="small" maxlength="10"></el-input>
                </div>
                <div class="tip">
                  <span>发布到全民食堂</span>
                  <el-checkbox v-model="checked" @change="handleCheck"></el-checkbox>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消 发 布</el-button>
              <el-button type="primary" @click="pub">确 定 发 布</el-button>
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
        :ishljs="true"
        v-model="value"
        @change="renderValue"
        @imgAdd="$imgAdd"
        @imgDel="$imgDel"
      />
    </div>
  </div>
</template>
<script>
import { Base64 } from "js-base64";
import {
  pubArticle,
  pubPic,
  getCategoryList,
  UpdateArticle,
  getArticleDetail,
} from "@/api/classic";
import { getLimitOrg, getTeamId } from "@/api/team";
import Person from "@/components/header/components/Person";
export default {
  mounted() {
    // console.log(this.$route.query.article_id);
    if (this.$route.query.article_id&&this.$route.query.team_id) {
      this.isTeamEdit = true
      getArticleDetail(this.$route.query.article_id).then((res) => {
        this.value = res.data.rcontent;
        this.title = res.data.title;
        this.imageUrl = res.data.image;
        this.label = res.data.label;
        this.categoryItem = res.data.classify_name;
        this.organize_id = res.data.organize_id
        this.public = res.data.public
        if(this.public){
          this.checked = true
        }
      });
    }
    getLimitOrg().then((res) => {
      console.log(res.data);
      this.options = res.data;
    });
  },
  data() {
    return {
      categoryItem: "情感",
      label: "",
      category: [],
      dialogFormVisible: false,
      imageUrl: "",
      title: "",
      value: "",
      content: "",
      rcontent: "",
      article_id: "",
      organize_id: 0,
      public: 0,
      isTeamEdit:false,
      checked: false, // 全民食堂
      model: "",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization:
          "Basic " + Base64.encode(localStorage.getItem("token") + ":"),
      },
      upimgShow: false,
      options: [],
    };
  },
  components: {
    Person,
  },
  methods: {
    handleCheck(val) {
      if (val) {
        this.public = 1;
      } else {
        this.public = 0;
      }
    },
    async handleOrgSelect(val) {
      console.log(val)
      await getTeamId({ id: val }).then((res) => {
        this.organize_id = res.data.team_id;
      });
    },
    selectCategory(item) {
      this.categoryItem = item;
      console.log(item);
    },
    prepub() {
      if (!this.title) {
        this.$message.warning("请填写标题");
        return;
      }
      if (!this.content) {
        this.$message.warning("请填写内容");
        return;
      }
      this.dialogFormVisible = true;
      getCategoryList().then((res) => {
        console.log(res);
        this.category = res.data;
      });
    },
    imageLoad() {
      this.upimgShow = !this.upimgShow;
    },
    pub() {
      this.dialogFormVisible = false;
      if (this.organize_id === 0 && this.public === 0) {
        this.$message.warning("至少选择一个发布地点！！！");
        return;
      }
      let data = {
        title: this.title,
        label: this.label,
        content: this.content,
        rcontent: this.rcontent,
        classify: this.categoryItem,
        image: this.imageUrl,
        organize_id: this.organize_id,
        public: this.public,
      };
      if (this.$route.query.article_id) {
        data.article_id = this.$route.query.article_id;
        UpdateArticle(data).then((res) => {
          // this.article_id = res.data;
          console.log(res);
          this.$router.push({
            path: "/published",
            query: {
              data: res.data,
            },
          });
        });
      } else {
        pubArticle(data).then((res) => {
          // this.article_id = res.data;
          console.log(res);
          this.$router.push({
            path: "/published",
            query: {
              data: res.data,
            },
          });
        });
      }
      this.$router.push({
        path: "/published",
        query: this.article_id,
      });
    },
    renderValue(value, render) {
      this.rcontent = value;
      this.content = render;
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
      console.log(res);
      console.log(file);
      this.imageUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPng = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPng) {
        this.$message.error("上传封面图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传封面图片大小不能超过 2MB!");
      }
      return (isJPG && isLt2M) || (isPng && isLt2M);
    },
  },
};
</script>

<style scoped lang="scss">
.categoryactive {
  border: 1px solid rgb(12, 118, 204) !important;
  color: rgb(38, 137, 218) !important;
  background-color: rbg(242, 248, 255) !important;
}
::v-deep .el-dialog__body {
  height: 400px;
}
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
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
::v-deep .el-input--small {
  width: 140px;
}
.classify::v-deep .el-input__inner {
  width: 140px;
  height: 32px;
}
.orgnize ::v-deep .el-input__inner {
  width: 160px;
  height: 32px;
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
    .edit-title {
      flex-basis: 100%;
    }
    .edit-info {
      display: flex;
      width: 500px;
      justify-content: space-between;
      align-items: center;
      .pub {
        .other-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          .classify {
            display: flex;
            flex-direction: column;
            width: 50%;
            .category {
              display: flex;
              flex-wrap: wrap;
              margin-top: 10px;
              font-size: 16px;
              .category-item {
                padding: 5px 10px;
                margin: 5px 10px;
                color: #8c939d;
                border: 1px solid #8c939d;
                cursor: pointer;
              }
            }
            margin-bottom: 100px;
            span {
              margin: auto;
              font-size: 16px;
              font-weight: 600;
              padding: 10px 0;
              color: #8c939d;
            }
          }
          .label {
            display: flex;
            align-items: center;
            margin-top: 10px;
            span {
              margin-right: 10px;
            }
          }
          .tip {
            margin-top: 20px;
            display: flex;
            justify-content: center;
          }
        }
      }
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