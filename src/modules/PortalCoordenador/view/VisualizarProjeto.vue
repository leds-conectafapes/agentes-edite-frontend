<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

import { useDetalheProjeto } from '../composables/useProjetos'

const router = useRouter()
const route = useRoute()

const {
  data: projeto,
} = useDetalheProjeto(route.params.id as string) // quando seria string[]?

function voltar() {
  router.push({ name: 'home' })
}
function acessarDashboard() {
  console.info('botao para acessar dashboard foi clicado.')
}
</script>

<template>
  <div
    class="mb-16 flex flex-col"
  >
    <div
      class="py-2 mb-3 text-sm font-semibold text-gray-600 leading-[120%] cursor-pointer"
      @click="voltar"
    >
      Voltar
    </div>

    <h1 class="mb-4 text-3xl font-semibold text-gray-700">
      {{ projeto?.Nome }}
    </h1>

    <div class="mb-4 text-gray-600">
      Você está visualizando as informações do projeto selecionado.
      Aqui é possível acompanhar dados gerais, bolsas vinculadas e o andamento das atividades.
    </div>

    <div class="flex flex-col items-start gap-2 text-gray-600">
      <div>
        <span class="font-semibold mr-2">
          COORDENADOR:
        </span>

        {{ projeto?.NomeCoordenador }}
      </div>

      <div>
        <span class="font-semibold mr-2">
          EDITAL:
        </span>

        {{ projeto?.Edital.Nome }}
      </div>

      <div>
        <span class="font-semibold mr-2">
          ENVIADO EM:
        </span>

        {{ projeto?.DataInicio }}
      </div>

      <div>
        <span class="font-semibold mr-2">
          STATUS:
        </span>

        {{ projeto?.StatusProjeto }}
      </div>
    </div>
  </div>

  <div class="flex flex-col">
    <div class="flex justify-end">
      <div
        class="cursor-pointer rounded-lg min-h-11 text-gray-700 leading-[120%] py-4 px-6"
        @click="acessarDashboard"
      >
        Acessar relatórios e indicadores
      </div>
    </div>
  </div>
</template>
