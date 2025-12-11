import type { VariantName } from './styleTypes'

export type Projeto = {
  id: string;
  nome: string;
  titulo: string;
  enviadoEm: string;
  clicavel: boolean; // Projeto.text === 'EM ANDAMENTO'
  text: string;
  variant: VariantName;
}

export type ProjetosResponse = {
  value: ProjetoApi[];
  isSuccess: boolean;
  isFailure: boolean;
  type: null;
  errors: unknown[];
}

export type ProjetoApi = {
  nome: string;
  dataInicio: string;
  status: 'EM_ANDAMENTO' | 'CANCELADO';
  id: string;
}

export enum ProjetoStatusVariant {
  'EM ANDAMENTO' = 'successOutline',
  'FINALIZADO' = 'secondaryDanger',
  'CANCELADO' = 'secondary',
}
