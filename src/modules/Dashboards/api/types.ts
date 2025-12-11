import type { Projeto } from '@/common/types/projects'

export type ApiPagination = {
  Total: number
  TotalPages: number
  Page: number
  Size: number
}

export type ApiPaginationResponse<T> = {
  Data: T | T[]
} & ApiPagination

export type IBolsistaPorTempo = {
  projetoId: string
  mesReferencia: string
  qtdAtivos: number
  qtdSairam: number
  qtdEntraram: number
}

export type IBolsistaProjeto = {
  id: string
  nome: string
  possuiReducaoBolsa: boolean
  status: number
  siglaBolsa: string
  cotasPagas: number
  cotasAPagar: number
  valorBolsa: number
  valorAPagar: number
  coordenadorAtual: boolean
  alocacaoBolsistaProjetoId: string
  alocacaoBolsistaPessoaId: string
}

export type IBolsistasPagoPeriodoProjeto = {
  projetoId: string
  mes: string
  ano: string
  valorPago: number
  valorPlanejado: number
  bolsistasPagos: {
    id: string
    dataInicio: string
    dataPrevistaFimAtividade: string
    dataFimAtividade: string
    dataSolicitacaoCancelamento: string
    possuiReducaoBolsa: boolean
    qtdeCotasAlocadas: number
    qtdeCotasPagasPreImportacao: number
    status: number
    idSigfapes: string
    matricula: string
  }
}

export type IGeralInfosProjeto = {
  Id: string
  qtdBolsistasAtivos: number
  qtdBolsistasSuspensos: number
  qtdBolsistasCancelados: number
  qtdBolsistasDocumentacaoPendente: number
  qtdBolsistasPendentesAvaliacao: number
}

export type ISaldoCotasProjeto = {
  projetoId: string
  sigla: string
  qtdPlanejada: number
  qtdAocada: number
  qtdDisponivel: number
  valorUnitario: number
  versaoNivelId: string
}

export type Modalidade = {
  sigla: string
  valor: number
  quantidade: number
}

export type IQtdModalidadeBolsa = {
  id: string
  nome: string
  projetoEditalId: string
  modalidades: Modalidade[]
}

export type Series = {
  nome: string
  data: number | number[]
  bolsistas?: unknown
}

export type Resultado = {
  valorPago: number
  valorAlocado: number
  valorPlanejado: number
  bolsistas: unknown
  bolsistasAlocados: number
  cotasPlanejadas: number
}

export type DashboardServiceInterface = {
  getGeralInfoProjeto: () => Promise<IGeralInfosProjeto[]>
  getInfoProjetoById: (id: string) => Promise<IGeralInfosProjeto>
  getBolsistaProjeto: () => Promise<IBolsistaProjeto[]>
  getBolsistaProjetoByProjetoId: (id: string) => Promise<ApiPaginationResponse<IBolsistaProjeto>>
  getBolsistaPorTempo: () => Promise<IBolsistaPorTempo[]>
  getBolsistasPagosPeriodoProjeto: () => Promise<
    ApiPaginationResponse<IBolsistasPagoPeriodoProjeto>
  >
  getSaldoCotasProjeto: () => Promise<ApiPaginationResponse<ISaldoCotasProjeto>>
  getQtdModalidadeBolsa: () => Promise<ApiPaginationResponse<IQtdModalidadeBolsa>>
  getQtdModalidadeBolsaById: (id: string) => Promise<IQtdModalidadeBolsa>
  listarProjetos: () => Promise<Projeto[]>
}
