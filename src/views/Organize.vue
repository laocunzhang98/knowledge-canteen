<template>
  <div>
    <el-row>
      <el-col :span="3"></el-col>
      <el-col :span="14"><organize-circle></organize-circle></el-col>
      <el-col :span="5"></el-col>
    </el-row>
  </div>
</template>


<script>
import OrganizeCircle from '../components/organiztion/organizeCircle'
export default {
  components:{
    OrganizeCircle
  }
}
</script>

<style lang="scss">
  
</style>