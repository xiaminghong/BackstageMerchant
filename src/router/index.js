import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home/Home'
import Login from '@/components/login/Login'
import Users from '@/components/users/User'
import Roles from '@/components/roles/Roles'
import Rights from '@/components/rights/Rights'
import Goods from '@/components/goods/Goods'
import Params from '@/components/params/Params'
import Categories from '@/components/categories/Categories'

// 安装路由插件
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      component: Home,
      // 子路由
      children: [
        {
          path: '/users',
          component: Users
        },
        {
          path: '/roles',
          component: Roles
        },
        {
          path: '/rights',
          component: Rights
        },
        {
          path: '/goods',
          component: Goods
        },
        {
          path: '/params',
          component: Params
        },
        {
          path: '/categories',
          component: Categories
        }
      ]
    },
    // 登录页
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    }

  ]
})

export default router

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/login')
  }
})
