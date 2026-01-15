<script lang="ts" setup>
import JamLogo from "@/assets/img/jam.png";
import { useColorScheme, COLOR_SCHEMES } from "@/composables/useColorScheme";
const { selectedScheme, setColorScheme, getSchemeColor } = useColorScheme();

definePageMeta({
  layout: "fullscreen",
  title: "Welcome to the jam",
});

const jamChosen = (key: string) => {
  setColorScheme(key);
  navigateTo("/about");
};
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

    <h1 class="mt-8 text-6xl font-bold">Welcome</h1>
    <div>
      <h2 class="text-center text-2xl">What's your jam?</h2>
      <div class="mt-4 grid grid-cols-2 gap-2">
        <UiButton
          v-for="(scheme, key) in COLOR_SCHEMES"
          :key="key"
          :title="scheme.name"
          @click="jamChosen(key)"
          class="rounded-lg p-3 transition-all hover:scale-110"
          :class="
            selectedScheme === key ? 'ring-foreground ring-2 ring-offset-2' : ''
          "
          :style="{ backgroundColor: scheme.hex }"
          >{{ scheme.name }}</UiButton
        >
      </div>
    </div>
  </div>
</template>
