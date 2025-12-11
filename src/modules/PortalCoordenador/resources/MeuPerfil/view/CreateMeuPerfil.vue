<script setup lang="ts">
import { reactive } from 'vue'

import type { IMeuPerfil } from '@/modules/portalCoordenador/entities/meuPerfilEntity'

import BackButton from '@/common/components/buttons/BackButton.vue'
import FormMeuPerfil from '@/modules/portalCoordenador/resources/MeuPerfil/components/FormMeuPerfil.vue'
import { useMeuPerfilPage } from '@/modules/portalCoordenador/resources/MeuPerfil/composables/useMeuPerfilPage'

const { onSubmit, navigateBack } = useMeuPerfilPage()

const form = reactive<IMeuPerfil>({
  nome: '' as string,
  cpf: '' as string,
  dataNascimento: ('' + 'T00:00:00+00:00') as string,
  email: '' as string,
  celular: '' as string,
  sexo: '' as string,
  raca: '' as string,
  curriculoLattesUrl: '' as string,
  nivelAcademico: '' as string,

  enderecoResidencial: {
    pais: '' as string,
    logradouro: '' as string,
    numero: '' as string,
    complemento: '' as string,
    cep: '' as string,
    bairro: '' as string,
    municipio: '' as string,
    ufLocalidade: '' as string,
    ehEnderecoDeCorrespondencia: true as boolean,
    telefone: '' as string,
    id: '' as string,
  },

  enderecoProfissional: {
    pais: '' as string,
    logradouro: '' as string,
    numero: '' as string,
    complemento: '' as string,
    cep: '' as string,
    bairro: '' as string,
    municipio: '' as string,
    ufLocalidade: '' as string,
    ehEnderecoDeCorrespondencia: false as boolean,
    telefone: '' as string,
    id: '' as string,
  },

  dadosBancarios: {
    conta: Number.NaN as number,
    agencia: Number.NaN as number,
    banco: '' as string,
    id: '' as string,
  },

  statusCadastro: {
    ehCadastroCompleto: false as boolean,
  },

  solicitacaoCadastroBanestes: {
    id: '' as string,
    codigoAgenciaDesejada: '' as string,
    solicitacaoCadastroBanestesPessoaId: '' as string,
    status: '' as string,
  },

  ehPossivelSolicitarCadastroNoBanestes: false as boolean,
})
</script>

<template>
  <BackButton />
  <FormMeuPerfil :form="form" @submitForm="onSubmit" @navigateBack="navigateBack" />
</template>
