<template>
  <div class="box">
    <login-temp>
      <template v-slot:input>
        <div class="info-input">
          <div class="nickname">
            <el-input prefix-icon="el-icon-user-solid" v-model="nickname" placeholder="请输入名字" size="sma"></el-input>
          </div>
          <div class="email">
            <el-input prefix-icon="el-icon-message" v-model="email" placeholder="请输入邮箱"></el-input>
          </div>
          <div class="password">
            <el-input prefix-icon="el-icon-s-opportunity" v-model="password1" show-password placeholder="请输入密码" ></el-input>
          </div>
          <div class="curpassword">
            <el-input prefix-icon="el-icon-s-opportunity" v-model="password2" show-password placeholder="请确认密码" ></el-input>
          </div>
          <div class="check">
            <div class="code"><el-input v-model="code" placeholder="4位邮箱验证码" size="small"></el-input></div>
            <div class="getcode"><el-button type="primary" size="small">获取验证码</el-button></div>
          </div>
          <div class="register"><el-button type="success" @click="register()">立即注册</el-button></div>
        </div>
      </template>
      <template v-slot:foot>
        <div class="foot">
          <div class="forget" @click="jumpLogin"><a href="">直接登录</a></div>
          <div class="register"><a href="">遇到问题</a></div>
        </div>
      </template>
    </login-temp>
  </div>
</template>

<script>
import LoginTemp from "../common/components/LoginTemp"
import {Register} from "../api/register"
export default {
  data(){
    return {
      nickname:'',
      email:'',
      password1:'',
      password2:'',
      code:''
    }
  },
  components:{
    LoginTemp
  },

  methods:{
    register(){
      let data = {
        email:this.email,
        password1:this.password1,
        password2:this.password2,
        nickname:this.nickname,
        code:this.code
      }
      Register(data).then((res)=>{
        console.log(res.data)
      })
    },
    jumpLogin(){
      this.$router.push("/login")
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input--small{
  width: 180px;
  height: 36px;
}
.el-button--primary{
  width: 115px;
  height: 32px;
}
.box{
  width: 400px;
  height: 600px;
  margin: auto;
}
  .info-input{
    div{
      margin-top: 5px;
    }
     .register{
      margin-top: 20px;
    }
  }
  .check{
    display: flex;
    justify-content: center;
    align-items: center;
    // width: 300px;
    .code{
      margin-right: 5px;
    }
  }
 .foot{
    display: flex;
    justify-content: center;
    .forget{
      margin-right: 20px;
    }
  }
</style>