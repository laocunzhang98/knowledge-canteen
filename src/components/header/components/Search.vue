<template>
  <div class="navbar">
    <div class="navbar-label">
      <div class="navbar-label-item" v-for="(labelitem,index) in labelList" :key="index"><a href="#">{{labelitem}}</a></div>
    </div>
    <div class="navbar-search">
      <el-input v-model="input" placeholder="请输入内容" size=small>
        <el-button slot="append" icon="el-icon-search" class="btn"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      labelList:['全民食堂','茶余饭后','私房菜','黑暗料理','活动']
    }
  }
}
</script>

<style lang="scss" scoped>
  .navbar{
    display: flex;
    align-items: center;
    justify-content: space-around;
    .navbar-label{
      margin-right: 100px;
      flex: 0 0 60%;
      display: flex;
      justify-content: space-around;
    }
    .navbar-search{
      flex: 0 0 40%;
      .btn:hover{
        font-weight: 700;
        color: #000;
      }
    }
  }
  
</style>