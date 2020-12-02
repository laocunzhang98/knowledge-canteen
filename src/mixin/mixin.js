import {mapGetters,mapMutations} from 'vuex'

export const mixin = {
  data() {
    return {
      clientWidth : 0,
    }
  },
  mounted() {
    this.adapt()
  },
  computed:{
    ...mapGetters(['isShow'])
  },
  methods:{
    ...mapMutations(['setShow']),
    adapt(){
      let isShow = true
      this.clientWidth = document.body.clientWidth
      if(this.clientWidth<1100){
        isShow = false
      }
      else{
        isShow = true
      }
      this.setShow(isShow)
      window.onresize = ()=>{
        this.clientWidth = document.body.clientWidth
        if(this.clientWidth<1100){
          isShow = false
        }
        else{
          isShow = true
        }
        this.setShow(isShow)
      } 
    }
  }
}
export const selectFocus = {
  
}