<template>
  <div class="home">
    <headers></headers>
    <div class="centerall">
      <div class="center">
        <labels></labels>
      </div>
    </div>
  </div>
</template>

<script>
import Headers from '../components/header/Header'
import Labels from '../components/label/Label'
import Label from '../components/label/Label.vue'
export default {
  name: 'Home',
  components: {
    Headers,
    Labels
  }
}
</script>
<style lang="scss" scoped>
  .centerall{
    width: 100%;
    background-color: #fff;
    margin-top: 1px;
  }
  .center{
    width: 50%;
    margin: auto;
  }
</style>