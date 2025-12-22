<script lang="ts" setup>
import JamLogo from "@/assets/img/jam.png";

definePageMeta({
  layout: "fullscreen",
  title: "Welcome to the jam",
});

setTimeout(() => {
  navigateTo("/about");
}, 3000);
</script>

<template>
  <div class="flex h-screen flex-col items-center justify-center">
    <Motion
      :initial="{
        opacity: 0,
        y: -400,
      }"
      :animate="{
        opacity: 1,
        y: 0,
      }"
      :transition="{
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 1.2,
      }"
      :whileHover="{
        x: [0, -6, 6, -4, 4, 0],
        rotate: [0, -2, 2, -1, 1, 0],
        transition: { duration: 0.5 },
      }"
    >
      <NuxtLink to="/about" class="block h-32">
        <img :src="JamLogo" class="h-full object-cover" />
      </NuxtLink>
    </Motion>

    <h1 class="mt-8 text-4xl font-bold">Welcome to the jam</h1>
  </div>
</template>
