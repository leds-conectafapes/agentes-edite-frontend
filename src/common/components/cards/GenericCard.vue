<script setup lang="ts">
const {
  title,
  showCancel = false,
  showSave = false,
} = defineProps<{
  title?: string;
  showCancel?: boolean;
  showSave?: boolean
}>()

const emit = defineEmits<{
  (e: 'cancel'): void;
  (e: 'save'): void
}>()
</script>

<template>
  <div
    class="w-full col-span-12 mx-auto bg-white rounded-md shadow-md overflow-hidden border border-gray-300"
  >
    <!-- Cabeçalho: usa prop `title` ou slot `header` -->
    <div v-if="$slots.header || title" class="px-6 py-4 border-b border-gray-300">
      <slot name="header">
        <h2 class="text-x2 font-semibold text-gray-800">{{ title }}</h2>
      </slot>
    </div>

    <!-- Conteúdo principal: slot default -->
    <div class="grid grid-cols-12 px-6 py-4 pb-6 gap-x-8 gap-y-8">
      <slot></slot>
    </div>

    <!-- Rodapé: slot `footer` ou ações padrão com botões -->
    <div v-if="$slots.footer || showCancel || showSave" class="px-6 py-4 border-t text-right">
      <slot name="footer">
        <button
          v-if="showCancel"
          class="px-4 py-2 mr-2 bg-gray-200 rounded hover:bg-gray-300"
          @click="emit('cancel')"
        >
          Cancelar
        </button>
        <button
          v-if="showSave"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          @click="emit('save')"
        >
          Salvar
        </button>
      </slot>
    </div>
  </div>
</template>
