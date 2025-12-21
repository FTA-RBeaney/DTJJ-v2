<script setup>
import JamLogo from "@/assets/img/jam.png";
const nav = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Meet the Team", href: "/meet-the-team" },
  { name: "Values", href: "/values" },
  { name: "Code of Conduct", href: "/code-of-conduct" },
  // { name: "Schedule", href: "/timetable" },
  { name: "Register", href: "/register" },
  { name: "Account", href: "/account" },
  { name: "Admin", href: "/attendees" },
];

// navbar scroll state: transparent at top, white when scrolled
const scrolled = ref(false);

// onMounted(() => {
//   onScroll();
//   window.addEventListener("scroll", onScroll, { passive: true });
// });

// onBeforeUnmount(() => {
//   window.removeEventListener("scroll", onScroll);
// });

const navAnimate = computed(() =>
  scrolled.value
    ? {
        backgroundColor: "rgba(255,255,255,1)",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      }
    : {
        backgroundColor: "rgba(255,255,255,0)",
        boxShadow: "0 0 0 rgba(0,0,0,0)",
      }
);
// Use a fast tween when hiding the shadow (scroll -> top), and a spring when showing it.
const navTransition = computed(() =>
  scrolled.value
    ? { type: "spring", stiffness: 200, damping: 25 }
    : { type: "tween", duration: 0.08, ease: "easeOut" }
);
</script>

<template>
  <div class="min-h-screen bg-[#fdf4ee]">
    <Motion
      class="relative top-0 left-0 z-50 mx-auto pt-6"
      :initial="{
        backgroundColor: 'rgba(255,255,255,0)',
        boxShadow: '0 0 0 rgba(0,0,0,0)',
      }"
      :animate="navAnimate"
      :transition="navTransition"
    >
      <UiContainer class="navbar">
        <Motion
          class="absolute"
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
        <ul class="flex justify-center">
          <li
            v-for="(item, index) in nav"
            :key="index"
            class="mr-6 inline-block"
          >
            <Motion :whileHover="{ scale: 1.1 }">
              <NuxtLink
                :to="item.href"
                class="block py-4 text-lg font-medium hover:underline"
                :class="[scrolled ? 'text-black' : 'text-black']"
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
