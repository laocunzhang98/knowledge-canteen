<template>
  <div class="sys-box">
    <div v-for="(info,index) in infolist" :key="index">
      <div class="sys-info">您的文章 <span style="color:skyblue">{{info.article.title}}</span> 涉及<span style="color:red">{{info.type}}言论</span>,经管理员审核已被下架!请规范言行！</div>
    </div>
  </div>
</template>

<script>
import {getSysApplyInfo} from "@/api/notice"
export default {
  data(){
    return {
      infolist:[]
    }
  },
  created(){
    getSysApplyInfo().then(res=>{
      this.infolist = res.data
    })
  },
  methods:{
  },

}
</script>

<style lang="scss" scoped>
  .sys-box{
    .sys-info{
      height: 60px;
      padding: 20px 10px;
      border-bottom: 1px solid rgba(0,0,0,0.1);
    }
  }
</style>