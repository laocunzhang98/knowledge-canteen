<template>
  <div>
    <div v-for="(info,index) in infolist" :key="index">
      <apply-card :info="info"></apply-card>
    </div>
  </div>
</template>

<script>
import applyCard from '@/components/notice/applyCard'
import {getApplyInfo} from "@/api/notice"
export default {
  data(){
    return {
      infolist:[]
    }
  },
  created(){
    getApplyInfo().then(res=>{
      this.infolist = res.data
      console.log(res)
    })
  },
  methods:{
  },
  components:{
    applyCard
  }
}
</script>

<style lang="scss" scoped>

</style>