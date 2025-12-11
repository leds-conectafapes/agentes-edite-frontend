import dayjs from 'dayjs'

import type { HttpClientInterface } from '@/common/api/interface'

import type {
  CoordenadorResponse,
  InformeProjeto,
  Prazo,
  Projeto,
  ProjetoExpandidoApi,
  ProjetoResponse,
  ProjetosResponse,
} from '../../entities/projetoEntity'

import { ProjetoStatusVariant } from '../../entities/projetoEntity'

const conectaFapes: Projeto = {
  id: '1de564a7-9aee-4890-8085-0a91a85a1ed6',
  nome: 'ConectaFapes: Uma plataforma de apoio à Pesquisa, Desenvolvimento e Inovação',
  titulo: 'ConectaFapes: Uma plataforma de apoio à Pesquisa, Desenvolvimento e Inovação',
  text: 'EM ANDAMENTO',
  enviadoEm: '26/10/2023',
  clicavel: true,
  variant: 'successOutline',
}

const smartHub: Projeto = {
  id: 'e96c045b-066b-4824-afdc-b7ee85861cde',
  nome: 'SMART HUB',
  titulo:
    'Projeto SmartHub: Lorem ipsum dolor sit amet consectetur malesuada aliquet enim erat viverra mattis quis habitant leo. Neque auctor et nisi maecenas turpis venenatis.',
  text: 'FINALIZADO',
  enviadoEm: '26/10/2023',
  clicavel: false,
  variant: 'secondaryDanger',
}

const agentEs: Projeto = {
  id: 'b483e5bd-fed7-4a24-ae34-d5539e9c1aa0',
  nome: 'AgentES',
  titulo: 'Projeto AgentES — Uma Inteligência Artificial do balacobaco',
  text: 'FINALIZADO',
  enviadoEm: '26/10/2023',
  clicavel: false,
  variant: 'secondaryDanger',
}

export class ProjetoService {
  private httpClient: HttpClientInterface

  constructor(httpClient: HttpClientInterface) {
    this.httpClient = httpClient
  }

  public async listarProjetos(): Promise<Projeto[]> {
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

  public async detalhesProjeto(
    id: string,
  ): Promise<ProjetoExpandidoApi & { NomeCoordenador: string }> {
    const projetoResponse = await this.httpClient.get<ProjetoResponse>(
      `/importacaoedital/projeto/${id}?$expand=edital,coordenadores`,
    )
    const projeto = projetoResponse.value[0]
    projeto.StatusProjeto = projeto.StatusProjeto.replaceAll(/_/g, ' ')
    projeto.DataInicio = dayjs(projeto.DataInicio).format('DD/MM/YYYY')
    const coordenadorResponse =
      await this.httpClient.get<CoordenadorResponse>('/portalfapes/meuperfil')
    const coordenador = coordenadorResponse.value

    return {
      ...projeto,
      NomeCoordenador: coordenador.dadosPessoais.nome,
    }
  }

  public async listarInformesProjetos(): Promise<InformeProjeto[]> {
    return [
      {
        projeto: conectaFapes,
        itens: [
          {
            quantidade: 2,
            mensagem: 'solicitações de bolsa foram',
            status: 'reprovada',
          },
          {
            quantidade: 2,
            mensagem: 'solicitações de bolsa estão',
            status: 'sob avaliação',
          },
          {
            quantidade: 2,
            mensagem: 'bolsas estão próximas do',
            status: 'fim da vigência',
          },
        ],
        tipo: 'aviso',
      },
      {
        projeto: agentEs,
        itens: [
          {
            quantidade: 1,
            mensagem: 'solicitação de bolsa foi',
            status: 'reprovada',
          },
        ],
        tipo: 'aviso',
      },
      {
        projeto: smartHub,
        itens: ['O prazo para prestação de contas (20/04/2025) se encerra em 11 dias.'],
        tipo: 'normal',
      },
    ]
  }

  public async listarPrazos(): Promise<Prazo[]> {
    return [
      {
        data: '20/04',
        mensagem: 'prazo final para prestação de contas.',
      },
      {
        data: '25/04',
        mensagem:
          'vigência de bolsista João termina no Projeto Conecta Fapes: Uma plataforma de apoio à Pesquisa, Desenvolvimento e Inovação.',
      },
      {
        data: '05/05',
        mensagem: 'prazo final solicitação de bolsas com início de vigência em maio.',
      },
    ]
  }
}
