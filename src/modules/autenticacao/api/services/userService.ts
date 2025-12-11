import type { HttpClientInterface } from '@/common/api/interface.ts'
import type { UserServiceInterface } from '@/modules/autenticacao/entities/interface.ts'
import type { User, UserApi } from '@/modules/autenticacao/entities/userTypes.ts'

import { userAdapter } from '@/modules/autenticacao/api/adapters/userAdapter.ts'

export class UserService implements UserServiceInterface {
  private httpClient: HttpClientInterface
  constructor(httpClient: HttpClientInterface) {
    this.httpClient = httpClient
  }

  getUser(): User | null {
    const userData = localStorage.getItem('user')
    return userData ? JSON.parse(userData) : null
  }

  getUserDataFromToken(token: string): UserApi | null {
    const userData = token.split('.')[1]

    return userData ? JSON.parse(atob(userData)) : null
  }

  saveUser(user: UserApi): void {
    const userAdapted = userAdapter.adapt(user)

    localStorage.setItem('user', JSON.stringify(userAdapted))
  }

  removeUser(): void {
    localStorage.removeItem('user')
  }
}
