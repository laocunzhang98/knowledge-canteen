<template>
  <el-row class="el-row">
    <el-col  class="el-col-left" :sm="5" :xs="0">
      <div class="grid-content" >
        <dynamic-nav :navList=navList></dynamic-nav>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12"  class="el-col-content">
      <dynamic></dynamic>
    </el-col>
    <el-col  class="el-col-right" :sm="7" :xs="0">
      <dynamic-aside></dynamic-aside>
    </el-col>
  </el-row>
</template>


<script>
import Dynamic from '../components/dynamic/dynamic'
import DynamicNav from "../components/dynamic/dynamicNav"
import DynamicAside from "../components/dynamic/dynamicAside"
export default {
  components:{
    Dynamic,
    DynamicNav,
    DynamicAside
  },
  data(){
    return {
      navList : ["推荐","关注","热门","上班摸鱼","一图胜千言","今天学到了","树洞一下","每日算法","开发工具","更多话题+"]
    }
  }
}
</script>


<style lang="scss">
.el-row{
  .el-col-left{
    min-height: 36px;
  }
  .grid-content{
    display: flex;
    justify-content: flex-end;
    min-height: 36px;
  }
}

</style>
