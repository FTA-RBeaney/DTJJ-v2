<script setup>
import JamLogo from "@/assets/img/jam.png";
const nav = [
  { name: "About", href: "/about" },
  { name: "Vision", href: "/vision" },
  { name: "Values", href: "/values" },
];
</script>

<template>
  <div class="min-h-screen bg-[#fdf4ee]">
    <Motion
      class="relative top-0 left-0 z-50 mx-auto pt-6"
      :initial="{
        backgroundColor: 'rgba(255,255,255,0)',
        boxShadow: '0 0 0 rgba(0,0,0,0)',
      }"
    >
      <UiContainer class="navbar">
        <ul class="flex justify-center">
          <Motion
            class="mr-10"
            :initial="{
              opacity: 0,
              y: -80,
            }"
            :animate="{
              opacity: 1,
              y: 0,
            }"
            :transition="{ type: 'spring', stiffness: 200, damping: 25 }"
            :whileHover="{
              x: [0, -6, 6, -4, 4, 0],
              rotate: [0, -2, 2, -1, 1, 0],
              transition: { duration: 0.5 },
            }"
          >
            <NuxtLink to="/" class="block h-20">
              <img :src="JamLogo" class="h-full object-cover" />
            </NuxtLink>
          </Motion>
          <li
            v-for="(item, index) in nav"
            :key="index"
            class="mr-6 inline-block"
          >
            <Motion :whileHover="{ scale: 1.1 }">
              <NuxtLink
                :to="item.href"
                class="block py-4 text-lg font-medium hover:underline"
              >
                {{ item.name }}
              </NuxtLink>
            </Motion>
          </li>
        </ul>
      </UiContainer>
    </Motion>
    <div class="mt-10">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>

<style>
.router-link-active {
  text-decoration: underline;
}
</style>
