import type { App } from 'vue'

import VueApexCharts from 'vue3-apexcharts'

import Icon from '@/common/components/navigation/Icon.vue'

export function registerGlobalComponents(app: App) {
  const components = {
    Icon, // se for mesma chave e valor
    apexchart: VueApexCharts, // se nao, importar assim
  }

  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component)
  })
}
