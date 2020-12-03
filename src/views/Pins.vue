<template>
  <el-row class="el-row">
    <el-col :span="5" class="el-col-left">
      <div class="grid-content">
        <dynamic-nav></dynamic-nav>
      </div>
    </el-col>
    <el-col :span="12" class="el-col-content">
      <dynamic></dynamic>
    </el-col>
    <el-col :span="7" class="el-col-right">
      <dynamic-aside></dynamic-aside>
    </el-col>
  </el-row>
</template>


<script>
import Dynamic from '../components/dynamic/dynamic'
import DynamicNav from "../components/dynamic/dynamicNav"
import DynamicAside from "../components/dynamic/dynamicAside"
export default {
  components:{
    Dynamic,
    DynamicNav,
    DynamicAside
  }
}
</script>


<style lang="scss">
.el-row{
  .grid-content{
    display: flex;
    justify-content: flex-end;
    min-height: 36px;
  }
}

</style>
