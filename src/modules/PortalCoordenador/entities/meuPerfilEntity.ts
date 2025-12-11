import type { TMeuPerfil } from '../meuPerfil/composables/useValidacaoMeuPerfil'

export type ApiPagination = {
  Total: number
  TotalPages: number
  Page: number
  Size: number
}

export type ApiPaginationResponse<T> = {
  Data: T[]
} & ApiPagination

export type IMeuPerfil = {
  nome: string
  cpf: string
  dataNascimento: string
  email: string
  celular: string
  sexo: string
  raca: string
  curriculoLattesUrl: string
  nivelAcademico: string

  enderecoResidencial: {
    pais: string
    logradouro: string
    numero: string
    complemento: string
    cep: string
    bairro: string
    municipio: string
    ufLocalidade: string
    ehEnderecoDeCorrespondencia: boolean
    telefone: string
    id: string
  }

  enderecoProfissional: {
    pais: string
    logradouro: string
    numero: string
    complemento: string
    cep: string
    bairro: string
    municipio: string
    ufLocalidade: string
    ehEnderecoDeCorrespondencia: boolean
    telefone: string
    id: string
  }

  dadosBancarios: {
    conta: number | null
    agencia: number | null
    banco: string
    id: string
  }

  statusCadastro: {
    ehCadastroCompleto: boolean
  }

  solicitacaoCadastroBanestes: {
    id: string
    codigoAgenciaDesejada: string
    solicitacaoCadastroBanestesPessoaId: string
    status: string
  }

  ehPossivelSolicitarCadastroNoBanestes: boolean
}

export type GetMeuPerfilResponse = {
  value: TMeuPerfil
}

export type MeuPerfilServiceInterface = {
  getMeuPerfil: () => Promise<GetMeuPerfilResponse>
  saveMeuPerfil: (data: TMeuPerfil) => Promise<IMeuPerfil>
}
