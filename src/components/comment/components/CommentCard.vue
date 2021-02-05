<template>
  <div class="comment-card">
    <div class="avatar"><img :src="comment.avatar" alt=""></div>
    <div class="content-box">
      <div class="nickname">{{comment.nickname}}</div>
      <div class="content">
        <div v-if="comment.replier" class="replier">回复 <span>{{comment.replier}}: </span></div>
        {{comment.content}}</div>
      <div class="content-footer">
        <div class="time"> <time-diff :date="comment.createdAt"></time-diff></div>
        <div class="reply"><i class="el-icon-chat-dot-round"></i> 回复</div>
      </div>
    </div>
  </div>
</template>

<script>
import {getFormatDate} from "@/utils/util"
import TimeDiff from '@/utils/TimeDiff'
export default {
  data(){
    return {
    }
  },
  components:{
    TimeDiff
  },
  props:{
    comment:{
      type:Object
    },
  },
  


}
</script>

<style lang="scss" scoped>
  .comment-card{
    display: flex;
    .avatar{
      width: 8%;
      margin-top: 15px;
      img{
        margin-left: 10px;
        width: 40px;
        height: 40px;
      }
    }
    .content-box{
      width: 90%;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      padding: 15px 10px;
      .content{
        margin-top: 10px;
        margin-left: 2px;
        color: #505050;
        font-size: 14px;
        display: flex;
        align-items: center;
        .replier{
          color: #17181A;
          span{
            color:#406599
          }
        }
      }
      .content-footer{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 5px;
        .time{
          font-size: 12px;
          color:#8A9AA9
        }
        .reply{
          color: #8a93a0;
          font-size: 12px;
          cursor: pointer;
          &:hover{
            color: skyblue;
          }
        }
      }
    }
  }
</style>