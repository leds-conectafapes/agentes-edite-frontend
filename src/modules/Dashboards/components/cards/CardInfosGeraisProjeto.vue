<script setup lang="ts">
import type { IGeralInfosProjeto } from '../../api/types'

import CardGeneric from './CardGeneric.vue'

const props = withDefaults(
  defineProps<{
    info: IGeralInfosProjeto
  }>(),
  {
    info(props) {
      return {
        Id: props.info.Id || '',
        qtdBolsistasAtivos: props.info.qtdBolsistasAtivos || 0,
        qtdBolsistasSuspensos: props.info.qtdBolsistasSuspensos || 0,
        qtdBolsistasCancelados: props.info.qtdBolsistasCancelados || 0,
        qtdBolsistasDocumentacaoPendente: props.info.qtdBolsistasDocumentacaoPendente || 0,
        qtdBolsistasPendentesAvaliacao: props.info.qtdBolsistasPendentesAvaliacao || 0,
      }
    },
  },
)
</script>

<template>
  <div v-if="props.info.Id !== ''" class="flex flex-col items-center justify-center gap-y-8">
    <div class="w-full h-43.5">
      <div class="bg-white shadow-lg rounded-xl px-7 py-6 h-full">
        <div class="border-b border-gray-200 pb-4 mb-5.5">
          <h2 class="text-lg text-wireframe-400">Total de Bolsistas ativos</h2>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 leading-7.25">
          {{ props.info.qtdBolsistasAtivos }}
        </h3>
        <h4 class="text-base text-gray-600 mt-4 leading-4.75">
          {{ props.info.qtdBolsistasPendentesAvaliacao }} novas solicitações
        </h4>
      </div>
    </div>
    <div class="flex flex-row gap-8 items-center justify-center w-full h-35">
      <CardGeneric
        title="Bolsistas Ativos"
        :count="props.info.qtdBolsistasAtivos"
        class="w-1/3 h-full"
      />
      <CardGeneric
        title="Bolsistas Suspensos"
        :count="props.info.qtdBolsistasSuspensos"
        class="w-1/3 h-full"
      />
      <CardGeneric
        title="Bolsistas Cancelados"
        :count="props.info.qtdBolsistasCancelados"
        class="w-1/3 h-full"
      />
    </div>
  </div>
  <div v-else class="flex flex-col items-center justify-center">
    <h1 class="text-2xl">Não há dados para serem exibidos!</h1>
  </div>
</template>
