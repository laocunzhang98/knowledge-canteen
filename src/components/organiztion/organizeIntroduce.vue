<template>
  <div>
    <el-dialog
      title="团队详细信息"
      :visible.sync="dialogVisible"
      width="width"
      >
      <div class="team-info">
        <div class="avatar"><img :src="team_info.avatar" alt=""></div>
        <div class="creator">创建人:{{team_info.nickname}}</div>
        <div class="teamid">团队id:{{team_info.team_id}}</div>
        <div class="name">团队名称:{{team_info.team_name}}</div>
        <div class="type">团队类型:{{team_info.type}}</div>
        <div class="introduce">团队介绍:{{team_info.describe}}</div>
        <div class="number">团队目前人数{{team_info.total}}</div>
        <div class="date">创建日期:{{team_info.createdAt}}</div>
        <div class="active">团队活跃度:<el-rate v-model="rate" :disabled="true"></el-rate></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getTeamIntroduce} from "@/api/team"
export default {
  data(){
    return {
      dialogVisible:false,
      team_info:{},
      rate:4
    }
  },
  props:{
    teamInfoDialog:{
      type:Boolean
    },
    orgId:{
      type:String
    }
  },
  watch:{
    teamInfoDialog(){
      this.dialogVisible = this.teamInfoDialog
      
      // getTeamIntroduce()
    },
    orgId(){
      getTeamIntroduce({organize_id:this.orgId}).then(res=>{
        this.team_info = res.data
      })
    },
    dialogVisible(){
      this.$emit("dialogShow",this.dialogVisible)
    }
  },
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog__footer{
  text-align: center;
}
.team-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // div{
  //   width: 300px;
  //   display: flex;
  //   justify-content: space-between;
  //   margin-top: 5px;
  // }
  .avatar{
    img{
      height: 80px;
      width: 80px;
      border-radius: 10px;
    }
  }
  .active{
    display: flex;
  }
}
</style>