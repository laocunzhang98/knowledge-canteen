<template>
  <div class="content">
    <el-tabs v-model="activeName" class="tabs">
      <el-tab-pane label="热门" name="first">
        <article-view ref="view"></article-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ArticleView from "./components/ArticleView";
export default {
  
  mounted() {},
  computed: {},
  components: {
    ArticleView,
  },
  data() {
    return {
      activeName: "first",
      clientY: 0,
      count: 100,
    };
  },
  methods: {
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.loading = false;
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-tabs__header {
  margin: 0 !important;
}
::v-deep .el-tabs__active-bar {
  left: -20px;
}
::v-deep .is-active,
.is-top,
.el-tabs__item {
  padding: 0 20px !important;
}
</style>