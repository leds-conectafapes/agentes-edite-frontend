import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'

import type { Projeto } from '@/common/types/projects'

import { dashboardService } from '@/modules/dashboards/api/dashboardFactory'

export function useGetProjects() {
  const projetos = ref<Projeto[]>([])

  const getAllProjetos = (projects: Projeto[]) => {
    projetos.value = projects
  }

  const query = useQuery({
    queryKey: ['projetos'],
    queryFn: async () => {
      const data = await dashboardService.listarProjetos()
      return data
    },
    enabled: projetos.value.length === 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Update store when data is available
  if (query.data) {
    getAllProjetos(query.data.value as Projeto[])
  }

  return query.data
}
