<template>
  <div class="dynamic-card" @click.stop="emojiActive=false;showTopic=false">
    <el-card>
      <div class="dynamic-swiper">
        <div class="dynamic-input">
          <div id="textarea" class="textarea" :contenteditable="true" ></div>
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
          <div><emoji></emoji></div>
          <div class="pic-upload">
            <div class="pic-btn" @click="uploadimg">
              <i class="el-icon-picture-outline"></i>
              <span style="font-size:14px;color:blue">图片</span>
            </div>
          </div>
          <div class="topic-list">
            <div class="top-btn" @click.stop="showTopic=!showTopic">
              <i class="iconfont icon-huati"></i>
              <span style="font-size:14px;color:blue">话题</span>
            </div>
            
            <div class="topic-item" v-show="showTopic" @click.stop="showTopic=true">
              <div class="triangle"></div>
              <div class="topic-search">
                <el-input
                  placeholder="请输入内容"
                  size="small"
                  >
                  <i slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </div>
              <div class="topic-itemlist">
                <div v-for="(item,index) in 10" :key="index" class="topic-detail">
                  <li>xxxxxxxxxxxxxx</li>
                </div>
              </div>
            </div>
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
import emoji from '@/common/components/emoji'
export default {
  components: { emoji },
  data() {
    return {
      textarea: "",
      fontCounts: 300,
      inputCount: 0,

      dialogImageUrl: "",
      dialogVisible: false,

      visibileimg: false,
      showTopic:false
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
   

    // 表情选择
    // 话题选择
    topicSelect(){

    }
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
      .pic-upload{
        color: skyblue;
        .pic-btn{
          display: flex;
          align-items: center;
        }
      }
      .topic-list{
        .top-btn {
          cursor: pointer;
          color: skyblue;
          display: flex;
          align-items: center;
          min-width: 50px;
        }
        .topic-item{
          position: absolute;
          height: 400px;
          width: 280px;
          background-color: #fff;
          box-shadow: 0 5px 18px 0 rgba(0,0,0,.16);
          margin-left: -20px;
          margin-top: 10px;
          // overflow: scroll;
          // overflow-x: hidden;
          .topic-search{
            margin: auto;
            margin-top: 15px;
            width: 220px;
          }
          .topic-itemlist{
            overflow: scroll;
            overflow-x: hidden;
            height: 353px;
            .topic-detail{
              height: 60px;
              width: 80%;
              margin: auto;
            }
          }
        }
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
