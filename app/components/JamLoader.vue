<script lang="ts" setup>
import JamLogo from "@/assets/img/jam.png";
</script>

<template>
  <div
    class="fixed top-0 left-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-[#fdf4ee]"
  >
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
      <Motion
        :animate="{
          x: [0, -4, 4, -3, 3, 0],
          rotate: [0, -1.5, 1.5, -0.8, 0.8, 0],
        }"
        :transition="{ duration: 0.5, repeat: Infinity, repeatDelay: 1.5 }"
      >
        <NuxtLink to="/meet-the-team" class="block h-32">
          <img :src="JamLogo" class="h-full object-cover" />
        </NuxtLink>
      </Motion>
    </Motion>

    <h1 class="mt-8 text-4xl font-bold">Making the jam...</h1>
  </div>
</template>
