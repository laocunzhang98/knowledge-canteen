<template>
  <div>
    <div v-for="(item,index) in result" :key="index">
      <div class="card">
        <article-card :result="item"></article-card>
      </div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
import ArticleCard from "@/components/content/components/ArticleCard";
import { getUserArticle } from "@/api/user";
export default {
  data() {
    return {
      result: [],
    };
  },
  mounted() {
    getUserArticle().then((res) => {
      this.result = res.data;
    });
  },
  components: {
    ArticleCard,
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding: 10px 5px;
}
.line {
  border: 1px solid rgba($color: #000000, $alpha: 0.1);
}
</style>