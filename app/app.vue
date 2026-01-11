<script lang="ts" setup>
const { selectedScheme } = useColorScheme();
</script>
<template>
  <div class="">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator :color="selectedScheme" :height="10" />
    <NuxtLayout>
      <NuxtPage />
      <UiSonner />
    </NuxtLayout>
  </div>
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

.layout-enter-active,
.layout-leave-active,
.page-enter-active,
.page-leave-active {
  /* transition: all 0.75s cubic-bezier(0.19, 1, 0.22, 1); */
  position: relative;
  transition: all 0.3s ease;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.layout-enter-to,
.page-enter-to {
  transform: translateX(0);
}

.layout-enter-from,
.page-enter-from {
  transform: translateX(100%);
}

.layout-leave-to,
.page-leave-to {
  transform: translateX(-100%);
}
</style>
