<script setup lang="ts">
import Schedule from "@/assets/img/schedule.jpeg";
</script>

<template>
  <UiContainer class="mt-10 mb-20 max-w-4xl">
    <h1 class="mb-10 text-center text-5xl font-bold tracking-wider">
      Schedule
    </h1>
    <p class="text-center">
      (Please note: this is currently a rough schedule and is subject to change)
    </p>
    <img
      :src="Schedule"
      alt="Downtown Jazz Jam Schedule"
      class="mx-auto w-full max-w-4xl rounded-lg border-4 border-black shadow-lg"
    />
  </UiContainer>
</template>
