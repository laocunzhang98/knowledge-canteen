<template>
  <div class="label">
    <div class="label-swiper"><div class="label-item" v-for="(labelitem,index) in labelList" :key="index"><a href="#">{{labelitem}}</a></div></div>
      
    <div class="label-manage" v-show="isShow"><a href="#" class="label-manage-item">标签管理</a></div>
  </div>
</template>


<script>
import {mixin} from '../../mixin/mixin'
export default {
  mixins:[mixin],
  data() {
    return {
      labelList:['推荐','关注','人工智能','前端','后端','Android','iOS']
    }
  },
  
  
}
</script>

<style lang="scss" scoped>
  .label{
    height: 34px;
    display: flex;
    align-items: center;
    background-color: #fff;
    .label-swiper{
      flex: 60%;
      display: flex;
      justify-content: space-between;
      overflow: auto;
      // box-sizing: border-box;
      .label-item{
        padding: 0 10px;
        flex-shrink: 0;
        flex-wrap: nowrap;
        font-size: 14px;
      }
    }
    .label-manage{
      display: flex;
      justify-content: flex-end;
      font-size: 14px;
      flex: 20%;
      .label-manage-item{
        flex-shrink: 0;
      }
    }
    
  }
</style>