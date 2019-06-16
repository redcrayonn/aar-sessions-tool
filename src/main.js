import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjU3NzE0OTFlOWI4OWI1MTMiLCJpYXQiOjE1NjAwNzczODcsIm5iZiI6MTU2MDA3NzM4NywiaXNzIjoiaHR0cHM6Ly93d3cuYmF0dGxlbWV0cmljcy5jb20iLCJzdWIiOiJ1cm46dXNlcjo4MDQ3NyJ9.M-aJpkUKYda-7WCh6SPzlFy1mPYnvvcuGC5QhIszZQY'; // for all requests


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// axios.defaults.headers.post['header1'] = 'value' // for POST requests
