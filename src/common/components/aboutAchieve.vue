<template>
  <div class="author">
    <el-card class="box-card">
      <div class="header"><slot name="title">个人成就</slot></div>
      <div><slot name="identity"></slot></div>
      <div class="achieve">
        <div class="support">
          <img src="../../assets/home/zan.png" alt />
          <span>获得点赞</span>
          <span>{{all_favs}}</span>
        </div>
        <div class="read">
          <img src="../../assets/home/read.png" alt />
          <span>文章被阅读</span>
          <span>{{all_reads}}</span>
        </div>
        <div class="follow">
          <img src="../../assets/home/follow.png" alt="">
          <span>关注了</span>
          <span>{{follow_nums}}</span>
        </div>
        <div class="fans">
          <img src="../../assets/home/fans.png" alt="">
          <span>关注者</span>
          <span>{{fans_nums}}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {getuserArticleNum,getUserInfo} from "@/api/user"
export default {
  mounted(){
    let params = {}
    if(this.$route.params.userid){
      params.id = this.$route.params.userid
    }
    this.initAchieve(params)
  },
  props:{

  },
  methods:{
    initAchieve(params){
      getuserArticleNum(params).then(res=>{
        console.log(res)
        if(res.code==200){
          this.all_favs = res.data[0].all_favs
          this.all_reads = res.data[0].all_reads
        }
      })
      getUserInfo(params).then(res=>{
        this.follow_nums = res.data.follow_nums
        this.fans_nums = res.data.fans_nums
      })
    }
  },
  data(){
    return {
      all_favs:0,
      all_reads:0,
      follow_nums:0,
      fans_nums:0
    }
  }
};
</script>

<style lang="scss" scoped>
.author {
  .box-card {
    width: 240px;
    .header{
      padding: 0 0 10px 5px;
      border-bottom: 1px solid rgba(0,0,0,0.2);
      font-size: 16px;
      font-weight: 500;
    }
    .achieve {
      margin-top: 10px;
    .support,.read,.follow,.fans {
      display: flex;
      align-items: center;
      padding: 5px;
      cursor: pointer;
      span{
        font-size: 14px;
        font-weight: 600;
        padding-left: 5px;
      }
      img {
        height: 25px;
        width: 25px;
      }
    }
  }
}
  }
  
</style>