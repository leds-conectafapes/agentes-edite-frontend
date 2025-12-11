import { apiProvider } from '@/common/api/provider'

import type { MeuPerfilServiceInterface } from '../../entities/meuPerfilEntity'

import { MeuPerfilService } from '../services/meuPerfilService'

export class MeuPerfilServiceFactory {
  private static instance: MeuPerfilServiceInterface

  static getService(): MeuPerfilServiceInterface {
    if (!MeuPerfilServiceFactory.instance) {
      const httpClient = apiProvider.getHttpClient()
      MeuPerfilServiceFactory.instance = new MeuPerfilService(httpClient)
    }
    return MeuPerfilServiceFactory.instance
  }
}

export const meuPerfilService = MeuPerfilServiceFactory.getService()
