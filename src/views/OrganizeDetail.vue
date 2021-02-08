<template>
  <div class="organize-box">
    <div class="organize-title">
      <el-row >
        <el-col :span="6"></el-col>
        <el-col :span="12">
          <div class="team">
            <div class="team-avatar"><img src="../assets/home/tuandui.png" alt=""></div>
            <div class="team-info">
              <div class="team-name">团队名字</div>
              <div class="team-des">团队描述</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
    </div>
    <div class="organize-header">
      <el-row>
        <el-col :span="6">
        </el-col>
        <el-col :span="12">
          <el-menu :default-active="activeIndex" mode="horizontal" @select="menuSelect">
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">知识库</el-menu-item>
        <el-menu-item index="3">成员</el-menu-item>
        <el-menu-item index="4">统计</el-menu-item>
        <el-menu-item index="5">设置</el-menu-item>
      </el-menu></el-col>
      </el-row>
    </div>
    <div class="organize-content">
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="4"><organize-nav></organize-nav></el-col>
        <el-col :span="12"><yun-content></yun-content></el-col>
        <el-col :span="6"></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ArticleView from '@/components/content/components/ArticleView'
import organizeNav from '@/components/organiztion/organizeNav'
import yunContent from '@/components/yunstorage/yunContent'
export default {
  data() {
    return {
      activeIndex:"1"
    }
  },
  components:{
    organizeNav,
    ArticleView,
    yunContent
  },
  methods:{
    menuSelect(){

    }
  }
}
</script>

<style lang="scss" scoped>
  .organize-box{
    .organize-title{
      height: 100px;
      background-color: #fff;
      border-top: 1px solid rgba(0,0,0,0.2);
      .team{
        display: flex;
        margin-top: 40px;
        .team-avatar{
          img{
            height: 60px;
            width: 60px;
          }
        }
        .team-info{
          margin-left: 20px;
          .team-name{
            font-size: 20px;
          }
          .team-des{
            font-size: 14px;
            color: #909090;
            width: 200px;
            text-overflow: ellipsis;
          }
        }
        
      }
    
    }
    .organize-header{
      background-color: #fff;
    }
  }
</style>