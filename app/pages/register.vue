<script setup lang="ts">
useSeoMeta({
  title: "Downtown Jazz Jam 2026",
  ogTitle: "Downtown Jazz Jam 2026",
  description: "A London Swing Dance Festival",
  ogDescription: "A London Swing Dance Festival",

  twitterCard: "summary_large_image",
});

const loading = ref(true);

setTimeout(() => {
  loading.value = false;
}, 500);

const isOpen = ref(false);

const countries = useCountries();
const { addContact } = useContacts();

const open = ref(false);
const first_name = ref("");
const last_name = ref("");
const location = ref("");
const email = ref("");
const isComplete = ref(false);
const selectedCountry = computed(
  () => countries.find((country) => country.code === location?.value.code)?.name
);
const isError = ref(false);

const filterFunction = (list: typeof countries, search: string) =>
  list.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));

const handleSubmit = async () => {
  if (
    !location.value ||
    !first_name.value ||
    !last_name.value ||
    !email.value
  ) {
    isError.value = true;
    return;
  }

  const contactData = {
    email: email.value,
    attributes: {
      FIRSTNAME: first_name.value,
      LASTNAME: last_name.value,
      LOCATION: location.value?.name || location.value,
    },
    updateEnabled: false,
  };

  const { data, error } = await addContact(contactData);

  if (error?.value) {
    console.error(error.value);
    useSonner.warning("Registration error", {
      description:
        error.value?.data?.message || "Unable to register. Please try again.",
    });
    return;
  }

  isError.value = false;
  useSonner.success("Registration successful!");

  isComplete.value = true;
  isOpen.value = false;
  // Done
};
</script>

<template>
  <div>
    <UiContainer class="!max-w-3xl">
      <h1 class="mt-12 mb-0 text-center text-7xl font-bold tracking-wider">
        Tickets
      </h1>
    </UiContainer>
    <UiContainer class="flex min-h-[70vh] flex-col items-center justify-center">
      <CountdownPage />
      <template v-if="!isComplete">
        <p class="mx-auto mb-4 max-w-2xl text-black">
          Sign up now to receive updates and early-bird access.
        </p>

        <UiDialog v-model:open="isOpen">
          <UiDialogTrigger as-child>
            <UiButton
              class="bg-black text-white hover:bg-white hover:text-black"
              >Register here</UiButton
            >
          </UiDialogTrigger>
          <UiDialogContent
            class="flex max-w-[90%] flex-col gap-0 rounded-lg bg-white sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden"
          >
            <UiDialogHeader>
              <UiDialogTitle class="pb-6 text-center !text-3xl text-black"
                >Register
              </UiDialogTitle>
            </UiDialogHeader>
            <!-- Hidden fallback form for Netlify -->
            <form
              @submit.prevent="handleSubmit"
              netlify
              name="dtjj_registrations"
              class="mx-auto grid w-full gap-4 text-black"
              method="post"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <input
                type="hidden"
                name="form-name"
                value="dtjj_registrations"
              />
              <p hidden>
                <label>Don’t fill this out: <input name="bot-field" /></label>
              </p>

              <div class="grid grid-cols-12 gap-4">
                <div
                  class="col-span-12 flex flex-col space-y-1.5 lg:col-span-6"
                >
                  <UiLabel for="first_name"> First Name </UiLabel>
                  <UiInput
                    id="first_name"
                    type="text"
                    placeholder=""
                    v-model="first_name"
                    name="first_name"
                  />
                </div>
                <div
                  class="col-span-12 flex flex-col space-y-1.5 lg:col-span-6"
                >
                  <UiLabel for="last_name"> Last Name </UiLabel>
                  <UiInput
                    id="last_name"
                    type="text"
                    placeholder=""
                    v-model="last_name"
                    name="last_name"
                  />
                </div>
              </div>
              <div class="grid grid-cols-12 gap-4">
                <div
                  class="col-span-12 flex flex-col space-y-1.5 lg:col-span-12"
                >
                  <UiLabel for="location"> Location </UiLabel>
                  <UiPopover v-model:open="open" class="w-full">
                    <UiPopoverTrigger as-child>
                      <UiButton
                        variant="outline"
                        role="combobox"
                        :aria-expanded="open"
                        class="justify-between bg-white text-black hover:bg-white hover:text-black"
                      >
                        {{ location ? selectedCountry : "Select country..." }}

                        <Icon
                          name="lucide:chevrons-up-down"
                          class="ml-auto h-4 w-4 shrink-0 opacity-50"
                        />
                      </UiButton>
                    </UiPopoverTrigger>
                    <UiPopoverContent class="w-[250px] p-0">
                      <UiCommand
                        v-model="location"
                        :filter-function="filterFunction"
                        name="location"
                        class="bg-white text-black"
                      >
                        <UiCommandInput
                          placeholder="Search countries..."
                          class="bg-white text-black"
                        />
                        <UiCommandList class="bg-white text-black">
                          <UiCommandEmpty>Country not found.</UiCommandEmpty>
                          <UiCommandGroup>
                            <UiCommandItem
                              v-for="country in countries"
                              :key="country.code"
                              :value="country"
                              @select="open = false"
                              class="bg-white text-black"
                            >
                              <Icon
                                name="lucide:check"
                                :class="[
                                  'mr-2 h-4 w-4',
                                  location?.code === country.code
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                ]"
                              />
                              {{ country.name }}
                            </UiCommandItem>
                          </UiCommandGroup>
                        </UiCommandList>
                      </UiCommand>
                    </UiPopoverContent>
                  </UiPopover>
                </div>
                <div
                  class="col-span-12 flex flex-col space-y-1.5 lg:col-span-12"
                >
                  <UiLabel for="email"> Email </UiLabel>
                  <UiInput
                    id="email"
                    type="email"
                    placeholder=""
                    v-model="email"
                    name="email"
                  />
                </div>
              </div>

              <div v-if="isError">
                <UiAlert
                  class="mt-0 bg-red-50 text-left"
                  variant="destructive"
                  title="Error"
                  description="Please fill out all fields."
                  icon="lucide:alert-circle"
                />
              </div>
              <div class="flex flex-col gap-2">
                <UiButton
                  type="submit"
                  variant="expandIcon"
                  icon-placement="right"
                  icon="lucide:arrow-right"
                  class="bg-black text-white hover:bg-black hover:text-white"
                  >Sign up</UiButton
                >

                <!-- <UiDialogClose as-child>
                      <UiButton
                        type="button"
                        variant="outline"
                      >
                        Close
                      </UiButton>
                    </UiDialogClose> -->
              </div>
            </form>
          </UiDialogContent>
        </UiDialog>
      </template>
      <template v-else>
        <div class="text-center">
          <p class="mx-auto mb-4 max-w-2xl">
            Thank you for signing up and showing your interest!
          </p>
          <p class="mx-auto mb-4 max-w-2xl">
            We'll be sending out more information in future, but for now, just
            sit tight and start getting excited!
          </p>
        </div>
      </template>
    </UiContainer>
  </div>
</template>
