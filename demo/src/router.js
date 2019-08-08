import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Map from './pages/Map.vue'
import Placemark from './pages/Placemark.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/map-demo',
      name: 'map-demo',
      component: Map
    },
    {
      path: '/placemark-demo',
      name: 'placemark-demo',
      component: Placemark
    }
  ]
})
