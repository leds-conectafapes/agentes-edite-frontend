<script setup lang="ts">
import { computed, h, nextTick, watch } from 'vue'

import { useSnackbarStore } from '@/common/store/snackbarStore'

const snackbar = useSnackbarStore()

let timer: ReturnType<typeof setTimeout> | null = null

const messageComponent = computed(() => {
  if (typeof snackbar.message === 'string') {
    return h('span', snackbar.message)
  }
  return snackbar.message
})

watch(
  () => snackbar.visible,
  (isVisible) => {
    if (isVisible && snackbar.timeout > 0) {
      if (timer) {
        clearTimeout(timer)
      }
      nextTick(() => {
        timer = setTimeout(() => {
          snackbar.hide()
        }, snackbar.timeout)
      })
    } else if (!isVisible && timer) {
      clearTimeout(timer)
    }
  },
)
</script>

<template>
  <transition name="fade" appear>
    <div
      v-if="snackbar.visible"
      class="fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex flex-col gap-1 w-auto min-w-50"
      :style="{ backgroundColor: snackbar.color, color: snackbar.fontColor }"
    >
      <div class="flex justify-between items-start gap-2">
        <div class="text-base font-semibold break-words mr-6">
          <slot name="message">
            <component :is="messageComponent" />
          </slot>
        </div>
        <button
          class="text-lg font-bold focus:outline-none"
          :style="{ color: snackbar.fontColor }"
          @click="snackbar.hide"
        >
          &times;
        </button>
      </div>
      <div v-if="snackbar.description" class="text-sm break-words mr-6">
        <slot name="description">
          {{ snackbar.description }}
        </slot>
      </div>
    </div>
  </transition>
</template>
