<template>
  <div class="content-box">
    <div class="title">{{title}}</div>
    <!-- <div><img :src="imageUrl" alt=""></div> -->
    <div class="content">
      <mavon-editor codeStyle="monokai" v-html="content" style="padding:20px"></mavon-editor>
    </div>
  </div>
</template>

<script>
import {getArticleDetail} from "@/api/classic"
export default {
  data(){
    return {
      content:"",
      title:"",
      imageUrl:""
    } 
  },
  mounted(){
    console.log(this.$route.params.id)
    getArticleDetail(this.$route.params.id).then((res)=>{
      console.log(res)
      this.content = res.data.content
      this.title = res.data.title
      this.imageUrl = res.data.image
    })
    
  }
}
</script>

<style lang="scss" scoped>
  .content-box{
    
    .content{
      overflow: scroll;
      width: 80%;
      margin: auto;
    }
  }
  
</style>