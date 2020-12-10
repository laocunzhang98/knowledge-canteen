<template>
  <div>
    <el-col :span="5"><div class="yun-left"><yun-nav :yunlabel=yunlabel></yun-nav></div></el-col>
    <el-col :span="14"><div class="yun-center"><yun-content></yun-content></div></el-col>
  </div>
</template>

<script>
import yunNav from '../dynamic/dynamicNav'
import yunContent from '@/components/yunstorage/yunContent'
export default {
  data(){
    return{
      yunlabel:['全部文件','图片','文档','视频','种子','音乐','我的分享','回收站']
      }
    },
  components:{
    yunNav,
    yunContent
  }
}
</script>


<style lang="scss" scoped>
 .yun-left{
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
    min-height: 36px;
 }

</style>