<template>
  <div>
    <ul class="list" >
      <li v-for="(item,index) in result" class="list-item" :key="index">
        <el-card class="box-card" >
          <article-card :result="item"></article-card>
        </el-card>
      </li>
      <!-- <li v-for="(item,index) in count" class="list-item" :key="index">{{item}}</li> -->
    </ul>
    <p v-if="loading" style="text-align:center">加载中...</p>
    <p v-if="noMore" style="text-align:center">没有更多了...</p>
  </div>
</template>

<script>
import { getArticleList,getOrgArticleList } from "../../../api/classic";
import ArticleCard from "./ArticleCard"
import { throttle } from "@/utils/util";
export default {
  created(){
    let that = this
    window.onscroll = throttle(function(){
   		var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
   		var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
   		var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
        if(scrollTop+windowHeight==scrollHeight){
           //写后台加载数据的函数
          that.load()
        }   
    },200)
  },
  mounted() {
    if(!this.$route.params.id){
      getArticleList({public:1})
      .then((res) => {
        this.result = res.data.data;
        this.countSize = res.data.countSize
      })
    }
    else{
      getOrgArticleList({organize_id:this.$route.params.id}).then(res=>{
        this.result = res.data.data;
        this.countSize = res.data.countSize
      })
    }
    this.$bus.$on("word",(word)=>{
      this.word = word
      getArticleList({"word":this.word})
      .then((res) => {
        console.log(res)
        this.result = res.data.data;
        this.countSize = res.data.countSize
      })
    })

  },
  computed: {
      noMore () {
        return this.count >= this.countSize-1
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
      countSize:0,
      result: [],
      page:0,
      count:10,
      word:""
    };
  },

  methods: {
    load() {
      // this.loading = true;
      this.page += 1
      let params = {
        pageSize:10,
        page:this.page,
        word:this.word
      }
      setTimeout(() => {
        getArticleList(params).then((res)=>{
          this.result = this.result.concat(res.data.data)
          this.loading = false;
          this.count+= res.data.data.length
        })
         .catch(err => {
          console.log(err);
        });
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