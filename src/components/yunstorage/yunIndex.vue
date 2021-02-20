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
      yunlabel:[{name:'全部文件',type:[]},{name:'图片',type:["png","jpeg"]},{name:'文档',type:["plain","msword","pdf"]},{name:'视频',type:["mp4"]},{name:'音乐',type:["mp3"]},{name:'回收站',type:[]}]
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