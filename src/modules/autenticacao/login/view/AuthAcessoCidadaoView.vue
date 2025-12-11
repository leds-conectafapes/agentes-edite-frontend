<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/modules/autenticacao/stores/auth.store'

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const authToken = urlParams.get('token')
  // const refreshToken = urlParams.get('refresh_token')

  if (authToken) {
    authStore.setToken(authToken)
    router.push({ name: 'home' })
  }

  // if (refreshToken) {
  //   authStore.setRefreshToken(refreshToken.replaceAll(' ', '+'))
  // }
})
</script>

<template>
  <div class="p-3 h-screen flex align-center justify-center" data-test="divLoading">
    <div class="text-center">
      <p class="text-h5 font-weight-medium" data-test="pLoadingMessage">
        Aguarde os dados sendo carregados
      </p>
    </div>
  </div>
</template>
