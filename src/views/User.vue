<template>
  <div>
    <el-row class="el-row" :gutter="15">
      <el-col :span="5"></el-col>
      <el-col :span="14" class="el-col-center">
        <el-col :span="17" class="el-col-data">
          <user-data></user-data>
        </el-col>
        <el-col :span="6">
          <user-active></user-active>
        </el-col>
      </el-col>
      <el-col class="el-col-right" :span="5"></el-col>
    </el-row>
  </div>
</template>

<script>
import UserData from '../components/user/userData'
import UserActive from "../components/user/userAcitve"
export default {
  components:{
    UserData,
    UserActive
  }
  
}
</script>

<style lang="scss">
  .el-row{
    display: flex;
    .el-col-center{
      margin-top: 15px;
    }
    .el-col-left{
      min-height: 36px;
    }
  }
</style>