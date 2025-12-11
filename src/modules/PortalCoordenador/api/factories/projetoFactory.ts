import { apiProvider, mockProvider } from '@/common/api/provider'

import { PortalCoordenadorMock } from '../services/projetoMockService'
import { ProjetoService } from '../services/projetosService'

export class ProjetoServiceFactory {
  private static instance: ProjetoService

  static getService(): ProjetoService {
    if (!ProjetoServiceFactory.instance) {
      const httpClient = apiProvider.getHttpClient()
      ProjetoServiceFactory.instance = new ProjetoService(httpClient)
    }
    return ProjetoServiceFactory.instance
  }
}

export const projetoService = ProjetoServiceFactory.getService()

export class portalCoordenadorMockFactory {
  private static instance: PortalCoordenadorMock

  static getService(): PortalCoordenadorMock {
    if (!portalCoordenadorMockFactory.instance) {
      const httpClient = mockProvider.getHttpClient()
      portalCoordenadorMockFactory.instance = new PortalCoordenadorMock(httpClient)
    }
    return portalCoordenadorMockFactory.instance
  }
}

export const projetoMockService: PortalCoordenadorMock = portalCoordenadorMockFactory.getService()
