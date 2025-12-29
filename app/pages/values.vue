<script setup>
import { values } from "@/constants/values";

import DripTransparent from "@/assets/img/drip-transparent.png";
</script>

<template>
  <div>
    <UiContainer class="!max-w-3xl">
      <h1 class="mt-12 mb-0 text-center text-7xl font-bold tracking-wider">
        Values
      </h1>
    </UiContainer>
    <!-- <div class="relative h-[400px]">
      <img
        :src="JeffAndPolina"
        alt="Jeff and Polina"
        class="mx-auto h-[400px] w-full rounded-lg bg-fixed object-cover object-center shadow-lg"
      />

    </div> -->

    <div class="gap-6">
      <section v-for="(value, index) in values" :key="index">
        <div class="py-12">
          <UiContainer class="!max-w-3xl">
            <h2 class="mb-6 text-center text-5xl font-semibold">
              {{ value.title }}
            </h2>
            <p v-for="(item, i) in value.content" :key="i" class="mb-4 text-sm">
              {{ item }}
            </p>
          </UiContainer>
        </div>
        <UiContainer v-if="index !== values.length - 1" class="!max-w-3xl">
          <img
            :src="DripTransparent"
            alt="Decorative drip"
            class="mx-auto h-24 w-auto"
          />
          <!-- <UiSeparator class="my-10" /> -->
        </UiContainer>
      </section>
    </div>
  </div>
</template>

<style scoped>
p {
  margin-bottom: 1rem;
}
</style>
