// // composables/useAuthRedirect.ts
// import { onMounted } from 'vue'

// import { useAuth } from '../../api/utils/useAuth'

// const auth = useAuth()

// export function useAuthRedirect() {
//   onMounted(() => {
//     const urlParams = new URLSearchParams(window.location.search)
//     const authToken = urlParams.get('token')

//     if (authToken) {
//       auth.setToken(authToken)
//     }
//   })

//   function callback() {
//     try {
//       const redirectUri = encodeURIComponent(`${window.location.origin}/redirect`)
//       window.location.href = import.meta.env.VITE_BASE_URL_AUTH
//     } catch (error) {
//       console.error('Erro ao redirecionar para o Acesso Cidadão:', error)
//     }
//   }
// }
