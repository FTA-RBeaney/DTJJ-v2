<script setup>
import JamLogo from "@/assets/img/jam.png";
import { useColorScheme, COLOR_SCHEMES } from "@/composables/useColorScheme";

const nav = [
  { name: "Vision", href: "/vision" },
  { name: "Values", href: "/values" },
  { name: "Venues", href: "/venue" },
  { name: "Teachers", href: "/teachers" },
  { name: "Tickets", href: "/register" },
  { name: "Schedule", href: "/schedule" },
];

const { selectedScheme, setColorScheme, getSchemeColor } = useColorScheme();
const isColorPickerOpen = ref(false);
</script>

<template>
  <div class="">
    <div class="flex min-h-screen flex-col bg-[#fdf4ee]">
      <!-- Mobile Header -->
      <UiContainer
        class="sticky top-0 z-50 flex items-center justify-between border-b bg-[#fdf4ee]/80 py-4 backdrop-blur-md md:hidden"
      >
        <NuxtLink to="/" class="block h-10">
          <img :src="JamLogo" class="h-full object-cover" />
        </NuxtLink>
        <UiSheet class="lg:hidden">
          <UiSheetTrigger as-child>
            <UiButton variant="ghost" size="icon">
              <Icon name="lucide:menu" class="h-6 w-6" />
            </UiButton>
          </UiSheetTrigger>
          <UiSheetContent
            side="right"
            class="w-[300px] bg-[#fdf4ee] px-6 pt-12"
          >
            <template #header>
              <UiSheetHeader>
                <UiSheetTitle
                  class="text-center text-4xl font-bold tracking-wider"
                >
                  Menu
                </UiSheetTitle>

                <UiSheetClose as-child>
                  <UiButton
                    variant="ghost"
                    size="icon"
                    class="absolute top-4 right-4"
                  >
                    <Icon name="lucide:x" class="h-6 w-6" />
                  </UiButton>
                </UiSheetClose>
              </UiSheetHeader>
            </template>
            <template #content>
              <nav class="flex flex-col gap-4 text-center">
                <div
                  v-for="(item, index) in nav"
                  :key="index"
                  class="space-y-4"
                >
                  <template v-if="item.children">
                    <div class="font-semibold tracking-wider">
                      {{ item.name }}
                    </div>
                    <div class="flex flex-col gap-3 pl-4">
                      <UiSheetClose
                        as-child
                        v-for="(child, cIndex) in item.children"
                        :key="cIndex"
                      >
                        <NuxtLink
                          :to="child.href"
                          class="font-medium hover:underline"
                        >
                          {{ child.name }}
                        </NuxtLink>
                      </UiSheetClose>
                    </div>
                  </template>
                  <template v-else>
                    <UiSheetClose as-child>
                      <NuxtLink
                        :to="item.href"
                        class="font-medium hover:underline"
                      >
                        {{ item.name }}
                      </NuxtLink>
                    </UiSheetClose>
                  </template>
                </div>
              </nav>
            </template>
            <template #footer>
              <UiSheetFooter>
                <div class="space-y-2">
                  <h4 class="text-lg font-medium">Choose your jam</h4>
                  <div class="right-0 grid grid-cols-5 gap-2">
                    <button
                      v-for="(scheme, key) in COLOR_SCHEMES"
                      :key="key"
                      @click="
                        setColorScheme(key);
                        isColorPickerOpen = false;
                      "
                      :title="scheme.name"
                      class="h-12 w-10 rounded-lg p-3 transition-all hover:scale-110"
                      :class="
                        selectedScheme === key
                          ? 'ring-foreground ring-2 ring-offset-2'
                          : ''
                      "
                      :style="{ backgroundColor: scheme.hex }"
                    />
                  </div>
                </div>
              </UiSheetFooter>
            </template>
          </UiSheetContent>
        </UiSheet>
      </UiContainer>

      <!-- Desktop Navigation -->
      <UiContainer class="navbar z-10 hidden md:mt-10 md:block">
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
            class="group relative mr-6 inline-block"
          >
            <ul
              v-if="item.children"
              class="absolute top-14 m-0 hidden list-none gap-4 p-0 group-hover:flex"
            >
              <li
                v-for="(child, index) in item.children"
                :key="index"
                class="!m-0 !list-none !p-0"
              >
                <Motion :whileHover="{ scale: 1.1 }"
                  ><NuxtLink
                    :to="child.href"
                    class="font-lazy block py-4 text-center text-2xl font-medium hover:underline"
                  >
                    {{ child.name }}
                  </NuxtLink>
                </Motion>
              </li>
            </ul>
            <Motion :whileHover="{ scale: 1.1 }">
              <NuxtLink
                :to="item.href"
                class="font-lazy mb-4 block pt-6 text-4xl font-medium hover:underline"
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

      <div class="top-10 right-10 z-[60] hidden md:fixed md:flex">
        <!-- Color Picker Button in Top Right -->
        <UiPopover v-model:open="isColorPickerOpen">
          <UiPopoverTrigger as-child>
            <UiButton
              variant="ghost"
              size="icon"
              class="absolute -top-2 right-0 z-10"
              title="Change color scheme"
            >
              <Icon name="lucide:palette" class="h-5 w-5" />
            </UiButton>
          </UiPopoverTrigger>
          <UiPopoverContent class="w-48">
            <div class="space-y-2">
              <h4 class="font-medium">Choose your jam</h4>
              <div class="right-0 grid grid-cols-5 gap-2">
                <button
                  v-for="(scheme, key) in COLOR_SCHEMES"
                  :key="key"
                  @click="
                    setColorScheme(key);
                    isColorPickerOpen = false;
                  "
                  :title="scheme.name"
                  class="rounded-lg p-3 transition-all hover:scale-110"
                  :class="
                    selectedScheme === key
                      ? 'ring-foreground ring-2 ring-offset-2'
                      : ''
                  "
                  :style="{ backgroundColor: scheme.hex }"
                />
              </div>
            </div>
          </UiPopoverContent>
        </UiPopover>
      </div>
    </div>
  </div>
</template>

<style>
.router-link-active {
  text-decoration: underline;
}
</style>
