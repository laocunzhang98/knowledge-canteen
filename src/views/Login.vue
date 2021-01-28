<template>
  <div class="box">
    <login-temp>
      <template v-slot:input>
        <div class="email">
          <el-input prefix-icon="el-icon-user-solid" v-model="email" placeholder="请输入邮箱"></el-input>
        </div>
        <el-input prefix-icon="el-icon-s-opportunity" v-model="password" show-password placeholder="密码" ></el-input>
      </template>
      <template v-slot:current>
        <div class="login-btn"><el-button type="success" round @click="login">登 录</el-button></div>
      </template>
      <template v-slot:foot>
        <div class="foot">
          <div class="forget"><span>忘记密码</span></div>
          <div class="register" @click="jumpRegister"><span>快速注册</span></div>
        </div>
      </template>
    </login-temp>
  </div>
</template>

<script>
import {Login} from "../api/login"
import LoginTemp from "../common/components/LoginTemp"
export default {
  data(){
    return {
      email:'',
      password:''
    }
  },
  components:{
    LoginTemp
  },
  methods:{
    login(){
      let data = {
        account:this.email,
        secret:this.password,
        type:101
      }
      Login(data).then((res)=>{
        console.log(res.code)
        if(res.code===200){
          console.log(this.$route)
          console.log(res)
          localStorage.setItem('token',res.data)
          console.log(localStorage.getItem('token'))
          let path ="/home"
          if (this.$route.query.redirect) {
              path = this.$route.query.redirect   // 跳到之前的页面
              console.log(path)
          }
          this.$router.push({
              path: path
          });
        }
      }).catch((err)=>{
      })
    },
    jumpRegister(){
      this.$router.push("/register")
    }
  },
  
}
</script>

<style lang="scss" scoped>
  .box{
    width: 400px;
    height: 500px;
    margin: auto;
  }
  .email{
    margin-bottom: 10px;
  }
  .foot{
    display: flex;
    justify-content: center;
    color: gray;
    .forget{
      margin-right: 20px;
      cursor: pointer;
    }
    .register{
      cursor: pointer;
    }
  }
  .login-btn{
    margin-top: 70px;
  }
</style>