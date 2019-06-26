import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import Datetime from 'vue-datetime'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'
import moment from 'moment'

Vue.config.productionTip = false

Vue.use(Datetime);

/* Datetime readability filter */


Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
});

new Vue({
  router,
  store,
  components: {
    datetime: Datetime
  },
  render: h => h(App)
}).$mount('#app')


 


// axios.defaults.headers.post['header1'] = 'value' // for POST requests
