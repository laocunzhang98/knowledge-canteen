<template>
  <div>
    <article-view></article-view>
  </div>
</template>

<script>
import ArticleView from '@/components/content/components/ArticleView'
export default {
  mounted(){
    this.$bus.$emit("organize",this.$route.params.id)
  },
  components:{
    ArticleView
  }
}
</script>

<style scoped lang="scss">

</style>