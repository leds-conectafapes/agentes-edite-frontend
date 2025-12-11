import type { IQtdModalidadeBolsa } from '../../api/types'

export type Modalidade = IQtdModalidadeBolsa['modalidades']

export type Valores = {
  [sigla: string]: {
    valor: number;
  };
}
