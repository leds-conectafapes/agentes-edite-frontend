<script setup lang="ts">
import { computed } from 'vue'

import type { InformeProjeto } from '@/modules/portalCoordenador/entities/projetoEntity'

import type { Card } from './types/informeCard'

const props = defineProps<{
  informe: InformeProjeto
}>()

const cardVariation = computed<Card>(() => {
  switch (props.informe.tipo) {
    case 'aviso':
      return {
        cardBorder: 'border-warning-100',
        iconName: 'warning',
        iconStyle: 'text-warning-100 text-2xl',
        iconFilled: true,
      }
    default:
      return {
        cardBorder: 'border-gray-600',
        iconName: 'info',
        iconStyle: 'text-gray-600 text-2xl',
      }
  }
})
</script>

<template>
  <div class="flex border rounded-lg p-3 gap-4" :class="cardVariation.cardBorder">
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Icon
          :name="cardVariation.iconName"
          :class="cardVariation.iconStyle"
          :filled="cardVariation.iconFilled"
        />

        <h3 class="font-bold text-gray-700">
          {{ informe.projeto.titulo }}
        </h3>
      </div>

      <ul class="list-disc text-gray-600 ml-6">
        <li v-for="(item, index) in informe.itens" :key="index">
          <p v-if="typeof item === 'string'">
            {{ item }}
          </p>

          <p v-else>
            {{ item.quantidade }} {{ item.mensagem }}

            <span class="font-bold">
              {{ item.status + (item.status === 'reprovada' && item.quantidade > 1 ? 's' : '') }}
            </span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
