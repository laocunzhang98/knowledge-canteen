<template>
  <div class="person">
    <div class="person-info" @click="JumpUserInfo" v-show="showLogin"><img :src="userInfo.avatar" alt=""></div>
    <div class="login-btn" @click="jumpLogin" v-show="!showLogin"><el-button type="primary" size="small">登录</el-button></div>
    <div class="person-news"><a href="#"><span class="iconfont icon-xiaoxi"></span></a></div>
  </div>
</template>


<script>
import {getUserInfo} from "@/api/user"
export default {
  created(){
    getUserInfo().then((res)=>{
      if(res.code === 200){
        this.userInfo = res.data
      }
      console.log(res)
    }).catch()
  },
  data(){
    return {
      showLogin:false,
      userInfo:{}
    }
  },
  mounted(){
    if(localStorage.getItem('token')){
      this.showLogin = true
    }
  },
  methods:{
    JumpUserInfo(){
      this.$router.push('/user')
    },
    jumpLogin(){
      this.$router.push('/user')
    }
  }
}
</script>


<style lang="scss" scoped>
  @import '../../../assets/iconfonts/iconfont.css';
  .person{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .person-info{
      height: 50px;
      width: 50px;
      margin-right: 30px;
      img{
        position: absolute;
        border-radius: 20px;
        z-index: 0;
        height: 50px;
        width: 50px;
      }
    }
    .login-btn{
      margin-right: 30px;
    }
    .person-news{
      margin-right: 50px;
      .iconfont{
        font-size: 24px;
        color: rgb(136,119,145);
      }
    }

  }
</style>

