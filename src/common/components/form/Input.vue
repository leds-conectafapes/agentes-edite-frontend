<script lang="ts" setup>
import { computed } from 'vue'

import type { InputEmits, InputProps } from './types/Input'

import Label from './Label.vue'

const {
  type = 'text',
  placeholder,
  caption,
  state = 'default',
  label,
  required = false,
  errorMessages = [],
  modelValue,
} = defineProps<InputProps>()

const emit = defineEmits<InputEmits>()

function updateModelValue(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const inputIcon = computed<string | undefined>(() => {
  switch (type) {
    case 'search':
      return 'search'
    case 'password':
      return 'visibility_off'
    default:
      return undefined
  }
})

// eslint-disable-next-line vue/return-in-computed-property
const inputClasses = computed(() => {
  switch (state) {
    case 'default':
      return 'ring-gray-500 focus:ring-primary-500'
    case 'warning':
      return 'ring-error-300 bg-error-100/10 focus:ring-error-500'
    case 'error':
      return 'ring-error-300 bg-error-100/10 focus:ring-error-500'
    case 'disabled':
      return '!ring-0 bg-gray-100 cursor-not-allowed text-gray-400'
  }
})
</script>

<template>
  <div class="w-full relative flex flex-col gap-y-4">
    <!-- Label do input -->
    <Label :required="required" :has-errors="state === 'error'">
      {{ label }}
    </Label>

    <!-- Container do input -->
    <div class="relative">
      <input
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="state === 'disabled'"
        class="w-full p-4 leading-tight text-gray-700 ring rounded-lg outline-none transition-all focus:ring-2 hover:ring-opacity-90"
        :class="inputClasses"
        @input="updateModelValue"
      />

      <!-- Ícone (se definido para o tipo) -->
      <div
        v-if="inputIcon"
        class="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center"
      >
        <Icon :name="inputIcon" :weight="500" class-name="text-gray-500" />
      </div>
    </div>

    <div v-if="caption" class="mt-1 text-sm space-y-1">
      {{ caption }}
    </div>

    <!-- Mensagens de erro -->
    <div
      v-if="state === 'error' || (state === 'disabled' && errorMessages.length > 0)"
      class="mt-1 text-sm text-error-500 space-y-1"
    >
      <p v-for="(error, index) in errorMessages" :key="index">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<style scoped>
input[type='search']::-webkit-search-cancel-button {
  display: none;
}

input:focus {
  outline: none;
}

/* Remoção das setas para inputs de número */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
