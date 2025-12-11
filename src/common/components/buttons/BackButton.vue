<script setup lang="ts">
import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router'

import { useRouter } from 'vue-router'

const { backTo } = defineProps<{
  backTo?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
}>()

const router = useRouter()
function back() {
  if (backTo) {
    router.push(backTo)
  } else {
    router.back()
  }
}
</script>

<template>
  <div
    class="py-2 mb-3 text-sm font-semibold text-gray-600 cursor-pointer flex align-center"
    @click="back"
  >
    <Icon name="chevron_left" class-name="text-lg size-5" />
    <span>Voltar</span>
  </div>
</template>
