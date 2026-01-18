<template>
  <div>
    <slot name="image">
      <img
        src="https://res.cloudinary.com/dgbn0ttzf/image/upload/v1763947944/DTJJ_-_FB_Cover_hstthn.png"
        class="h-[180px] w-full object-cover md:h-[250px]"
      />
    </slot>
    <UiContainer v-if="user" class="p-4 md:px-8 md:pt-6">
      <div class="hidden md:block">
        <slot name="crumbs">
          <UiBreadcrumbs v-if="crumbs" :items="crumbs" class="mb-5" />
        </slot>
      </div>
      <slot name="back-link">
        <NuxtLink
          class="mb-5 flex items-center gap-3 text-sm underline-offset-2 hover:underline md:hidden"
          to="#"
        >
          <Icon name="lucide:arrow-left" class="size-4" />
          Back
        </NuxtLink>
      </slot>
      <div
        class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
      >
        <div class="flex items-center gap-5">
          <slot name="avatar">
            <UiAvatar
              v-if="avatar"
              :src="avatar"
              class="size-8 object-cover md:size-10"
            />
          </slot>
          <div class="flex flex-col gap-1">
            <slot name="title">
              <h1 v-if="name" class="leading-none font-bold lg:text-lg">
                {{ name }}
              </h1>
            </slot>
            <slot name="description">
              <p
                v-if="email"
                class="text-muted-foreground text-sm leading-none"
              >
                {{ email }}
              </p>
            </slot>
          </div>
        </div>

        <div
          class="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:items-center"
        >
          <slot>
            <UiButton size="sm" variant="outline">Download</UiButton>
            <UiButton size="sm">Create new</UiButton>
          </slot>
        </div>
      </div>

      <UiDivider class="my-8" />
    </UiContainer>

    <UiContainer v-if="user" class="md:px-8">
      <div class="grid grid-cols-2 items-start gap-4">
        <div
          class="border-border/60 max-w-2xl overflow-hidden rounded-xl border shadow-sm"
        >
          <div class="bg-muted/50 px-4 py-3 font-semibold">
            Registration details
          </div>
          <table class="divide-border/60 bg-background min-w-full divide-y">
            <tbody class="divide-border/60 divide-y">
              <tr class="hover:bg-muted/40">
                <th
                  scope="row"
                  class="w-1/3 px-4 py-3 text-left text-sm font-semibold"
                >
                  Signed up
                </th>
                <td class="text-muted-foreground px-4 py-3 text-sm">
                  {{ attendee.signedUp }}
                </td>
              </tr>
              <tr class="hover:bg-muted/40">
                <th
                  scope="row"
                  class="px-4 py-3 text-left text-sm font-semibold"
                >
                  Pass type
                </th>
                <td class="text-muted-foreground px-4 py-3 text-sm">
                  {{ attendee.passType }}
                </td>
              </tr>
              <tr class="hover:bg-muted/40">
                <th
                  scope="row"
                  class="px-4 py-3 text-left text-sm font-semibold"
                >
                  Primary role
                </th>
                <td class="text-muted-foreground px-4 py-3 text-sm">
                  {{ attendee.role }}
                </td>
              </tr>
              <tr class="hover:bg-muted/40">
                <th
                  scope="row"
                  class="px-4 py-3 text-left text-sm font-semibold"
                >
                  Volunteering
                </th>
                <td class="text-muted-foreground px-4 py-3 text-sm">
                  <span
                    class="bg-muted inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                  >
                    <span
                      :class="[
                        'size-2 rounded-full',
                        attendee.volunteering
                          ? 'bg-emerald-500'
                          : 'bg-amber-500',
                      ]"
                    />
                    {{ attendee.volunteering ? "Yes" : "No" }}
                  </span>
                </td>
              </tr>
              <tr class="hover:bg-muted/40">
                <th
                  scope="row"
                  class="px-4 py-3 text-left text-sm font-semibold"
                >
                  Hosting status
                </th>
                <td class="text-muted-foreground px-4 py-3 text-sm">
                  {{ attendee.hostingStatus }}
                </td>
              </tr>
              <tr class="hover:bg-muted/40">
                <th
                  scope="row"
                  class="px-4 py-3 text-left text-sm font-semibold"
                >
                  Team
                </th>
                <td class="text-muted-foreground px-4 py-3 text-sm">
                  <span
                    class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold capitalize"
                    :class="teamBadgeClass"
                  >
                    <img :src="JamJar" class="size-6" />
                    <!-- <span
                    class="bg-background/80 size-2 rounded-full"
                    :class="teamBadgeClass"
                  /> -->
                    {{ attendee.team }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="border-border/60 max-w-2xl overflow-hidden rounded-xl border shadow-sm"
        >
          <div class="bg-muted/50 px-4 py-3 font-semibold">Files</div>
          <div>
            <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                class="divide-y divide-gray-100 rounded-md border-gray-200"
              >
                <li
                  class="flex items-center justify-between py-4 pr-5 pl-4 text-sm leading-6"
                >
                  <div class="flex w-0 flex-1 items-center">
                    <svg
                      class="h-5 w-5 flex-shrink-0 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M15.621 4.379a3 3 0 0 0-4.242 0l-7 7a3 3 0 0 0 4.241 4.243h.001l.497-.5a.75.75 0 0 1 1.064 1.057l-.498.501-.002.002a4.5 4.5 0 0 1-6.364-6.364l7-7a4.5 4.5 0 0 1 6.368 6.36l-3.455 3.553A2.625 2.625 0 1 1 9.52 9.52l3.45-3.451a.75.75 0 1 1 1.061 1.06l-3.45 3.451a1.125 1.125 0 0 0 1.587 1.595l3.454-3.553a3 3 0 0 0 0-4.242Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div class="ml-4 flex min-w-0 flex-1 gap-2">
                      <span class="truncate font-medium">
                        welcome_booklet.pdf
                      </span>
                      <span class="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div class="ml-4 flex-shrink-0">
                    <UiButton size="sm">Download</UiButton>
                  </div>
                </li>
                <li
                  class="flex items-center justify-between py-4 pr-5 pl-4 text-sm leading-6"
                >
                  <div class="flex w-0 flex-1 items-center">
                    <svg
                      class="h-5 w-5 flex-shrink-0 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M15.621 4.379a3 3 0 0 0-4.242 0l-7 7a3 3 0 0 0 4.241 4.243h.001l.497-.5a.75.75 0 0 1 1.064 1.057l-.498.501-.002.002a4.5 4.5 0 0 1-6.364-6.364l7-7a4.5 4.5 0 0 1 6.368 6.36l-3.455 3.553A2.625 2.625 0 1 1 9.52 9.52l3.45-3.451a.75.75 0 1 1 1.061 1.06l-3.45 3.451a1.125 1.125 0 0 0 1.587 1.595l3.454-3.553a3 3 0 0 0 0-4.242Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div class="ml-4 flex min-w-0 flex-1 gap-2">
                      <span class="truncate font-medium">schedule.pdf</span>
                      <span class="flex-shrink-0 text-gray-400">4.5mb</span>
                    </div>
                  </div>
                  <div class="ml-4 flex-shrink-0">
                    <UiButton size="sm">Download</UiButton>
                  </div>
                </li>
                <li
                  class="flex items-center justify-between py-4 pr-5 pl-4 text-sm leading-6"
                >
                  <div class="flex w-0 flex-1 items-center">
                    <svg
                      class="h-5 w-5 flex-shrink-0 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M15.621 4.379a3 3 0 0 0-4.242 0l-7 7a3 3 0 0 0 4.241 4.243h.001l.497-.5a.75.75 0 0 1 1.064 1.057l-.498.501-.002.002a4.5 4.5 0 0 1-6.364-6.364l7-7a4.5 4.5 0 0 1 6.368 6.36l-3.455 3.553A2.625 2.625 0 1 1 9.52 9.52l3.45-3.451a.75.75 0 1 1 1.061 1.06l-3.45 3.451a1.125 1.125 0 0 0 1.587 1.595l3.454-3.553a3 3 0 0 0 0-4.242Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div class="ml-4 flex min-w-0 flex-1 gap-2">
                      <span class="truncate font-medium">your_pass.pdf</span>
                      <span class="flex-shrink-0 text-gray-400">4.5mb</span>
                    </div>
                  </div>
                  <div class="ml-4 flex-shrink-0">
                    <UiButton size="sm">Download</UiButton>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </div>
      </div>
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from "@/components/Ui/Breadcrumbs.vue";

import JamJar from "./assets/img/627a3e29a51c556-removebg-preview.png";
const sbUser = useSupabaseUser();
const userStore = useUserStore();
const { profile } = storeToRefs(userStore);
const { fetchProfile } = userStore;
const router = useRouter();

// When user lands on confirm page after login, fetch their profile and redirect
const hasRedirected = ref(false);

watch(
  () => sbUser.value,
  async (user) => {
    const userId = user?.id || user?.sub; // Support both id and sub fields
    console.log("Confirm page - user state changed:", userId);

    if (userId && !hasRedirected.value) {
      hasRedirected.value = true;
      console.log("Fetching profile for user:", userId);
      await fetchProfile(userId);
      console.log("Profile loaded:", profile.value);

      // Redirect to account page after profile is loaded
      setTimeout(() => {
        router.push("/account");
      }, 500);
    }
  },
  { immediate: true }
);

const user = computed(() => profile?.value ?? null);
const name = computed(() =>
  profile.value
    ? `${(profile.value as any).first_name} ${(profile.value as any).last_name}`
    : ""
);
const email = computed(() => (user.value as any)?.email);
const avatar = computed(() => (user.value as any)?.avatar_url);

const attendee = reactive({
  signedUp: "01-12-2025",
  passType: "Full pass",
  role: "Lead",
  volunteering: true,
  hostingStatus: "Being hosted",
  team: "raspberry",
});

const teamBadgeClass = computed(() => {
  const palette: Record<string, string> = {
    raspberry: "bg-rose-500/15 text-rose-600 ring-1 ring-rose-500/40",
    blueberry: "bg-indigo-500/15 text-indigo-600 ring-1 ring-indigo-500/40",
    "lemon curd": "bg-amber-300/20 text-amber-700 ring-1 ring-amber-400/60",
  };
  return (
    palette[attendee.team.toLowerCase()] ??
    "bg-muted text-foreground ring-1 ring-border"
  );
});

const crumbs = computed(
  () =>
    [
      {
        icon: "lucide:home",
      },
      {
        label: "Settings",
        link: "#",
      },
      {
        label: "Profile",
        link: "/confirm",
      },
    ] as BreadcrumbItem[]
);
</script>
