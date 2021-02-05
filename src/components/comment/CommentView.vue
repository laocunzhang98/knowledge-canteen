<template>
  <div class="comment-box">
    <comment-input :articleInfo="articleInfo"></comment-input>
    <div class="comment-display">
      <div v-for="(comment,index) in commentList" :key="index">
        <comment-card :comment="comment"></comment-card>
        <div class="second-comment" v-for="(second,index) in comment.second" :key="index">
          <comment-card :comment="second"></comment-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getCommentList} from "@/api/comment";
import CommentInput from "@/components/comment/components/CommentInput";
import CommentCard from "@/components/comment/components/CommentCard";
export default {
  watch: {
    articleInfo(){
      getCommentList({article_id:this.articleInfo.id}).then((res)=>{
        if(res.code ==200){
          console.log(res.data)
          this.commentList = res.data
        }
      })
    }
  
  },
  data(){
    return {
      commentList:[]
    }
  },
  props: {
    articleInfo: {
      type: Object,
    },
  },

  components: {
    CommentInput,
    CommentCard,
  },
};
</script>

<style lang="scss" scoped>
.comment-box {
  .comment-display {
    .second-comment {
      background-color: rgb(250, 251, 252);
      margin-left: 30px;
    }
  }
}
</style>