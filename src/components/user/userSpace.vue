<template>
  <div class="space-box">
    <el-card>
      <div><el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">文章</el-menu-item>
        <el-menu-item index="2">赞</el-menu-item>
        <el-menu-item index="3">关注</el-menu-item>
      </el-menu></div>
      <div>
        <!-- <article-card :result=""></article-card> -->
      </div>
    </el-card>
  </div>
</template>

<script>
import ArticleCard from '@/components/content/components/ArticleCard'
export default {
  data(){
    return {
      activeIndex: '1',
    }
  },
  components:{
    ArticleCard
  },
   methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style lang="scss" scoped>
::v-deep .el-menu--horizontal>.el-menu-item{
  height: 40px;
  line-height: 40px;
}
.el-menu-item{
  font-size: 16px;
}
  .space-box{
    margin-top: 20px;
  }
</style>