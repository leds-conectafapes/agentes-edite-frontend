import type { HttpClientInterface } from '@/common/api/interface'

import type {
  InformeProjeto,
  MockApiValueWithProps,
  Prazo,
  Projeto,
} from '../../entities/projetoEntity'

export class PortalCoordenadorMock {
  private mockApi: HttpClientInterface

  constructor(mockApi: HttpClientInterface) {
    this.mockApi = mockApi
  }

  public async listarProjetos(): Promise<Projeto[]> {
    const response = await this.mockApi.get<MockApiValueWithProps<Projeto>>('/projetos')
    return response
  }

  public async listarInformesProjetos(): Promise<InformeProjeto[]> {
    const response =
      await this.mockApi.get<MockApiValueWithProps<InformeProjeto>>('/informeProjetos')
    return response
  }

  public async listarPrazos(): Promise<Prazo[]> {
    const response = await this.mockApi.get<MockApiValueWithProps<Prazo>>('/proximosPrazos')
    return response
  }
}
