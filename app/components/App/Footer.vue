<script setup>
const footerLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Meet the team", href: "/meet-the-team" },
  { name: "Values", href: "/values" },
  { name: "Code of conduct", href: "/code-of-conduct" },
];
</script>

<template>
  <footer
    class="flex w-full flex-col items-center justify-around py-16 text-gray-800/70"
  >
    <UiContainer>
      <UiSeparator class="mb-8" />
    </UiContainer>
    <div class="flex flex-col items-center gap-8 md:flex-row">
      <NuxtLink v-for="link in footerLinks" :key="link.name" :href="link.href">
        {{ link.name }}
      </NuxtLink>
    </div>
    <div class="mt-8 flex items-center gap-4">
      <a
        href="https://www.facebook.com/profile.php?id=61586140684577"
        target="_blank"
        class="text-primary transition-all duration-300 hover:-translate-y-0.5"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
      <a
        href="https://www.instagram.com/downtownjazzjam/"
        target="_blank"
        class="text-primary transition-all duration-300 hover:-translate-y-0.5"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16 11.37a4 4 0 1 1-7.914 1.173A4 4 0 0 1 16 11.37m1.5-4.87h.01"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    </div>
    <p class="mt-8 text-center">
      Copyright © 2026 Downtown Jazz Jam. All rights reservered. Site design
      and development by Robert Beaney.
    </p>
  </footer>
</template>

<style scoped>
@import "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";

* {
  font-family: Poppins, sans-serif;
}
</style>
