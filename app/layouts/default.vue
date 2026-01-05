<script setup>
import JamLogo from "@/assets/img/jam.png";
const nav = [
  { name: "About", href: "/about" },
  { name: "Vision", href: "/vision" },
  { name: "Values", href: "/values" },
  { name: "Register", href: "/register" },
];
</script>

<template>
  <div class="">
    <div class="flex min-h-screen flex-col bg-[#fdf4ee]">
      <UiContainer class="navbar z-10 md:mt-10">
        <ul class="flex justify-center">
          <Motion
            class="hidden md:mr-10 md:flex"
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
                class="font-lazy block py-4 text-lg font-medium hover:underline"
              >
                {{ item.name }}
              </NuxtLink>
            </Motion>
          </li>
        </ul>
      </UiContainer>

      <div class="page-wrapper">
        <slot />
      </div>
      <AppFooter />
    </div>
  </div>
</template>

<style>
.router-link-active {
  text-decoration: underline;
}
</style>
