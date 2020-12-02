<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
    <el-tab-pane label="热门" name="first">
      <article-view></article-view>
    </el-tab-pane>
    <el-tab-pane label="最新" name="second"></el-tab-pane>
    <el-tab-pane label="热榜" name="third"></el-tab-pane>
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
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style lang="scss">
  .is-active,.is-top,.el-tabs__item{
    padding: 0 10px;
  }
</style>