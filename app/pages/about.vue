<script setup>
import Logo from "@/assets/img/logo.png";

const ABOUT = [
  "Downtown Jazz Jam is a London Swing Dance festival that celebrates the vibrant culture of swing dancing through live music, dance workshops, and social events.",
  "The first edition will be centred around celebrating the rich history of swing dance in London, with a focus on the people and communities that have shaped the scene over the years.",
  "Our mission is to create an inclusive and welcoming environment for dancers of all levels to come together and share their love of swing dance.",
];
</script>

<template>
  <div>
    <UiContainer class="!max-w-3xl">
      <img :src="Logo" alt="Jam Logo" class="mx-auto h-32 w-auto" />
      <h1 class="mt-12 mb-0 text-center text-7xl font-bold tracking-wider">
        About
      </h1>
    </UiContainer>
    <UiContainer class="!max-w-3xl py-14 text-center">
      <div class="wpb_wrapper">
        <p v-for="(paragraph, index) in ABOUT" :key="index" class="mb-6">
          {{ paragraph }}
        </p>
      </div>
    </UiContainer>
  </div>
</template>
