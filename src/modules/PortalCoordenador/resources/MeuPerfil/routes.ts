import type { RouteRecordRaw } from 'vue-router'

export const meuPerfilRoutes: RouteRecordRaw[] = [
  {
    path: 'meu-perfil',
    name: 'meuPerfil',
    component: () => import('./view/CreateMeuPerfil.vue'),
  },
]
