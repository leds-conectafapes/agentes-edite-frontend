<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ label: string }>()
const open = ref(false)
</script>

<template>
  <div>
    <button
      class="flex w-full items-center justify-between bg-primary-500 hover:bg-blue-700 rounded px-3 py-2 font-semibold text-sm"
      @click="open = !open"
    >
      <span>{{ label }}</span>
      <Icon
        :class="{ 'rotate-180': open }"
        class="transform transition-transform text-white text-xl"
        name="keyboard_arrow_down"
        filled
      />
    </button>

    <div v-if="open" class="ml-4 mt-2 flex flex-col gap-1">
      <slot></slot>
    </div>
  </div>
</template>
