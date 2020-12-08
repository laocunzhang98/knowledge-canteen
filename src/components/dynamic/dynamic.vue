<template>
  <div class="dynamic">
    <div class="dynamic-swiper">
      <dynamic-input></dynamic-input>
      <dynamic-content></dynamic-content>
    </div>
  </div>
</template>


<script>
import dynamicContent from './dynamicContent'
import dynamicInput from './dynamicInput'
export default {
  components:{
    dynamicInput,
    dynamicContent
  }
}
</script>

<style lang="scss" scoped>

</style>