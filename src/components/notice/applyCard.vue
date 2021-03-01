<template>
  <div class="info-box">
    <div class="info">
      <span class="nickname">{{info.applicant.nickname}} </span>
      <span class="type">{{info.type}}</span>
      <span>加入圈子 </span>
      <span class="team-name">{{info.team_name.team_name}}</span>
    </div>
    <div class="comit" v-show="!info.notice_info">
      <el-button type="success" round size="mini" @click="agreeApply(info.sponsor,info.target_id,)">同意</el-button>
      <el-button type="danger" round size="mini" @click="refuse(info.sponsor,info.target_id)">拒绝</el-button>
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
  methods:{
    agreeApply(sponsor,target_id){
      JoinTeam({sponsor,target_id}).then(res=>{
        this.info.notice_info = "同意"
      })
    },
    refuse(sponsor,target_id){
      refuseApply({sponsor,target_id}).then(res=>{
        this.info.notice_info = "拒绝"
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