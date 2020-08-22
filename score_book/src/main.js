import Vue from 'vue'
import Buefy from 'buefy'
import App from './App.vue'
import router from './router'
import 'buefy/dist/buefy.css'

require('../src/styles/main.scss');

Vue.use(Buefy)
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
