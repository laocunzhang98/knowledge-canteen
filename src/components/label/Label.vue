<template>
    <div class="label">
      <div class="label-swiper">
        <div class="label-item" v-for="(labelitem,index) in labelList" :key="index" >
          <a href="#" 
            @click="focusLbael(index)" 
            :style="{color:index==active?'rgb(64,158,255)':''}"
            >
            {{labelitem}}
          </a>
        </div>
      </div>
    <div class="label-manage" v-show="isShow"><a href="#" class="label-manage-item">标签管理</a></div>
  </div>
</template>


<script>
import {mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters(['isShow'])
  },
  data() {
    return {
      active:0,
      labelList:['推荐','关注','人工智能','前端','后端','Android','iOS']
    }
  },
  methods:{
    focusLbael(index){
      this.active = index
    }
  }
  
  
}
</script>

<style lang="scss" scoped>
//占位

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