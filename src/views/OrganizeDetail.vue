<template>
  <div class="organize-box">
    <div class="organize-title">
      <el-row>
        <el-col :span="6"></el-col>
        <el-col :span="12">
          <div class="team">
            <div class="team-avatar">
              <img src="../assets/home/tuandui.png" alt />
            </div>
            <div class="team-info">
              <div class="team-name">{{orgInfo.team_name}}</div>
              <div class="team-des">{{orgInfo.describe}}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
    </div>
    <div class="organize-header">
      <el-row>
        <el-col :span="6"></el-col>
        <el-col :span="12">
          <el-menu :default-active="activeIndex" mode="horizontal" @select="menuSelect">
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="2">知识库</el-menu-item>
            <el-menu-item index="3">成员</el-menu-item>
            <el-menu-item index="4">统计</el-menu-item>
            <el-menu-item index="5">设置</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="organize-content">
      <el-row>
        <el-col :span="2">
          <div></div>
        </el-col>
        <el-col :span="4">
          <organize-nav></organize-nav>
        </el-col>
        <el-col :span="13">
          <div>
            <router-view :key="key"></router-view>
          </div>
        </el-col>
        <el-col :span="5"></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ArticleView from "@/components/content/components/ArticleView";
import organizeNav from "@/components/organiztion/organizeNav";
import yunContent from "@/components/yunstorage/yunContent";
import {getTeamInfo} from "@/api/team"
export default {
  data() {
    return {
      activeIndex:"1",
      orgInfo:{}
    }
  },
  created(){
    getTeamInfo({team_id:this.$route.params.id}).then(res=>{
      this.orgInfo = res.data
    })
  },
  computed:{
    key() {
      return this.$route.path;
    },
  },
  components: {
    organizeNav,
    ArticleView,
    yunContent,
  },
  mounted(){
    
    let path = this.$route.path.split("/").splice(3,1)
    console.log(path)
    if(path=="home"){
      this.activeIndex = "1"
    }
    if(path=="yun"){
      this.activeIndex = "2"
    }
    if(path=="setting"){
      this.activeIndex = "5"
    }
  },
  methods: {
    menuSelect(val) {
      switch (val) {
        case "1":
          this.$router.push(`/organize/${this.$route.params.id}/home`)
          break;
        case "2":
          this.$router.push(`/organize/${this.$route.params.id}/yun`)
          break;
        case "5":
          this.$router.push(`/organize/${this.$route.params.id}/setting`)
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.organize-box {
  .organize-title {
    height: 100px;
    background-color: #fff;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    .team {
      display: flex;
      margin-top: 40px;
      .team-avatar {
        img {
          height: 60px;
          width: 60px;
        }
      }
      .team-info {
        margin-left: 20px;
        .team-name {
          font-size: 20px;
        }
        .team-des {
          font-size: 14px;
          color: #909090;
          width: 200px;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .organize-header {
    background-color: #fff;
  }
}
</style>