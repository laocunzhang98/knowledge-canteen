<template>
  <div>
    <el-row class="el-row">
      <el-col :span="6" :xs="0">
        <organize-create></organize-create>
        <organize-nav></organize-nav>
      </el-col>
      <el-col :span="16" :xs="24">
        <div class="hot-circle">
          <div class="hot-title">欢迎来到饭友圈,寻找和你志同道合的饭友吧！</div>
          <div class="card-box" v-for="(item,index) in teamInfo" :key="index">
            <el-card>
              <div class="team-info">
                <div class="avatar">
                  <img :src="item.avatar" alt="">
                </div>
                <div class="team-des">
                  <div class="team-top">
                    <div class="team-name">{{item.team_name}}</div>
                    <el-button size="mini" type="primary">申请加入</el-button>
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
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import organizeCreate from "@/components/organiztion/organizeCreate";
import organizeNav from "./organizeNav";
import { getTeamList } from "@/api/team"
import TimeDiff from '@/utils/TimeDiff'
export default {
  data(){
    return {
      teamInfo:[]
    }
  },
  mounted(){
    getTeamList().then(res=>{
      this.teamInfo = res.data
    })
  },
  methods:{

  },
  components: {
    organizeNav,
    organizeCreate,
    TimeDiff
  },
};
</script>

<style lang="scss" scoped>
.hot-circle {
  margin-top: 20px;
  padding: 0 15px;
  background-color: rgba(255, 255, 255, 0.2);
  .hot-title {
    padding: 20px 25px;
    border-radius: 15px;

    background: url("../../assets/header/org.jpg") no-repeat;
    background-size: 100% 100%;
    font-size: 24px;
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