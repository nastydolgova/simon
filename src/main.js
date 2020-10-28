import Vue from 'vue'
import App from './App.vue'

import './layout/css/normalize.css'

Vue.config.devtools = true

new Vue({
  render: h => h(App)
}).$mount('#app')
