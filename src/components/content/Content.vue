<template>
  <div class="content">
    <el-tabs v-model="activeName" class="tabs">
      <el-tab-pane label="热门" name="first">
        <article-view ref="view"></article-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// import {debounce,throttle} from "@/utils/util"
// import { mapGetters, mapMutations } from "vuex";
import ArticleView from './components/ArticleView'
  export default {
    mounted(){
      // document.addEventListener("scroll",throttle(this.getScrollActive,100))
      
    },
    computed:{
      // ...mapGetters(["headerShow"])
    },
    components:{
      ArticleView
    },
    data() {
      return {
        activeName: 'first',
        clientY:0
      };
    },
    methods: {
      
      // ...mapMutations(["setHeaderShow"]),
      // getScrollActive(e){
      //   let scrollTop= document.body.scrollTop || document.documentElement.scrollTop
      //   if(scrollTop>300){
      //     this.setHeaderShow(false)
      //   }
      //   // if(scrollTop < 300 ){
      //   //   this.setHeaderShow(true)
      //   // }
      //   this.clientY =scrollTop
      //   console.log(this.clientY)
      // }
    }
  };
</script>

<style lang="scss" scoped>
  ::v-deep .el-tabs__header{
    margin: 0 !important;
  }
  ::v-deep .el-tabs__active-bar{
    left: -20px;
  }
  ::v-deep .is-active,.is-top,.el-tabs__item{
    padding: 0 20px !important;
  }
</style>