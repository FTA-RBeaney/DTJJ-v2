<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import {
  PASS_TYPES,
  HOSTING_OPTIONS,
  COMMUNITY_OPTIONS,
  PIF_OPTIONS,
  TRAVEL_OPTIONS,
} from "@/constants/registerOptions";

const props = defineProps({
  availableTickets: {
    type: Object,
    required: true,
  },
  numberOfSoldFullPasses: {
    type: Number,
    required: true,
  },
  numberOfSoldPartyPasses: {
    type: Number,
    required: true,
  },
});

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

const isDiscountApplied = ref(false);

const volunteerDiscount = ref<string | null>(null);

const fetchVolunteerDiscount = async (code) => {
  try {
    const { selectedDiscount: discount } = await $fetch(
      "/api/get-volunteer-discount",
      { query: { code } }
    );
    if (!discount) return;
    volunteerDiscount.value = discount;
    isDiscountApplied.value = true;
    console.log(volunteerDiscount.value);
  } catch (error) {
    console.error("Failed to fetch volunteer discount:", error);
  }

  if (volunteerDiscount.value === "volunteer-party") {
    setChosenTicket("volunteer-party");
  } else if (volunteerDiscount.value === "volunteer-full") {
    setChosenTicket("volunteer-full");
  } else {
    return;
  }
  console.log(chosenTicket.value);
};

const addUserToDatabase = async (result?) => {
  console.log("Adding user to database...");
  // Check if user already exists in database
  const { data: existingUser, error: fetchError } = await supabase
    .from("registrations")
    .select("*")
    .eq("email", email.value)
    .maybeSingle();

  console.log("Existing user:", existingUser);

  if (fetchError) {
    console.error("Error checking existing registration:", fetchError);
    useSonner.error("Error checking registration status.", {
      description: "Please contact support.",
      position: "top-center",
    });
    throw fetchError;
  }

  if (existingUser) {
    useSonner.error("Registration already exists.", {
      description: "This email is already registered for the event.",
      position: "top-center",
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
      stripe_payment_id: result?.paymentIntent?.id || "none",
      number_of_guests: numberOfGuests.value,
    },
  ]);

  if (dbError) {
    console.error("Database insertion error:", dbError);
    useSonner.error("Payment succeeded but failed to save registration.", {
      description: "Please contact support.",
      position: "top-center",
    });
    throw dbError;
  }
};

async function onSubmit() {
  isOpen.value = true;
  registerProcessing.value = true;

  error.value = null;
  if (isDiscountApplied.value) {
    processing.value = true;

    await addUserToDatabase(null);
    if (error.value) {
      isOpen.value = false;
      return;
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
  } else {
    if (!validateRequired()) return;

    processing.value = true;
    console.log("processing");
    // compute amount: chosenTicket price (in GBP) plus donation if any
    const baseAmount = Math.round((chosenTicket.value?.price ?? 0) * 100);
    const donation =
      payItForward.value.type === "donate" && payItForward.value.amount
        ? Math.round(payItForward.value.amount * 100)
        : 0;

    let amount;
    amount = baseAmount + donation;
    processing.value = false;

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
          await addUserToDatabase(result);

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
}

const totalPrice = computed(() => {
  let total = 0;
  total = (chosenTicket?.value?.price ?? 0) + (payItForwardAmount.value || 0);
  return total;
});

watch(payItForward.value, (newValue) => {
  console.log("Pay it forward amount changed:", newValue);
  setPayItForward(selectedPayItForward.value, newValue.amount);
});

const applyDiscount = async () => {
  await fetchVolunteerDiscount(discountCode.value);

  if (
    chosenTicket.value.value === "volunteer-party" ||
    chosenTicket.value.value === "volunteer-full"
  ) {
    useSonner.success("Discount applied!", {
      description: `Discount code "${chosenTicket.value.label}" applied.`,
      position: "top-center",
    });
  } else {
    useSonner.error("Invalid discount code.", {
      description: `The code "${discountCode.value}" is not valid.`,
      position: "top-center",
    });
  }
};
</script>

<template>
  <form class="space-y-4" @submit.prevent="onSubmit">
    <p class="mx-auto max-w-3xl">
      This page will update every so often to make sure that you have the most
      up to date ticket prices.
    </p>
    <div class="relative grid items-start gap-4 lg:grid-cols-2">
      <UiCard class="bg-white text-black">
        <UiCardContent class="grid space-y-3">
          <div v-if="!isDiscountApplied" class="grid space-y-3">
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
                    <div class="flex w-full items-center justify-between">
                      <div class="flex items-center gap-2">
                        <Icon class="h-6 w-6" :name="p.icon" />
                        <span class="">{{ p?.label }} </span>
                      </div>
                      <UiBadge v-if="p.value === 'party'">
                        {{ p.quantity - numberOfSoldPartyPasses }}/{{
                          p.quantity
                        }}
                        left
                      </UiBadge>
                      <UiBadge v-else>
                        {{ p.quantity - numberOfSoldFullPasses }}/{{
                          p.quantity
                        }}
                        left
                      </UiBadge>
                    </div>
                  </UiLabel>
                </div>
              </div>
            </UiRadioGroup>

            <!-- Pass selection hint -->

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

            <!-- Pay it forward -->

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
          </div>

          <!-- Hosting -->
          <RegistrationHosting />

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
                <label v-for="option in COMMUNITY_OPTIONS" :key="option.value">
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
            :disabled="isDiscountApplied"
          />

          <UiButton @click="applyDiscount" :disabled="isDiscountApplied"
            >Apply discount</UiButton
          >

          <!-- Stripe card element -->
          <div
            v-if="!isDiscountApplied"
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
              v-if="!isDiscountApplied"
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
            <UiButton
              v-else-if="isDiscountApplied"
              type="submit"
              class="btn"
              :disabled="!termsAccepted"
              >Volunteer!</UiButton
            >

            <RegistrationBadges
              :chosen-ticket="chosenTicket"
              :pay-it-forward="payItForward"
              :hosting-option="hostingOption"
              :volunteering="volunteering"
              :is-musician="isMusician"
              :musician-instrument="musicianInstrument"
              :merch="merch"
            />
          </div>
        </UiCardContent>
      </UiCard>

      <UiDialog v-model:open="isOpen">
        <UiDialogContent
          class="flex flex-col items-center sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden"
        >
          <template #content>
            <div class="flex items-center space-x-2">
              <div v-if="registerProcessing" class="flex flex-col items-center">
                <UiLoader class="mb-4" />
                <p class="text-lg font-medium">Processing your registration…</p>
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
</template>
