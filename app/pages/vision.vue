<script setup>
import { VISION } from "@/constants/vision";
</script>

<template>
  <div>
    <UiContainer class="!max-w-3xl">
      <h1 class="mt-12 mb-0 text-center text-7xl font-bold tracking-wider">
        Our vision...
      </h1>
    </UiContainer>
    <UiContainer class="!max-w-3xl py-14">
      <div class="wpb_wrapper">
        <p v-for="(paragraph, index) in VISION" :key="index" class="mb-6">
          {{ paragraph }}
        </p>
      </div>
    </UiContainer>
  </div>
</template>
