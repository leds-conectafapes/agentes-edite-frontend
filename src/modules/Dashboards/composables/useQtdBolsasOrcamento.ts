import { computed, ref } from 'vue'

import { formatMoney } from '@/common/utils/currencyFormatter'
import { dashboardService } from '@/modules/dashboards/api/dashboardFactory'

import type { Modalidade } from '../api/types'

export function useQtdBolsasChart() {
  const series = ref<{ name: string, data: number[] }[]>([])
  const possuiDados = ref(true)
  const siglas = ref<string[]>([])

  const chartOptions = computed(() => ({
    chart: {
      type: 'bar',
      height: 350,
      fontFamily: `inherit`,
      foreColor: '#adb0bb',
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '20%',
        distributed: true,
        dataLabels: { position: 'top' },
      },
    },
    dataLabels: {
      enabled: true,
      style: { fontSize: '12px', colors: ['#304758'] },
      offsetY: -20,
      formatter: (val: number) => `R$ ${formatMoney(val)}`,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      title: { text: 'Modalidades' },
      categories: siglas.value,
    },
    yaxis: {
      title: { text: 'Valor (R$)' },
      labels: {
        show: false,
        formatter: (val: number) => val,
      },
    },
    fill: { opacity: 1 },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val: number) => `R$ ${formatMoney(val)}`,
      },
    },
    grid: { show: false },
    legend: { show: false, position: 'bottom', width: '50px' },
    responsive: [
      {
        breakpoint: 600,
        options: { yaxis: { show: false } },
      },
    ],
  }))

  async function updateSelectByProjeto() {
    try {
      const allData = await dashboardService.getQtdModalidadeBolsa()

      if (!allData) {
        possuiDados.value = false
        return
      }

      // Handle both single object and array responses
      const modalidades: Modalidade[] = Array.isArray(allData.Data)
        ? allData.Data.flatMap(item => item.modalidades)
        : allData.Data.modalidades

      const siglasValor: { [sigla: string]: { valor: number } } = modalidades.reduce(
        (resultado: { [sigla: string]: { valor: number } }, modalidade: Modalidade) => {
          resultado[modalidade.sigla] = { valor: modalidade.valor }
          return resultado
        },
        {} as { [sigla: string]: { valor: number } },
      )

      const valores = Object.values(siglasValor).map(sigla => sigla.valor)
      series.value = [{ name: 'Valor', data: valores }]
      siglas.value = Object.keys(siglasValor)
    } catch (err) {
      console.info('Erro ao buscar dados:', err)
    }
  }

  async function getPostsOrcamentoModalidade() {
    series.value = []
    siglas.value = []
    const response = await dashboardService.getQtdModalidadeBolsa()

    return response
  }

  return {
    chartOptions,
    updateSelectByProjeto,
    getPostsOrcamentoModalidade,
    possuiDados,
    series,
  }
}
