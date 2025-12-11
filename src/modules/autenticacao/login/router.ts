import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/modules/autenticacao/login/view/PaginaInicialLoginView.vue'),
  },

  {
    path: '/login/AuthAcessoCidadao',
    name: 'redirect',
    component: () => import('@/modules/autenticacao/login/view/AuthAcessoCidadaoView.vue'),
  },
]

export default routes
