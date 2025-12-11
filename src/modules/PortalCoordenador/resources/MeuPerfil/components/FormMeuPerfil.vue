<script setup lang="ts">
import { GenericDatePicker } from '@leds-ifes/components'
import { ref } from 'vue'

import GenericButton from '@/common/components/buttons/GenericButton.vue'
import GenericCard from '@/common/components/cards/GenericCard.vue'
import Snackbar from '@/common/components/feedback/Snackbar.vue'
import Checkbox from '@/common/components/form/Checkbox.vue'
import DefaultInput from '@/common/components/form/DefaultInput.vue'
import Select from '@/common/components/form/Select.vue'
import { SelectNivelAcademico, SelectRacaCor, SelectSexo } from '@/common/constants/selectOptionsMeuPerfil'
import { UseMeuPerfilForm } from '@/modules/portalCoordenador/resources/MeuPerfil/composables/useMeuPerfilForm'
import { useMeuPerfilPage } from '@/modules/portalCoordenador/resources/MeuPerfil/composables/useMeuPerfilPage'

const { myProfile } = useMeuPerfilPage()

const { handleSubmit, fields, errors, isSubmitting } = UseMeuPerfilForm({
  initialValues: myProfile,
})

const checkedInformes = ref(true)
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="text-center mt-4 mb-4">
      <div class="mt-6 mb-6">
        <span class="text-3xl/[38px] font-semibold">Meu perfil</span>
      </div>
      <div class="mb-10">
        <legend class="text-gray-500">
          Aqui você pode visualizar e atualizar suas informações pessoais e de contato. Mantenha seu
          perfil sempre atualizado para garantir a comunicação eficaz.
        </legend>
      </div>
    </div>

    <form class="max-w-5xl flex flex-col items-center" @submit.prevent="handleSubmit">
      <GenericCard title="Dados pessoais" class="mb-8 ml-auto">
        <DefaultInput
          :field="fields.dadosPessoais.nome"
          type="search"
          label="Nome "
          placeholder="Insira seu nome"
          state="disabled"
          class="col-span-8"
          :error-messages="errors['dadosPessoais.nome']"
          data-testid="nome-input"
        />

        <DefaultInput
          :field="fields.dadosPessoais.cpf"
          type="text"
          label="CPF"
          placeholder="123.456.789-12"
          state="disabled"
          class="col-span-4"
          :error-messages="errors['dadosPessoais.cpf']"
          data-testid="cpf-input"
        />

        <DefaultInput
          :field="fields.dadosPessoais.email"
          type="text"
          label="E-mail "
          placeholder="conectaFapes@email.com"
          state="disabled"
          class="col-span-6"
          :error-messages="errors['dadosPessoais.email']"
          data-testid="email-input"
        />

        <div class="col-span-6">
          <GenericDatePicker
            v-model="fields.dadosPessoais.dataNascimento.value.value"
            label="Data de nascimento "
            placeholder="dd/mm/aaaa"
            :state="errors['dadosPessoais.dataNascimento'] ? 'error' : 'default'"
            class="col-span-6"
            :error-messages="errors['dadosPessoais.dataNascimento']"
          />
        </div>

        <DefaultInput
          :field="fields.dadosPessoais.celular"
          type="text"
          label="Celular "
          placeholder="(12) 34567-8912"
          class="col-span-4"
          data-testid="celular-input"
        />

        <Select
          v-model="fields.dadosPessoais.sexo.value.value"
          label="Sexo"
          :options="SelectSexo"
          option-label="label"
          option-value="value"
          placeholder="Selecione"
          :state="errors['dadosPessoais.sexo'] ? 'error' : 'default'"
          class="col-span-4"
          :error-messages="errors['dadosPessoais.sexo']"
          data-testid="sexo-select"
        />

        <Select
          v-model="fields.dadosPessoais.raca.value.value"
          label="Raça/Cor "
          :options="SelectRacaCor"
          placeholder="Selecione"
          :state="errors['dadosPessoais.raca'] ? 'error' : 'default'"
          class="col-span-4"
          :error-messages="errors['dadosPessoais.raca']"
          data-testid="raça-select"
        />

        <DefaultInput
          :field="fields.dadosPessoais.curriculoLattesUrl"
          type="text"
          label="Currículo Lattes "
          placeholder="https://lattes.cnpq.br/1234567890123456"
          :state="errors['dadosPessoais.curriculoLattesUrl'] ? 'error' : 'default'"
          class="col-span-6"
          :error-messages="errors['dadosPessoais.curriculoLattesUrl']"
          data-testid="lattes-input"
        />

        <Select
          v-model="fields.dadosPessoais.nivelAcademico.value.value"
          label="Nível acadêmico "
          :options="SelectNivelAcademico"
          placeholder="Selecione"
          :state="errors['dadosPessoais.nivelAcademico'] ? 'error' : 'default'"
          class="col-span-6"
          :error-messages="errors['dadosPessoais.nivelAcademico']"
          data-testid="nivelAcademico-select"
        />
      </GenericCard>

      <GenericCard title="Endereço" class="mb-8 ml-auto">
        <div class="col-span-12">
          <span class="text-xl font-medium text-gray-800">Endereço residencial</span>
        </div>

        <DefaultInput
          :field="fields.enderecoResidencial.pais"
          type="text"
          label="País "
          placeholder="Brasil"
          state="disabled"
          class="col-span-4"
          :error-messages="errors['enderecoResidencial.pais']"
        />

        <DefaultInput
          :field="fields.enderecoResidencial.cep"
          type="text"
          label="CEP "
          placeholder="123.456-78"
          :state="errors['enderecoResidencial.cep'] ? 'error' : 'default'"
          class="col-span-4"
          :error-messages="errors['enderecoResidencial.cep']"
        />

        <DefaultInput
          :field="fields.enderecoResidencial.ufLocalidade"
          label="Estado "
          placeholder="Selecione"
          state="disabled"
          class="col-span-4"
          :error-messages="errors['enderecoResidencial.ufLocalidade']"
        />

        <DefaultInput
          :field="fields.enderecoResidencial.municipio"
          label="Município "
          placeholder="Selecione"
          state="disabled"
          class="col-span-4"
          :error-messages="errors['enderecoResidencial.municipio']"
        />

        <DefaultInput
          :field="fields.enderecoResidencial.bairro"
          type="text"
          label="Bairro "
          placeholder="Insira seu bairro aqui"
          state="disabled"
          class="col-span-4"
          :error-messages="errors['enderecoResidencial.bairro']"
        />

        <DefaultInput
          :field="fields.enderecoResidencial.logradouro"
          type="text"
          label="Logradouro "
          placeholder="Insira seu logradouro aqui"
          state="disabled"
          class="col-span-4"
          :error-messages="errors['enderecoResidencial.logradouro']"
        />

        <DefaultInput
          :field="fields.enderecoResidencial.numero"
          type="text"
          label="Número "
          placeholder="1234"
          :state="errors['enderecoResidencial.numero'] ? 'error' : 'default'"
          class="col-span-2"
          :error-messages="errors['enderecoResidencial.numero']"
        />

        <DefaultInput
          :field="fields.enderecoResidencial.complemento"
          type="text"
          label="Complemento "
          placeholder="Insira seu complemento aqui"
          :state="errors['enderecoResidencial.complemento'] ? 'error' : 'default'"
          class="col-span-10"
          :error-messages="errors['enderecoResidencial.complemento']"
        />
      </GenericCard>
      <footer class="flex flex-col items-end w-full">
        <Checkbox
          v-model="checkedInformes"
          label="Desejo receber informativos da Fundação."
          class="self-start"
        />
        <div class="max-w-[9rem]">
          <GenericButton
            label="Salvar perfil"
            variant="primary"
            type="submit"
            class="cursor-pointer"
            :loading="isSubmitting"
            :disabled="isSubmitting"
          />
        </div>
      </footer>
    </form>

    <Snackbar />
  </div>
</template>
