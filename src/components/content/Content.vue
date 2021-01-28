<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
    <el-tab-pane label="热门" name="first">
      <article-view></article-view>
    </el-tab-pane>
    <!-- <el-tab-pane label="最新" name="second">
      <article-view></article-view>
    </el-tab-pane>
    <el-tab-pane label="热榜" name="third">
      <article-view></article-view>
    </el-tab-pane> -->
  </el-tabs>
</template>
<script>
import ArticleView from './components/ArticleView'
  export default {
    components:{
      ArticleView
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      
    }
  };
</script>

<style lang="scss">
  .el-tabs__header{
    margin: 0 !important;
  }
  .is-active,.is-top,.el-tabs__item{
    padding: 0 10px;
  }
</style>