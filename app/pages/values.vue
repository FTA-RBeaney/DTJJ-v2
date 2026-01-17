<script setup>
import { values } from "@/constants/values";

import JamSplat from "@/assets/img/jam-splat-trans.svg";
import imageFour from "@/assets/img/imageFour.webp";
</script>

<template>
  <div>
    <ClientOnly>
      <div
        class="relative h-[400px] bg-cover bg-fixed bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${imageFour})` }"
      >
        <div
          class="absolute inset-0 flex items-center justify-center bg-black/50"
        >
          <h1
            class="px-4 text-center text-5xl font-bold text-white lg:text-7xl"
          >
            Our Values
          </h1>
        </div>
      </div>
    </ClientOnly>
    <!-- <UiContainer class="!max-w-3xl">
      <h1 class="my-16 text-center text-7xl font-bold tracking-wider">
        Values
      </h1>
    </UiContainer> -->
    <!-- <div class="relative h-[400px]">
      <img
        :src="JeffAndPolina"
        alt="Jeff and Polina"
        class="mx-auto h-[400px] w-full rounded-lg bg-fixed object-cover object-center shadow-lg"
      />

    </div> -->

    <div class="gap-6">
      <section v-for="(value, index) in values" :key="index">
        <div class="py-6 lg:py-12">
          <UiContainer class="!max-w-4xl">
            <h2 class="mb-6 text-center text-4xl font-semibold">
              {{ value.title }}
            </h2>
            <p v-for="(item, i) in value.content" :key="i" class="mb-4">
              {{ item }}
            </p>
          </UiContainer>
        </div>
        <UiContainer v-if="index !== values.length - 1" class="!max-w-3xl">
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
      </section>
    </div>
  </div>
</template>

<style>
svg path {
  width: 100%;
  height: 100%;
}
</style>
