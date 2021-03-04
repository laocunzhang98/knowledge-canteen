<template>
  <div>
    <div class="menu-name">设置</div>
    <div class="setting-box">
      <div class="setting-menu">
        <el-menu :default-active="activeIndex">
          <el-menu-item index="1" @click.native="setBasic">基本设置</el-menu-item>
          <el-menu-item index="2" @click.native="setSenior">高级设置</el-menu-item>
          <el-menu-item index="3" @click.native="setCost">费用中心</el-menu-item>
          <el-menu-item index="4">安全日志</el-menu-item>
        </el-menu>
      </div>
      <div class="setting-detail">
        <router-view :key="key"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
    };
  },
  computed: {
    key() {
      return this.$route.path;
    },
  },
  mounted(){
    let path = this.$route.path.split("/").slice(-1)[0]
    if(path=="basic"){
      this.activeIndex = "1"
    }
    if(path=="advanced"){
      this.activeIndex = "2"
    }
    if(path=="cost"){
      this.activeIndex = "3"
    }
  },
  methods: {
    setBasic() {
      this.$router.push(`/organize/${this.$route.params.id}/setting/basic`);
    },
    setSenior() {
      this.$router.push(`/organize/${this.$route.params.id}/setting/advanced`);
    },
    setCost() {
      this.$router.push(`/organize/${this.$route.params.id}/setting/cost`);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-menu-item.is-active {
  border-left: 3px solid skyblue;
  color: blue;
}
::v-deep .el-menu-item {
  height: 42px;
  line-height: 42px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.el-menu-item:hover {
  background-color: rgba($color: #000000, $alpha: 0);

  color: #909090;
}
.menu-name {
  font-size: 18px;
  padding: 10px 20px;
}
.setting-box {
  margin-top: 20px;
  display: flex;
  .setting-menu {
    flex: 0 0 25%;
  }
  .setting-detail {
    margin-left: 20px;
    flex: 1;
  }
}
</style>