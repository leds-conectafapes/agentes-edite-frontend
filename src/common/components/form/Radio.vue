<script setup lang="ts">
import { computed } from 'vue'

import type { RadioEmits, RadioProps } from './types/Radio'

const { orientation, label, options, modelValue } = defineProps<RadioProps>()

const emit = defineEmits<RadioEmits>()

function updateModelValue(value: number) {
  emit('update:modelValue', value)
}

const orientacao = computed(() => {
  switch (orientation) {
    case 'horizontal':
      return 'flex items-center space-x-4'
    case 'vertical':
      return 'flex flex-col space-y-2'
    default:
      return 'flex items-center space-x-4'
  }
})
</script>

<template>
  <fieldset class="space-y-2">
    <legend class="font-medium text-gray-700">
      {{ label }}
    </legend>
    <div :class="orientacao">
      <label
        v-for="opt in options"
        :key="opt.index"
        class="inline-flex items-center cursor-pointer"
      >
        <input
          type="radio"
          class="sr-only"
          :value="opt.value"
          :checked="modelValue === opt.index"
          @change="updateModelValue(opt.index)"
        />
        <span
          class="w-5 h-5 flex flex-shrink-0 items-center justify-center rounded-full transition-colors border-gray-500 border-2 bg-white"
        >
          <span v-if="modelValue === opt.index" class="w-3 h-3 rounded-full bg-primary-500"> </span>
        </span>
        <span class="ml-2 select-none text-sm text-gray-700">
          {{ opt.label }}
        </span>
      </label>
    </div>
  </fieldset>
</template>
