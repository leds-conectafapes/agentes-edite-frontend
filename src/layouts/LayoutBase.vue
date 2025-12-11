<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import LayoutHeader from '@/common/components/layout/LayoutHeader.vue'
import LayoutSidebar from '@/common/components/layout/LayoutSideBar.vue'

import { useAuthStore } from '../modules/autenticacao/stores/auth.store'

const auth = useAuthStore()

async function logout() {
  await auth.logout()
}

const { user } = storeToRefs(auth)

onMounted(async () => {
  await auth.getUserWithoutLogin()
})
</script>

<template>
  <div class="flex flex-col">
    <LayoutHeader :user-data="user" @logout="logout" />

    <div class="flex h-full">
      <LayoutSidebar />
      <main class="relative bg-gray-50 px-24 py-11 w-full">
        <router-view />
      </main>
    </div>
  </div>
</template>
