<script lang="ts" setup></script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator color="var(--color-brand)" :height="2" />
  <NuxtLayout>
    <NuxtPage />
    <UiSonner />
  </NuxtLayout>
</template>

<style>
/* .page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
} */

.page-enter-from,
.layout-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.page-leave-to,
.layout-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.page-enter-active,
.page-leave-active,
.layout-enter-active,
.layout-leave-active {
  /* transition: all 0.75s cubic-bezier(0.19, 1, 0.22, 1); */
  transition: all 0.5s ease;
}
</style>
