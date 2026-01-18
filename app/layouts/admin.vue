<template>
  <UiSidebarProvider v-model:open="state" class="bg-sidebar">
    <UiSidebar class="bg-muted !border-r-0">
      <UiSidebarContent>
        <aside
          class="bg-muted/30 relative flex h-screen flex-col overflow-y-auto transition-transform duration-300 ease-in-out"
        >
          <div class="flex items-center justify-between p-4">
            <NuxtLink to="/" class="flex items-center gap-2">
              <UiAvatar
                :src="DTJJLogo"
                alt="Company Logo"
                class="size-7 rounded object-contain"
              />
              <span class="font-bold">{{ COMPANY_NAME }}</span>
            </NuxtLink>
            <Motion
              :initial="{ opacity: 0, scale: 0 }"
              :animate="{ opacity: 1, scale: 1, transition: { delay: 0.2 } }"
              class="fixed top-4 z-50"
              :class="!state ? 'left-12' : 'left-48'"
            >
            </Motion>
          </div>

          <UiScrollArea>
            <div class="p-4">
              <div class="mb-4">
                <UiVeeInput
                  v-model="search"
                  placeholder="Search..."
                  icon="lucide:search"
                />
              </div>

              <div class="mb-6">
                <div class="mb-2 flex items-center justify-between px-2">
                  <span
                    class="text-muted-foreground text-xs font-semibold tracking-wider uppercase"
                  >
                    Main Menu
                  </span>
                  <UiBadge variant="secondary" class="h-5 px-1.5 text-xs">
                    {{ navigation.length }}
                  </UiBadge>
                </div>
                <nav class="flex flex-col gap-0.5">
                  <Motion
                    v-for="(n, i) in navigation"
                    :key="i"
                    :initial="{ opacity: 0, x: -10 }"
                    :animate="{ opacity: 1, x: 0 }"
                    :transition="{
                      delay: i * 0.05,
                      type: 'spring',
                      stiffness: 200,
                      damping: 25,
                    }"
                  >
                    <UiButton
                      :to="n.link"
                      size="sm"
                      variant="ghost"
                      class="w-full justify-start gap-3 px-2"
                    >
                      <Icon
                        v-if="n.icon"
                        :name="n.icon"
                        class="text-muted-foreground size-4"
                      />
                      <span>{{ n.title }}</span>
                      <UiBadge
                        v-if="n.badge"
                        variant="secondary"
                        class="ml-auto h-5 px-1.5 text-xs"
                      >
                        {{ n.badge }}
                      </UiBadge>
                    </UiButton>
                  </Motion>
                </nav>
              </div>

              <div class="mb-6">
                <div class="mb-2 flex items-center justify-between px-2">
                  <span
                    class="text-muted-foreground text-xs font-semibold tracking-wider uppercase"
                  >
                    Pages
                  </span>
                </div>

                <nav class="flex flex-col gap-0.5">
                  <Motion
                    v-for="(w, i) in pages"
                    :key="i"
                    :initial="{ opacity: 0, x: -10 }"
                    :animate="{ opacity: 1, x: 0 }"
                    :transition="{
                      delay: i * 0.1,
                      type: 'spring',
                      stiffness: 200,
                      damping: 25,
                    }"
                  >
                    <UiButton
                      :to="w.link"
                      size="sm"
                      variant="ghost"
                      class="w-full justify-start gap-3 px-2"
                    >
                      <Icon
                        v-if="w.icon"
                        :name="w.icon"
                        class="text-muted-foreground size-4"
                      />
                      <span>{{ w.title }}</span>
                    </UiButton>
                  </Motion>
                </nav>
              </div>

              <div class="mb-6">
                <div class="mb-2 flex items-center justify-between px-2">
                  <span
                    class="text-muted-foreground text-xs font-semibold tracking-wider uppercase"
                  >
                    Teams
                  </span>

                  <UiPopover>
                    <UiPopoverTrigger as-child>
                      <UiButton size="icon-sm" variant="ghost">
                        <Icon
                          name="lucide:plus"
                          class="text-muted-foreground size-3"
                        />
                      </UiButton>
                    </UiPopoverTrigger>
                    <UiPopoverContent class="w-80 p-6">
                      <div class="flex h-full flex-col gap-1.5">
                        <p class="leading-none font-semibold">Add a team</p>
                        <p class="text-muted-foreground text-sm">
                          Add a new team.
                        </p>
                        <form
                          @submit.prevent="addNewTeam"
                          class="mt-5 grid gap-3"
                        >
                          <div class="grid grid-cols-3 items-center gap-4">
                            <UiLabel for="teamName">Name</UiLabel>
                            <UiInput
                              id="teamName"
                              type="text"
                              class="col-span-2 h-8"
                              placeholder="e.g. Blueberry"
                              :value="teamName"
                              v-model="teamName"
                            />
                          </div>
                          <div class="grid grid-cols-3 items-center gap-4">
                            <UiLabel for="teamColour">Colour</UiLabel>
                            <UiInput
                              id="teamColour"
                              type="text"
                              class="col-span-2 h-8"
                              placeholder="e.g. #ff0000"
                              :value="teamColour"
                              v-model="teamColour"
                            />
                          </div>
                          <UiPopoverClose as-child>
                            <UiButton type="submit" class="w-full"
                              >Add Team</UiButton
                            >
                          </UiPopoverClose>
                        </form>
                      </div>
                    </UiPopoverContent>
                  </UiPopover>
                </div>
                <nav class="flex flex-col gap-0.5">
                  <Motion
                    v-for="(w, i) in workspaces"
                    :key="i"
                    :initial="{ opacity: 0, x: -10 }"
                    :animate="{ opacity: 1, x: 0 }"
                    :transition="{
                      delay: i * 0.1,
                      type: 'spring',
                      stiffness: 200,
                      damping: 25,
                    }"
                  >
                    <UiButton
                      :to="w.link"
                      size="sm"
                      variant="ghost"
                      class="w-full justify-start gap-3 px-2"
                    >
                      <div
                        class="size-5 shrink-0 rounded"
                        :style="{ backgroundColor: w.color }"
                      />
                      <span>{{ w.title }}</span>
                    </UiButton>
                  </Motion>
                </nav>
              </div>

              <div>
                <div class="mb-2 px-2">
                  <span
                    class="text-muted-foreground text-xs font-semibold tracking-wider uppercase"
                  >
                    Settings
                  </span>
                </div>
                <nav class="flex flex-col gap-0.5">
                  <Motion
                    v-for="(s, i) in settings"
                    :key="i"
                    :initial="{ opacity: 0, x: -10 }"
                    :animate="{ opacity: 1, x: 0 }"
                    :transition="{
                      delay: i * 0.1,
                      type: 'spring',
                      stiffness: 200,
                      damping: 25,
                    }"
                  >
                    <UiButton
                      :to="s.link"
                      size="sm"
                      variant="ghost"
                      class="w-full justify-start gap-3 px-2"
                    >
                      <Icon
                        v-if="s.icon"
                        :name="s.icon"
                        class="text-muted-foreground size-4"
                      />
                      <span>{{ s.title }}</span>
                    </UiButton>
                  </Motion>
                </nav>
              </div>
            </div>
          </UiScrollArea>

          <div class="mt-auto shrink-0 p-4">
            <div class="flex items-center gap-3">
              <UiAvatar class="size-9">
                <UiAvatarImage
                  :src="sbUser.user_metadata.avatar_url"
                  alt="User Avatar"
                />
                <UiAvatarFallback>
                  {{
                    sbUser.user_metadata.full_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  }}
                </UiAvatarFallback>
              </UiAvatar>
              <div class="flex-1 overflow-hidden">
                <p class="truncate text-sm font-semibold">
                  {{ sbUser.user_metadata.full_name }}
                </p>
                <p class="text-muted-foreground truncate text-xs">
                  {{ sbUser.user_metadata.email }}
                </p>
              </div>
              <UiDropdownMenu>
                <UiDropdownMenuTrigger as-child>
                  <UiButton size="icon-sm" variant="ghost">
                    <Icon
                      name="lucide:more-horizontal"
                      class="text-muted-foreground size-4"
                    />
                  </UiButton>
                </UiDropdownMenuTrigger>
                <UiDropdownMenuContent align="end" side="right">
                  <NuxtLink to="/account">
                    <UiDropdownMenuItem title="Profile" icon="lucide:user" />
                  </NuxtLink>
                  <UiDropdownMenuItem title="Settings" icon="lucide:settings" />
                  <UiDropdownMenuSeparator />
                  <UiDropdownMenuItem
                    title="Logout"
                    icon="lucide:log-out"
                    variant="destructive"
                  />
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </div>
          </div>
        </aside>
      </UiSidebarContent>
    </UiSidebar>
    <UiSidebarInset class="bg-muted pr-2">
      <div
        class="relative flex h-screen w-full flex-1 flex-col border bg-white md:m-2 md:ml-0 md:rounded-xl md:shadow-md md:[state=collapsed]:ml-2"
      >
        <UiScrollArea class="size-full">
          <slot />
        </UiScrollArea>
      </div>
    </UiSidebarInset>
  </UiSidebarProvider>
</template>

<script lang="ts" setup>
import DTJJLogo from "@/assets/img/logo.png";
const state = ref(true);
const search = ref<string>("");
const sbUser = useSupabaseUser();
const userStore = useUserStore();
const { fetchProfile } = userStore;

// Watch the Supabase auth user and fetch the profile when available
watch(
  () => sbUser.value,
  async (user: any) => {
    const userId = user?.id || user?.sub;
    if (userId) {
      await fetchProfile(userId);
    }
  },
  { immediate: true }
);

// Temporary company name constant (used in layout header)
const COMPANY_NAME = "DTJJ";

const navigation = [
  { title: "Overview", icon: "lucide:layout-dashboard", link: "#", badge: "3" },
  { title: "Teachers", icon: "lucide:graduation-cap", link: "#", badge: "5" },
  { title: "Team", icon: "lucide:shield-user", link: "/team" },
  {
    title: "Attendees",
    icon: "lucide:users",
    link: "/attendees",
    badge: "103",
  },
  { title: "Schedule", icon: "lucide:calendar", link: "/timetable" },
  { title: "Documents", icon: "lucide:file-text", link: "#" },
  {
    title: "Test payment page",
    icon: "lucide:credit-card",
    link: "/test-payment",
  },
];

const pages = [{ title: "About", icon: "lucide:info", link: "/admin/about" }];

const workspaces = [
  { title: "Strawberry", link: "#", color: "#ec4899" },
  { title: "Blueberry", link: "#", color: "#60a5fa" },
  { title: "Apricot", link: "#", color: "#f59e0b" },
  { title: "Kiwi", link: "#", color: "#84cc16" },
  { title: "Blackcurrant", link: "#", color: "#8b5cf6" },
];

const settings = [
  { title: "Preferences", icon: "lucide:settings", link: "#" },
  { title: "Help & Support", icon: "lucide:help-circle", link: "#" },
];

const supabase = useSupabaseClient();

const teamName = ref<string>("");
const teamColour = ref<string>("");
const addNewTeam = async () => {
  console.log("Adding new team:", teamName.value, teamColour.value);
  const { error } = await supabase
    .from("dtjj_teams")
    .insert({ name: teamName.value, hex_code: teamColour.value });

  if (error) {
    console.error("Error adding team:", error.message);
  } else {
    console.log("Team added successfully");
    useSonner("Team added!", {
      description: `Team ${teamName.value} has been added.`,
    });
  }
};
</script>
