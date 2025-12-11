<script setup lang="ts">
import { useQtdBolsasChart } from '../../composables/useQtdBolsasOrcamento'
import UiParentCard from '../UiParentCard.vue'

const { series, chartOptions, possuiDados } = useQtdBolsasChart()
</script>

<template>
  <UiParentCard v-if="possuiDados">
    <apexchart type="bar" height="300" :options="chartOptions" :series="series" />
  </UiParentCard>
  <v-card-text v-else class="text-center">
    <v-label>Não há dados para serem exibidos!</v-label>
  </v-card-text>
</template>
