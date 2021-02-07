<template>
  <div class="person">
    <el-dropdown trigger="click">
    <div class="person-info"  v-show="showLogin"><img :src="userInfo.avatar" alt=""></div>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item><i class="el-icon-edit" @click="addedit"></i> 写文章</el-dropdown-item>
        <el-dropdown-item ><div @click="JumpUserInfo"><i class="el-icon-user" ></i> 个人中心</div></el-dropdown-item>
        <el-dropdown-item ><div ><i class="el-icon-s-flag"></i> 我的圈子</div></el-dropdown-item>
        <el-dropdown-item><i class="el-icon-ice-cream-round"></i> 我赞过的</el-dropdown-item>
        <el-dropdown-item><i class="el-icon-s-check"></i> 我关注的</el-dropdown-item>
        <el-dropdown-item divided ><div @click="Logout"><i class="el-icon-thumb"></i>登出</div></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
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
    addedit(){
      this.$router.push("/edit")
    },
    JumpUserInfo(){
      this.$router.push('/user')
    },
    jumpLogin(){
      this.$router.push('/user')
    },
    Logout(){
      localStorage.removeItem("token")
      this.$router.push("/login")
    }
  }
}
</script>


<style lang="scss" scoped>
  @import '../../../assets/iconfonts/iconfont.css';
  .el-popper[x-placement^=bottom] {
    margin-top: 0px;
  }
  .el-dropdown-menu{
    width: 160px;
  }
  .el-dropdown-menu__item {
    // padding: 0 50%;
    text-align: center;
  }
  .person{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .person-info{
      height: 40px;
      width: 40px;
      margin-right: 30px;
      cursor: pointer;
      img{
        position: absolute;
        border-radius: 50%;
        z-index: 0;
        height: 40px;
        width: 40px;
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

