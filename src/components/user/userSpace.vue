<template>
  <div class="space-box">
    <div class="menu">
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" @click.native="jumpArticle">文章</el-menu-item>
        <el-menu-item index="2" @click.native="jumpFavor">赞</el-menu-item>
        <el-menu-item index="3">关注</el-menu-item>
        <el-menu-item index="4">圈子</el-menu-item>
        <el-menu-item index="5" @click.native="jumpNotice" v-show="isShow">消息通知</el-menu-item>
        <el-menu-item index="6" @click.native="jumpApply" v-show="isShow">申请通知</el-menu-item>
      </el-menu>
    </div>
    <el-card class="box-card">
      <router-view :key="key"></router-view>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      isShow:true
    };
  },
  computed: {
    key() {
      return this.$route.path;
    },
  },
  mounted(){
    if(this.$route.params.userid){
      this.isShow = false
    }
    let path = this.$route.path.split("/").slice(-1)[0]
    if(path=="article"){
      this.activeIndex = "1"
    }
    if(path=="notice"){
      this.activeIndex = "5"
    }
    if(path=="favor"){
      this.activeIndex = "2"
    }
    if(path=="apply"){
      this.activeIndex = "6"
    }
    console.log(path)
  },
  methods: {
    jumpFavor(){
      this.$router.push("/user/favor")
    },
    jumpApply(){
      this.$router.push("/user/apply")
    },
    jumpNotice(){
      this.$router.push("/user/notice")
    },
    jumpArticle(){
      if(this.isShow){
        this.$router.push("/user/article")
      }else{
        this.$router.push(`/users/${this.$route.params.userid}/article`)
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-card__header {
  padding: 10px 20px;
}
::v-deep .el-menu--horizontal > .el-menu-item {
  height: 50px;
  line-height: 50px;
}
.el-menu-item {
  font-size: 16px;
  font-family: "PingFang SC";
}
.box-card {
  margin-top: 1px;
  padding-bottom: 50px;
}
.space-box {
  margin-top: 20px;
  .menu {
    // padding: 10px 5px;
  }
}
</style>