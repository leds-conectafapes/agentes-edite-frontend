import { ref } from 'vue'

import type { IGeralInfosProjeto } from '../api/types'

import { dashboardService } from '../api/dashboardFactory'

export function useInfosGeraisProjeto() {
  const info = ref<IGeralInfosProjeto>({
    Id: '',
    qtdBolsistasAtivos: 1,
    qtdBolsistasSuspensos: 3,
    qtdBolsistasCancelados: 2,
    qtdBolsistasDocumentacaoPendente: 3,
    qtdBolsistasPendentesAvaliacao: 3,
  })

  async function getGeralInfoProjeto(id: string) {
    try {
      const response = await dashboardService.getInfoProjetoById(id)
      info.value = response
    } catch (error) {
      console.info('Erro ao buscar informações gerais do projeto:', error)
      return null
    }
  }

  return {
    getGeralInfoProjeto,
    info,
  }
}
