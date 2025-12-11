import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import loginRoutes from '@/modules/autenticacao/login/router'
import { useAuthStore } from '@/modules/autenticacao/stores/auth.store'
import dashboardRoutes from '@/modules/dashboards/router'
import portalRoutes from '@/modules/portalCoordenador/router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...loginRoutes, ...portalRoutes, ...dashboardRoutes],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const { isAuthenticated } = storeToRefs(auth)
  const isAuthRoute = to.path.startsWith('/login')

  if (isAuthRoute && isAuthenticated.value) {
    return next({ name: 'home' })
  }

  if (!isAuthRoute && !isAuthenticated.value) {
    return next({ name: 'login' })
  }

  next()
})
