<script lang="ts" setup>
import { object, string, boolean } from "yup";
import JamJar from "../assets/img/627a3e29a51c556-removebg-preview.png";

const sbUser = useSupabaseUser();
const supabase = useSupabaseClient();
const userStore = useUserStore();
const { profile, attendee } = storeToRefs(userStore);
const { fetchProfile, updateAttendee } = userStore;

const isEditProfileOpen = ref(false);

const user = computed(() => profile?.value ?? null);
const name = computed(() =>
  profile.value
    ? `${(profile.value as any).first_name} ${(profile.value as any).last_name}`
    : ""
);
const email = computed(() => (user.value as any)?.email);

const { data, error } = await useAsyncData("attendee-data", async () => {
  if (!sbUser.value) return null;

  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .eq("email", "rbeaney@gmail.com")
    .single();

  if (error) {
    console.error("Error fetching attendee data:", error);
    return null;
  }

  return data;
});

const ProfileSchema = object({
  first_name: string().required().label("First Name"),
  last_name: string().required().label("Last Name"),
  passType: string().required().label("Pass Type"),
  role: string().required().label("Role"),
  hostingStatus: string().required().label("Hosting Status"),
  team: string().required().label("Team"),
  volunteering: boolean().label("Volunteering"),
});

const {
  handleSubmit,
  isSubmitting,
  setValues: _setValues,
  values,
  setFieldValue,
  resetForm,
} = useForm<{
  first_name: string;
  last_name: string;
  passType: string;
  role: string;
  hostingStatus: string;
  team: string;
  volunteering: boolean;
}>({
  validationSchema: ProfileSchema,
  initialValues: {
    first_name: "",
    last_name: "",
    passType: "",
    role: "",
    hostingStatus: "",
    team: "",
    volunteering: false,
  },
});

// Pre-fill form when profile is loaded or modal opens
watch(
  [() => profile.value, () => attendee.value, () => isEditProfileOpen.value],
  ([newProfile, newAttendee, _isOpen]) => {
    const p = newProfile as any; // Cast to any or Profile interface if available
    if (p && newAttendee) {
      resetForm({
        values: {
          first_name: p.first_name || "",
          last_name: p.last_name || "",
          passType: newAttendee.passType || "",
          role: newAttendee.role || "",
          hostingStatus: newAttendee.hostingStatus || "",
          team: newAttendee.team || "",
          volunteering: newAttendee.volunteering ?? false,
        },
      });
    }
  },
  { immediate: true }
);

watch(
  () => sbUser.value,
  async (user) => {
    const userId = user?.id || user?.sub; // Support both id and sub fields
    console.log("Confirm page - user state changed:", userId);

    if (userId) {
      console.log("Fetching profile for user:", userId);
      await fetchProfile(userId);
      console.log("Profile loaded:", profile.value);
    }
  },
  { immediate: true }
);

const logout = () => {
  supabase.auth.signOut();
};

const updateProfile = handleSubmit(async (values) => {
  if (!sbUser.value) return;

  const { first_name, last_name, ...attendeeData } = values;

  // Update Profile in Supabase
  // const { error } = await supabase
  //   .from("profiles")
  //   .update({ first_name, last_name })
  //   .eq("id", sbUser.value.sub);

  // if (error) {
  //   useSonner("Error updating profile", {
  //     description: error.message,
  //     type: "error",
  //   });
  //   return;
  // }

  // Update Profile in Store (temporary until Supabase update is enabled)
  if (profile.value) {
    profile.value = {
      ...(profile.value as any),
      first_name,
      last_name,
    };
  }

  // Update Attendee in Store
  updateAttendee(attendeeData);

  useSonner("Profile updated", {
    description: "Your profile has been successfully updated.",
  });
  isEditProfileOpen.value = false;
});

const fullName = computed(() => {
  if (!data.value) return "";
  return `${data.value.name.first} ${data.value.name?.last}`;
});
</script>

<template>
  <UiContainer class="!max-w-5xl">
    <UiCard>
      <UiCardContent>
        <div v-if="user" class="m-4 md:mx-8">
          <!-- <div class="hidden md:block">
            <slot name="crumbs">
              <UiBreadcrumbs v-if="crumbs" :items="crumbs" class="mb-5" />
            </slot>
          </div> -->
          <slot name="back-link">
            <NuxtLink
              class="mb-5 flex items-center gap-3 underline-offset-2 hover:underline md:hidden"
              to="#"
            >
              <Icon name="lucide:arrow-left" class="size-4" />
              Back
            </NuxtLink>
          </slot>
          <div
            class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
          >
            <div v-show="name" class="flex items-center gap-5">
              <!-- <slot name="avatar">
                <UiAvatar
                  v-if="avatar"
                  :src="avatar"
                  class="size-8 object-cover md:size-10"
                />
              </slot> -->
              <div class="flex flex-col gap-1">
                <slot name="title">
                  <h1 v-if="fullName" class="leading-none font-bold lg:text-lg">
                    {{ fullName }}
                  </h1>
                </slot>
                <slot name="description">
                  <p v-if="email" class="text-muted-foreground leading-none">
                    {{ email }}
                  </p>
                </slot>
              </div>

              <!-- Badges -->
              <div class="flex items-center gap-2">
                <!-- Team Badge -->
                <UiTooltip>
                  <UiTooltipTrigger as-child>
                    <div
                      class="bg-muted flex size-8 items-center justify-center rounded-full"
                    >
                      <img :src="JamJar" class="size-5" />
                    </div>
                  </UiTooltipTrigger>
                  <UiTooltipContent>
                    <p>Team: {{ attendee.team }}</p>
                  </UiTooltipContent>
                </UiTooltip>

                <!-- Pass Type Badge -->
                <UiTooltip>
                  <UiTooltipTrigger as-child>
                    <div
                      class="bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-full"
                    >
                      <Icon name="lucide:ticket" class="size-5" />
                    </div>
                  </UiTooltipTrigger>
                  <UiTooltipContent>
                    <p>Pass: {{ attendee.passType }}</p>
                  </UiTooltipContent>
                </UiTooltip>

                <!-- Volunteer Badge -->
                <UiTooltip v-if="attendee.volunteering">
                  <UiTooltipTrigger as-child>
                    <div
                      class="flex size-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                    >
                      <Icon name="lucide:hand-heart" class="size-5" />
                    </div>
                  </UiTooltipTrigger>
                  <UiTooltipContent>
                    <p>Volunteer</p>
                  </UiTooltipContent>
                </UiTooltip>

                <!-- Host Badge -->
                <UiTooltip v-if="attendee.hostingStatus">
                  <UiTooltipTrigger as-child>
                    <div
                      class="flex size-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    >
                      <Icon name="lucide:home" class="size-5" />
                    </div>
                  </UiTooltipTrigger>
                  <UiTooltipContent>
                    <p>Status: {{ attendee.hostingStatus }}</p>
                  </UiTooltipContent>
                </UiTooltip>
              </div>
            </div>

            <div
              class="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:items-center"
            >
              <slot>
                <UiDialog v-model:open="isEditProfileOpen">
                  <UiDialogTrigger as-child>
                    <UiButton size="sm" variant="outline" text="Edit Profile" />
                    <UiButton
                      size="sm"
                      variant="outline"
                      text="Logout"
                      @click="logout"
                    />
                  </UiDialogTrigger>
                  <UiDialogContent>
                    <UiDialogHeader class="contents space-y-0 text-left">
                      <UiDialogTitle class="px-0 pt-0">
                        Edit Profile
                      </UiDialogTitle>

                      <form class="flex flex-col gap-4" @submit="updateProfile">
                        <div class="grid grid-cols-2 gap-4">
                          <UiVeeInput
                            name="first_name"
                            label="First Name"
                            placeholder="Enter your first name"
                          />
                          <UiVeeInput
                            name="last_name"
                            label="Last Name"
                            placeholder="Enter your last name"
                          />
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                          <div class="space-y-2">
                            <UiLabel>Pass Type</UiLabel>
                            <UiSelect
                              v-model="values.passType"
                              @update:model-value="
                                setFieldValue('passType', String($event ?? ''))
                              "
                            >
                              <UiSelectTrigger placeholder="Select pass type" />
                              <UiSelectContent>
                                <UiSelectItem value="Full pass">
                                  Full pass
                                </UiSelectItem>
                                <UiSelectItem value="Party pass">
                                  Party pass
                                </UiSelectItem>
                              </UiSelectContent>
                            </UiSelect>
                          </div>

                          <div class="space-y-2">
                            <UiLabel>Role</UiLabel>
                            <UiSelect
                              v-model="values.role"
                              @update:model-value="
                                setFieldValue('role', String($event ?? ''))
                              "
                            >
                              <UiSelectTrigger placeholder="Select role" />
                              <UiSelectContent>
                                <UiSelectItem value="Lead">Lead</UiSelectItem>
                                <UiSelectItem value="Follow">
                                  Follow
                                </UiSelectItem>
                                <UiSelectItem value="Switch">
                                  Switch
                                </UiSelectItem>
                              </UiSelectContent>
                            </UiSelect>
                          </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                          <div class="space-y-2">
                            <UiLabel>Hosting Status</UiLabel>
                            <UiSelect
                              v-model="values.hostingStatus"
                              @update:model-value="
                                setFieldValue(
                                  'hostingStatus',
                                  String($event ?? '')
                                )
                              "
                            >
                              <UiSelectTrigger placeholder="Select status" />
                              <UiSelectContent>
                                <UiSelectItem value="Being hosted">
                                  Being hosted
                                </UiSelectItem>
                                <UiSelectItem value="Hosting">
                                  Hosting
                                </UiSelectItem>
                                <UiSelectItem value="Not hosting">
                                  Not hosting
                                </UiSelectItem>
                              </UiSelectContent>
                            </UiSelect>
                          </div>

                          <div class="space-y-2">
                            <UiLabel>Team</UiLabel>
                            <UiSelect
                              v-model="values.team"
                              @update:model-value="
                                setFieldValue('team', String($event ?? ''))
                              "
                            >
                              <UiSelectTrigger placeholder="Select team" />
                              <UiSelectContent>
                                <UiSelectItem value="raspberry">
                                  Raspberry
                                </UiSelectItem>
                                <UiSelectItem value="blueberry">
                                  Blueberry
                                </UiSelectItem>
                                <UiSelectItem value="lemon curd">
                                  Lemon Curd
                                </UiSelectItem>
                              </UiSelectContent>
                            </UiSelect>
                          </div>
                        </div>

                        <div
                          class="flex items-center justify-between rounded-lg border p-3 shadow-sm"
                        >
                          <div class="space-y-0.5">
                            <UiLabel>Volunteering</UiLabel>
                            <p class="text-muted-foreground">
                              Are you interested in volunteering?
                            </p>
                          </div>
                          <UiSwitch
                            :checked="values.volunteering"
                            :model-value="values.volunteering"
                            @update:model-value="
                              setFieldValue('volunteering', $event)
                            "
                          />
                        </div>

                        <div class="mt-4 flex justify-end gap-2">
                          <UiButton type="submit" :disabled="isSubmitting">
                            Save Changes
                          </UiButton>
                        </div>
                      </form>
                    </UiDialogHeader>
                  </UiDialogContent>
                </UiDialog>
              </slot>
            </div>
          </div>
        </div>

        <UiDivider class="my-8" />

        <div v-if="user" class="mt-6">
          <div class="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
            <RegistrationDetailsTable :data="data" />
            <!-- <AccountRegistrationDetails :attendee="attendee" /> -->

            <AccountFiles />
          </div>
        </div>
      </UiCardContent>
    </UiCard>
  </UiContainer>
</template>
