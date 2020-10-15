<template>
  <div class="header-container">
    <div class="logo"><a href="#"><img src="../../assets/header/logo.png" alt=""></a></div>
    <div class="search"><search-box></search-box></div>
  </div>
</template>
<script>
import SearchBox from './Search'
export default {
  components:{
    SearchBox
  }
}
</script>
<style lang="scss" scoped>
  .header-container{
    height: 50px;
    width: 100%;
    background-color:#fff;
    display: flex;
    align-items: center;
    .logo{
      flex:0 0 30%;
    }
    .search{
      flex: 0 0 40%;
    }
  }
</style>