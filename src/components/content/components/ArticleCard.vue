<template>
  <div class="article-card">
    <el-card class="box-card">
      <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
    </el-card>
  </div>
</template>



<style lang="scss">

  .text {
    font-size: 14px;
  }

  .item {
    padding: 5px 0;
  }

  .box-card {
    box-sizing: border-box;
    height: 150px;
    width: 100%;
  }
</style>