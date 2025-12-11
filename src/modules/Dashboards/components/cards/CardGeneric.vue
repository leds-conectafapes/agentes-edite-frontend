<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    count: number
  }>(),
  {},
)
</script>

<template>
  <div class="bg-white shadow-lg rounded-xl px-7 py-6">
    <div class="border-b border-gray-200 pb-4 mb-5.5">
      <h2 class="text-lg text-wireframe-400">
        {{ props.title }}
      </h2>
    </div>
    <h3 v-if="props.count >= 0" class="text-2xl font-bold leading-7.25 text-gray-800">
      {{ props.count }}
    </h3>
    <h3 v-else class="text-2xl text-gray-500">Não há dados para serem exibidos!</h3>
  </div>
</template>
