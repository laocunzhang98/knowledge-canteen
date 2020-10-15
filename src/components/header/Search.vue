<template>
  <div>
    <el-input v-model="input" placeholder="请输入内容" size=small>
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>