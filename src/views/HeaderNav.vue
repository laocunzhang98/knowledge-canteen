<template>
  <div>
    <headers></headers>
    <router-view :key="key"></router-view>
  </div>
</template>

<script>
import Headers from '../components/header/Header'
export default {
  components:{
    Headers
  },
  computed:{
    key(){
      return this.$route.path
    }
  }
}
</script>

<style>

</style>