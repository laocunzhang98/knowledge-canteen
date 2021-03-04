<template>
  <div class="person">
    <el-dropdown trigger="click">
      <div class="person-info" v-show="showLogin">
        <img :src="userInfo.avatar" alt />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <div @click="addedit">
            <i class="el-icon-edit"></i> 写文章
          </div>
        </el-dropdown-item>
        <el-dropdown-item>
          <div @click="JumpUserInfo">
            <i class="el-icon-user"></i> 个人中心
          </div>
        </el-dropdown-item>
        <el-dropdown-item>
          <div @click="JumpUserInfo">
            <i class="el-icon-s-flag"></i> 我的圈子
          </div>
        </el-dropdown-item>
        <el-dropdown-item>
          <div @click="JumpUserFavor">
            <i class="el-icon-ice-cream-round"></i> 我赞过的
          </div>
        </el-dropdown-item>
        <el-dropdown-item>
          <div @click="JumpUserFollow">
            <i class="el-icon-s-check"></i> 我关注的
          </div>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <div @click="Logout">
            <i class="el-icon-thumb"></i>登出
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="login-btn" @click="jumpLogin" v-show="!showLogin">
      <el-button type="primary" size="small">登录</el-button>
    </div>
      <el-dropdown trigger="click">
        <div class="person-news">
        <span class="iconfont icon-xiaoxi"></span>
        <div class="notice-num" v-show="infoNum">{{infoNum}}</div></div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="jumpNoticeInfo"><i class="el-icon-bell"></i> 我的消息<span class="notice" v-show="noticeNum">{{noticeNum}}</span></el-dropdown-item>
          <el-dropdown-item @click.native="jumpApplyInfo"><i class="el-icon-plus"></i> 申请通知<span class="notice" v-show="applyNum">{{applyNum}}</span></el-dropdown-item>
          <el-dropdown-item><i class="el-icon-warning-outline"></i> 系统通知</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    
  </div>
</template>


<script>
import { getUserInfo } from "@/api/user";
import {readNoticeInfo,readApplyInfo} from "@/api/notice"
export default {
  created() {
    getUserInfo()
      .then((res) => {
        if (res.code === 200) {
          this.userInfo = res.data;
          console.log(this.userInfo);
        }
        this.$storage.set("uid", this.userInfo.id);
        this.$socket.emit("uid", this.userInfo.id);
      })
      .catch();
  },
  data() {
    return {
      showLogin: false,
      userInfo: {},
      infoNum:0,
      noticeNum: 0,
      applyNum:0,
      ids:[],
      aids:[]
    };
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.showLogin = true;
    }
  },
  updated() {},
  sockets: {
    reply(value) {
      this.noticeNum++;
      this.infoNum++;
    },
    login(res) {
      this.noticeNum = res.noticeInfo.count
      this.applyNum = res.applyInfo.count
      this.infoNum = this.noticeNum+this.applyNum;
      if (this.noticeNum) {
        for(let item of res.noticeInfo.rows){
          this.ids.push(item.id)
        }
      }else if(this.applyNum){
        for(let item of res.applyInfo.rows){
          this.aids.push(item.id)
        }
      }

    },
    apply(res){
      this.infoNum++;
      this.applyNum++
    },
    
    disconnect() {
      console.log("断开链接");
    },
    reconnect() {
      console.log("重新链接");
    },
  },
  beforeDestroy() {
    // this.$socket.emit("disconnect")
    this.$socket.close();
  },
  methods: {
    JumpUserFavor(){
      this.$router.push("/user/favor")
    },
    JumpUserFollow(){
      this.$router.push("/user/follow")
    },
    jumpApplyInfo(){
      readApplyInfo({aids:this.aids}).then(res=>{
        if(res.code===200){
          this.infoNum -= this.applyNum
          this.applyNum = 0
        }
      })
      this.$router.push("/user/apply")
    },
    jumpNoticeInfo(){
      readNoticeInfo({ids:this.ids}).then(res=>{
        if(res.code===200){
          this.infoNum -= this.noticeNum
          this.noticeNum = 0
        }
      })
      this.$router.push("/user/notice")
    },
    addedit() {
      this.$router.push("/edit");
    },
    JumpUserInfo() {
      this.$router.push("/user");
    },
    jumpLogin() {
      this.$router.push("/user");
    },
    Logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>


<style lang="scss" scoped>
@import "../../../assets/iconfonts/iconfont.css";
.notice{
  color: #fff;
  font-size: 12px;
  background-color: red;
  border-radius: 50%;
  padding: 0 5px;
  margin-left: 5px;
}
.el-popper[x-placement^="bottom"] {
  margin-top: 0px;
}
.el-dropdown-menu {
  width: 160px;
}
.el-dropdown-menu__item {
  // padding: 0 50%;
  text-align: center;
}
.person-news .el-dropdown-menu {
  width: 80px;
  margin-left: 20px;
}
.person {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .person-info {
    height: 40px;
    width: 40px;
    margin-right: 30px;
    cursor: pointer;
    img {
      position: absolute;
      border-radius: 50%;
      z-index: 0;
      height: 40px;
      width: 40px;
    }
  }
  .login-btn {
    margin-right: 30px;
  }
  .person-news {
    margin-right: 50px;
    position: relative;
    .iconfont {
      font-size: 24px;
      cursor: pointer;
      color: rgb(136, 119, 145);
    }
    .notice-num {
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

