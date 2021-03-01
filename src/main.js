import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugin/ElementUI'
import './common/css/globelStyle.scss'
import 'element-ui/lib/theme-chalk/display.css';
import './common/css/initStyle.css'
import WebStorageCache from "web-storage-cache";
import "./common/css/font.css"
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css' // 样式文件

Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

import VueSocketio from 'vue-socket.io'
import ClientSocketIO  from "socket.io-client"
const socketOptions = {
  autoConnect: false,       // 自动连接     这里为我项目需求  需要在指定情况下才连接socket
}

Vue.use(new VueSocketio({
  debug:true,
  connection:ClientSocketIO.connect(`${process.env.VUE_APP_BASE_API}`,{
    transports: ['websocket'],
  }),
  options:{
    autoConnect:false
  }
})) // 第二个参数为服务端地址

Vue.prototype.$bus = new Vue()
// use
Vue.use(mavonEditor)

Vue.config.productionTip = false
Vue.prototype.$storage = new WebStorageCache()

const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vue

