<template>
  <div class="published">
    <div class="web-logo"><img src="../assets/header/0164.png" alt=""></div>
    <div class="pub-info"><span>发布成功！有了你的分享，知食会变得更好！</span></div>
    <el-card class="share-box">
      <div class="article-title" @click="jumpDetail">{{title}}</div>
      <div class="share-tip">如何玩转知食社区?点击了解</div>
      <div class="share-link">分享到</div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title:"",
      article_id:""
    }
  },
  mounted(){
      setTimeout(()=>{
        console.log(this.$route.query.data)
        if(!this.$route.query.data){
          setTimeout(() => {
            this.$router.push("/home")
          }, 2000);
        }else{
          this.title = this.$route.query.data.title
          this.article_id = this.$route.query.data.article_id
        }
      },1000)
  },
  methods:{
    jumpDetail(){
      console.log(this.artilce_id)
      this.$router.push({
        name:"Article",
        params:{
          id:this.article_id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .published{
    .web-logo{
      img{
        width: 200px;
        margin-left: calc(50% - 100px);
      }
    }
    .pub-info{
      display: flex;
      justify-content: center;
      font-size: 18px;
    }
    .share-box{
      width: 800px;
      margin-top: 50px;
      margin-left: calc(50% - 400px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .article-title{
        text-decoration: underline;
        padding-top: 30px;
        font-size: 24px;
        cursor: pointer;
      }
      .share-tip{
        color: #007fff;
        margin-top: 40px;
        cursor: pointer;
      }
      .share-link{
        margin: 40px 0;
      }
    }
  }
</style>