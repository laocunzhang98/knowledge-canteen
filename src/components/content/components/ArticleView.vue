<template>
  <div>
    <ul class="list" >
      <li v-for="(item,index) in result" class="list-item" :key="index">
        <el-card class="box-card" >
          <article-card :result="item" :favorList="favorList"></article-card>
        </el-card>
      </li>
    </ul>
    <div v-show="display" class="default">
      <img src="../../../assets/header/文章内容缺省页.png" alt="">
    </div>
    <p v-if="loading" style="text-align:center">加载中...</p>
    <p v-if="noMore&&!display" style="text-align:center">没有更多了...</p>
  </div>
</template>

<script>
import { getArticleList,getOrgArticleList,getFavorList} from "../../../api/classic";
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
    getFavorList().then(res=>{
      this.favorList = res.data
    })
  },
  mounted() {
    if(!this.$route.params.id){
      this.InitGetArticleList({public:1})
    }
    else{
      getOrgArticleList({organize_id:this.$route.params.id}).then(res=>{
        console.log(res)
        this.result = res.data.data;
        this.countSize = res.data.countSize
        if(this.countSize){
          this.display = false
        }
      })
    }
    this.$bus.$on("word",(word)=>{
      this.word = word
      this.display = true
      this.InitGetArticleList({word:this.word})
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
      word:"",
      display:true,
      favorList:[]
    };
  },

  methods: {
    InitGetArticleList(data = {}){
      getArticleList(data)
      .then((res) => {
        console.log(res)
        this.result = res.data.data;
        this.countSize = res.data.countSize
        if(this.countSize){
          this.display = false
        }
      })
    },
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
  .default{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;

  }
</style>