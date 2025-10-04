import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
        path: '/product/:id',
      name: 'product-detail',
      component: () => import('@/views/ProductDetailPage.vue'),
      props: true,
      meta:{showNavbarAndFooter:false}
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/client',
      name: 'client',
      component: () => import('../views/ClientManager.vue'),
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('../views/ProductView.vue'),
      meta:{showNavbarAndFooter:false}
    },
    {
      path:'/steper',
      name:'steper',
      component: () => import('../components/SteeperComponent.vue'),
       meta:{showNavbarAndFooter:false}
    },
    {
      path:'/sales',
      name:'sales',
      component: () => import('../views/SalesInterface.vue'),
       meta:{showNavbarAndFooter:false}
    }
  ],
})

export default router
