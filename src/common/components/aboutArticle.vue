<template>
  <div class="about-article">
    <el-card>
      <div class="header"><slot name=title></slot></div>
      <div class="article-list">
        <div class="article-item" v-for="(article,index) in articleList" :key="index" @click="articleDetail(article.id)">
          <span>{{article.title}}</span>
          <div class="favor"><img src="../../assets/home/favor.png" alt=""><span>{{article.fav_nums}}</span><img src="../../assets/home/common.png" alt=""><span>{{article.com_nums}}</span></div>
        </div>
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
      article_id:this.articleId,
    }
    getArticleList(params).then((res)=>{
      if(res.code==200){
        console.log(res)
        this.articleList = res.data.data
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
      &:hover{
        background-color: rgb(249,249,249);
      }
      .favor{
        display: flex;
        align-items:flex-start;
        margin-top: 5px;
        img{
          width: 18px;
          height: 18px;
          margin-left: 5px;
        }
      }
    }
  }
}
  
</style>