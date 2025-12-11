import { reactive } from 'vue'

export enum cadastroBanestes {
  PENDENTE = 'PENDENTE',
  ENVIADO = 'ENVIADO',
  CADASTRADO = 'CADASTRADO',
  CANCELADO = 'CANCELADO',
}

export enum SexoEnum {
  Masculino = 'Masculino',
  Feminino = 'Feminino',
  NaoInformado = 'Nao_informado',
}

export enum RacaCorEnum {
  NaoDeclarada = 'Nao_declarada',
  Branca = 'Branca',
  Preta = 'Preta',
  Parda = 'Parda',
  Amarela = 'Amarela',
  Indigena = 'Indigena',
}

export enum nivelAcademicoEnum {
  NaoInformado = 'Nao_informado',
  EnsinoFundamental = 'Ensino_fundamental',
  EnsinoMedio = 'Ensino_medio',
  EnsinoSuperior = 'Ensino_superior',
  Especializacao = 'Especializacao',
  Mestrado = 'Mestrado',
  Doutorado = 'Doutorado',
  PosDoutorado = 'Pos_doutorado',
}

export enum EstadosEnum {
  ES = 'ES',
}

export const SelectSexo = reactive([
  { label: 'Não informado', value: SexoEnum.NaoInformado },
  { label: 'Masculino', value: SexoEnum.Masculino },
  { label: 'Feminino', value: SexoEnum.Feminino },
])

export const SelectRacaCor = reactive([
  { label: 'Não declarada', value: RacaCorEnum.NaoDeclarada },
  { label: 'Branca', value: RacaCorEnum.Branca },
  { label: 'Preta', value: RacaCorEnum.Preta },
  { label: 'Parda', value: RacaCorEnum.Parda },
  { label: 'Amarela', value: RacaCorEnum.Amarela },
  { label: 'Indígena', value: RacaCorEnum.Indigena },
])

export const SelectNivelAcademico = reactive([
  { label: 'Não informado', value: nivelAcademicoEnum.NaoInformado },
  { label: 'Ensino fundamental', value: nivelAcademicoEnum.EnsinoFundamental },
  { label: 'Ensino médio', value: nivelAcademicoEnum.EnsinoMedio },
  { label: 'Ensino superior', value: nivelAcademicoEnum.EnsinoSuperior },
  { label: 'Especialização', value: nivelAcademicoEnum.Especializacao },
  { label: 'Mestrado', value: nivelAcademicoEnum.Mestrado },
  { label: 'Doutorado', value: nivelAcademicoEnum.Doutorado },
  { label: 'Pós-doutorado', value: nivelAcademicoEnum.PosDoutorado },
])

export const SelectEstado = reactive([{ label: 'Espírito Santo', value: EstadosEnum.ES }])

export const SelectMunicipioES = reactive(
  ['Águia Branca', 'Alegre', 'Vila Velha', 'Vitória'].map(municipio => ({
    label: municipio,
    value: municipio,
  })),
)

export enum agenciasBanestesEnum {
  JardimCamburi = '0044',
  VilaVelha = '0091',
  Gloria = '0101',
  Viana = '0092',
}

export const SelectAgencias = reactive([
  {
    label: '0084 - Agência de Negócios Esplanada, Vitória',
    value: agenciasBanestesEnum.JardimCamburi,
  },

  {
    label: '0091 - Agência de Negócios Vila Velha',
    value: agenciasBanestesEnum.VilaVelha,
  },
  {
    label: '0101 - Agência de Negócios Glória, Vitória',
    value: agenciasBanestesEnum.Gloria,
  },
  {
    label: '0092 - Agência de Negócios Viana',
    value: agenciasBanestesEnum.Viana,
  },
])
