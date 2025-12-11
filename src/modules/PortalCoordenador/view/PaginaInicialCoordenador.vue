<script setup lang="ts">
import { GenericStatusTag } from '@leds-ifes/components'
import { useRouter } from 'vue-router'

import type { Projeto } from '../entities/projetoEntity'

import { useInformes, usePrazos, useProjetos } from '../composables/useProjetos'

const { data: projetos } = useProjetos()

const { data: informesProjetos } = useInformes()

const { data: proximosPrazos } = usePrazos()

const router = useRouter()

function visualizarProjeto(projeto: Projeto): void {
  if (projeto.clicavel) {
    router.push({ name: 'visualizar-projeto', params: { id: projeto.id } })
  }
}
</script>

<template>
  <div class="grid gap-6 grid-cols-[70%_auto]">
    <div>
      <div class="flex flex-col gap-4 ml-0.5">
        <h1 class="text-3xl font-semibold text-gray-700">
          {{ $t('HOME.welcome') }}
        </h1>

        <p class="font-normal text-gray-600">
          Aqui você encontra todos os projetos sob sua coordenação. Selecione um projeto para
          visualizar ou gerenciar suas informações.
        </p>
      </div>

      <div class="flex flex-col gap-11 mt-11">
        <div class="flex flex-col gap-6">
          <h2 class="text-xl font-semibold text-gray-600">Informes sobre projetos</h2>

          <div class="flex flex-col gap-4">
            <InformeCard
              v-for="(informe, index) in informesProjetos"
              :key="index"
              :informe="informe"
            />
          </div>
        </div>

        <div class="flex flex-col gap-6">
          <h2 class="text-xl font-semibold text-gray-600">
            Propostas/Inscrições das quais faço parte da equipe
          </h2>

          <div class="flex flex-col gap-4">
            <div
              v-for="projeto in projetos"
              :key="projeto.titulo"
              class="flex flex-col items-start p-3 gap-4 border border-gray-300 rounded-lg"
              :class="{ 'cursor-pointer': projeto.clicavel }"
              @click="visualizarProjeto(projeto)"
            >
              <GenericStatusTag :text="projeto.text" :variant="projeto.variant" />

              <h3 class="font-bold text-gray-700">
                {{ projeto.nome }}
              </h3>

              <p class="text-gray-600">Enviado em {{ projeto.enviadoEm }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col border border-gray-600 rounded-lg p-3 gap-4 h-fit">
      <div class="flex gap-3">
        <Icon name="calendar_month" class="text-3xl" />

        <h3 class="font-bold text-lg text-gray-700">Próximos prazos</h3>
      </div>

      <ul>
        <li
          v-for="(prazo, index) in proximosPrazos"
          :key="index"
          class="list-disc text-gray-600 ml-6 mb-2"
        >
          <span class="font-bold"> {{ prazo.data }} </span>: {{ prazo.mensagem }}
        </li>
      </ul>
    </div>
  </div>
</template>
