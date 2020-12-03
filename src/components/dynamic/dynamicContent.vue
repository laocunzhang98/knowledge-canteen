<template>
  <div class="dynamic-content">
    <div class="content-list" v-for="(item,index) in 10" :key="index">
      <el-card class="box-card">
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
  .dynamic-content{
    margin: 0 15px;
    .box-card{
      height: 150px;
    }
  }
</style>