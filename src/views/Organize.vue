<template>
  <div>
    <el-row>
      <el-col :span="3" :sm="3" :xs="0"></el-col>
      <el-col :span="14" :xs="24"><organize-circle></organize-circle></el-col>
      <el-col :span="5" :xs="0"></el-col>
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