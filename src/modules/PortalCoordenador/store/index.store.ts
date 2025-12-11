import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Projeto } from '@/modules/portalCoordenador/entities/projetoEntity'

export const useportalCoordenadorStore = defineStore('portalCoordenadorStore', () => {
  const projetos = ref<Projeto[]>([])

  const getAllProjetos = (projects: Projeto[]) => {
    projetos.value = projects
  }

  return {
    projetos,
    getAllProjetos,
  }
})
