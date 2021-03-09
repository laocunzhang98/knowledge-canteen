<template>
  <div class="home" >
    
    <div class="centerall">
      <div class="center">
        <div class="labels"><labels></labels></div>
      </div>
    </div>
    <div class="zbox"></div>
    <div class="contents">
      <div class="contents-swiper">
        <contents></contents>
      </div>
    </div>
  </div>
</template>


<script>
import Labels from '../components/label/Label'
import Contents from '../components/content/Content'
export default {
  name: 'Home',
  components: {
    Labels,
    Contents
  }
}
</script>


<style lang="scss" scoped>
  .home{
    .zbox{
      height: 34px;
    }
    .centerall{
    width: 100%;
    background-color: #fff;
    border-top: 1px solid rgba(240,243,248,1);
    position: fixed;
    z-index: 99;
    .center{
      width: 60%;
      margin: auto;
      }
    }
    .contents{
      background-color: #fff;
      width: 60%;
      margin: 10px auto;
      border-radius: 5px;
    }
  }
  
</style>