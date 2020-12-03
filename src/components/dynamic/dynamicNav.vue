<template>
  <div class="nav-card">
    <el-card class="box-card">
      <li v-for="(item,index) in navList" 
        :key="index" class="item-list" 
        :title="item" 
        @click="addNavBgc(index)"
        :class="{navbgc:activeIndex==index}"
      >
        <a href="#" class="item-link" :style="{color:activeIndex==index?'#fff':''}">{{item}}</a>
      </li>
    </el-card>
  </div>
</template>


<script>
export default {
  data() {
    return {
      activeIndex:0,
      navList : ["推荐","关注","热门","上班摸鱼","一图胜千言","今天学到了","树洞一下","每日算法","开发工具","更多话题+"]
    }
  },
  methods:{
    addNavBgc(index){
      this.activeIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
.navbgc{
  background-color: rgb(0,127,255) !important;
  border-radius: 4px;
}

  .nav-card{
    margin-top: 15px;
    height: 500px;
    width: 110px;
    .box-card{
      height: 100%;
      width: 100%;
      .item-list{
        display: inline-block;
        padding: 5px 0;
        margin: 15px 0;
        height: 20px;
        width: 100%;
        display: flex;
        justify-content: center;
        // color: #909090;
        &:hover{
          background-color: rgb(247,247,247);
        }
        
        .item-link{
          font-size: 14px;
          
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
</style>