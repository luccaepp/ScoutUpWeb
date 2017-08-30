import Vue from 'vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import App from './App.vue'
import store from './store/store'
import VueFire from 'vuefire'
//EventCalendar
import vueEventCalendar from 'vue-event-calendar'


Vue.use(vueEventCalendar, {locale: 'pt-br', color: 'rgba(86,64,46, .8)'})
Vue.use(VueRouter)
Vue.use(VueFire)

const router = new VueRouter({
  routes: Routes,
  mode: 'hash'
})

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  store
})
