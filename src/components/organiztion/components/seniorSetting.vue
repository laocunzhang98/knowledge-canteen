<template>
  <div>
    <el-card>
      <div slot="header">高级选项</div>
      <div class="option">
        <el-checkbox v-model="isopen" @change="handleCheck"></el-checkbox><span> 开放</span>
        <div class="tip">开启后将在饭友圈主页显示(可以对团队进行搜素)</div>
      </div>
      <el-button size="mini" @click="modifyOpen">更新</el-button>
    </el-card>
    <el-card class="card-box">
      <div slot="header">删除团队</div>
      <div class="tip">
        注意:删除权限只有团队所有者拥有。注意删除圈子后,你将丢失团队中的所有数据！
      </div>
      <el-button type="danger" size="mini" @click="deleteTeam">删除</el-button>
    </el-card>
  </div>
</template>

<script>
import {modifyOrgOpen,getTeamInfo,dissolutionOrg} from "@/api/team"
export default {
  data() {
    return {
      isopen:false,
      open:0
    }
  },
  created(){
    getTeamInfo({ team_id: this.$route.params.id }).then((res) => {
      console.log(res.data)
      if(res.data.open){
        this.isopen = true
        this.open = 1
      }else{
        this.isopen = false
        this.open = 0
      }
    });
  },
  methods:{
    deleteTeam(){
      dissolutionOrg({organize_id:this.$route.params.id}).then(res=>{
        if(res.code==200){
          this.$router.push("/organize")
        }
      })
    },
    handleCheck(val){
      if(val){
        this.open=1
      }else{
        this.open = 0
      }
    },
    modifyOpen(){
      modifyOrgOpen({open:this.open,organize_id:this.$route.params.id}).then(res=>{
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button{
  margin-top: 20px;
}
.card-box{
  margin-top: 20px;
}
.tip{
    margin-top: 10px;
    font-size: 14px;
    color: #595959;
  }
.option{
  .tip{
    margin-left: 20px;
    margin-top: 10px;
    font-size: 14px;
    color: #595959;
  }
}
</style>