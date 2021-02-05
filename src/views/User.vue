<template>
  <div>
    <el-row class="el-row" :gutter="15">
      <el-col :span="5" :xs="0"></el-col>
      <el-col :span="12" :xs="24"  class="el-col-center">
        <user-data></user-data>
        <user-space></user-space>
      </el-col>
      <el-col class="el-col-right" :span="5" :xs="0">
        <user-active></user-active>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UserData from '../components/user/userData'
import UserActive from "../components/user/userAcitve"
import UserSpace from "@/components/user/userSpace"
export default {
  components:{
    UserData,
    UserActive,
    UserSpace
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