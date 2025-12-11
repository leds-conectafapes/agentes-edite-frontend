import type { Ref } from 'vue'

import { useQueryClient } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import dayjs from 'dayjs'
import { useField, useForm } from 'vee-validate'
import { watch } from 'vue'

import type { GetMeuPerfilResponse } from '@/modules/portalCoordenador/entities/meuPerfilEntity'

import { router } from '@/common/router'
import { useSnackbarStore } from '@/common/store/snackbarStore'
import { meuPerfilSchema, type TMeuPerfil } from '@/modules/portalCoordenador/resources/MeuPerfil/composables/useValidacaoMeuPerfil'

import { useUpdateMyProfileMutation } from './myProfileMutation'

type UseMeuPerfilFormProps = {
  initialValues?: Ref<GetMeuPerfilResponse, GetMeuPerfilResponse> | Ref<undefined, undefined>;
  onError?: (error: unknown) => void;
}

export type MeuPerfilFormFields = ReturnType<typeof UseMeuPerfilForm>['fields']

export function UseMeuPerfilForm({ initialValues, onError }: UseMeuPerfilFormProps = {}) {
  const { mutateAsync: updateMyProfile, isPending } = useUpdateMyProfileMutation()
  const snackbar = useSnackbarStore()
  const queryClient = useQueryClient()

  const {
    handleSubmit: handleFormSubmit,
    errorBag: errors,
    isSubmitting,
    resetForm,
  } = useForm<TMeuPerfil>({
    validationSchema: toTypedSchema(meuPerfilSchema),
  })

  const handleSubmit = handleFormSubmit(
    async (values) => {
      try {
        await updateMyProfile(values)

        queryClient.invalidateQueries({ queryKey: ['GET_MY_PROFILE'] })

        snackbar.show('O perfil foi salvo com sucesso!', 'success')

        await new Promise<void>((resolve) => {
          let timeoutId: ReturnType<typeof setTimeout> | null = null
          const stop = watch(
            () => snackbar.visible,
            (visible) => {
              if (!visible) {
                if (timeoutId)
                  clearTimeout(timeoutId)
                stop()
                resolve()
              }
            },
          )
          if (snackbar.timeout > 0) {
            timeoutId = setTimeout(() => {
              stop()
              resolve()
            }, snackbar.timeout)
          }
        })

        router.push({ name: 'home' })
      } catch (error) {
        onError?.(error)
        snackbar.show(
          'Erro ao salvar perfil. Preencha os dados corretamente.',
          'danger',
          undefined,
          0,
        )
      }
    },

    (validationError: unknown) => {
      onError?.(validationError)
      snackbar.show('Erro. Preencha os dados corretamente!', 'danger', undefined, 0)
    },
  )

  const fields = {
    // Dados pessoais
    dadosPessoais: {
      nome: useField<string>('dadosPessoais.nome'),
      cpf: useField<string>('dadosPessoais.cpf'),
      dataNascimento: useField<string>('dadosPessoais.dataNascimento'),
      email: useField<string>('dadosPessoais.email'),
      celular: useField<string>('dadosPessoais.celular'),
      sexo: useField<string>('dadosPessoais.sexo'),
      raca: useField<string>('dadosPessoais.raca'),
      nivelAcademico: useField<string>('dadosPessoais.nivelAcademico'),
      curriculoLattesUrl: useField<string>('dadosPessoais.curriculoLattesUrl'),
    },

    // Endereço residencial
    enderecoResidencial: {
      pais: useField<string>('enderecoResidencial.pais', {
        initialValue: 'Brasil',
      }),
      logradouro: useField<string>('enderecoResidencial.logradouro'),
      numero: useField<string>('enderecoResidencial.numero'),
      complemento: useField<string>('enderecoResidencial.complemento'),
      cep: useField<string>('enderecoResidencial.cep'),
      bairro: useField<string>('enderecoResidencial.bairro'),
      municipio: useField<string>('enderecoResidencial.municipio'),
      ufLocalidade: useField<string>('enderecoResidencial.ufLocalidade'),
      ehEnderecoDeCorrespondencia: useField<boolean>(
        'enderecoResidencial.ehEnderecoDeCorrespondencia',
        undefined,
        {
          initialValue: true,
        },
      ),
      telefone: useField<string>('enderecoResidencial.telefone'),
    },

    // Endereço profissional
    enderecoProfissional: {
      pais: useField<string>('enderecoProfissional.pais', {
        initialValue: 'Brasil',
      }),
      logradouro: useField<string>('enderecoProfissional.logradouro'),
      numero: useField<string>('enderecoProfissional.numero'),
      complemento: useField<string>('enderecoProfissional.complemento'),
      cep: useField<string>('enderecoProfissional.cep'),
      bairro: useField<string>('enderecoProfissional.bairro'),
      municipio: useField<string>('enderecoProfissional.municipio'),
      ufLocalidade: useField<string>('enderecoProfissional.ufLocalidade'),
      ehEnderecoDeCorrespondencia: useField<boolean>(
        'enderecoProfissional.ehEnderecoDeCorrespondencia',
        undefined,
        {
          initialValue: false,
        },
      ),
      telefone: useField<string>('enderecoProfissional.telefone'),
    },

    // Dados bancários
    dadosBancarios: {
      banco: useField<string>('dadosBancarios.banco'),
      agencia: useField<string>('dadosBancarios.agencia', undefined, {
        initialValue: '',
      }),
      conta: useField<string>('dadosBancarios.conta', undefined, {
        initialValue: '',
      }),
    },

    statusCadastro: {
      ehCadastroCompleto: useField<boolean>('statusCadastro.ehCadastroCompleto'),
    },

    solicitacaoCadastroBanestes: {
      codigoAgenciaDesejada: useField<string>(
        'solicitacaoCadastroBanestes.codigoAgenciaDesejada',
        undefined,
        {
          initialValue: undefined,
        },
      ),
      solicitacaoCadastroBanestesPessoaId: useField<string>(
        'solicitacaoCadastroBanestes.solicitacaoCadastroBanestesPessoaId',
        undefined,
        {
          initialValue: '5b356d32-9eab-4626-98f0-79b35c00eea0',
        },
      ),
      status: useField<string>('solicitacaoCadastroBanestes.status', undefined, {
        initialValue: 'PENDENTE',
      }),
    },

    ehPossivelSolicitarCadastroNoBanestes: useField<boolean>(
      'ehPossivelSolicitarCadastroNoBanestes',
    ),
  }

  watch(
    () => initialValues?.value?.value,
    async (newVal) => {
      if (newVal) {
        const formattedValues = {
          ...newVal,
          dadosPessoais: {
            ...newVal.dadosPessoais,
            dataNascimento: newVal.dadosPessoais?.dataNascimento
              ? dayjs(newVal.dadosPessoais.dataNascimento).utc().format('YYYY-MM-DD')
              : '',
          },
        }

        resetForm({ values: formattedValues })
      }
    },
    { immediate: true },
  )

  return {
    handleSubmit,
    errors,
    fields,
    isSubmitting: isSubmitting || isPending,
  }
}
