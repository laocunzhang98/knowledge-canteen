<template>
  <div class="person">
    <div class="person-info"><img src="" alt=""></div>
    <div class="person-news"><a href="#"><span class="iconfont icon-xiaoxi"></span></a></div>
  </div>
</template>


<script>
export default {

}
</script>


<style lang="scss" scoped>
  @import '../../../assets/iconfonts/iconfont.css';
  .person{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .person-info{
      height: 40px;
      width: 40px;
      background-color: red;
      border-radius: 20px;
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

