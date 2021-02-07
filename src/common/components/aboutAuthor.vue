<template>
  <div class="author">
    <el-card class="box-card">
      <div class="header"><slot name="title"></slot></div>
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
      </div>
    </el-card>
  </div>
</template>

<script>
import {getuserArticleNum} from "@/api/user"
export default {
  props:{
    articleUid:{
      type:Number
    }
  },
  watch:{
    articleUid(){
      getuserArticleNum({id:this.articleUid}).then(res=>{
        console.log(res)
        if(res.code==200){
          this.all_favs = res.data[0].all_favs
          this.all_reads = res.data[0].all_reads
        }
      })
    }
  },
  data(){
    return {
      all_favs:0,
      all_reads:0
    }
  }
};
</script>

<style lang="scss" scoped>
.author {
  .box-card {
    .header{
      padding: 0 0 10px 5px;
      border-bottom: 1px solid rgba(0,0,0,0.2);
      font-size: 16px;
      font-weight: 500;
    }
    .achieve {
      margin-top: 10px;
    .support {
      display: flex;
      align-items: center;
      padding-left: 5px;
      cursor: pointer;
      span{
        font-size: 14px;
        font-weight: 600;
        padding-left: 5px;
      }
      img {
        height: 20px;
        width: 25px;
      }
    }
    .read {
      display: flex;
      align-items: center;
      margin-top: 15px;
      padding-left: 5px;
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