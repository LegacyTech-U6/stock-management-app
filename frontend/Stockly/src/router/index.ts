import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/authStore'
import { useEntrepriseStore } from '@/stores/entrepriseStore'
const routes: RouteRecordRaw[] = [
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
    component: () => import('../views/auth/RegisterView.vue'),
    meta: { showNavbarAndFooter: false },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/LoginView.vue'),
    meta: { showNavbarAndFooter: false },
  },
  {
    path: '/verify/:token',
    name: 'VerifyEmail',
    component: () => import('@/views/auth/VerifyEmail.vue'),
  },
  {
    path: '/activation',
    name: 'activation',
    component: () => import('@/views/auth/ActivationSent.vue'),
  },

  {
    path: '/ad',
    component: () => import('@/views/AdminLayout.vue'),
    meta: { showNavbarAndFooter: false, requiresAuth: true },
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/MainPage.vue'),
        meta: { showNavbarAndFooter: false },
      },
      {
        path: 'workers',
        name: 'workers',
        component: () => import('@/views/WorkerPage.vue'),
        meta: { showNavbarAndFooter: false },
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('@/views/RoleManagement.vue'),
        meta: { showNavbarAndFooter: false },
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/Statistics/DashBoard.vue'),
        meta: { showNavbarAndFooter: false },
      },
      {
        path: 'company',
        name: 'company',
        component: () => import('@/views/CreateEntreprise.vue'),
        meta: { showNavbarAndFooter: false },
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/views/settings/AdminSetting.vue'),
      },
    ],
  },
  {
    path: '/:uuid',
    name: 'real',
    component: () => import('../views/LayoutPage.vue'),
    meta: { showNavbarAndFooter: false, requiresAuth: true },
    redirect: '/real/sales', // Optional: redirect to a default page
    children: [
      {
        path: 'dashboard',
        name: 'EDashboardd',
        component: () => import('@/views/Enterprise.vue'),
      },
      {
        path: 'AuditTrail',
        name: 'Audit Trail',
        component: () => import('@/views/ActivityLogPage.vue'),
      },
      {
        path: 'sales',
        name: 'sales',
        component: () => import('../views/SalesInterface.vue'),
        meta: { showNavbarAndFooter: false },
      },
      {
        path: 'invoice',
        name: 'invoice',
        component: () => import('../components/invoices/CreateInvoiceForm.vue'),
        meta: { showNavbarAndFooter: false },
      },
      {
        path: 'products',
        name: 'product',
        component: () => import('../views/ProductView.vue'),
        meta: { showNavbarAndFooter: false },
      },
      {
        path: 'stepper',
        name: 'steper',
        component: () => import('../components/SteeperComponent.vue'),
        meta: { showNavbarAndFooter: false },
      },
      {
        path: 'product/:id',
        name: 'product-detail',
        component: () => import('@/views/ProductDetailPage.vue'),
        props: true,
        meta: { showNavbarAndFooter: false },
      },
      {
        path: 'product/:reStockId',
        name: 'restock',
        component: () => import('@/views/RestockView.vue'),
        props: true,
        meta: { showNavbarAndFooter: false },
      },
      {
        path: 'clients',
        name: 'client',
        component: () => import('../views/ClientManager.vue'),
        meta: { showNavbarAndFooter: false },
      },
      {
        path: 'invoices',
        name: 'invoices',
        component: () => import('@/views/InvoiceView.vue'),
      },
      {
        path: 'categories',
        name: 'categories',
        component: () => import('@/views/CategoryView .vue'),
      },
      {
        path: 'outOfStock',
        name: 'outOfStock',
        component: () => import('@/views/OutofStock.vue'),
      },
      {
        path: 'lowStock',
        name: 'lowStock',
        component: () => import('@/views/LowStock.vue'),
      },
      {
        path: 'detail/:id',
        name: 'category-detail',
        component: () => import('@/views/CategoryDetail.vue'),
        props: true,
      },
      {
        path: 'invoices/:id',
        name: 'InvoiceDetail',
        component: () => import('@/components/invoices/InvoiceDetail.vue'),
      },
      {
        path: 'reports',
        name: 'reports',
        component: () => import('@/views/SalesReport.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  // On récupère le user depuis le localStorage si page reload
  if (!auth.user && auth.token) {
    await auth.getAccount()
  }

  if (to.meta.requiresAuth && !auth.user) {
    next('/login')
  } else if (to.path === '/login' && auth.user) {
    next('/dashboard')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  // Si on revient sur la page /entreprises, on désactive l’entreprise
  if (to.path === '/admin') {
    localStorage.removeItem('activeEnterprise')
  }
})

export default router
