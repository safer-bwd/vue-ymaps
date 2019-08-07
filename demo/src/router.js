import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import MapDemo from './pages/MapDemo.vue'
import PlacemarkDemo from './pages/PlacemarkDemo.vue'

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
      component: MapDemo
    },
    {
      path: '/placemark-demo',
      name: 'placemark-demo',
      component: PlacemarkDemo
    }
  ]
})
