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
               <el-menu-item v-for="(item,index) in OwnOrgList" :key="index" @click="jumpTeam(item.team_id)">{{item.team_name}}</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span>加入的饭圈</span>
            </template>
              <el-menu-item v-for="(item,index) in OtherOrgList" :key="index" @click="jumpTeam(item.team_id)">{{item.team_name}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getOtherOrg,getOwnOrg} from "@/api/team"
export default {
  data() {
      return {
        OwnOrgList:[],
        OtherOrgList:[]
      }
    },
  methods: {
    jumpTeam(id){
      this.$router.push(`/organize/${id}/home`)
    }
  },
  created(){
    getOtherOrg().then(res=>{
      if(res.code===200){
        console.log(res)
        this.OtherOrgList = res.data
      }
    })
    getOwnOrg().then(res=>{
      console.log(res)
      if(res.code===200){
        this.OwnOrgList = res.data
      }
    })
  }
};
</script>>

<style lang="scss" scoped>

  .el-menu{
    background-color: rgba(0,0,0,0)!important;
    margin-top: 15px;
    /deep/.el-menu-item{
      padding-left: 30px!important;
      min-width: 100px!important;
    }
  }
</style>