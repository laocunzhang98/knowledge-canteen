<template>
  <div class="content">
    <div class="info-box">
      <div class="meta-row">
        <div class="nickname">{{result.name}} <span>·</span></div>
        <div class="pubtime"><time-diff :date="result.createdAt"></time-diff><span>·</span></div>
        <div class="label">这是标签</div>
      </div>
      <div class="title-row">{{result.title}}</div>
      <div class="action-row">
        <div class="favor" @click="favor"><img src="../../../assets/home/favorActive.png" alt=""><span>{{result.fav_nums}}</span></div>
        <div class="comment"><img src="../../../assets/home/common.png" alt=""><span>{{result.com_nums}}</span></div>
      </div>
    </div>
    <div class="img-box"><img :src="result.image" alt=""></div>
  </div>
</template>

<script>
import TimeDiff from '@/utils/TimeDiff'
 export default {
   data(){
     return {
       favorImg : "../../../assets/home/favor.png"
     }
   },
   mounted(){
     console.log(this.result)
   },
   components:{
     TimeDiff
   },
   props:{
     result:{
       type:Object
     }
   },
   methods:{
     favor(){
       this.favorImg = "../../../assets/home/favorActive.png"
     }
   }
 }

</script>

<style lang="scss" scoped>

  .content{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .info-box{
      margin-left:30px;
      .meta-row{
        display: flex;
      }
      .action-row{
        display: flex;
        .comment,.favor{
          height: 25px;
          display: flex;
          align-items: center;
          border: 1px solid rgba(#000, 0.2);
          border-radius: 4px;
          padding: 0 10px;
          margin-right: 10px;
          cursor: pointer;
          color: rgba(#000, 0.4);
          img{
            height: 15px;
            width: 15px;
            margin-right: 5px;
          }
         
        }
        
      }
    }
    .img-box{
      margin-right: 30px;
      img{
        height: 80px;
        width: 80px;
      }
    }
  }
</style>