import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Map from './pages/Map.vue'
import Placemark from './pages/Placemark.vue'
import Polyline from './pages/Polyline.vue'
import Rectangle from './pages/Rectangle.vue'
import Polygon from './pages/Polygon.vue'
import Circle from './pages/Circle.vue'

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
    },
    {
      path: '/polyline-demo',
      name: 'polyline-demo',
      component: Polyline
    },
    {
      path: '/rectangle-demo',
      name: 'rectangle-demo',
      component: Rectangle
    },
    {
      path: '/polygon-demo',
      name: 'polygon-demo',
      component: Polygon
    },
    {
      path: '/circle-demo',
      name: 'circle-demo',
      component: Circle
    }
  ]
})
