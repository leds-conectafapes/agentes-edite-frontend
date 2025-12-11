<script setup lang="ts">
import NavGroup from './NavGroup.vue'
import NavItem from './NavItem.vue'
</script>

<template>
  <aside class="sidebar-height min-w-64 bg-primary-500 text-white flex flex-col p-4">
    <h2 class="text-sm font-semibold text-primary-200 mt-8 mb-6">MENU</h2>

    <nav class="flex flex-col gap-2 text-sm">
      <NavItem to="/" label="Página inicial" />

      <NavGroup label="Relatórios">
        <NavItem to="/dashboard" label="Dashboard" />
      </NavGroup>
      <NavItem to="/meu-perfil" label="Meu perfil" />
    </nav>
  </aside>
</template>
