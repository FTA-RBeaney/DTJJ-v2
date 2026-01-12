<script setup lang="ts">
import { ref, computed } from "vue";
import {
  PASS_TYPES,
  HOSTING_OPTIONS,
  COMMUNITY_OPTIONS,
  PIF_OPTIONS,
  TRAVEL_OPTIONS,
} from "@/constants/registerOptions";

const paymentStore = usePaymentStore();
const { setChosenTicket, setRegistrationData, setPayItForward, setHosting } =
  paymentStore;
const { chosenTicket, payItForwardAmount, hostingOption } =
  storeToRefs(paymentStore);

import { useStripeCard } from "@/composables/useStripeCard";

const isOpen = ref(false);
const registerProcessing = ref(false);

// Personal + registration fields
const firstName = ref("");
const surname = ref("");
const pronouns = ref("");
const email = ref("");
const city = ref("");
const friendName = ref("");
const loading = ref(false);
const success = ref(false);

// Hosting
const hosting = ref("no-need");

// Volunteering
const volunteering = ref(false);

// Musician
const isMusician = ref(false);
const musicianInstrument = ref("");
const bringInstrument = ref(false);

// Pay it forward
const payItForward = ref({
  type: "none" as "none" | "donate" | "request",
  amount: 0,
});

// Merch
const merch = ref({ want: false, size: "" });

// Terms
const termsAccepted = ref(false);

// Optional
const optional = ref({
  startYear: null as number | null,
  travelMethod: "",
  community: [] as string[],
});

// UI state
const error = ref<string | null>(null);
const processing = ref(false);
const cardEl = ref<HTMLElement | null>(null);
const {
  stripe,
  card,
  ready,
  cardComplete,
  cardError: stripeCardError,
} = useStripeCard(cardEl);

function validateRequired() {
  if (!chosenTicket.value) {
    error.value = "Please select a pass type.";
    return false;
  }
  if (!firstName.value.trim()) {
    error.value = "First name is required.";
    return false;
  }
  if (!surname.value.trim()) {
    error.value = "Surname is required.";
    return false;
  }
  if (!email.value.trim()) {
    error.value = "Email is required.";
    return false;
  }
  if (!city.value.trim()) {
    error.value = "City is required.";
    return false;
  }
  if (!termsAccepted.value) {
    error.value = "You must accept the Terms & Conditions.";
    return false;
  }
  if (!ready.value || !cardComplete.value) {
    error.value = stripeCardError || "Payment is not ready yet.";
    return false;
  }
  return true;
}

const isValidated = computed(() => {
  return validateRequired();
});

const completeRegistration = async () => {
  // write the data to Supabse 'registrations' table
  const { error } = await useSupabaseClient()
    .from("registrations")
    .insert([
      {
        name: {
          first: firstName.value,
          last: surname.value,
        },
        pronouns: pronouns.value,
        email: email.value,
        city: city.value,
        friend_name: friendName.value || null,
        pass: chosenTicket.value || null,
        pay_it_forward: { ...payItForward.value },
        volunteering: volunteering.value,
        hosting: hosting.value,
        musician: {
          participates: isMusician.value,
          instrument: musicianInstrument.value,
          bringsInstrument: bringInstrument.value,
        },
        merch: merch.value,
        terms_accepted: termsAccepted.value,
        start_year: optional.value.startYear,
        travel_method: optional.value.travelMethod,
        community: optional.value.community,
        submitted_at: new Date().toISOString(),
      },
    ]);
  email.value = "";
  firstName.value = "";
  surname.value = "";
  pronouns.value = "";
  city.value = "";
  friendName.value = "";
  hosting.value = "no-need";
  isMusician.value = false;
  musicianInstrument.value = "";
  bringInstrument.value = false;
  payItForward.value = { type: "none", amount: 0 };
  merch.value = { want: false, size: "" };
  termsAccepted.value = false;
  optional.value = {
    startYear: null,
    travelMethod: "",
    community: [],
  };
  useConfetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
};

async function onSubmit() {
  isOpen.value = true;
  registerProcessing.value = true;

  error.value = null;
  if (!validateRequired()) return;

  processing.value = true;

  // compute amount: chosenTicket price (in GBP) plus donation if any
  const baseAmount = Math.round((chosenTicket.value?.price ?? 0) * 100);
  const donation =
    payItForward.value.type === "donate" && payItForward.value.amount
      ? Math.round(payItForward.value.amount * 100)
      : 0;
  const amount = baseAmount + donation;

  // Build registration payload
  const registration = {
    name: {
      first: firstName.value,
      last: surname.value,
    },
    pronouns: pronouns.value,
    email: email.value,
    city: city.value,
    friendName: friendName.value || null,
    pass: chosenTicket.value || null,
    payItForward: { ...payItForward.value },
    hosting: hosting.value,
    volunteering: volunteering.value,
    musician: {
      participates: isMusician.value,
      instrument: musicianInstrument.value,
      bringsInstrument: bringInstrument.value,
    },
    merch: merch.value,
    termsAccepted: termsAccepted.value,
    optional: optional.value,
    submittedAt: new Date().toISOString(),
  };

  try {
    // Create payment intent on server: send amount in cents and registration
    const resp = await $fetch("/api/create-payment-intent", {
      method: "POST",
      body: { amount, currency: "GBP", registration },
    });

    const clientSecret = (resp as any).clientSecret;
    if (!clientSecret) throw new Error("No client secret from server");

    const result = await stripe.value!.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card.value,
        billing_details: {
          name: `${firstName.value} ${surname.value}`,
          email: email.value,
          address: {
            line1: city.value,
            postal_code: "UK",
            country: "GB",
          },
        },
      },
    });

    if (result.error) {
      useSonner.error(result.error.message || "Payment failed");
      error.value = result.error.message || "Payment failed";
      isOpen.value = false;
    } else if (
      result.paymentIntent &&
      result.paymentIntent.status === "succeeded"
    ) {
      setRegistrationData(registration);
      await nextTick(); // Ensure DOM updates before continuing
      loading.value = true;
      success.value = false;
      error.value = "";

      try {
        await $fetch("/api/send-confirmation", {
          method: "POST",
          body: {
            email: email.value,
            name: firstName.value,
            passType: chosenTicket.value?.label || "",
          },
        });

        success.value = true;
      } catch (err) {
        error.value = "Failed to send confirmation email";
      } finally {
        loading.value = false;
        setTimeout(() => {
          registerProcessing.value = false;
          completeRegistration();
        }, 2000);

        await nextTick();

        // setTimeout(() => {
        //   navigateTo("/account");
        // }, 5000);
      }
    } else {
      error.value = "Payment not completed";
    }
  } catch (err: any) {
    error.value = err?.message || String(err);
  } finally {
    processing.value = false;
  }
}

const totalPrice = computed(() => {
  let total = 0;
  total = (chosenTicket?.value?.price ?? 0) + (payItForwardAmount.value || 0);
  return total;
});
</script>

<template>
  <div class="mx-auto w-full max-w-7xl p-6">
    <form class="space-y-4" @submit.prevent="onSubmit">
      <div class="relative grid items-start gap-4 lg:grid-cols-2">
        <UiCard>
          <UiCardContent class="grid space-y-3">
            <UiRadioGroup orientation="horizontal" class="grid gap-4">
              <template
                v-for="(p, i) in PASS_TYPES"
                :key="`payment-method-${i}`"
              >
                <div @click="setChosenTicket(p?.value)">
                  <UiRadioGroupItem
                    :id="p.value"
                    :value="p.value"
                    class="peer sr-only"
                  />
                  <UiLabel
                    :for="p.value"
                    class="border-muted bg-popover peer-data-[state=checked]:border-primary hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary flex items-center justify-start gap-3 rounded-md border-2 p-4"
                    :class="
                      chosenTicket?.value === p.value ? 'border-primary' : ''
                    "
                  >
                    <Icon class="h-6 w-6" :name="p.icon" />
                    <span class="text-sm">{{ p?.label }}</span>
                  </UiLabel>
                </div>
              </template>
            </UiRadioGroup>

            <!-- Pass selection hint -->
            <div>
              <UiLabel class="font-lazy mb-1 block text-2xl font-medium">
                Selected pass
              </UiLabel>
              <div class="text-muted-foreground text-sm">
                {{
                  chosenTicket?.label
                    ? `${chosenTicket?.label} — £${chosenTicket?.price}`
                    : "Please select a pass type above"
                }}
              </div>
            </div>

            <!-- Pay it forward -->
            <div>
              <UiLabel class="font-lazy mb-1 block text-2xl font-medium">
                Pay it forward
              </UiLabel>
              <p class="text-muted-foreground mb-2 text-sm">
                With the Social and Sustainable Fund, we are able to give
                participants who request a discount access to the festival. We
                also donate to NGOs that fight for our values (sustainability &
                ecology, community & social, Black American heritage).
              </p>
              <p class="text-muted-foreground mb-2 text-sm">
                More information on the Social & Sustainable Fund can be found
                on our website.
              </p>
              <p class="text-muted-foreground mb-2 text-sm">
                If you are in a comfortable financial situation, we invite you
                to invest in the Fund by topping their ticket with:
              </p>
              <div class="mb-2 items-center gap-2">
                <UiRadioGroup orientation="horizontal" class="grid gap-4">
                  <template
                    v-for="(p, i) in PIF_OPTIONS"
                    :key="`payitforward-method-${i}`"
                  >
                    <div @click="setPayItForward(p?.value)">
                      <UiRadioGroupItem
                        :id="p.id"
                        :value="p.id"
                        class="peer sr-only"
                      />
                      <UiLabel
                        :for="p.id"
                        class="border-muted bg-popover peer-data-[state=checked]:border-primary hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary block items-center justify-start gap-3 rounded-md border-2 p-4"
                        :class="
                          p.value === payItForwardAmount ? 'border-primary' : ''
                        "
                      >
                        <div class="text-sm">{{ p?.name }}</div>
                        <div class="text-sm">
                          £{{ chosenTicket?.price + p?.value }}
                        </div>
                      </UiLabel>
                    </div>
                  </template>
                </UiRadioGroup>
              </div>
              <div v-if="payItForward.type !== 'none'" class="flex gap-2">
                <UiInput
                  v-model.number="payItForward.amount"
                  placeholder="Amount (GBP)"
                  type="number"
                />
              </div>
            </div>

            <!-- Hosting -->
            <div>
              <UiLabel class="font-lazy mb-1 block text-2xl font-medium">
                Hosting
              </UiLabel>
              <!-- <div class="flex flex-col gap-2">
                <label v-for="option in HOSTING_OPTIONS" :key="option.value">
                  <input v-model="hosting" type="radio" :value="option.value" />
                  {{ option.label }}
                </label>
              </div> -->

              <!-- todo: add a details section if the user can host -->

              <div class="mb-2 items-center gap-2">
                <UiRadioGroup orientation="horizontal" class="grid gap-4">
                  <template
                    v-for="(p, i) in HOSTING_OPTIONS"
                    :key="`hosting-${i}`"
                  >
                    <div @click="setHosting(p)">
                      <UiRadioGroupItem
                        :id="p.value"
                        :value="p.value"
                        class="peer sr-only"
                      />
                      <UiLabel
                        :for="p.value"
                        class="border-muted bg-popover peer-data-[state=checked]:border-primary hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary block items-center justify-start gap-3 rounded-md border-2 p-4"
                        :class="
                          p.value === hostingOption.value
                            ? 'border-primary'
                            : ''
                        "
                      >
                        <div class="flex items-center text-sm">
                          <Icon class="mr-2 h-6 w-6" :name="p.icon" />
                          {{ p?.label }}
                        </div>
                      </UiLabel>
                    </div>
                  </template>
                </UiRadioGroup>
              </div>
            </div>

            <!-- Volunteering -->
            <div>
              <UiLabel class="font-lazy mb-1 block text-2xl font-medium">
                Volunteering
              </UiLabel>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="volunteering" />
                <span>I would like to volunteer at the festival</span>
              </label>
            </div>

            <!-- JazzJam musician -->
            <div>
              <UiLabel class="font-lazy mb-1 block text-2xl font-medium">
                JazzJam musician
              </UiLabel>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="isMusician" />
                <span>I would like to participate as a musician</span>
              </label>
              <div v-if="isMusician" class="mt-2 grid gap-2">
                <label class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    v-model="bringInstrument"
                    class="block"
                  />
                  I will bring my own instrument
                </label>
                <UiInput
                  v-if="bringInstrument"
                  v-model="musicianInstrument"
                  placeholder="Instrument"
                  class="block"
                />
              </div>
            </div>

            <!-- Merch placeholder -->
            <div>
              <UiLabel class="font-lazy mb-1 block text-2xl font-medium">
                Merch (T‑shirt)
              </UiLabel>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="merch.want" />
                <span>I would like merch (T-shirt)</span>
              </label>
              <div v-if="merch.want" class="mt-2 flex gap-2">
                <UiSelect v-model="merch.size">
                  <UiSelectTrigger placeholder="Select size" />
                  <UiSelectContent>
                    <UiSelectGroup>
                      <UiSelectItem value="S">Small (S)</UiSelectItem>
                      <UiSelectItem value="M">Medium (M)</UiSelectItem>
                      <UiSelectItem value="L">Large (L)</UiSelectItem>
                      <UiSelectItem value="XL">Extra Large (XL)</UiSelectItem>
                      <UiSelectItem value="XXL">
                        Double Extra Large (XXL)
                      </UiSelectItem>
                    </UiSelectGroup>
                  </UiSelectContent>
                </UiSelect>
              </div>
            </div>

            <!-- Optional questions -->
            <div class="mt-4 grid gap-2">
              <UiLabel class="font-lazy mb-1 block text-2xl font-medium">
                Optional
              </UiLabel>

              <div class="mt-2">
                <UiLabel class="font-lazy mb-1 block text-2xl font-medium">
                  Community engagement (select any)
                </UiLabel>
                <div class="grid gap-2">
                  <label
                    v-for="option in COMMUNITY_OPTIONS"
                    :key="option.value"
                  >
                    <input
                      v-model="optional.community"
                      type="checkbox"
                      :value="option.value"
                    />
                    {{ option.label }}
                  </label>
                </div>
              </div>
            </div>
          </UiCardContent>
        </UiCard>

        <UiCard class="sticky top-20 self-start">
          <UiCardContent class="grid space-y-3">
            <!-- Error -->
            <p v-if="error" class="text-red-500">{{ error }}</p>

            <!-- Required personal details -->
            <div class="grid grid-cols-2 gap-3">
              <UiInput v-model="firstName" placeholder="First name" />
              <UiInput v-model="surname" placeholder="Surname" />
            </div>

            <UiInput v-model="pronouns" placeholder="Pronouns (optional)" />
            <UiInput v-model="email" placeholder="Email" type="email" />
            <UiInput v-model="city" placeholder="City, Country" />

            <UiInput
              v-model="friendName"
              placeholder="Name of 1 friend to be in same track (optional)"
            />

            <!-- Stripe card element -->
            <div ref="cardEl" class="rounded border p-3"></div>

            <!-- Terms -->
            <div class="mt-8">
              <label class="flex items-center gap-2">
                <input v-model="termsAccepted" type="checkbox" />
                <span>I have read and fully accept the Code of Conduct</span>
              </label>
            </div>

            <div class="text-right">
              <UiButton
                v-if="chosenTicket?.price"
                :disabled="processing || !termsAccepted || !isValidated"
                type="submit"
                class="btn"
              >
                {{
                  processing
                    ? "Processing…"
                    : chosenTicket
                      ? `Pay £${totalPrice}`
                      : "Please select a pass type"
                }}
              </UiButton>

              <!-- Badges -->
              <div class="flex items-center gap-2">
                <!-- Pass Type Badge -->
                <UiTooltip v-if="chosenTicket?.label">
                  <UiTooltipTrigger as-child>
                    <div
                      class="bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-full"
                    >
                      <Icon
                        v-if="chosenTicket?.label === 'Full pass'"
                        name="lucide:ticket"
                        class="size-5"
                      />
                      <Icon v-else name="lucide:party-popper" class="size-5" />
                    </div>
                  </UiTooltipTrigger>
                  <UiTooltipContent>
                    <span>Pass: {{ chosenTicket?.label || chosenTicket }}</span>
                  </UiTooltipContent>
                </UiTooltip>

                <!-- Donation Badge -->
                <UiTooltip
                  v-if="payItForward.type === 'donate' && payItForward.amount"
                >
                  <UiTooltipTrigger as-child>
                    <div
                      class="flex size-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                    >
                      <Icon name="lucide:gift" class="size-5" />
                    </div>
                  </UiTooltipTrigger>
                  <UiTooltipContent>
                    <span>Donating £{{ payItForward.amount }}</span>
                  </UiTooltipContent>
                </UiTooltip>

                <!-- Volunteer Badge -->
                <!-- <UiTooltip v-if="attendee.volunteering">
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
                </UiTooltip> -->

                <!-- Host Badge -->
                <UiTooltip>
                  <UiTooltipTrigger as-child>
                    <div
                      class="flex size-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    >
                      <Icon :name="hostingOption.icon" class="size-5" />
                    </div>
                  </UiTooltipTrigger>
                  <UiTooltipContent>
                    <span>Super host!</span>
                  </UiTooltipContent>
                </UiTooltip>

                <!-- Volunteer badge -->
                <UiTooltip v-if="volunteering">
                  <UiTooltipTrigger as-child>
                    <div
                      class="flex size-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                    >
                      <Icon name="lucide:hand-heart" class="size-5" />
                    </div>
                  </UiTooltipTrigger>
                  <UiTooltipContent>
                    <span>Volunteer</span>
                  </UiTooltipContent>
                </UiTooltip>

                <UiTooltip v-if="isMusician && musicianInstrument">
                  <UiTooltipTrigger as-child>
                    <div
                      class="flex size-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                    >
                      <Icon name="lucide:piano" class="size-5" />
                    </div>
                  </UiTooltipTrigger>
                  <UiTooltipContent>
                    <span>{{ musicianInstrument }}</span>
                  </UiTooltipContent>
                </UiTooltip>

                <UiTooltip v-if="merch.want">
                  <UiTooltipTrigger as-child>
                    <div
                      class="flex size-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                    >
                      <Icon name="lucide:shirt" class="size-5" />
                    </div>
                  </UiTooltipTrigger>
                  <UiTooltipContent>
                    <span>
                      Merch: T-shirt ({{ merch.size || "no size selected" }})
                    </span>
                  </UiTooltipContent>
                </UiTooltip>
              </div>
            </div>
          </UiCardContent>
        </UiCard>

        <UiDialog v-model:open="isOpen">
          <UiDialogContent
            class="flex flex-col items-center sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden"
          >
            <template #content>
              <div class="flex items-center space-x-2">
                <div
                  v-if="registerProcessing"
                  class="flex flex-col items-center"
                >
                  <UiLoader class="mb-4" />
                  <p class="text-lg font-medium">
                    Processing your registration…
                  </p>
                </div>
                <div v-else class="flex flex-col items-center">
                  <Icon
                    name="lucide:check-circle"
                    class="mb-4 text-emerald-500"
                    style="width: 48px; height: 48px"
                  />
                  <p class="text-lg font-medium">Registration complete!</p>
                  <p class="text-muted-foreground mt-2 text-center text-sm">
                    Thank you for registering. We look forward to seeing you at
                    the festival!
                  </p>
                </div>
              </div>
            </template>
          </UiDialogContent>
        </UiDialog>
      </div>
    </form>
  </div>
</template>
