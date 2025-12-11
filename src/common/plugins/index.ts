import type { App } from 'vue'

import { VueQueryPlugin } from '@tanstack/vue-query'

import './dayjs'
import { router } from '../router'
import i18n from './i18n'
import pinia from './pinia'

export function registerPlugins(app: App) {
  app.use(pinia)
  app.use(i18n)
  app.use(VueQueryPlugin)
  app.use(router)
}
