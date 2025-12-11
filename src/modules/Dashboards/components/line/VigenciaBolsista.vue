<script setup lang="ts">
import type { ApexOptions } from 'apexcharts'

import { computed, ref } from 'vue'

const props = defineProps<{
  series: { name: string, data: number[] }[];
  meseslabel: string[];
  anos: string[];
  bolsistasLength: number;
}>()

const series = ref([
  { name: 'Planejado', data: [12, 14, 15, 18, 17, 19, 21, 20, 22, 23, 24, 25] },
  { name: 'Executado', data: [10, 12, 13, 16, 15, 17, 18, 18, 19, 21, 20, 22] },
])

const meseslabel = ref([
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
])

const anos = ref(['2023', '2024'])
const bolsistasLength = ref(25)

const chartOptions = computed<ApexOptions>(() => ({
  chart: {
    height: 350,
    type: 'line',
    dropShadow: {
      enabled: false,
      color: '#000',
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2,
    },
    zoom: { enabled: false },
    toolbar: { show: false },
  },
  dataLabels: { enabled: true },
  stroke: { curve: 'smooth' },
  grid: {
    borderColor: '#e7e7e7',
    row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 },
  },
  markers: { size: 1 },
  tooltip: { x: { show: true } },
  xaxis: { categories: meseslabel.value, title: { text: 'Mês' } },
  yaxis: { title: { text: 'Quantidade' } },
  legend: {
    position: 'bottom',
    horizontalAlign: 'right',
    floating: true,
    offsetY: 0,
    offsetX: -5,
  },
}))
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-6 w-full">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
      <h2 class="text-2xl font-semibold">Média de vigência dos bolsistas</h2>

      <select class="border rounded px-2 py-1 text-sm">
        <option v-for="ano in anos" :key="ano" :value="ano">
          {{ ano }}
        </option>
      </select>
    </div>

    <div v-if="bolsistasLength > 0" class="w-full">
      <apexchart type="line" height="350" :options="chartOptions" :series="series" />
    </div>
    <div v-else class="text-center py-8 text-gray-500 text-sm">
      Não há dados para serem exibidos!
    </div>
  </div>
</template>
