<template>
  <div class="create-box">
    <div class="title">快快创建自己圈子,知识共享吧！</div>
    <div class="create" @click="dialogVisible=true">立即创建</div>
    <el-dialog
      title="创建团队"
      :visible.sync="dialogVisible"
      width="width"
      >
      <div>
        <div class="teamname">
          <span>团队名称</span>
          <el-input v-model="teamName"></el-input>
        </div>
      </div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="newTeam">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {createdTeam} from "@/api/team"
export default {
  data() {
    return {
      dialogVisible:false,
      teamName:""
    }
  },
  methods:{
    newTeam(){
      this.dialogVisible = false
      createdTeam({team_name:this.teamName}).then(res=>{
        console.log(res)
        this.$bus.$emit("createTeam")
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .create-box{
    margin-top: 15px;
    width: 100%;
    height: 150px;
    background-color: #fff;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    .title{
      padding: 5px 10px;
    }
    .teamname{
      display: flex;
      align-items: center;
      span{
        width: 100px;
        font-size: 16px;
      }
    }
    .create{
      margin-top: 20px;
      cursor: pointer;
      color: skyblue;
    }
  }
</style>