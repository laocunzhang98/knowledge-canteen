import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Pins from '../views/Pins.vue'
import User from '../views/User.vue'
import Organize from "../views/Organize.vue"
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/pins',
    name:'Pins',
    component:Pins
  },
  {
    path:'/user',
    name:'User',
    component:User
  },
  {
    path:'/organize',
    name:'Organize',
    component:Organize
  },
  {
    path:'/follow',
    name:'Follow'
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
