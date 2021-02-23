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
            <div class="textarea" placeholder="输入评论" :contenteditable="true">
            </div>
          </el-col>
        </div>
      </el-row>
      <div class="commit">
        <emoji></emoji>
        <el-button type="primary" size="small" @click="commitComment">评论</el-button>
      </div>
    </div>
</template>

<script>
import {comment} from "@/api/comment"
import emoji from '@/common/components/emoji'
export default {
  props:{
    articleInfo:{
      type:Object
    },
    secondComment:{
      type:Object
    }
  },
  data() {
    return {
      comment: "",
    };
  },
  
  components:{
    emoji
  },
   methods: {
    commitComment(){
      let textarea =  document.getElementsByClassName("textarea")
      console.log(textarea[textarea.length-1].innerHTML)
      this.comment = textarea[textarea.length-1].innerHTML
      let article_id,article_uid,oid,comment_id
      if(this.articleInfo){
        article_id=this.articleInfo.id,
        article_uid=this.articleInfo.uid
      }else{
        article_id = this.secondComment.article_id,
        article_uid= this.secondComment.article_uid
        oid = this.secondComment.oid,
        comment_id =this.secondComment.comment_id
      }
      let data  = {
        article_id:article_id,
        article_uid:article_uid,
        content:this.comment,
        oid: oid || 0,
        comment_id: comment_id || 0
      }
      comment(data).then(res=>{
        document.getElementsByClassName("textarea")[document.getElementsByClassName("textarea").length-1].innerHTML = ""
        this.$emit("success",res.data)
        // console.log(this.secondComment.oid)   // 注意此处应同时通知文章发布者
        // this.$socket.emit("comment",this.secondComment.oid)
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
      .textarea{
        border: 1px solid skyblue;
        padding: 5px;
        border-radius: 3px;
        box-sizing: border-box;
        outline: 0;
        &:empty::before {
            content: attr(placeholder);
            color: #909090;
            font-size: 14px;
        }
        &:focus{
          border: 1px solid skyblue;
        }
      }
      .avatar {
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