import dayjs from 'dayjs'

import type { HttpClientInterface } from '@/common/api/interface'
import type { Projeto, ProjetosResponse } from '@/common/types/projects'

import { ProjetoStatusVariant } from '@/common/types/projects'

import type {
  ApiPaginationResponse,
  DashboardServiceInterface,
  IBolsistaPorTempo,
  IBolsistaProjeto,
  IBolsistasPagoPeriodoProjeto,
  IGeralInfosProjeto,
  IQtdModalidadeBolsa,
  ISaldoCotasProjeto,
} from './types'

export class DashboardService implements DashboardServiceInterface {
  public static BASE_URL = '/dashboards'
  private httpClient: HttpClientInterface

  constructor(httpClient: HttpClientInterface) {
    this.httpClient = httpClient
  }

  async getBolsistaPorTempo(): Promise<IBolsistaPorTempo[]> {
    return await this.httpClient.get<IBolsistaPorTempo[]>(
      `${DashboardService.BASE_URL}/bolsistasportempo`,
    )
  }

  async getBolsistaProjeto(): Promise<IBolsistaProjeto[]> {
    return await this.httpClient.get<IBolsistaProjeto[]>(
      `${DashboardService.BASE_URL}/bolsistaprojeto`,
    )
  }

  async getBolsistaProjetoByProjetoId(
    id: string,
  ): Promise<ApiPaginationResponse<IBolsistaProjeto>> {
    if (!id) {
      throw new Error('ID do projeto não pode ser vazio')
    }
    return await this.httpClient.get<ApiPaginationResponse<IBolsistaProjeto>>(
      `${DashboardService.BASE_URL}/bolsistaprojeto/projeto/${id}`,
    )
  }

  async getBolsistasPagosPeriodoProjeto(): Promise<
    ApiPaginationResponse<IBolsistasPagoPeriodoProjeto>
  > {
    return await this.httpClient.get<ApiPaginationResponse<IBolsistasPagoPeriodoProjeto>>(
      `${DashboardService.BASE_URL}/bolsistaspagos/projeto/{id}`,
    )
  }

  async getGeralInfoProjeto(): Promise<IGeralInfosProjeto[]> {
    return await this.httpClient.get<IGeralInfosProjeto[]>(
      `${DashboardService.BASE_URL}/informacoes/Projeto`,
    )
  }

  async getInfoProjetoById(id: string): Promise<IGeralInfosProjeto> {
    if (!id) {
      throw new Error('ID do projeto não pode ser vazio')
    }
    return await this.httpClient.get<IGeralInfosProjeto>(
      `${DashboardService.BASE_URL}/informacoes/Projeto/${id}`,
    )
  }

  async getSaldoCotasProjeto(): Promise<ApiPaginationResponse<ISaldoCotasProjeto>> {
    return await this.httpClient.get<ApiPaginationResponse<ISaldoCotasProjeto>>(
      `${DashboardService.BASE_URL}/saldocotasprojeto`,
    )
  }

  async getQtdModalidadeBolsa(): Promise<ApiPaginationResponse<IQtdModalidadeBolsa>> {
    return await this.httpClient.get<ApiPaginationResponse<IQtdModalidadeBolsa>>(
      `${DashboardService.BASE_URL}/qtdmodalidadebolsaprojeto`,
    )
  }

  async getQtdModalidadeBolsaById(id: string): Promise<IQtdModalidadeBolsa> {
    if (!id) {
      throw new Error('ID do projeto não pode ser vazio')
    }
    return await this.httpClient.get<IQtdModalidadeBolsa>(
      `${DashboardService.BASE_URL}/qtdmodalidadebolsa/projeto/${id}`,
    )
  }

  async listarProjetos(): Promise<Projeto[]> {
    const responseProjetos = await this.httpClient.get<ProjetosResponse>(
      '/portalfapes/homecoordenador/projetos/',
    )
    const formatados = responseProjetos.value.map((projeto) => {
      const text = projeto.status.replaceAll(/_/g, ' ') as keyof typeof ProjetoStatusVariant
      return {
        id: projeto.id,
        nome: projeto.nome,
        titulo: projeto.nome,
        enviadoEm: dayjs(projeto.dataInicio).format('DD/MM/YYYY'),
        text,
        variant: ProjetoStatusVariant[text],
        clicavel: text === 'EM ANDAMENTO',
      }
    })
    return formatados
  }
}
