import Vue from 'vue'
import VueRouter from 'vue-router'
// import { component } from 'vue/types/umd'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')    
  },
  {
    path: '/onePost',
    name: 'id',
    component: () => import('../views/IdView.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
