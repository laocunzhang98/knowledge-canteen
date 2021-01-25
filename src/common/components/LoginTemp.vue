<template>
  <div class="login-box">
    <div class="logo"><img src="../../assets/header/xxx.jpg" alt=""></div>
    <div class="name">知 食</div>
    <div class="title">专业云端知识分享平台</div>
    <div class="login">
      <slot name="input"></slot>
    </div>
    <div class="login-btn">
      <slot name="current"></slot>
    </div>
    <div class="loginfoot">
      <slot name="foot"></slot>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.el-button {
  width: 220px;
  font-size: 16px;
}
.el-input{
  width: 300px;
}
  .login-box{
    width: 100%;
    height: 100%;
    background-color: #fff;
    margin: 100px auto;
    text-align: center;
    .logo{
      padding-top: 30px;
      img{
        height: 100px;
        width: 100px;
      }
    }
    .name{
      font-size: 36px;
    }
    .title{
      font-size: 16px;
    }
    .login{
      margin-top: 20px;
    }

    .loginfoot{
      margin-top: 30px;
    }
  }
  
</style>