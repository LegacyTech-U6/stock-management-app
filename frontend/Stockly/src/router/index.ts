import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta: { showNavbarAndFooter: false },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { showNavbarAndFooter: false },
  },
  {
    path: '/real',
    name: 'real',
    component: () => import('../views/LayoutPage.vue'),
    meta: { showNavbarAndFooter: false },
    redirect: '/real/sales', // Optional: redirect to a default page
    children: [
      {
        path: '/sales',
        name: 'sales',
        component: () => import('../views/SalesInterface.vue'),
        meta: { showNavbarAndFooter: false },
      },
      {
        path: '/invoice',
        name: 'invoice',
        component: () => import('../components/invoices/CreateInvoiceForm.vue'),
        meta: { showNavbarAndFooter: false },
      },
      {
        path: '/products',
        name: 'product',
        component: () => import('../views/ProductView.vue'),
        meta: { showNavbarAndFooter: false },
      },
      {
        path: '/steper',
        name: 'steper',
        component: () => import('../components/SteeperComponent.vue'),
        meta: { showNavbarAndFooter: false },
      },
      {
        path: '/product/:id',
        name: 'product-detail',
        component: () => import('@/views/ProductDetailPage.vue'),
        props: true,
        meta: { showNavbarAndFooter: false },
      },
      {
        path:'/product/:reStockId',
        name:'restock',
        component:()=>import('@/views/RestockView.vue'),
        props:true,
        meta: { showNavbarAndFooter: false },
      },
      {
        path: '/clients',
        name: 'client',
        component: () => import('../views/ClientManager.vue'),
        meta: { showNavbarAndFooter: false },
      },
      {
        path:'/invoices',
        name:'invoices',
        component:()=>import('@/views/InvoiceView.vue')
      },
      {
        path:'/categories',
        name:'categories',
          component:()=>import('@/views/CategoryView .vue')

      },
      {
        path:'/outOfStock',
        name:'/outOfStock',
        component:()=>import('@/views/OutofStock.vue')
      },
      {
        path:'/lowStock',
        name:'lowStock',
        component:()=>import('@/views/LowStock.vue')
      },{
        path:'/detail/:id',
        name:'category-detail',
        component:()=>import('@/views/CategoryDetail.vue'),
        props: true,
      },{
        path:'/company',
        name:'company',
        component:()=>import('@/views/CreateEntreprise.vue')
      },{
        path:'/admin',
        name:'admin',
        component:()=>import('@/views/MainPage.vue')
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
