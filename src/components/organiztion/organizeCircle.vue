<template>
  <div>
    <el-row class="el-row">
      <el-col :span="6" :xs="0">
        <organize-create></organize-create>
        <organize-nav></organize-nav>
        </el-col>
      <el-col :span="16" :xs="24">
        <dynamic-input></dynamic-input>
        <div class="article-view">
          <!-- <organize-search></organize-search> -->
          <article-view></article-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import organizeCreate from '@/components/organiztion/organizeCreate'
import dynamicInput from '../dynamic/dynamicInput'
import organizeNav from './organizeNav'
import ArticleView from '../content/components/ArticleView'
import organizeSearch from './organizeSearch'
export default {
  components:{
    dynamicInput,
    organizeNav,
    ArticleView,
    organizeSearch,
    organizeCreate
  }
}
</script>

<style lang="scss" scoped>
  .article-view{
    padding: 0 15px;
  }
</style>