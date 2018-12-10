// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/index.css'
import axios from 'axios'

// import ElTreeGrid from 'element-tree-grid'
// Vue.component(ElTreeGrid.name,ElTreeGrid);
// 配置axios基础地址
Vue.prototype.$http = axios

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
axios.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token')
  // console.log(config)
  return config
}, (error) => {
  // Promise 内部处理失败，就会执行这个回调函数，在此处，应该进行 错误 处理
  // Promise.reject() 直接得到一个失败的Promise对象
  return Promise.reject(error)
})

// 不要去掉，这是 ESLint 的语法，表示：不使用 no-new 规则校验下一行代码
/* eslint-disable no-new */
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,

  components: {
    App
  },
  template: '<App></App>'
})
