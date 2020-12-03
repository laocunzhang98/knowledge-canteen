import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugin/ElementUI'
import './common/css/initStyle.css'
import './common/css/globelStyle.scss'
import WebStorageCache from "web-storage-cache";

Vue.config.productionTip = false
Vue.prototype.$storage = new WebStorageCache()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
