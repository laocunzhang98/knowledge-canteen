<template>
  <div class="about-article">
    <el-card>
      <div class="header"><slot name=title></slot></div>
      <div class="article-list">
        <div class="article-item" v-for="(article,index) in articleList" :key="index" @click="articleDetail(article.id)">{{article.title}}</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {getArticleList} from "@/api/classic"
export default {
  props: {
    articleId:{
      type:String
    }
  },
  watch:{
    articleId(){
      let params = {
      pageSize:4,
      article_id:this.articleId
    }
    console.log(params)
    getArticleList(params).then((res)=>{
      if(res.code==200){
        this.articleList = res.data
      }
    })
    }
  },
  data(){
    return{
      articleList:[]
    }
  },
  methods: {
    articleDetail(id){
      this.$router.push({
         name:"Article",
         params:{
           id:id
         }
       })
    }
  },
 
}
</script>

<style lang="scss" scoped>
.about-article{
  .header{
    border-bottom: 1px solid rgba(0,0,0,0.2);
    padding: 0 0 10px 5px;
  }
  .article-list{
    .article-item{
      padding: 10px 5px;
      font-size: 14px;
      cursor: pointer;
      letter-spacing: 0;
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;  /*要显示的行数*/
      -webkit-box-orient: vertical;
      font-size:12px;
      &:hover{
        background-color: rgb(249,249,249);
      }
    }
  }
}
  
</style>