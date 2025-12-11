import LayoutBase from '@/layouts/LayoutBase.vue'
import { meuPerfilRoutes } from '@/modules/portalCoordenador/resources/MeuPerfil/routes'

const routes = [
  {
    path: '/',
    component: LayoutBase,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/modules/portalCoordenador/view/PaginaInicialCoordenador.vue'),
      },
      ...meuPerfilRoutes,
    ],
  },
]

export default routes
