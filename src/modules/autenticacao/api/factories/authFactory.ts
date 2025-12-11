import type { AuthServiceInterface } from '@/modules/autenticacao/entities/interface'

import { apiProvider } from '@/common/api/provider'
import { AuthService } from '@/modules/autenticacao/api/services/authService'

export class AuthFactory {
  private static instance: AuthServiceInterface

  static getService(): AuthServiceInterface {
    if (!AuthFactory.instance) {
      const httpClient = apiProvider.getHttpClient()
      AuthFactory.instance = new AuthService(httpClient)
    }
    return AuthFactory.instance
  }
}

export const AuthServiceFactory = AuthFactory.getService()
