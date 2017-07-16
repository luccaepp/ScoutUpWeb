import Vue from 'vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import App from './App.vue'
import store from './store/store'
import VueFire from 'vuefire'

Vue.use(VueRouter)
Vue.use(VueFire)

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  store
})