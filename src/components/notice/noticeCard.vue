<template>
  <div>
    <div class="notice-box">
      <div class="avatar">
        <img :src="noticeInfo.user.avatar" alt="">
      </div>
      <div class="notice-info">
        <div>
          <span class="nickname" @click="jumpUserHome">{{noticeInfo.user.nickname}}</span>
          <span>在</span>
          <span class="title" @click="jumpArticle(noticeInfo.article.id)">{{noticeInfo.article.title}}</span>
          <span>中</span>
          <span class="type">{{noticeInfo.type}}</span>了你
        </div>
        <div class="content">
          <div v-html="noticeInfo.notice_info"></div>
        </div>
        <div class="time"><time-diff :date="noticeInfo.createdAt"></time-diff></div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeDiff from '@/utils/TimeDiff'
export default {
  props:{
    noticeInfo:{
      type:Object
    }
  },
  data() {
    return {};
  },
  mounted(){
  },
  methods:{
    jumpArticle(id){
      this.$router.push(`/post/${id}`)
    },
    jumpUserHome(){
      this.$router.push({
        path:`/users/${this.noticeInfo.user.id}/article`
      })
    }
    
  },
  components:{
    TimeDiff
  }
};
</script>

<style lang="scss" scoped>
.notice-box {
  padding: 10px 20px;
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.2);
  display: flex;
  .avatar{
    margin-right: 10px;
    margin-top: 10px;
    flex: 0 0 10%;
    img{
      height: 50px;
      width: 50px;
    }
  }
  .notice-info {
    flex: 0 0 70%;
    .content {
      margin-top: 10px;
      font-size: 15px;
      margin-bottom: 10px;
      padding: 5px 10px;
      background: #fafbfc;
      border-radius: 3px;
      border: 1px solid #f1f1f2;
    }
    .nickname{
      cursor: pointer;
      &:hover{
        color: blue;
      }
    }
    .title{
      cursor: pointer;
      &:hover{
        color: blue;
      }
    }
  }
}
</style>