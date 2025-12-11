<script setup lang="ts">
defineProps<{
  to: string;
  label: string;
}>()
</script>

<template>
  <RouterLink
    :to="to"
    class="block px-3 py-2 rounded hover:bg-white/10 transition-colors"
    active-class="bg-white/20 font-semibold"
  >
    {{ label }}
  </RouterLink>
</template>
