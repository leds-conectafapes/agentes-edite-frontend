import type { UserServiceInterface } from '@/modules/autenticacao/entities/interface'

import { apiProvider } from '@/common/api/provider'
import { UserService } from '@/modules/autenticacao/api/services/userService'

export class UserFactory {
  private static instance: UserServiceInterface

  static getService(): UserServiceInterface {
    if (!UserFactory.instance) {
      const httpClient = apiProvider.getHttpClient()
      UserFactory.instance = new UserService(httpClient)
    }
    return UserFactory.instance
  }
}

export const UserServiceFactory = UserFactory.getService()
