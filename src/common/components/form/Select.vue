<script lang="ts" setup>
import type { PropType } from 'vue'

import { computed, ref } from 'vue'

const props = defineProps({
  options: {
    type: Array as PropType<Array<{ label: string, value: string | number }>>,
    required: true,
  },
  modelValue: {
    type: [String, Number, Object, undefined] as PropType<
      string | number | { value: string | undefined } | undefined
    >,
    default: '',
  },
  placeholder: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    default: 'default',
    validator: (value: string) => ['default', 'error', 'warning', 'disabled'].includes(value),
  },
  // Label do select
  label: {
    type: String,
    required: true,
  },
  // Se o campo é obrigatório
  mandatory: {
    type: Boolean,
    default: false,
  },
  // Mensagens de erro (string única ou array de strings)
  errorMessages: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  // Se o campo está desabilitado
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

// Determinar o valor atual, lidando com diferentes tipos de entrada
const getValue = computed(() => {
  // Se for um objeto com propriedade value (como um Ref do vee-validate)
  if (props.modelValue && typeof props.modelValue === 'object' && 'value' in props.modelValue) {
    return props.modelValue.value ?? ''
  }
  // Caso contrário, usa o valor diretamente
  return props.modelValue ?? ''
})

// Atualizar o valor
function updateValue(value: string | number) {
  // Se o modelValue for um objeto com propriedade value (como um Ref)
  if (props.modelValue && typeof props.modelValue === 'object' && 'value' in props.modelValue) {
    // Emite o evento com o novo valor, mantendo a estrutura do objeto
    emit('update:modelValue', { ...props.modelValue, value })
  } else {
    // Emite diretamente o novo valor
    emit('update:modelValue', value)
  }
}

// Ref para o elemento select
const selectElement = ref<HTMLSelectElement | null>(null)

// Classes de estilo baseadas no estado
const stateClasses = computed(() => {
  const classes = {
    default: 'ring-gray-500 focus:ring-primary-500',
    error: 'ring-error-300 bg-error-100/10 focus:ring-error-500',
    warning: 'ring-warning-300 bg-warning-100/10 focus:ring-warning-500',
    disabled: '!ring-0 bg-gray-100/40 cursor-not-allowed text-gray-400',
  }

  // Se tiver mensagens de erro, forçar estado de erro independente da prop state
  const effectiveState = hasErrors.value ? 'error' : props.disabled ? 'disabled' : props.state

  return classes[effectiveState as keyof typeof classes] || classes.default
})

// Verifica se há mensagens de erro
const hasErrors = computed(() => {
  if (Array.isArray(props.errorMessages)) {
    return props.errorMessages.length > 0
  }
  return !!props.errorMessages
})

// Lista normalizada de mensagens de erro
const errorMessagesList = computed(() => {
  if (Array.isArray(props.errorMessages)) {
    return props.errorMessages.filter(Boolean)
  }
  return props.errorMessages ? [props.errorMessages] : []
})

// Determina se existe uma opção selecionada
const hasSelection = computed(() => {
  return !!getValue.value
})
</script>

<template>
  <div class="w-full relative flex flex-col gap-y-2">
    <!-- Label do select -->
    <label class="text-base font-medium text-gray-700" :class="{ 'text-error-500': hasErrors }">
      {{ label }}{{ mandatory ? '*' : '' }}
    </label>

    <!-- Container do select -->
    <div class="relative">
      <select
        ref="selectElement"
        :value="getValue"
        :disabled="disabled || state === 'disabled'"
        class="appearance-none w-full p-4 leading-tight text-gray-700 ring rounded-lg outline-none transition-all focus:ring-2 hover:ring-opacity-90"
        :class="[
          stateClasses,
          { 'text-gray-400': !hasSelection && !disabled && state !== 'disabled' },
        ]"
        @change="(e) => updateValue((e.target as HTMLSelectElement).value)"
      >
        <option value="" :disabled="mandatory">{{ placeholder }}</option>
        <option v-for="(option, index) in options" :key="index" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <!-- Ícone de seta -->
      <div
        class="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
        :class="{ 'opacity-50': disabled || state === 'disabled' }"
      >
        <Icon name="keyboard_arrow_down" :weight="500" class-name="text-gray-500" />
      </div>
    </div>

    <!-- Mensagens de erro -->
    <div v-if="hasErrors" class="mt-1 text-sm text-error-500 space-y-1">
      <p v-for="(error, index) in errorMessagesList" :key="index">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<style scoped>
select:focus {
  outline: none;
}

/* Remover seta nativa do select em alguns navegadores */
select::-ms-expand {
  display: none;
}

/* Estilização consistente entre navegadores */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
}
</style>
