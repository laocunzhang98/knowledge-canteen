import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShow:true
  },
  getters,
  mutations
})
