<template>
  <div class="navbar">
    <div class="navbar-label" v-show="isShow">
      <div class="navbar-label-item" v-for="(labelitem,index) in labelList" :key="index"><a href="#" @click="focusLbael(index)" :style="{color:index==active?'rgb(64,158,255)':''}">{{labelitem}}</a></div>
    </div>
    <div class="navbar-labelFold" v-show="!isShow">
      <el-dropdown trigger="click">
      <span class="el-dropdown-link" style="font-size:16px">
        全民食堂<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item  v-for="(labelitem,index) in labelList" :key="index"><a href="#">{{labelitem}}</a></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
    <div class="navbar-search" >
      <el-input v-model="input" placeholder="请输入内容" size=small>
        <el-button slot="append" icon="el-icon-search" class="btn"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters(['isShow'])
  },
  methods:{
    focusLbael(index){
      this.active = index
    }
  },
  data() {
    return {
      input: '',
      active:0,
      labelList:['全民食堂','茶余饭后','私房菜','黑暗料理','饭友圈']
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
      flex: 1;
      display: flex;
      justify-content: space-around;
    }
    .navbar-labelFold{
      flex: 1;
      margin-left: 10px;
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