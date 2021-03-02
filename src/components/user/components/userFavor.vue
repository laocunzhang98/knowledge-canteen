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
import {getFavorArticle} from "@/api/classic"
export default {
  data(){
    return{
      result:[]
    }
  },
  created(){
    getFavorArticle().then(res=>{
      console.log(res)
      this.result = res.data
    })
  },
  components:{
    ArticleCard
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>

</style>