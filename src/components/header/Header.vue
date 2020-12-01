<template>
  <div class="header-container">
    <div class="logo"><a href="#"><img src="../../assets/header/logo.png" alt=""></a></div>
    <div class="search"><search-box></search-box></div>
    <div class="person"><person-box></person-box></div>
  </div>
</template>
<script>
import SearchBox from './components/Search'
import PersonBox from './components/Person'
export default {
  components:{
    SearchBox,
    PersonBox
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
      flex:0 0 25%;
      img{
        padding-top: 6px;
        margin-left: 10px;
      }
    }
    .search{
      flex: 0 0 50%;
    }
    .person{
      flex: 0 0 25%;
    }
  }
</style>