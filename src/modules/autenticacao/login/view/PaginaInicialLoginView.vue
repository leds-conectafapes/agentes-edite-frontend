<script setup lang="ts">
function callback() {
  const redirectUri = encodeURIComponent(`${window.location.origin}/login/AuthAcessoCidadao`)
  window.location.href = `${import.meta.env.VITE_BASE_URL_AUTH}?redirect_uri=${redirectUri}`
}
</script>

<template>
  <div class="flex flex-col lg:flex-row h-screen">
    <div class="flex flex-col items-center justify-center gap-4 w-full lg:w-1/2 bg-white px-6 text-center">
      <img src="@/common/assets/images/svg/icons/iconGraduationHat.svg" alt="Icone chapéu de formatura" class="w-20 h-20" />
      <h2 class="text-2xl font-bold">
        Faça login no Conecta Fapes
      </h2>
      <p class="text-gray-600 text-sm max-w-96">
        Para acessar o sistema, utilize sua conta do Acesso Cidadão.
        Clique no botão abaixo para continuar.
      </p>
      <button
        class="bg-primary-500 hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded shadow w-full max-w-96"
        @click="callback"
      >
        Login com Acesso Cidadão
      </button>
    </div>

    <div
      class="relative flex items-center justify-center w-full lg:w-1/2 bg-[url(@/common/assets/images/backgroundFapes.png)] bg-primary-500 bg-cover bg-center"
    >
      <div class="absolute inset-0 bg-black/30 flex items-center justify-center">
        <img src="@/common/assets/images/svg/fapesLogoBranco.svg" alt="FAPES" class="w-2/3 max-w-md mb-4" />
      </div>
    </div>
  </div>
</template>
