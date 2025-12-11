<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import type { Headers, TableItem } from '@/modules/dashboards/types/table'

const props = defineProps<{
  headers: Headers;
  items: Array<TableItem>;
  page: number;
}>()

// Emits
const emit = defineEmits<{
  (e: 'update:page', page: number): void;
}>()

watch(
  () => props.items,
  (newItems) => {
    console.info('GenericTable - Items atualizados:', newItems)
  },
  { deep: true },
)

// Estado local
const sortColumn = ref('')
const sortDirection = ref('asc')
const itemsPerPage = 10 // Número de itens por página

// Observa mudanças no prop page
watch(
  () => props.page,
  (newPage) => {
    page.value = newPage
  },
)

// Referência local para a página atual
const page = ref(props.page)

// Observa mudanças na página local e emite o evento
watch(page, (newPage) => {
  emit('update:page', newPage)
})

// Ordena os itens com base na coluna selecionada
function sortByColumn(column: string) {
  if (sortColumn.value === column) {
    // Inverte a direção se a mesma coluna for clicada novamente
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    // Define a nova coluna de ordenação e reset para ordem ascendente
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

// Filtra e ordena os itens
const filteredItems = computed(() => {
  const result = [...props.items]

  if (sortColumn.value && props.headers[sortColumn.value]?.sortable) {
    result.sort((a, b) => {
      const aValue = a[sortColumn.value]
      const bValue = b[sortColumn.value]

      // Compara strings
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection.value === 'asc'
          ? aValue.localeCompare(bValue, 'pt-BR')
          : bValue.localeCompare(aValue, 'pt-BR')
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection.value === 'asc' ? aValue - bValue : bValue - aValue
      }
      return 0
    })
  }

  return result
})

// Número total de páginas
const pageCount = computed(() => {
  return Math.max(1, Math.ceil(filteredItems.value.length / itemsPerPage))
})

// Itens da página atual
const paginatedItems = computed(() => {
  const startIndex = (page.value - 1) * itemsPerPage
  return filteredItems.value.slice(startIndex, startIndex + itemsPerPage)
})

// Muda para a página especificada
function handlePageChange(newPage: number) {
  if (newPage >= 1 && newPage <= pageCount.value) {
    page.value = newPage
  }
}

// Manipula ações nos itens (view, edit, delete, etc.)
function handleAction(action: string, item: TableItem) {
  console.info(`Ação "${action}" no item:`, item)
  // Aqui você pode implementar lógica adicional para cada ação
}
</script>

<template>
  <div>
    <!-- Debug para visualizar os dados recebidos -->
    <div v-if="false" class="bg-gray-100 p-2 mb-4 rounded">
      <pre>Headers: {{ JSON.stringify(headers, null, 2) }}</pre>
      <pre>Items: {{ JSON.stringify(items, null, 2) }}</pre>
      <pre>Items length: {{ items?.length }}</pre>
    </div>

    <!-- Tabela principal -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <!-- Cabeçalho da tabela -->
        <thead class="bg-gray-100">
          <tr>
            <th
              v-for="(header, key) in headers"
              :key="key"
              class="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b"
              :class="{ 'cursor-pointer': header.sortable }"
              @click="header.sortable ? sortByColumn(key) : null"
            >
              {{ header.title }}
              <span v-if="header.sortable" class="ml-1">
                <span v-if="sortColumn === key">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
                <span v-else>↕</span>
              </span>
            </th>
          </tr>
        </thead>

        <!-- Corpo da tabela -->
        <tbody>
          <tr
            v-for="(item, index) in paginatedItems"
            :key="index"
            class="hover:bg-gray-50 border-b"
          >
            <td v-for="(header, key) in headers" :key="key" class="py-4 px-4 text-sm">
              <!-- Renderização customizada para o tipo de coluna actions -->
              <div v-if="key === 'actions'" class="flex space-x-2">
                <button
                  v-for="action in item.actions"
                  :key="action"
                  class="p-1 rounded-md hover:bg-gray-200"
                  @click="handleAction(action, item)"
                >
                  <span v-if="action === 'view'" class="text-blue-600">
                    <i class="fas fa-eye"></i> Ver
                  </span>
                  <span v-else-if="action === 'edit'" class="text-green-600">
                    <i class="fas fa-edit"></i> Editar
                  </span>
                  <span v-else-if="action === 'delete'" class="text-red-600">
                    <i class="fas fa-trash"></i> Excluir
                  </span>
                  <span v-else>{{ action }}</span>
                </button>
              </div>
              <template v-else>
                {{ item[key] }}
              </template>
            </td>
          </tr>

          <!-- Mensagem quando não há itens para exibir -->
          <tr v-if="paginatedItems.length === 0">
            <td
              :colspan="Object.keys(headers).length"
              class="py-4 px-4 text-sm text-center text-gray-500"
            >
              Nenhum registro encontrado.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Paginação (apenas mostrar se tiver itens) -->
    <div v-if="filteredItems.length > 0" class="flex justify-between items-center py-4">
      <div class="text-sm text-gray-700">
        Mostrando {{ paginatedItems.length }} de {{ filteredItems.length }} registros
      </div>

      <div class="flex space-x-2">
        <button
          :disabled="page <= 1"
          class="px-3 py-1 border rounded-md text-sm"
          :class="
            page <= 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50'
          "
          @click="handlePageChange(page - 1)"
        >
          Anterior
        </button>

        <button
          v-for="pageNumber in pageCount"
          :key="pageNumber"
          class="px-3 py-1 border rounded-md text-sm"
          :class="page === pageNumber ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-50'"
          @click="handlePageChange(pageNumber)"
        >
          {{ pageNumber }}
        </button>

        <button
          :disabled="page >= pageCount"
          class="px-3 py-1 border rounded-md text-sm"
          :class="
            page >= pageCount
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white hover:bg-gray-50'
          "
          @click="handlePageChange(page + 1)"
        >
          Próximo
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilo da tabela para garantir que cabeçalhos permaneçam visíveis durante a rolagem horizontal */
.overflow-x-auto {
  position: relative;
  min-height: 200px;
}

/* Melhoria para dispositivos móveis */
@media (max-width: 640px) {
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}
</style>
