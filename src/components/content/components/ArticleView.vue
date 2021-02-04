<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
    <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
      <li v-for="(item,index) in result" class="list-item" :key="index">
        <el-card class="box-card">
          <article-card :result="item"></article-card>
        </el-card>
      </li>
      <!-- <li v-for="(item,index) in count" class="list-item" :key="index">{{item}}</li> -->
    </ul>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
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
  computed: {
      noMore () {
        return this.count >= 20
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
  components:{
    ArticleCard
  },
  data() {
    return {
      loading: false,
      result: [],
    };
  },

  methods: {
    load() {
      // this.loading = true;
      // setTimeout(() => {
      //   getArticleList().then((res)=>{
      //     console.log(res.data)
      //     this.result.concat(res.data)
      //   })
      //   this.loading = false;
      // }, 1000);
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