<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect } from 'vue'

import CardInfosGeraisProjeto from '@/modules/dashboards/components/cards/CardInfosGeraisProjeto.vue'
import GenericTable from '@/modules/dashboards/components/GenericTable.vue'
import VigenciaBolsista from '@/modules/dashboards/components/line/VigenciaBolsista.vue'
import { useBolsistasProjeto } from '@/modules/dashboards/composables/useBolsistasProjeto'
import { useGetBolsistaPorTempo } from '@/modules/dashboards/composables/useGetBolsistaPorTempo'
import { useGetProjects } from '@/modules/dashboards/composables/useGetProjects'
import { useInfosGeraisProjeto } from '@/modules/dashboards/composables/useInfosGeraisProjeto'
import { usePagamentoMes } from '@/modules/dashboards/composables/usePagamentoBolsistasLine'
import { useProjectsStore } from '@/modules/dashboards/store/projetoStore'

import type { IBolsistaProjeto } from '../api/types'

// const { bolsistas, meseslabel, series, anos, selectedAno, getMeses, getPosts } =
//   useBolsistaPorTempo()

const {
  getPostsPagamentos,
} = usePagamentoMes()

const { getBolsistasProjeto, headers, items: bolsistaItems, pageNumber } = useBolsistasProjeto()

const items = computed(() => bolsistaItems.value)

const projetoStore = useProjectsStore()
const selectedProjeto = ref(projetoStore.selected)

watch(
  () => projetoStore.selected,
  async (newValue) => {
    console.info('Projeto mudou:', newValue)
    selectedProjeto.value = newValue
    // Atualizar dados dos bolsistas quando o projeto mudar
    if (newValue?.id) {
      console.info('Carregando bolsistas para projeto com id:', newValue.id)
      await getBolsistasProjeto(newValue.id)
    }
  },
  { immediate: true },
)

const { bolsistas } = useGetBolsistaPorTempo(selectedProjeto)
const projects = useGetProjects()
const series = ref<{ name: string, data: number[] }[]>([])
const meseslabel = ref<string[]>([])
const anos = ref<string[]>([])
const selectedAno = ref<string>('')
const { getGeralInfoProjeto, info } = useInfosGeraisProjeto()

watchEffect(() => {
  anos.value = bolsistas?.value?.map(bolsista => bolsista.mesReferencia) ?? []
  meseslabel.value = bolsistas?.value?.map(bolsista => bolsista.mesReferencia) ?? []
  anos.value = bolsistas?.value?.map(bolsista => bolsista.mesReferencia) ?? []
  selectedAno.value = anos.value[0]
  series.value
    = bolsistas?.value?.map(bolsista => ({
      name: bolsista.mesReferencia,
      data: [bolsista.qtdAtivos, bolsista.qtdSairam, bolsista.qtdEntraram],
    })) ?? []

  if (selectedProjeto.value?.id) {
    getGeralInfoProjeto(selectedProjeto.value.id)
  }

  // Adicionar log para debug
  console.info('Headers:', headers)
  console.info('Items:', items.value)
  console.info('Page:', pageNumber.value)
})

const mockBolsistas = [
  {
    id: '90900615-e599-4ccf-bc6b-85594d4ca281',
    nome: 'Pessoa1',
    possuiReducaoBolsa: false,
    status: 1,
    siglaBolsa: 'NB9',
    cotasPagas: 8,
    cotasAPagar: 16,
    valorBolsa: 1000,
    valorAPagar: 16000,
    coordenadorAtual: true,
    alocacaoBolsistaProjetoId: '1229e8a5-0d6e-4050-bea1-6bf91827944c',
    alocacaoBolsistaPessoaId: 'a14f870e-1166-42fe-8d9b-a956efc83efc',
  },
  {
    id: '80800615-e599-4ccf-bc6b-85594d4ca282',
    nome: 'Pessoa2',
    possuiReducaoBolsa: true,
    status: 1,
    siglaBolsa: 'NB5',
    cotasPagas: 6,
    cotasAPagar: 18,
    valorBolsa: 800,
    valorAPagar: 14400,
    coordenadorAtual: false,
    alocacaoBolsistaProjetoId: '2229e8a5-0d6e-4050-bea1-6bf91827944c',
    alocacaoBolsistaPessoaId: 'b14f870e-1166-42fe-8d9b-a956efc83efc',
  },
]

function carregarMockBolsistas() {
  console.info('Carregando dados mock de bolsistas')

  setTimeout(() => {
    const items = document.querySelectorAll('table tbody tr')
    if (items.length <= 1) {
      console.info('Items continuam vazios, carregando mock')
      useBolsistaTest(mockBolsistas)
    }
  }, 3000)
}

function useBolsistaTest(mockData: IBolsistaProjeto[]) {
  const bolsistasStore = useBolsistasProjeto()
  bolsistasStore.bolsistasProjeto.value = mockData
  console.info('Mock injetado:', bolsistasStore.bolsistasProjeto.value)
}

onMounted(async () => {
  getPostsPagamentos()

  if (selectedProjeto.value?.id) {
    console.info('onMounted: Carregando bolsistas para projeto:', selectedProjeto.value.id)
    await getBolsistasProjeto(selectedProjeto.value.id)
    carregarMockBolsistas()
  } else if (projects.value && projects.value.length > 0) {
    console.info('onMounted: Carregando bolsistas para primeiro projeto:', projects.value[0].id)
    await getBolsistasProjeto(projects.value[0].id)
    carregarMockBolsistas()
  } else {
    console.info('onMounted: Nenhum projeto disponível para carregar bolsistas')
    carregarMockBolsistas()
  }
})
</script>

<template>
  <div class="p-4">
    <div class="mb-6">
      <label for="projeto" class="block mb-2 text-sm font-medium text-gray-700">
        Selecione um projeto:
      </label>
      <select
        id="projeto"
        v-model="projetoStore.selected"
        class="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
      >
        <option disabled value="">{{ projetoStore.selected?.id }}</option>
        <option v-for="project in projects" :key="project.id" :value="project">
          {{ project.nome }}
        </option>
      </select>
    </div>

    <div class="flex flex-col gap-4">
      <!-- <apexchart type="line" height="350" :options="chartOptions" class="clicavel" :series="series" /> -->
      <CardInfosGeraisProjeto :info="info" />
      <VigenciaBolsista
        :series="series"
        :meseslabel="meseslabel"
        :anos="anos"
        :bolsistas-length="bolsistas.length"
      />
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">Lista de Bolsistas do Projeto</h2>
        <p class="text-sm text-gray-600 mb-4">
          Exibindo informações detalhadas dos bolsistas, incluindo status, valores e cotas.
        </p>
        <GenericTable
          :headers="headers"
          :items="items"
          :page="pageNumber"
          @update:page="pageNumber = $event"
        />
      </div>
    </div>
  </div>
</template>
