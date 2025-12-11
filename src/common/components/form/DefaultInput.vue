<script setup lang="ts">
import { computed } from 'vue'

import type { DefaultInputProps } from './types/DefaultInput'

import Input from './Input.vue'

const { field, label } = defineProps<DefaultInputProps>()

const state = computed(() => {
  if (field.errors.value.length > 0) {
    return 'error'
  }
  return 'default'
})
</script>

<!-- eslint-disable vue/no-mutating-props -->
<template>
  <Input
    v-model="field.value.value"
    :label="label"
    :state="state"
    :error-messages="field.errors.value"
  />
</template>
