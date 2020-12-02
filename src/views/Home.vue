<template>
  <div class="home">
    <div class="centerall">
      <div class="center">
        <div class="labels"><labels></labels></div>
      </div>
    </div>
    <div class="contents">
      <div class="contents-swiper"><contents></contents></div>
    </div>
  </div>
</template>


<script>
import Labels from '../components/label/Label'
import Label from '../components/label/Label'
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
    .centerall{
    width: 100%;
    background-color: #fff;
    margin-top: 1px;
    .center{
      width: 50%;
      margin: auto;
      }
    }
    .contents{
      background-color: #fff;
      width: 50%;
      margin: 10px auto;
      border-radius: 5px;
    }
  }
  
</style>