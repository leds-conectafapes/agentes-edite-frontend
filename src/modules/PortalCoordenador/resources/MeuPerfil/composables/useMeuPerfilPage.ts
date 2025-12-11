import { useRouter } from 'vue-router'

import { useGetMyProfile } from '@/modules/portalCoordenador/composables/useGetMyProfile'

export function useMeuPerfilPage() {
  const router = useRouter()
  const { data: myProfile, isFetching } = useGetMyProfile()

  const navigateBack = () => router.push('/home')
  const onSubmit = async () => {
    router.push('/home')
  }

  return {
    myProfile,
    isFetching,
    navigateBack,
    onSubmit,
  }
}
