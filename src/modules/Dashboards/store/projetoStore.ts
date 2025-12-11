import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Projeto } from '@/modules/portalCoordenador/entities/projetoEntity'

export const useProjectsStore = defineStore('projectsStore', () => {
  const selected = ref<Projeto | undefined>(undefined)

  const setSelected = (project: Projeto) => {
    console.info('setSelected')
    console.info({ project })
    selected.value = project
  }

  return {
    selected,
    setSelected,
  }
})
