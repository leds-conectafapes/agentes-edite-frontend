import { computed, ref } from 'vue'

import type { IBolsistasPagoPeriodoProjeto, Resultado, Series } from '../api/types'

import { dashboardService } from '../api/dashboardFactory'

const nomesMeses = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

export function usePagamentoMes() {
  const pagamentos = ref<IBolsistasPagoPeriodoProjeto[]>([])
  const valoresPagos = ref<number[]>([])
  const valoresAlocados = ref<number[]>([])
  const valoresPlanejados = ref<number[]>([])
  const meseslabel = ref<string[]>([])
  const series = ref<Series[]>([])
  const selectedAno = ref<string>('')
  const anos = ref<string[]>([])

  function toTitleCase(str: string) {
    return str
      .toLowerCase()
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  }

  const getPostsPagamentos = async () => {
    try {
      const res = await dashboardService.getBolsistasPagosPeriodoProjeto()
      const anosData = res.Data.reduce((resultado: string[], pagamento) => {
        if (!resultado.includes(pagamento.ano)) {
          resultado.push(pagamento.ano)
        }
        return resultado
      }, [])

      anos.value = anosData
      selectedAno.value = anosData[anosData.length - 1]
      getMeses()
    } catch (error) {
      console.info('Erro ao buscar dados:', error)
    }
  }

  function getMeses() {
    const mesesData: Record<number, Resultado> = pagamentos.value.reduce((resultado, pagamento) => {
      if (pagamento.ano !== selectedAno.value)
        return resultado

      const mes = nomesMeses.indexOf(toTitleCase(pagamento.mes))
      if (!resultado[mes]) {
        resultado[mes] = {
          valorPago: 0,
          valorAlocado: 0,
          valorPlanejado: 0,
          bolsistas: pagamento.bolsistasPagos,
          bolsistasAlocados: pagamento.bolsistasPagos.qtdeCotasAlocadas,
          cotasPlanejadas: pagamento.bolsistasPagos.qtdeCotasPagasPreImportacao,
        }
      }
      resultado[mes].valorPago += pagamento.valorPago
      resultado[mes].valorAlocado += pagamento.valorPlanejado
      resultado[mes].valorPlanejado += pagamento.valorPlanejado

      return resultado
    }, {} as Record<number, Resultado>)

    meseslabel.value = Object.keys(mesesData).map(m => nomesMeses[Number.parseInt(m)])
    valoresPagos.value = Object.values(mesesData).map(item => item.valorPago)
    valoresAlocados.value = Object.values(mesesData).map(item => item.valorAlocado)
    valoresPlanejados.value = Object.values(mesesData).map(item => item.valorPlanejado)

    series.value = [
      {
        nome: 'Valor Pago',
        data: valoresPagos.value,
        bolsistas: Object.values(mesesData).map(item => item.bolsistas),
      },
      {
        nome: 'Valor Alocado',
        data: valoresAlocados.value,
        bolsistas: Object.values(mesesData).map(item => item.bolsistasAlocados),
      },
    ]
  }

  const chartOptions = computed(() => ({
    chart: {
      height: 350,
      type: 'line',
      dropShadow: { enabled: true, color: '#000', top: 18, left: 7, blur: 10, opacity: 0.2 },
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `R$ ${formatMoney(val)}`,
    },
    stroke: { curve: 'smooth' },
    grid: {
      borderColor: '#e7e7e7',
      row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 },
    },
    markers: { size: 1 },
    tooltip: {
      x: { show: true, formatter: () => 'Ver detalhes' },
      y: { formatter: (val: number) => `R$ ${formatMoney(val)}` },
    },
    xaxis: { categories: meseslabel.value, title: { text: 'Mês' } },
    yaxis: { title: { text: 'Valor (R$)' }, min: 5 },
    legend: {
      position: 'bottom',
      horizontalAlign: 'right',
      floating: true,
      offsetY: 0,
      offsetX: -5,
    },
  }))

  function formatMoney(value: number) {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  return {
    pagamentos,
    valoresPagos,
    valoresAlocados,
    valoresPlanejados,
    meseslabel,
    series,
    selectedAno,
    anos,
    getMeses,
    getPostsPagamentos,
    chartOptions,
  }
}
