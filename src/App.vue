<template>
  <div id="app">
    <headers></headers>
    <router-view/>
  </div>
</template>
<script>
import Headers from './components/header/Header'
export default {
  components:{
    Headers
  }
}
</script>
<style lang="scss">
  html,
  body,
  #app {
    width: 100%;
    height: 100%;
    background-color: #f0f3f8;
}

</style>
