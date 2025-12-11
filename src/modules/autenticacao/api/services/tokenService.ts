import type { HttpClientInterface } from '@/common/api/interface'
import type { TokenServiceInterface } from '@/modules/autenticacao/entities/interface'

export class TokenService implements TokenServiceInterface {
  private httpClient: HttpClientInterface

  constructor(httpClient: HttpClientInterface) {
    this.httpClient = httpClient
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken')
  }

  saveAuthToken(token: string): void {
    localStorage.setItem('authToken', token)
  }

  removeAuthToken(): void {
    localStorage.removeItem('authToken')
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken')
  }

  saveRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token)
  }

  removeRefreshToken(): void {
    localStorage.removeItem('refreshToken')
  }
}
