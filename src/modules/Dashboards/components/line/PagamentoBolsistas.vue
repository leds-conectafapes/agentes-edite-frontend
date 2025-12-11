<template>
  <v-card elevation="10">
    <v-card-text class="pb-3">
      <div class="d-sm-flex align-center">
        <div>
          <h2 class="text-h4">
            Evolução dos pagamentos dos bolsistas
          </h2>
        </div>
        <v-spacer />
        <div v-if="pagamentos.length > 0" class="ml-auto">
          <v-select
            v-model="selectedAno"
            :items="anos"
            variant="outlined"
            dense
            hide-details
            data-test="selectAno"
            @update:model-value="getMeses"
          />
        </div>
      </div>
    </v-card-text>
    <v-col cols="12">
      <UiParentCard v-if="pagamentos.length > 0">
        <apexchart type="line" height="350" :options="chartOptions" class="clicavel" :series="series" @click="verDetalhes" />
      </UiParentCard>
      <v-card-text v-else class="text-center">
        <v-label>Não há dados para serem exibidos!</v-label>
      </v-card-text>
    </v-col>
  </v-card>
</template>
