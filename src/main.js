import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugin/ElementUI'
import './common/css/globelStyle.scss'
import 'element-ui/lib/theme-chalk/display.css';
import './common/css/initStyle.css'
import WebStorageCache from "web-storage-cache";

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { Message } from 'element-ui'
// 挂载到$message上
Vue.prototype.$message = Message
// use
Vue.use(mavonEditor)
// import Darkmode from 'darkmode-js';
// const darkmode = new Darkmode();
// darkmode.showWidget();

Vue.config.productionTip = false
Vue.prototype.$storage = new WebStorageCache()

const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vue

