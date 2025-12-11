import { useMutation, useQueryClient } from '@tanstack/vue-query'

import { meuPerfilService } from '@/modules/portalCoordenador/api/factories/meuPerfilFactory'

import type { TMeuPerfil } from './useValidacaoMeuPerfil'

type UseUpdateMyProfileMutationProps = {
  onSuccess?: () => void
  onError?: (error: unknown) => void
}

const MY_PROFILE_MUTATION_KEY = 'meuPerfil'

export function useUpdateMyProfileMutation({
  onSuccess,
  onError,
}: UseUpdateMyProfileMutationProps = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [MY_PROFILE_MUTATION_KEY],
    mutationFn: async (meuPerfil: TMeuPerfil) => {
      return await meuPerfilService.saveMeuPerfil(meuPerfil)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meuPerfil'] })
      onSuccess?.()
    },
    onError: (error) => {
      onError?.(error)
    },
  })
}
