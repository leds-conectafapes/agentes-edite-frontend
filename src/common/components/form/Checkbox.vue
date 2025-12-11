<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  label: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const internalValue = computed<boolean>({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val),
})
</script>

<template>
  <label class="inline-flex items-center cursor-pointer select-none">
    <input v-model="internalValue" type="checkbox" class="sr-only" :disabled="disabled" />
    <span
      class="w-5 h-5 flex-shrink-0 rounded-xs flex items-center justify-center transition-colors duration-200"
      :class="[
        internalValue ? 'bg-primary-500 border-primary-500' : 'bg-white border-gray-500',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      ]"
      style="--tw-border-opacity: 1; border-width: 2px"
    >
      <svg v-if="internalValue" class="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </span>
    <span class="ml-2 text-base text-gray-700">
      {{ label }}
    </span>
  </label>
</template>
