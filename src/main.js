import Vue from 'vue'
import App from './App'
// import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './vuex/store'
// import routes from './routes'

// Vue.use(VueRouter)
Vue.use(VueResource)

// const router = new Router({
//   scrollBehavior: () => ({
//     y: 0
//   }),
//   routes
// })
/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  template: '<App/>',
  components: { App }
})
