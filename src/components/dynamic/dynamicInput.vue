<template>
  <div class="dynamic-card" @click.stop="emojiActive=false">
    <el-card>
      <div class="dynamic-swiper">
        <div class="dynamic-input">
          <div id="textarea" class="textarea" :contenteditable="true" @input="fontCount"></div>
        </div>
        <div class="dynamic-image" v-show="visibileimg">
          <el-upload
            class="upload-img"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePreview"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :limit="3"
            ref="upload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
        <div class="dynamic-topic">
          <span class="font-count">{{fontCounts-inputCount}}/{{fontCounts}}</span>
        </div>
      </div>
      <div class="dynamic-menu">
        <div class="topic">
          <div id="topic-emoji" @click="fontCount()">
            <div class="emoji-btn" @click="emojiSelect()" @click.stop="emojiActive=!emojiActive">
              <i class="iconfont icon-A"></i>
              <span style="font-size:14px;color:blue">表情</span>
            </div>   
            <div class="emoji-list" v-show="emojiActive" @click.stop="emojiActive=true">
              <div class="triangle"></div>
              <ul>
                <li class="emoji-item" v-for="(item,index) in emojiLists.srcs" :key="index">
                  <img :src="item" class="emoji" alt />
                </li>
              </ul>
            </div>
          </div>
          <div class="pic-upload">
            <div class="pic-btn" @click="uploadimg">
              <i class="el-icon-picture-outline"></i>
              <span style="font-size:14px;color:blue">图片</span>
            </div>
          </div>
          <div class="top-btn">
            <i class="iconfont icon-huati"></i>
            <span style="font-size:14px;color:blue">话题</span>
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" ref="btn">发布</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import emojiList from "./emoji";
export default {
  data() {
    return {
      textarea: "",
      fontCounts: 300,
      inputCount: 0,
      emojiLists: emojiList,
      emojiActive: false,

      dialogImageUrl: "",
      dialogVisible: false,

      visibileimg: false,
    };
  },
  methods: {
    //处理文件上传
    uploadimg() {
      this.visibileimg = !this.visibileimg
    },
    handleSuccess() {
      this.visibileimg = true;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //处理文件上传end
    removeHTMLTag(str) {
      str = str.replace(/<\/?[^>]*>/g, ""); //去除HTML tag
      str = str.replace(/[ | ]*\n/g, ""); //去除行尾空白
      str = str.replace(/&nbsp;/gi, ""); //去掉尾部空格
      return str;
    },
    fontCount() {
      let innertext = document.getElementById("textarea").innerHTML;
      let strCount = this.removeHTMLTag(innertext).length;
      this.inputCount = strCount;
      if (strCount > this.fontCounts) {
        this.inputCount = this.fontCounts;
        document.getElementById("textarea").innerHTML = innertext.substr(
          0,
          this.fontCounts
        );
      }
    },
    emojiSelect() {
      document.getElementById("textarea").innerHTML +=
        '<img class="emoji" draggable="false" alt="😏" src="https://gold-cdn.xitu.io/asset/twemoji/2.6.0/svg/1f60f.svg">';
    },
  },
};
</script>


<style lang="scss" scoped>
/deep/.el-icon-upload-success {
  position: absolute;
  top: -2px;
  left: 15px;
}
/deep/ .el-upload-list__item {
  margin-top: 10px !important;
  height: 82px !important;
  width: 82px !important;
  line-height: 88px !important;
}
/deep/.el-upload--picture-card {
  margin-top: 10px;
  height: 82px !important;
  width: 82px !important;
  line-height: 88px !important;
}
/deep/.el-button {
  line-height: 0.5;
}
.emoji-item:hover {
  transform: scale(1.3);
  transition: 0.4s;
}
.emoji-list {
  width: 300px;
  height: 200px;
  position: absolute;
  top: 175px;
  border-radius: 4px;
  box-shadow: 0 5px 18px 0 rgba(0, 0, 0, 0.16);
  background-color: #fff;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    li {
      margin: 2px;
    }
  }
}
/deep/.emoji {
  width: 22px;
  height: 22px;
  margin: 0 2px;
  vertical-align: sub;
}
.font-count {
  font-size: 12px;
  position: absolute;
  right: 10px;
}
.textarea {
  min-height: 70px;
  padding: 5px 10px;
  width: 100%;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  overflow-x: hidden;
  outline: 0;
  border-radius: 4px 4px 0 0;
  border-bottom: 0;
}

/deep/.el-card__body {
  padding-bottom: 10px;
}
.iconfont {
  color: skyblue;
}
.dynamic-card {
  margin: 15px;

  .dynamic-swiper {
    .dynamic-input {
      /deep/.el-textarea__inner {
        border-radius: 4px 4px 0 0;
        border-bottom: none;
        &:focus {
          outline: none;
          border-color: #dcdfe6;
        }
        &:hover {
          outline: none;
          border-color: #dcdfe6;
        }
      }
      /deep/.el-input__count {
        position: absolute;
        bottom: -20px;
        z-index: 99;
      }
    }
    .dynamic-image {
      border: 1px solid #dcdfe6;
      border-top: 0;
      border-bottom: 0;
    }
    .dynamic-topic {
      border-radius: 0 0 4px 4px;
      position: relative;
      height: 20px;
      width: 100%;
      border: 1px solid #dcdfe6;
      border-top: none;
      box-sizing: border-box;
      background-color: #fff;
      display: flex;
      align-items: flex-end;
    }
  }
  .dynamic-menu {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .topic {
      padding-left: 10px;
      flex: 0 0 40%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .pic-upload,
      .top-btn {
        cursor: pointer;
        color: skyblue;
        display: flex;
        align-items: center;
        min-width: 50px;
      }
      #topic-emoji {
        box-sizing: border-box;
        .emoji-btn {
          display: flex;
          align-items: center;
          width:50px;
          cursor: pointer;
        }
        
      }
      .triangle {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 8px;
        border-color: transparent transparent #fff transparent;
        position: absolute;
        top: -15px;
        left: 15px;
        z-index: 99;
      }
    }
  }
}
</style>
