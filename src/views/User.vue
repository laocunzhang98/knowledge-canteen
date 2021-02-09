<template>
  <div>
    <el-row class="el-row" :gutter="15">
      <el-col :span="5" :xs="0"></el-col>
      <el-col :span="12" :xs="24"  class="el-col-center">
        <user-data></user-data>
        <user-space></user-space>
      </el-col>
      <el-col class="el-col-right" :span="5" :xs="0">
        <about-achieve></about-achieve>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UserData from '../components/user/userData'
import UserSpace from "@/components/user/userSpace"
import aboutAchieve from '@/common/components/aboutAchieve'
export default {
  components:{
    UserData,
    UserSpace,
    aboutAchieve
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
    .el-col-right{
      margin-top: 15px;
    }
  }
</style>