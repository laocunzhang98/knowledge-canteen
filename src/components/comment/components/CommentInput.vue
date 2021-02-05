<template>
    <div class="comment">
      <el-row :gutter="10">
        <div class="comment-input">
          <el-col :span="2">
            <div class="avatar">
              <img src="../../../assets/header/avator.jpg" alt />
            </div>
          </el-col>
          <el-col :span="22">
            <el-input
              v-model="comment"
              placeholder="输入评论"
              type="textarea"
              autosize
              maxlength="200"
              show-word-limit
            ></el-input>
          </el-col>
        </div>
      </el-row>
      <div class="commit">
        <div>表情</div>
        <el-button type="primary" size="small" @click="commitComment">评论</el-button>
      </div>
    </div>
</template>

<script>
import {comment} from "@/api/comment"
export default {
  props:{
    articleInfo:{
      type:Object
    }
  },
  data() {
    return {
      comment: "",
    };
  },
   methods: {
    commitComment(){
      console.log(this.articleInfo)
      let data  = {
        article_id:this.articleInfo.id,
        article_uid:this.articleInfo.uid,
        content:this.comment
      }
      comment(data).then(res=>{
        this.comment = ""
        this.$emit("success",res.data)
      })
    }
  },
}
</script>

<style lang="scss" scoped>
el-input {
  height: 36px;
}
::v-deep .el-input__inner {
  height: 36px;
  width: 90vw;
}
  .comment {
    min-width: 300px;
    background-color: rgb(250, 251, 252);
    padding: 10px 5px;
    margin-bottom: 20px;
    .comment-input {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      
      

      .avatar {
        margin-left: 10px;
        img {
          width: 36px;
          height: 36px;
          border: 0;
          border-radius: 18px;
          background-color: red;
        }
      }
    }
    .commit{
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
</style>