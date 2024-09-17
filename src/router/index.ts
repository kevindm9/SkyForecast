import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/SearchWeatherView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      props: route => ({ city: route.params.city || 'Bogota' }),
      component: HomeView
      
    },
    {
      path: '/about/:latitude?/:longitude?',
      name: 'about',
      props: route => ({ 
        latitude: route.params.latitude || null,
        longitude: route.params.longitude || null
      }),
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LocationWeatherView.vue')
    }
  ]
})

export default router
