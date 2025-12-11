import { useQuery } from '@tanstack/vue-query'

import { projetoMockService, projetoService } from '@/modules/portalCoordenador/api/factories/projetoFactory'
import { useportalCoordenadorStore } from '@/modules/portalCoordenador/store/index.store'

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_USE_MOCK === 'yes'
const store = useportalCoordenadorStore()

function getService(useMock: boolean) {
  if (useMock) {
    return projetoMockService
  } else {
    return projetoService
  }
}

export function useProjetos(useMock: boolean = USE_MOCK) {
  const query = useQuery({
    queryKey: ['projetos'],
    queryFn: async () => {
      try {
        const data = await getService(useMock).listarProjetos()
        store.getAllProjetos(data || [])
        return data
      } catch (error) {
        console.info('Error fetching projetos:', error) // Retornar erro em snackbar
        throw error // This will let useQuery handle the error state
      }
    },
  })

  return {
    ...query,
  }
}

export function useDetalheProjeto(id: string) {
  const query = useQuery({
    queryKey: ['projeto', id],
    queryFn: async () => {
      try {
        const response = await projetoService.detalhesProjeto(id)

        return response
      } catch (error) {
        console.info(`Error fetching detalhes do projeto ${id} :`, error) // Retornar erro em snackbar

        throw error
      }
    },
  })

  return {
    ...query,
  }
}

export function useInformes(useMock: boolean = false) {
  const query = useQuery({
    queryKey: ['informeProjeto'],
    queryFn: async () => {
      try {
        const response = await getService(useMock).listarInformesProjetos()
        return response
      } catch (error) {
        console.info('Error fetching detalhes do projeto:', error) // Retornar erro em snackbar
        throw error
      }
    },
  })

  return {
    ...query,
  }
}

export function usePrazos(useMock: boolean = false) {
  const query = useQuery({
    queryKey: ['prazosProjeto'],
    queryFn: async () => {
      try {
        const response = await getService(useMock).listarPrazos()
        return response
      } catch (error) {
        console.info('Error fetching detalhes do projeto:', error) // Retornar erro em snackbar
        throw error
      }
    },
  })

  return {
    ...query,
  }
}
