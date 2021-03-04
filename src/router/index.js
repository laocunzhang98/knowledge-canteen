import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Pins from '../views/Pins.vue'
import User from '../views/User.vue'
import Organize from "../views/Organize.vue"
import Yun from "../views/Yun.vue"
import Login from "../views/Login.vue"
import ArticleEdit from "../views/ArticleEdit"
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path:'',
    component:()=>import("../views/HeaderNav.vue"),
    children:[
      {
        path:'/',
        redirect:"/home"
      },
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta:{
          title:"知识大食堂"
        }
      },
      {
        path:'/pins',
        name:'Pins',
        component:Pins,
        meta:{
          title:"知识大食堂-茶余饭后"
        }
      },
      {
        path:'/user',
        name:'User',
        component:User,
        redirect:"/user/article",
        children:[{
          path:"notice",
          component:()=>import("../views/NoticeView.vue")
        },
        {
          path:"article",
          component:()=>import("@/components/user/components/userArticle")
        },
        {
          path:"apply",
          component:()=>import("@/views/applyView")
        },
        {
          path:"favor",
          component:()=>import("@/components/user/components/userFavor")
        },
        {
          path:"follow",
          component:()=>import("@/components/user/components/userFollow")
        }
      ]
      },
      {
        path:'/organize',
        name:'Organize',
        component:Organize
      },
      {
        path:'/follow',
        name:'Follow'
      },
      {
        path:'/yunstorage',
        component:Yun,
        name:"Yunstorage"
      },
      {
        path:"/post/:id",
        component:()=>import("../views/ArticleDetail.vue"),
        name:"Article"
      },
      {
        path:"/organize/:id",
        component:()=>import("../views/OrganizeDetail.vue"),
        children:[{
          path:"home",
          component:()=>import("../components/organiztion/organizeHome.vue"),
          name:"orghome"
        },{
          path:"yun",
          component:()=>import("../components/organiztion/organizeYun.vue"),
          name:"orgyun"
        },{
          path:"setting",
          component:()=>import("../components/organiztion/organizeSetting.vue"),
          name:"orgsetting",
          redirect:"/organize/:id/setting/basic",
          children:[{
            path:"basic",
            component:()=>import("../components/organiztion/components/orgSetting.vue")
          },
          {
            path:"advanced",
            component:()=>import("../components/organiztion/components/seniorSetting.vue")
          },
          {
            path:"cost",
            component:()=>import("../components/organiztion/components/costCenter.vue")
          },
         
        ]
        },
        {
          path:"members",
          component:()=>import("../components/organiztion/organizeMember.vue")
        }
      ]
      },
      {
        path:"/peredit",
        component:()=>import("../components/user/userEdit.vue"),
        name:"peredit"
      },
      {
        path:"/published",
        component:()=>import("../views/published.vue"),
        name:"published"
      },
      {
        path:"/users/:userid",
        component:()=>import("../views/User.vue"),
        children:[
          {
            path:"article",
            component:()=>import("@/components/user/components/userArticle")
          },
          {
            path:"favor",
            component:()=>import("@/components/user/components/userFavor")
          },
          {
            path:"follow",
            component:()=>import("@/components/user/components/userFollow")
          }
        ]
      }
    ]
  },
  {
    path:'/login',
    component:Login,
    name:"Login",
  },
  {
    path:'/edit',
    component:ArticleEdit,
    name:'Edit'
  },{
    path:'/register',
    component:()=>import("../views/Register.vue"),
    name:'Register',
    meta:{
      title:"知食-注册"
    }
  },
  {
    path:"/404",
    name:"NotFound",
    component:()=>import("../views/404.vue")
  },
  {
    path:"*",
    redirect:"/404"
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title = to.meta.title
  }
  if(!localStorage.getItem('token')){
    if(to.path !=='/login' && to.path !=='/register'){
      next(
        {
          path:'/login',
          query:{
            redirect:to.path
          }
        }
      )
    }
    else{
      next();
    }
  }
  else{
    if(to.path === "/login"){
      next({path:"/home"})
    }else{
      next()
    }
  }
})

export default router
