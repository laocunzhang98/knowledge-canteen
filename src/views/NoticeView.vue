<template>
  <div>
    <div v-for="(info,index) in result" :key="index">
      <notice-card :noticeInfo="info"></notice-card>
    </div>
  </div>
</template>

<script>
import noticeCard from '@/components/notice/noticeCard'
import {getNoticeInfo} from "@/api/notice"
export default {
  data(){
    return {
      result:[]
    }
  },
  mounted(){
    getNoticeInfo().then(res=>{
      this.result = res.data
      console.log(res)
    })
  },
  components:{
    noticeCard
  }
}
</script>

<style lang="scss" scoped>

</style>