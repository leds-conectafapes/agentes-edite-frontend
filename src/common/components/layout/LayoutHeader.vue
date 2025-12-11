<script setup lang="ts">
import { ref } from 'vue'

import type { User } from '@/modules/autenticacao/entities/userTypes'

const props = defineProps<{
  userData: User | null
}>()
const emit = defineEmits<{
  (e: 'logout'): void
}>()

const showMenu = ref(false)

function toggleMenu() {
  showMenu.value = !showMenu.value
}
</script>

<template>
  <header class="flex items-center justify-between bg-white p-4 shadow relative">
    <div class="flex items-center gap-4">
      <img src="@/common/assets/images/svg/fapesLogoColorido.svg" alt="Logo FAPES" class="h-10" />
      <span v-if="userData?.role" class="text-xs text-gray-500"> {{ userData?.role }} - HOME </span>
    </div>

    <div class="flex items-center relative">
      <section class="flex items-center gap-4">
        <p class="text-sm text-gray-600 leading-title">
          {{ $t('HEADER.welcome_user', { name: userData?.name ? userData?.name : 'Usuário' }) }}
        </p>
        <button class="rounded-full bg-blue-800 w-11 h-11 cursor-pointer" @click="toggleMenu">
          <Icon name="Person" filled class="text-white text-2xl" />
        </button>
      </section>

      <div
        v-if="showMenu"
        class="absolute right-0 top-12 w-40 bg-white border border-gray-200 rounded shadow z-10"
      >
        <ul>
          <li>
            <button
              class="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              @click="() => emit('logout')"
            >
              <Icon name="Logout" />
              {{ $t('HEADER.logout') }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
