import { createI18n } from 'vue-i18n'

import { messagesEN } from '@/common/plugins/i18n/locales/en-US'
import { messagesPT } from '@/common/plugins/i18n/locales/pt-BR'

const i18n = createI18n({
  legacy: false,
  locale: 'pt-BR',
  fallbackLocale: 'en',
  messages: {
    'pt-BR': messagesPT,
    'en': messagesEN,
  },
})

export default i18n
