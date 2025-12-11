import { z } from 'zod'

import { nivelAcademicoEnum, RacaCorEnum, SexoEnum } from '@/common/constants/selectOptionsMeuPerfil'

export const meuPerfilSchema = z.object({
  dadosPessoais: z.object({
    id: z.string().optional(),

    nome: z.string().min(2, 'Nome deve ser maior que 2 caracteres'),

    cpf: z.string().length(11, 'CPF deve ter 11 dígitos'),

    dataNascimento: z.string().superRefine((val, ctx) => {
      if (new Date(val) > new Date()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Data de nascimento não pode ser no futuro',
        })
      } else if (new Date(val) < new Date('1900-01-01')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Data de nascimento deve ser posterior a 01/01/1900',
        })
      }
    }),

    email: z.string().email('Email inválido'),

    celular: z.string().regex(/^\d{11}$/, 'O celular deve conter 11 dígitos numéricos'),

    sexo: z.nativeEnum(SexoEnum, { errorMap: () => ({ message: 'Sexo inválido' }) }),

    raca: z.nativeEnum(RacaCorEnum, { errorMap: () => ({ message: 'Raça inválida' }) }),

    curriculoLattesUrl: z
      .string()
      .regex(/^http?:\/\/(?:www\.)?lattes\.cnpq\.br\/\d{16}\/?$/, 'Currículo Lattes inválido'),

    nivelAcademico: z.nativeEnum(nivelAcademicoEnum, {
      errorMap: () => ({ message: 'Nível acadêmico inválido' }),
    }),
  }),

  enderecoResidencial: z.object({
    pais: z.string().nonempty('País é obrigatório'),

    logradouro: z.string().superRefine((val, ctx) => {
      if (val.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 3,
          type: 'string',
          inclusive: true,
          message: 'Logradouro deve conter pelo menos 3 caracteres',
        })
      } else if (val.length > 100) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: 100,
          type: 'string',
          inclusive: true,
          message: 'Logradouro deve conter no máximo 100 caracteres',
        })
      } else if (!/^[\p{L}0-9\s'.\-]+$/u.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'O logradouro deve conter apenas letras, números, espaços, hífens ou apóstrofos',
        })
      }
    }),

    numero: z.string().regex(/^\d+$/, 'Número deve ser um valor numérico positivo'),

    complemento: z.string().nonempty('Complemento é obrigatório'),

    cep: z.string().regex(/^\d{8}$/, 'CEP deve conter exatamente 8 dígitos'),

    bairro: z.string().nonempty('Bairro é obrigatório'),

    municipio: z.string().nonempty('Município é obrigatório'),

    ufLocalidade: z.string().nonempty('Estado é obrigatório'),

    ehEnderecoDeCorrespondencia: z.boolean().default(true),

    telefone: z
      .string()
      .regex(/^\d{10,11}$/, 'O telefone deve conter apenas números e ter 10 ou 11 dígitos'),

    id: z.string().optional(),
  }),

  statusCadastro: z.object({
    ehCadastroCompleto: z.boolean().optional(),
  }),

  ehPossivelSolicitarCadastroNoBanestes: z.boolean().default(false).optional(),
})

export type TMeuPerfil = z.infer<typeof meuPerfilSchema>
