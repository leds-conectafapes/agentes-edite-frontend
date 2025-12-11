import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { User, UserApi } from '@/modules/autenticacao/entities/userTypes'

import { router } from '@/common/router'
import { AuthServiceFactory } from '@/modules/autenticacao/api/factories/authFactory'
import { TokenServiceFactory } from '@/modules/autenticacao/api/factories/tokenFactory'
import { UserServiceFactory } from '@/modules/autenticacao/api/factories/userFactory'

export const useAuthStore = defineStore('auth', () => {
  const tokenService = TokenServiceFactory
  const userService = UserServiceFactory
  const authFactory = AuthServiceFactory

  // State
  const user = ref(userService.getUser())
  const token = ref(tokenService.getAuthToken())
  const refreshToken = ref(tokenService.getRefreshToken())

  // Getters
  const isAuthenticated = computed(() => {
    if (!token.value) {
      return false
    }

    return authFactory.isAuthenticated(token.value)
  })
  const getRefreshToken = computed(() => refreshToken.value)

  // Actions
  function setUser(newUser: UserApi | null) {
    if (!newUser) {
      return null
    }

    userService.saveUser(newUser)
    user.value = userService.getUser()
  }

  function setToken(newToken: string) {
    tokenService.saveAuthToken(newToken)
    token.value = newToken
  }

  function setRefreshToken(newRefreshToken: string) {
    tokenService.saveRefreshToken(newRefreshToken)
    refreshToken.value = newRefreshToken
  }

  async function logout() {
    authFactory.logout()
    userService.removeUser()
    tokenService.removeAuthToken()
    tokenService.removeRefreshToken()

    token.value = null
    refreshToken.value = null
    user.value = null

    router.push({ name: 'login' })
  }

  async function login(credentials: { email: string, password: string }) {
    try {
      const response = await authFactory.login(credentials)

      setToken(response.token)
      if (response.refreshToken) {
        setRefreshToken(response.refreshToken)
      }
      setUserDataWithToken(response.token)

      return response
    } catch (error) {
      user.value = {} as User
      token.value = null
      refreshToken.value = null
      throw error
    }
  }

  function getToken(): string | null {
    return token.value
  }

  function setUserDataWithToken(token: string | null) {
    if (!token) {
      return {}
    }

    const userData = userService.getUserDataFromToken(token)
    setUser(userData)
  }

  // o método abaixo só existe pq n temos um sistema de login 100% funcional
  async function getUserWithoutLogin() {
    if (isAuthenticated.value && !user.value) {
      await setUserDataWithToken(token.value)
    }
  }

  return {
    user,
    token,
    refreshToken,
    isAuthenticated,
    getRefreshToken,
    setUser,
    setToken,
    setRefreshToken,
    logout,
    login,
    getToken,
    getUserWithoutLogin,
  }
})
