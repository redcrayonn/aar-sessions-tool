import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dummy from './views/Dummy.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dummy',
      name: 'dummy',
      component: Dummy
    }
  ]
})
