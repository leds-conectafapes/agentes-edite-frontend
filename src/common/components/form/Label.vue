<script setup lang="ts">
import type { LabelProps } from './types/Label'

const { hasErrors, required } = defineProps<LabelProps>()
</script>

<template>
  <label class="font-medium text-gray-700 leading-[120%]" :class="{ 'text-error-500': hasErrors }">
    <slot></slot>

    {{ required ? '*' : '' }}
  </label>
</template>
