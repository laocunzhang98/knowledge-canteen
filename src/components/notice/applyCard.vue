<template>
  <div class="info-box">
    <div class="info">
      <span class="nickname">{{info.applicant | getNickname}} </span>
      <span class="type">{{info.type}}</span>
      <span>加入圈子 </span>
      <span class="team-name">{{info.team_name | getTeamName}}</span>
    </div>
    <div class="comit" v-show="!info.notice_info">
      <el-button type="success" round size="mini" @click="agreeApply(info.sponsor,info.target_id,info.team_name.team_name)">同意</el-button>
      <el-button type="danger" round size="mini" @click="refuse(info.sponsor,info.target_id,info.team_name.team_name)">拒绝</el-button>
    </div>
    <div class="acceptance" v-show="info.notice_info">
      <el-button size="small">已{{info.notice_info}}</el-button>
    </div>
  </div>
</template>

<script>
import {refuseApply} from "@/api/notice"
import {JoinTeam} from "@/api/team"
export default {
  mounted(){
    console.log(this.info)
  },
  props:{
    info:{
      type:Object
    }
  },
  filters:{
    getNickname(val){
      console.log(val)
      if(!val){
        return "该用户已注销"
      }
      return val.nickname
    },
    getTeamName(val){
      console.log(val)
      if(!val){
        return "该圈子已注销"
      }
      return val.team_name
    }
  },
  methods:{
    agreeApply(sponsor,target_id,team_name){
      JoinTeam({sponsor,target_id}).then(res=>{
        this.info.notice_info = "同意"
        // this.$socket.emit("sysapply",{sponsor,target_id,team_name})
      })
    },
    refuse(sponsor,target_id,team_name){
      refuseApply({sponsor,target_id}).then(res=>{
        this.info.notice_info = "拒绝"
        // this.$socket.emit("sysapply",{sponsor,target_id,team_name})
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.info-box{
  display: flex;
  height: 60px;
  padding: 20px 10px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  align-items: center;
  justify-content: space-between;
  .info{
    .nickname,.team-name{
      cursor: pointer;
      &:hover{
        color: blue;
      }
    }
  }
  .comit{

  }
}
</style>