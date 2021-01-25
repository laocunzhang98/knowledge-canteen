<template>
  <div class="mavonEditor">
    <div class="edit-header">
      <div class="edit-title"><el-input placeholder="请输入标题"></el-input></div>
      <div class="up-img">
        <el-upload
          class="upload-demo"
          drag
          :headers="headers"
          action="/api/classic/pub"
          >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <div><el-button type="primary" @click="pub">发布文章</el-button></div>
    </div>
    <div class="edit-content">
      <mavon-editor  v-model="value" @change="renderValue"/>
    </div>
  </div>
</template>
<script>
import {Base64} from 'js-base64'
export default {
  data() {
    return {
      value:'',
      headers:{
        Authorization:"Basic "+Base64.encode(localStorage.getItem('token')+":")
      }
    };
  },
  
  methods:{
    pub(){
      console.log(this.value)
    },
    renderValue(){

    }
  }
};
</script>

<style scoped lang="scss">
.el-input{
  height: 60px;
  width: 80vw;
}
::v-deep .el-input__inner{
  height: 60px;
}
.mavonEditor {
  width: 100%;
  height: 100vh;
  overflow: scroll;
  overflow-x: hidden;
  .edit-header{
    display: flex;
    height: 60px;
  }
  .up-img{
    position: relative;
    z-index: 2000;
  }
}
</style>