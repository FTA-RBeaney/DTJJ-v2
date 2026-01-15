<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
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
const {
  chosenTicket,
  payItForwardAmount,
  hostingOption,
  selectedPayItForward,
} = storeToRefs(paymentStore);

import { useStripeCard } from "@/composables/useStripeCard";
import { number } from "yup";

const isOpen = ref(false);
const registerProcessing = ref(false);
const supabase = useSupabaseClient();

// Page loading state
const pageLoading = ref(true);

// Personal + registration fields
const firstName = ref("");
const surname = ref("");
const pronouns = ref("");
const email = ref("");
const city = ref("");
const discountCode = ref("");
const loading = ref(false);
const success = ref(false);
const numberOfGuests = ref(0);

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

// Initialize data and computed props
let count: number;
let numberOfSoldTicketsValue: number;
let pollInterval: ReturnType<typeof setInterval>;

const fetchTicketCount = async () => {
  useSonner.info("Fetching tickets", {
    description: "Keeping your prices up to date",
  });

  try {
    const { count: ticketCount } = await supabase
      .from("registrations")
      .select("*", { count: "exact", head: true })
      .in("pass_type", ["full", "full-early", "full-late"]);

    numberOfSoldTickets.value = ticketCount || 0;

    if (chosenTicket?.value?.value !== "party") {
      setChosenTicket(availableTickets.value[0].value);
    }
  } catch (err) {
    console.error("Error loading ticket data:", err);
  }
};

// Move initialization to onMounted
onMounted(async () => {
  // Fetch immediately on mount
  await fetchTicketCount();
  pageLoading.value = false;

  // Set initial ticket selection
  if (availableTickets.value.length > 0) {
    setChosenTicket(availableTickets.value[0].value || "party");
  }

  // Poll every 20 seconds
  pollInterval = setInterval(fetchTicketCount, 200000);
});

// Cleanup interval on unmount
onBeforeUnmount(() => {
  clearInterval(pollInterval);
});

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
    pass: chosenTicket.value || null,
    payItForward: { ...payItForward.value },
    hosting: hosting.value,
    musician: {
      participates: isMusician.value,
      instrument: musicianInstrument.value,
      bringsInstrument: bringInstrument.value,
    },
    numberOfGuests: numberOfGuests.value,
    merch: merch.value,
    termsAccepted: termsAccepted.value,
    optional: optional.value,
    submittedAt: new Date().toISOString(),
    passType: chosenTicket.value?.value || null,
    volunteering: volunteering.value,
  };

  try {
    // Create payment intent on server: send amount in cents and registration
    const resp = await $fetch("/api/create-payment-intent", {
      method: "POST",
      body: { amount, currency: "GBP", registration },
    });

    const clientSecret = (resp as any).clientSecret;
    if (!clientSecret) {
      throw new Error("No client secret from server");
    }

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
        // Check if user already exists in database
        const { data: existingUser, error: fetchError } = await supabase
          .from("registrations")
          .select("*")
          .eq("email", email.value)
          .maybeSingle();

        if (fetchError) {
          console.error("Error checking existing registration:", fetchError);
          useSonner.error("Error checking registration status.", {
            description: "Please contact support.",
          });
          throw fetchError;
        }

        if (existingUser) {
          useSonner.error("Registration already exists.", {
            description: "This email is already registered for the event.",
          });
          error.value = "User already registered";
          isOpen.value = false;
          return;
        }

        // Insert registration data into Supabase with pending payment status
        const { error: dbError } = await supabase.from("registrations").insert([
          {
            name: {
              first: firstName.value,
              last: surname.value,
            },
            pronouns: pronouns.value,
            email: email.value,
            city: city.value,
            pass: chosenTicket.value || null,
            pay_it_forward: { ...payItForward.value },
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
            pass_type: chosenTicket.value?.value || null,
            volunteering: volunteering.value,
            payment_status: "pending", // Will be updated by webhook
            stripe_payment_id: result.paymentIntent.id,
            number_of_guests: numberOfGuests.value,
          },
        ]);

        if (dbError) {
          console.error("Database insertion error:", dbError);
          useSonner.error(
            "Payment succeeded but failed to save registration.",
            {
              description: "Please contact support.",
            }
          );
          throw dbError;
        }

        success.value = true;
        setTimeout(() => {
          useConfetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

          registerProcessing.value = false;
        }, 2000);

        await nextTick();

        setTimeout(() => {
          isOpen.value = false;
        }, 4000);
      } catch (err) {
        console.error("Post-payment processing error:", err);
        useSonner.error("An error occurred after payment.", {
          description: "Please contact support.",
        });
        error.value = "Failed to complete registration";
      } finally {
        loading.value = false;
      }
    } else {
      error.value = "Payment not completed";
      useSonner.error("Payment was not completed successfully.");
    }
  } catch (err: any) {
    console.error("Payment processing error:", err);
    error.value = err?.message || String(err);
    useSonner.error("An error occurred during payment processing.", {
      description: error.value,
    });
  } finally {
    processing.value = false;
  }
}

const totalPrice = computed(() => {
  let total = 0;
  total = (chosenTicket?.value?.price ?? 0) + (payItForwardAmount.value || 0);
  return total;
});
const testSoldTickets = ref(0);
const numberOfSoldTickets = ref(0);

const regularFullThreshhold = computed(() => {
  return PASS_TYPES[0].quantity + PASS_TYPES[1].quantity;
});

const lateFullThreshhold = computed(() => {
  return (
    PASS_TYPES[0].quantity + PASS_TYPES[1].quantity + PASS_TYPES[2].quantity
  );
});

const activeTicket = computed(() => {
  if (numberOfSoldTickets.value < PASS_TYPES[0].quantity) {
    return "full-early";
  } else if (
    numberOfSoldTickets.value >= PASS_TYPES[0].quantity &&
    numberOfSoldTickets.value < regularFullThreshhold.value
  ) {
    return "full";
  } else if (
    numberOfSoldTickets.value >= regularFullThreshhold.value &&
    numberOfSoldTickets.value < lateFullThreshhold.value
  ) {
    return "full-late";
  } else {
    return "sold-out";
  }
});

const activeTicketDetails = computed(() => {
  if (activeTicket.value === "sold-out") {
    return;
  }
  return PASS_TYPES.find((p) => p.value === activeTicket.value);
});

const availableTickets = computed(() => {
  // add the activeTicketDetails.value and the party ticket together
  const partyTicket = PASS_TYPES.find((p) => p.value === "party");

  if (activeTicketDetails.value && partyTicket) {
    // return the two items in an object
    return [activeTicketDetails.value, partyTicket];
  }
  return [partyTicket];
});

watch(payItForward.value, (newValue) => {
  console.log("Pay it forward amount changed:", newValue);
  setPayItForward(selectedPayItForward.value, newValue.amount);
});
</script>

<template>
  <div class="mx-auto w-full max-w-7xl p-6">
    <!-- Loading overlay -->
    <div
      v-if="pageLoading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div class="flex flex-col items-center gap-4">
        <UiLoader />
        <p class="text-white">Loading registration form...</p>
      </div>
    </div>

    <form v-if="!pageLoading" class="space-y-4" @submit.prevent="onSubmit">
      <p class="mx-auto max-w-3xl">
        This page will update every so often to make sure that you have the most
        up to date ticket prices.
      </p>
      <div class="relative grid items-start gap-4 lg:grid-cols-2">
        <UiCard class="bg-white text-black">
          <UiCardContent class="grid space-y-3">
            <!-- <UiInput v-model="testSoldTickets" placeholder="Sold" required /> -->
            <div
              v-if="numberOfSoldTickets >= lateFullThreshhold"
              class="text-center text-lg font-semibold text-red-600"
            >
              <p>Full passes are sold out.</p>
              <p>You can still get a Party pass to join the festival!</p>
            </div>
            <UiRadioGroup orientation="horizontal" class="grid gap-4">
              <div
                v-for="(p, i) in availableTickets"
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
                    class="border-muted peer-data-[state=checked]:border-primary hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary flex items-center justify-start gap-3 rounded-md border-2 bg-white p-4 text-black"
                    :class="
                      chosenTicket?.value === p.value ? 'border-primary' : ''
                    "
                  >
                    <Icon class="h-6 w-6" :name="p.icon" />
                    <span class="">{{ p?.label }} </span>
                  </UiLabel>
                </div>
              </div>
            </UiRadioGroup>

            <!-- Pass selection hint -->
            <div>
              <UiLabel class="font-lazy mb-1 block text-3xl font-medium">
                Selected pass
              </UiLabel>
              <div class="text-muted-foreground">
                {{
                  chosenTicket?.label
                    ? `${chosenTicket?.label} — £${chosenTicket?.price}`
                    : "Please select a pass type above"
                }}
              </div>
            </div>

            <!-- Pay it forward -->
            <div>
              <UiLabel class="font-lazy mb-1 block text-3xl font-medium">
                Pay it forward
              </UiLabel>
              <p class="text-muted-foreground mb-2">
                Through our Pay It Forward Fund, we offer discounted tickets to
                those who need them. If you’re able, consider adding a little
                extra to your ticket.
              </p>

              <div class="mb-2 items-center gap-2">
                <UiRadioGroup orientation="horizontal" class="grid gap-4">
                  <div
                    @click="setPayItForward(p.id, p.value)"
                    v-for="(p, i) in PIF_OPTIONS"
                    :key="`payitforward-method-${i}`"
                  >
                    <UiRadioGroupItem
                      :id="p.id"
                      :value="p.id"
                      class="peer sr-only"
                    />
                    <UiLabel
                      :for="p.id"
                      class="border-muted peer-data-[state=checked]:border-primary hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary block items-center justify-start gap-3 rounded-md border-2 bg-white p-4 text-black"
                      :class="
                        selectedPayItForward === p.id ? 'border-primary' : ''
                      "
                    >
                      <div class="">{{ p?.name }}</div>
                      <div v-if="p.id !== 'other'" class="">
                        £{{ chosenTicket?.price + p?.value }}
                      </div>
                    </UiLabel>
                  </div>
                </UiRadioGroup>
              </div>

              <!-- <div v-if="selectedPayItForward === 'other'" class="flex gap-2">
                <p class="">
                  Please enter how much you would like to add or how much help
                  you need
                </p>
                <UiInput
                  v-model.number="payItForward.amount"
                  placeholder="Amount (GBP)"
                  type="number"
                />
              </div> -->
            </div>

            <!-- Hosting -->
            <div>
              <UiLabel class="font-lazy mb-1 block text-3xl font-medium">
                Hosting
              </UiLabel>

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
                        class="border-muted peer-data-[state=checked]:border-primary hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary block items-center justify-start gap-3 rounded-md border-2 bg-white p-4 text-black"
                        :class="
                          p.value === hostingOption.value
                            ? 'border-primary'
                            : ''
                        "
                      >
                        <div class="flex items-center">
                          <Icon class="mr-2 h-6 w-6" :name="p.icon" />
                          {{ p?.label }}
                        </div>
                      </UiLabel>
                    </div>
                  </template>
                </UiRadioGroup>
              </div>

              <div
                v-if="hostingOption.value === 'i-can-host'"
                class="flex gap-2"
              >
                <p class="">How many people can you host?</p>
                <UiInput
                  v-model.number="numberOfGuests"
                  placeholder="Number of guests"
                  type="number"
                />
              </div>
            </div>

            <!-- Volunteering -->
            <div>
              <UiLabel class="font-lazy mb-1 block text-3xl font-medium">
                Volunteering
              </UiLabel>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="volunteering" />
                <span>I would like to volunteer at the festival</span>
              </label>
            </div>

            <!-- JazzJam musician -->
            <div>
              <UiLabel class="font-lazy mb-1 block text-3xl font-medium">
                Jazz Jam musician
              </UiLabel>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="isMusician" />
                <span>I would like to participate as a musician</span>
              </label>
              <div v-if="isMusician" class="mt-2 grid gap-2">
                <UiInput
                  v-model="musicianInstrument"
                  placeholder="Instrument"
                  class="block border-black"
                />
                <label class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    v-model="bringInstrument"
                    class="block"
                  />
                  I will bring my own instrument
                </label>
              </div>
            </div>

            <!-- Optional questions -->
            <div class="mt-4 grid gap-2">
              <UiLabel class="font-lazy mb-1 block text-3xl font-medium">
                Optional
              </UiLabel>

              <p class="">
                These questions are optional, but they do help give us a better
                understanding of who is attending the festival.
              </p>

              <div class="mt-2">
                <UiLabel class="font-lazy mb-1 block text-3xl font-medium">
                  How are you travelling?
                </UiLabel>
                <UiSelect v-model="optional.travelMethod">
                  <UiSelectTrigger
                    placeholder="Select an option"
                    class="dark:border-black dark:text-black"
                  />
                  <UiSelectContent>
                    <UiSelectGroup>
                      <UiSelectItem
                        v-for="option in TRAVEL_OPTIONS"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </UiSelectItem>
                    </UiSelectGroup>
                  </UiSelectContent>
                </UiSelect>
              </div>

              <div class="mt-2">
                <UiLabel class="font-lazy mb-1 block text-3xl font-medium">
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

        <UiCard class="sticky top-20 self-start bg-white text-black">
          <UiCardContent class="grid space-y-3">
            <!-- Error -->
            <p v-if="error" class="text-red-500">{{ error }}</p>

            <!-- Required personal details -->
            <div class="grid grid-cols-2 gap-3">
              <UiInput
                v-model="firstName"
                placeholder="First name"
                class="dark:border-black"
              />
              <UiInput
                v-model="surname"
                placeholder="Surname"
                class="dark:border-black"
              />
            </div>

            <UiInput
              v-model="pronouns"
              placeholder="Pronouns (optional)"
              class="dark:border-black"
            />
            <UiInput
              v-model="email"
              placeholder="Email"
              type="email"
              class="dark:border-black"
            />
            <UiInput
              v-model="city"
              placeholder="City, Country"
              class="dark:border-black"
            />

            <UiInput
              v-model="discountCode"
              placeholder="Discount code (if any)"
              class="dark:border-black"
            />

            <!-- Stripe card element -->
            <div
              ref="cardEl"
              class="rounded border p-3 dark:border-black"
            ></div>

            <!-- Terms -->
            <div class="mt-8">
              <label class="flex items-center gap-2">
                <input
                  v-model="termsAccepted"
                  type="checkbox"
                  class="dark:border-black"
                />
                <span
                  >I have read and fully accept the
                  <NuxtLink
                    to="/code-of-conduct"
                    class="underline"
                    target="_blank"
                    >Code of Conduct</NuxtLink
                  ></span
                >
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
                      class="flex size-8 items-center justify-center rounded-full bg-white text-black"
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
                      class="flex size-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
                    >
                      <Icon name="lucide:gift" class="size-5" />
                    </div>
                  </UiTooltipTrigger>
                  <UiTooltipContent>
                    <span>Donating £{{ payItForward.amount }}</span>
                  </UiTooltipContent>
                </UiTooltip>

                <!-- Host Badge -->
                <UiTooltip>
                  <UiTooltipTrigger as-child>
                    <div
                      class="flex size-8 items-center justify-center rounded-full bg-blue-100 text-blue-600"
                    >
                      <Icon :name="hostingOption.icon" class="size-5" />
                    </div>
                  </UiTooltipTrigger>
                  <UiTooltipContent>
                    <span>{{ hostingOption.label }}</span>
                  </UiTooltipContent>
                </UiTooltip>

                <!-- Volunteer badge -->
                <UiTooltip v-if="volunteering">
                  <UiTooltipTrigger as-child>
                    <div
                      class="flex size-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
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
                      class="flex size-8 items-center justify-center rounded-full bg-purple-100 text-purple-600"
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
                      class="flex size-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-600"
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
                  <p class="text-muted-foreground mt-2 text-center">
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
