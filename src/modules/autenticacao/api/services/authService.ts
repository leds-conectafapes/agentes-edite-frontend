import type { HttpClientInterface } from '@/common/api/interface'

import type { LoginRequest, LoginResponse, RegisterRequest } from '../../entities/authTypes'
import type { AuthServiceInterface } from '../../entities/interface'

export class AuthService implements AuthServiceInterface {
  private httpClient: HttpClientInterface

  constructor(httpClient: HttpClientInterface) {
    this.httpClient = httpClient
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    return this.httpClient.post<LoginResponse>('/auth/login', data)
  }

  async register(data: RegisterRequest): Promise<void> {
    return this.httpClient.post<void>('/auth/register', data)
  }

  async logout(): Promise<void> {
    //  return this.httpClient.post<void>('/auth/logout')
  }

  async forgotPassword(email: string): Promise<void> {
    return this.httpClient.post<void>('/auth/forgot-password', { email })
  }

  isAuthenticated(token?: string): boolean {
    const authToken = token

    return !!authToken
  }
}
