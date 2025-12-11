import type { Ref } from 'vue'

import { useQuery } from '@tanstack/vue-query'
import { computed, watchEffect } from 'vue'

import type { Projeto } from '@/common/types/projects'

import { dashboardService } from '../api/dashboardFactory'

const BOLSISTAS_QUERY_KEY = 'bolsistas'

export function useGetBolsistaPorTempo(projeto: Ref<Projeto | undefined>) {
  const { data, refetch } = useQuery({
    queryKey: [BOLSISTAS_QUERY_KEY],
    queryFn: async () => {
      try {
        const response = dashboardService.getBolsistaPorTempo()

        return response
      } catch (error) {
        console.info(`Erro ao buscar bolsistas :`, error) // Retornar erro em snackbar

        throw error
      }
    },
  })

  watchEffect(() => {
    if (projeto.value?.id) {
      refetch()
    }
  })

  const bolsistas = computed(() => {
    if (!data.value || !projeto.value?.id)
      return []
    return data.value.filter(bolsista => bolsista.projetoId === projeto.value?.id)
  })

  return {
    bolsistas,
  }
}
