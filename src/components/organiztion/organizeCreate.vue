<template>
  <div class="create-box">
    <div class="title">快快找到自己圈子,知识共享吧！</div>
    <div style="margin-top:20px">
      <span class="create" @click="dialogVisible=true">立即创建</span>
      <span class="create" @click="SearchTeam">条件查找</span>
    </div>
    <el-dialog
      title="创建团队"
      :visible.sync="dialogVisible"
      width="width"
      >
      <div class="team">
        <div class="teamname">
          <span>团队名称</span>
          <el-input v-model="teamName"></el-input>
        </div>
        <div class="teamtype">
          <span>团队类型</span>
          <el-select v-model="classify" placeholder="请选择类型" @change="SelectType">
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="private">
          <span>创建私有团队</span>
          <el-checkbox v-model="checkbox" @change="CheckPrivate"></el-checkbox>
        </div>
      </div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="newTeam">确 定</el-button>
      </div>
    </el-dialog>
    <organize-search :teamSearchDialog="teamSearchDialog" @searchDialog="searchDialog"></organize-search>
  </div>
</template>

<script>
import {createdTeam} from "@/api/team"
import {getCategoryList} from "@/api/classic"
import organizeSearch from '@/components/organiztion/organizeSearch'
export default {
  data() {
    return {
      dialogVisible:false,
      teamName:"",
      checkbox:false,
      isopen:1, //是否公开
      options:[],// 圈子类型
      classify:'',// 分类
      teamSearchDialog:false
    }
  },
  mounted() {
    getCategoryList().then(res=>{
      this.options = res.data
    })
  },
  components:{
    organizeSearch
  },
  methods:{
    searchDialog(value){
      this.teamSearchDialog = value
    },
    SearchTeam(){
      this.teamSearchDialog= true
    },
    SelectType(val){
      this.classify = val
    },
    CheckPrivate(val){
      if(!val){
        this.isopen = 1
      }else{
        this.isopen = 0
      }
      console.log(this.isopen)
    },
    newTeam(){
      this.dialogVisible = false
      if(!this.teamName){
        this.$message.warning("团队名不能为空")
        return 
      }
      if(!this.classify){
        this.$message.warning("类别不能为空")
        return 
      }
      console.log(this.isopen)
      createdTeam({team_name:this.teamName,isopen:this.isopen,type:this.classify}).then(res=>{
        console.log(res)
        this.$bus.$emit("createTeam")
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner{
  width: 200px;
}
  .create-box{
    margin-top: 15px;
    width: 100%;
    height: 150px;
    background-color: #fff;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    .title{
      padding: 5px 10px;
    }
    .team{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      .teamname,.teamtype{
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        span{
          flex: 0 0 80px;
        }
      }
      .private{
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    }
    
    .create{
      padding: 0 20px;
      cursor: pointer;
      font-weight: bold;
      background: linear-gradient(45deg, #009688, yellowgreen, pink, #03a9f4, #9c27b0, #8bc34a);
      -webkit-background-clip:text;
      color: transparent;
      animation: huerotate 5s infinite;
    }
  }
@keyframes huerotate {
  100% {
      filter: hue-rotate(360deg);
  }
}
</style>