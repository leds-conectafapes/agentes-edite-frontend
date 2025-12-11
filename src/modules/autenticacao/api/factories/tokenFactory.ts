import type { TokenServiceInterface } from '@/modules/autenticacao/entities/interface'

import { apiProvider } from '@/common/api/provider'
import { TokenService } from '@/modules/autenticacao/api/services/tokenService'

export class TokenFactory {
  private static instance: TokenServiceInterface

  static getService(): TokenServiceInterface {
    if (!TokenFactory.instance) {
      const httpClient = apiProvider.getHttpClient()
      TokenFactory.instance = new TokenService(httpClient)
    }
    return TokenFactory.instance
  }
}

export const TokenServiceFactory = TokenFactory.getService()
