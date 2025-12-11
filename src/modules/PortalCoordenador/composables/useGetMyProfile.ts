import { useQuery } from '@tanstack/vue-query'

import { meuPerfilService } from '../api/factories/meuPerfilFactory'

const MY_PROFILE_QUERY_KEY = 'GET_MY_PROFILE'

export function useGetMyProfile() {
  return useQuery({
    queryKey: [MY_PROFILE_QUERY_KEY],
    queryFn: () => meuPerfilService.getMeuPerfil(),
    staleTime: 1000 * 60 * 5,
  })
}
