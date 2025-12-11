import type { VNode } from 'vue'

import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { SnackbarVariant } from '@/common/components/feedback/types/snackbar'

import { SnackbarStyles } from '@/common/components/feedback/types/snackbar'

export const useSnackbarStore = defineStore('snackbar', () => {
  const visible = ref(false)
  const message = ref<string | VNode>('')
  const description = ref('')
  const variant = ref<SnackbarVariant>('primary')
  const color = ref(SnackbarStyles.primary.color)
  const fontColor = ref(SnackbarStyles.primary.fontColor)
  const timeout = ref(3000)

  function show(msg: string | VNode, v: SnackbarVariant, desc?: string, customTimeout?: number) {
    visible.value = true
    message.value = msg
    description.value = desc ?? ''
    variant.value = v
    color.value = SnackbarStyles[v].color
    fontColor.value = SnackbarStyles[v].fontColor
    timeout.value = customTimeout ?? 3000
  }

  function hide() {
    visible.value = false
  }

  return {
    visible,
    message,
    description,
    variant,
    color,
    fontColor,
    timeout,
    show,
    hide,
  }
})
