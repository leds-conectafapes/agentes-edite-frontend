<script async setup lang="ts"></script>

// ===============================|| Ui Parent Card||=============================== //
<template>
  <v-card elevation="10">
    <v-card-item class="py-4 px-6">
      <div class="d-sm-flex align-center justify-space-between">
        <v-card-title class="text-h5">
          <slot name="title"></slot>
        </v-card-title>
        <slot name="action"></slot>
      </div>
    </v-card-item>
    <v-divider />
    <v-card-text>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>
