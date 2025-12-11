import { computed, ref } from 'vue'

import type { IBolsistaProjeto } from '../api/types'

import { dashboardService } from '../api/dashboardFactory'

export function useBolsistasProjeto() {
  const bolsistasProjeto = ref<IBolsistaProjeto[]>([])

  const getBolsistasProjeto = async (id: string) => {
    try {
      const response = await dashboardService.getBolsistaProjetoByProjetoId(id)

      if (response && response.Data) {
        bolsistasProjeto.value = response.Data
      } else if (Array.isArray(response)) {
        bolsistasProjeto.value = response
      } else {
        bolsistasProjeto.value = []
      }
    } catch (error) {
      bolsistasProjeto.value = []
      throw error
    }
  }

  // Função para formatar valores monetários
  const formatMoney = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  // Função para mapear o status para um texto descritivo
  const mapStatus = (status: number) => {
    const statusMap: Record<number, string> = {
      0: 'Inativo',
      1: 'Ativo',
      2: 'Suspenso',
      3: 'Cancelado',
      4: 'Pendente',
    }
    return statusMap[status] || `Status ${status}`
  }

  const headers = {
    nome: { title: 'Nome', type: 'text', sortable: true },
    status: { title: 'Status', type: 'text', sortable: false },
    siglaBolsa: { title: 'Tipo Bolsa', type: 'text', sortable: false },
    valorBolsa: { title: 'Valor Bolsa', type: 'text', sortable: false },
    cotasPagas: { title: 'Cotas Pagas', type: 'text', sortable: false },
    cotasAPagar: { title: 'Cotas a Pagar', type: 'text', sortable: false },
    valorAPagar: { title: 'Valor a Pagar', type: 'text', sortable: false },
    coordenador: { title: 'Coordenador', type: 'text', sortable: false },
    actions: { title: 'Ações', type: 'actions', sortable: false },
  }

  const items = computed(() => {
    console.info('Computando items a partir de bolsistasProjeto:', bolsistasProjeto.value)
    if (!bolsistasProjeto.value || bolsistasProjeto.value.length === 0) {
      return []
    }

    return bolsistasProjeto.value.map((bolsista: IBolsistaProjeto) => {
      return {
        id: bolsista.id,
        nome: bolsista.nome,
        status: mapStatus(bolsista.status),
        siglaBolsa: bolsista.siglaBolsa,
        valorBolsa: formatMoney(bolsista.valorBolsa),
        cotasPagas: bolsista.cotasPagas,
        cotasAPagar: bolsista.cotasAPagar,
        valorAPagar: formatMoney(bolsista.valorAPagar),
        coordenador: bolsista.coordenadorAtual ? 'Sim' : 'Não',
        reducao: bolsista.possuiReducaoBolsa ? 'Sim' : 'Não',
        alocacaoBolsistaProjetoId: bolsista.alocacaoBolsistaProjetoId,
        alocacaoBolsistaPessoaId: bolsista.alocacaoBolsistaPessoaId,
        actions: ['view'],
      }
    })
  })

  const pageNumber = ref(1)

  return {
    getBolsistasProjeto,
    headers,
    bolsistasProjeto,
    items,
    pageNumber,
  }
}
