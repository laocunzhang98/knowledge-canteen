<template>
  <div class="content">
    <div class="header-container clearfix">
      <div class="logo"><a href="#"><img src="../../assets/header/logo.png" alt=""></a></div>
      <div class="search"><search-box></search-box></div>
      <div class="person"><person-box></person-box></div>
    </div>
    <div class="box"></div>
  </div>
</template>
<script>

import SearchBox from './components/Search'
import PersonBox from './components/Person'
export default {
  components:{
    SearchBox,
    PersonBox
  },
  methods:{
    
  }
}
</script>
<style lang="scss" scoped>
.box{
  height: 50px;
  width: 100%;
}
  .header-container{
    position: fixed;
    z-index: 99;
    height: 50px;
    width: 100%;
    background-color:#fff;
    display: flex;
    align-items: center;
    
    .logo{
      flex:0 0 20%;
      
      img{
        padding-top: 6px;
        margin-left: 10px;
        height: 50px;
        color: red;
      }
    }
    .search{
      flex: 0 0 60%;
    }
    .person{
      flex: 0 0 20%;
    }
  }
</style>