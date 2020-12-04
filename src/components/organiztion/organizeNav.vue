<template>
  <div class="organize-nav">
    <el-row>
      <el-col>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
        >
          <el-submenu index="1">
            <template slot="title">
              <span>创建的饭圈</span>
            </template>
              <el-menu-item >选项1</el-menu-item>
              <el-menu-item >选项2</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span>加入的饭圈</span>
            </template>
              <el-menu-item v-for="(item,index) in circleList" :key="index">{{item}}</el-menu-item>
              
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
      return {
        circleList:['美妆达人',"篮球小子","华航二手圈"]
      }
    },
  methods: {
    
  },
};
</script>>

<style lang="scss">
  .el-menu{
    background-color: #f0f3f8!important;
    margin-top: 15px;
  }
</style>