import Vue from 'vue'
import Router from 'vue-router'
// 登录
import Login from '@/components/login/Login'
// 页面未找到
import Params from '@/components/params/Params'
// import Home from '@/components/home/Home'
// import Rights from '@/components/rights/Rights'
import Users from '@/components/users/User'
// 修改为 按需加载 的方式，导入组件
const Home = () => import('@/components/home/Home')
// const Users = () => import('@/components/users/Users')
const Roles = () => import('@/components/roles/Roles')
const Rights = () => import('@/components/rights/Rights')
const Categories = () => import('@/components/categories/Categories')
const Goods = () => import('@/components/goods/Goods')
const goodsAdd = () => import('@/components/goods-add/goodsAdd')
// import Roles from '@/components/roles/Roles'
// import Goods from '@/components/goods/Goods'
// import Categories from '@/components/categories/Categories'
// import goodsAdd from '@/components/goods-add/goodsAdd'

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
          path: '/categories',
          component: Categories
        },
        {
          path: '/goods-add',
          component: goodsAdd
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
    },
    {
      path: '*',
      component: Params
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
