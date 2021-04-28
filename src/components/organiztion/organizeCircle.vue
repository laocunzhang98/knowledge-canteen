<template>
  <div>
    <el-row class="el-row">
      <el-col :span="6" :xs="0">
        <organize-create></organize-create>
        <organize-nav></organize-nav>
      </el-col>
      <el-col :span="16" :xs="24">
        <div class="hot-circle">
          <div class="hot-box">
            <div class="hot-title">欢迎来到饭友圈,寻找和你志同道合的饭友吧！</div>
          </div>
          <div class="card-box" v-for="(item,index) in teamInfo" :key="index">
            <el-card>
              <div class="team-info">
                <div class="avatar">
                  <img :src="item.avatar" alt="">
                </div>
                <div class="team-des">
                  <div class="team-top">
                    <div class="team-name" @click="getTeamInfo(item.team_id)">{{item.team_name}}</div>
                    <el-button size="mini" type="primary" @click="apply(item)">申请加入</el-button>
                  </div>
                  <div class="team-summary">
                    <div class="team-user">{{item.team_name}}</div>
                    <span>创建于</span>
                    <div class="team-time"><time-diff :date="item.createdAt"></time-diff>;</div>
                    <div class="team-num">{{item.total}}人加入</div>
                  </div>
                  <div class="describe">{{item.describe}}</div>
                </div>
              </div>
            </el-card>
            
          </div>
          <div>
            <organize-introduce :teamInfoDialog="teamInfoDialog" :orgId="team_id" @dialogShow="dialogShow"></organize-introduce>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import organizeCreate from "@/components/organiztion/organizeCreate"
import organizeIntroduce from '@/components/organiztion/organizeIntroduce'
import organizeNav from "./organizeNav";
import { getTeamList } from "@/api/team"
import TimeDiff from '@/utils/TimeDiff'
export default {
  data(){
    return {
      teamInfo:[],
      teamInfoDialog:false,
      team_id:""
    }
  },
  mounted(){
    getTeamList().then(res=>{
      this.teamInfo = res.data
    })
  },
  sockets:{
    error(res){
    this.$message.warning(res)
  },
  },
  methods:{
    apply(item){
      let data = item
      data.noticeType = "申请"
      data.sponsor = this.$storage.get("uid")
      this.$socket.emit("apply",data)
    },
    // 获取团队详细信息
    getTeamInfo(id){
      this.team_id = id
      this.teamInfoDialog = true
    },
    dialogShow(value){
      this.teamInfoDialog = value
    }
  },
  components: {
    organizeNav,
    organizeCreate,
    TimeDiff,
    organizeIntroduce
  },
};
</script>

<style lang="scss" scoped>
@keyframes huerotate {
  100% {
      filter: hue-rotate(360deg);
  }
}
.hot-circle {
  margin-top: 20px;
  padding: 0 15px;
  background-color: rgba(255, 255, 255, 0.2);
  
  .hot-box{
    background-size: cover;
    background: url("../../assets/header/org.jpg") no-repeat center center;
    background-size: 100% 100%;
    .hot-title {
      padding: 20px 25px;
      border-radius: 15px;
      // background: url("../../assets/header/org.jpg") no-repeat;
      background: linear-gradient(45deg, #009688, yellowgreen, pink, #03a9f4, #9c27b0, #8bc34a);
      font-weight: bold;
      -webkit-background-clip:text;
      animation: huerotate 5s infinite;
      color: transparent;
      text-align: center;
      font-size: 24px;
    }
  }

  .card-box {
    margin-top: 20px;
    .team-info {
      display: flex;
      .avatar {
        flex: 0 0 20%;
        img {
          height: 80px;
          width: 80px;
          border-radius: 5px;
        }
      }
      .team-des {
        flex: 0 0 80%;
        .team-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .team-name{
            font-size: 16px;
            cursor: pointer;
            &:hover{
              color: blue;
            }
          }
        }
        .team-summary {
          display: flex;
          font-size: 14px;
          color: #909090;
          .team-user{
            cursor: pointer;
            &:hover{
              color: blue;
            }
          }
        }
        .describe{
          font-size: 14px;
          color: #5a5c66;
        }
      }
    }
  }
}
</style>