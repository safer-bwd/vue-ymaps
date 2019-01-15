import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueYMaps from '../../src'
Vue.use(VueYMaps)

// eslint-disable-next-line
console.log(VueYMaps)
VueYMaps.ready().then((ym) => {
  // eslint-disable-next-line
  console.log('vue-ymaps ready!')
  // eslint-disable-next-line
  console.log(ym)
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
