import type { VariantName } from '@/common/types/styleTypes'

export type ProjetoApi = {
  nome: string;
  dataInicio: string;
  status: 'EM_ANDAMENTO' | 'CANCELADO';
  id: string;
}

export type EditalExpandidoApi = {
  Nome: string;
  DataCriacao: string;
  DataUltimaSincronizacao: null;
  IdSigFapes: number;
  Status: string;
  StatusImportacao: string;
  InscricaoGenerica: string;
  Processo: string;
  Id: string;
}

export type CoordenadorExpandidoApi = {
  DataInicio: string;
  DataFim: string;
  Id: string;
}

export type ProjetoExpandidoApi = {
  Nome: string;
  OrcamentoTotal: null;
  DataInicio: string;
  DataFimPrevistaAtividade: string;
  IdSigFapes: number;
  AlocacoesCompletas: number;
  StatusProjeto: string;
  StatusPreenchimento: string;
  Id: string;
  Edital: EditalExpandidoApi;
  Coordenadores: CoordenadorExpandidoApi[];
}

export enum ProjetoStatus {
  'EM ANDAMENTO' = 0,
  'FINALIZADO' = 1,
}

export enum ProjetoStatusVariant {
  'EM ANDAMENTO' = 'successOutline',
  'FINALIZADO' = 'secondaryDanger',
  'CANCELADO' = 'secondary',
}

export type Projeto = {
  id: string;
  nome: string;
  titulo: string;
  enviadoEm: string;
  clicavel: boolean; // Projeto.text === 'EM ANDAMENTO'
  text: string;
  variant: VariantName;
}

export type InformeProjeto = {
  projeto: Projeto;
  itens: (
    | {
      quantidade: number;
      mensagem: string;
      status: 'reprovada' | 'sob avaliação' | 'fim da vigência';
    }
    | string
  )[];
  tipo: 'aviso' | 'normal';
}

export type Prazo = {
  data: string;
  mensagem: string;
}

type MockApiValue = { id: string }
export type MockApiValueWithProps<T> = (T & MockApiValue)[]

// usar interface ?
// export type MockProjetosResponse = (Projeto & MockApiValue)[]

// export type MockInformeResponse = (InformeProjeto & MockApiValue)[]

// export type MockPrazosResponse = (Prazo & MockApiValue)[]

export type ProjetosResponse = {
  value: ProjetoApi[];
  isSuccess: boolean;
  isFailure: boolean;
  type: null;
  errors: unknown[];
}

export type ProjetoResponse = {
  '@odata.context': string;
  'value': ProjetoExpandidoApi[];
}

export type CoordenadorResponse = {
  value: {
    dadosPessoais: {
      nome: string;
    };
  };
  isSuccess: boolean;
  isFailure: boolean;
  type: null;
  errors: unknown[];
}
