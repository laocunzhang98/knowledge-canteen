<template>
  <div class="article-content">
    <el-row>
      <el-col :span="5">
        <div>
          
        </div>
      </el-col>
      <el-col :span="12">
        <div class="content-box">
          <article-author :articleInfo="articleInfo"></article-author>
          
          <div class="author-info">
            <div class="cover">
              <img :src="imageUrl" alt="" v-if="imageUrl">
            </div>
            <div class="title">{{title}}</div>
          </div>
          <!-- <div><img :src="imageUrl" alt=""></div> -->
          <div class="content">
            <mavon-editor codeStyle="monokai" v-html="content" style="padding:25px"></mavon-editor>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getArticleDetail } from "@/api/classic";
import ArticleAuthor from '@/components/content/components/ArticleAuthor'
export default {
  data() {
    return {
      content: "",
      title: "",
      imageUrl: "",
      articleInfo:""
    };
  },
  components:{
    ArticleAuthor
  },
  mounted() {
    console.log(this.$route.params.id);
    getArticleDetail(this.$route.params.id).then((res) => {
      console.log(res);
      this.content = res.data.content;
      this.title = res.data.title;
      this.imageUrl = res.data.image;
      this.articleInfo = res.data
    });
  },
};
</script>

<style lang="scss" scoped>
.article-content{
  margin-top:20px;
.content-box{
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
  width: 100%;
  .author-info{
  background-color: #fff;
    .cover{
      padding-bottom: 20px;
      img{
        padding: 5px 25px;
        width: calc(100% - 50px);
        height: 100%;
      }
      
    }
  .title{
    padding: 20px 25px;
    font-weight: 600;
    font-size: 30px;
  }
}
.content{
  .shadow{
    box-shadow: none !important;
  }
}
}
}


</style>