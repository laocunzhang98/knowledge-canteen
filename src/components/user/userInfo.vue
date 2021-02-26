<template>
  <div class="person-info">
    <el-card>
      <el-row class="info-swiper">
        <el-col class="img-box" :span="6"><img :src="avatar" alt=""></el-col>
        <el-col class="info-box" :span="12">
          <div class="info-detail">
            <span class="nickname"> {{nickname}}</span>
            <span class="job"><i class="el-icon-ice-cream-round"></i> {{job}}</span>
            <span class="description"><i class="el-icon-s-opportunity"></i> {{describe}}</span>
          </div>
        </el-col>
        <el-col class="active-box" :span="6">
            <el-button @click="editPerson" v-show="isEdit">编辑个人资料</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {getUserInfo} from "@/api/user"

export default {
  created(){
    let params = {}
    if(this.$route.params.userid){
      params.id = this.$route.params.userid
      this.isEdit = false
    }
    getUserInfo(params).then(res=>{
      if(res.code==200){
        this.avatar = res.data.avatar
        this.job = res.data.job
        this.describe = res.data.describe
        this.nickname = res.data.nickname
      }
    })
  },

  mounted(){
    
  },
  data() {
    return {
      avatar:"",
      job:"",
      describe:"",
      nickname:"",
      isEdit:true
    }
  },
  methods:{
    editPerson(){
      this.$router.push("/peredit")
    }
  }
}
</script>

<style lang="scss" scoped>
  .person-info{
    .info-swiper{
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 10px;
      box-sizing: border-box;
      .img-box{
        height: 80px;
        width: 80px;
        border-radius: 40px;
        background-color: red;
        img{
          height: 80px;
          width: 80px;
          border-radius: 40px;
        }
      }
      .info-box{
        .info-detail{
          display: flex;
          flex-direction: column;
          .nickname{
            font-weight: 600;
            font-size: 24px;
          }
          .job{
            font-size: 14px;
            color: rgb(136,119,145);
          }
          .description{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            font-size: 14px;
            color: rgb(136,119,145);
          }
        }
      }
    }
    
  }
</style>