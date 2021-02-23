<template>
  <div class="space-box">
    <div class="menu">
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">文章</el-menu-item>
        <el-menu-item index="2">赞</el-menu-item>
        <el-menu-item index="3">关注</el-menu-item>
        <el-menu-item index="4">圈子</el-menu-item>
      </el-menu>
    </div>
    <el-card class="box-card">
      <user-article></user-article>
    </el-card>
  </div>
</template>

<script>
import userArticle from '@/components/user/components/userArticle'
export default {
  data(){
    return {
      activeIndex: '1',
    }
  },
  components:{
    userArticle
  },
   methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style lang="scss" scoped>

::v-deep .el-card__header{
  padding: 10px 20px;
}
::v-deep .el-menu--horizontal>.el-menu-item{
  height: 50px;
  line-height: 50px;
}
.el-menu-item{
  font-size: 16px;
  font-family: "PingFang SC";
}
.box-card{
  margin-top: 1px;
  padding-bottom: 50px;
}
.space-box{
  margin-top: 20px;
  .menu{
    // padding: 10px 5px;
  }
}

</style>