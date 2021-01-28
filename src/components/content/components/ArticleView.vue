<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
    <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
      <li v-for="(item,index) in result" class="list-item" :key="index">
        <el-card class="box-card">
          <article-card :result="item"></article-card>
        </el-card>
      </li>
    </ul>
  </div>
</template>

<script>
import { getArticleList } from "../../../api/classic";
import ArticleCard from "./ArticleCard"
export default {
  mounted() {
    getArticleList()
      .then((res) => {
        console.log(res.data)
        this.result = res.data;
      })
      .catch();
  },
  components:{
    ArticleCard
  },
  data() {
    return {
      count: 10,
      loading: false,
      result: [],
    };
  },
  computed: {
    noMore() {
      return this.count >= 20;
    },
    disabled() {
      return this.loading || this.noMore;
    },
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
  .text {
    font-size: 14px;
  }

  .item {
    padding: 5px 0;
  }

  .box-card {
    box-sizing: border-box;
    height: 150px;
    width: 100%;
  }
</style>