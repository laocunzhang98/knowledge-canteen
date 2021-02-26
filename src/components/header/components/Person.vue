<template>
  <div class="person">
    <el-dropdown trigger="click">
    <div class="person-info"  v-show="showLogin"><img :src="userInfo.avatar" alt=""></div>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item><div @click="addedit"> <i class="el-icon-edit"></i> 写文章</div></el-dropdown-item>
        <el-dropdown-item ><div @click="JumpUserInfo"><i class="el-icon-user" ></i> 个人中心</div></el-dropdown-item>
        <el-dropdown-item ><div ><i class="el-icon-s-flag"></i> 我的圈子</div></el-dropdown-item>
        <el-dropdown-item><div><i class="el-icon-ice-cream-round"></i> 我赞过的</div></el-dropdown-item>
        <el-dropdown-item><div><i class="el-icon-s-check"></i> 我关注的</div></el-dropdown-item>
        <el-dropdown-item divided ><div @click="Logout"><i class="el-icon-thumb"></i>登出</div></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="login-btn" @click="jumpLogin" v-show="!showLogin"><el-button type="primary" size="small">登录</el-button></div>
    <div class="person-news"><span class="iconfont icon-xiaoxi"></span><div class="notice-num" v-show="isNotice">{{noticeNum}}</div></div>
  </div>
</template>


<script>
import {getUserInfo} from "@/api/user"
export default {
  created(){
    getUserInfo().then((res)=>{
      if(res.code === 200){
        this.userInfo = res.data
        console.log(this.userInfo)
      }
      this.$storage.set("uid",this.userInfo.id)
      this.$socket.emit("uid", this.userInfo.id)
    }).catch()
  },
  data(){
    return {
      showLogin:false,
      userInfo:{},
      isNotice:false,
      noticeNum:0
    }
  },
  mounted(){
    if(localStorage.getItem('token')){
      this.showLogin = true
    }
  },
  updated(){
  },
  sockets:{
     reply(value) {
      this.isNotice = true
      this.noticeNum++
      console.log(value);
    },
    login(res){
      console.log(res)
      if(res.count){
        this.isNotice = true
        this.noticeNum = res.count
      }
      this.isNotice = false
    },
    disconnect() {
      console.log('断开链接')
    },
    reconnect() {
      console.log('重新链接')
    },
  },
  beforeDestroy(){
    // this.$socket.emit("disconnect")
    tshi.$socket.close()
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
      position: relative;
      .iconfont{
        font-size: 24px;
        cursor: pointer;
        color: rgb(136,119,145);
      }
      .notice-num{
        color: #fff;
        font-size: 12px;
        background-color: red;
        position: absolute;
        border-radius: 50%;
        padding: 0 5px;
        top: 0;
        left: 20px;
      }
    }

  }
</style>

