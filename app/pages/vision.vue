<script setup>
import { VISION } from "@/constants/vision";

import JamSplat from "@/assets/img/jam-splat-trans.svg";
</script>

<template>
  <div>
    <UiContainer class="!max-w-3xl">
      <h1 class="my-16 text-center text-7xl font-bold tracking-wider">
        Our vision...
      </h1>
    </UiContainer>
    <UiContainer class="!max-w-4xl py-14">
      <div class="wpb_wrapper">
        <p v-for="(paragraph, index) in VISION" :key="index" class="mb-6">
          {{ paragraph }}
        </p>
      </div>
    </UiContainer>
    <UiContainer>
      <Motion
        :whileInView="{ opacity: 1, scale: 1 }"
        :inViewOptions="{ once: true }"
        :initial="{ opacity: 0, scale: 0 }"
        :transition="{
          duration: 0.4,
          scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
        }"
      >
        <JamSplat class="text-primary fill-primary mx-auto h-24 w-auto" />
      </Motion>
    </UiContainer>
  </div>
</template>
