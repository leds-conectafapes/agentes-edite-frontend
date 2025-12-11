import type { RouteRecordRaw } from 'vue-router'

import LayoutBase from '@/layouts/LayoutBase.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: LayoutBase,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('./views/DashboardCoordenadorView.vue'),
      },
    ],
  },
]

export default routes
