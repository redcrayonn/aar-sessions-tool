import Vue from 'vue'
import Router from 'vue-router'
import AarForm from './views/aarForm.vue'


Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/',
      name: 'aarForm',
      component: AarForm
    }
  ]
})
