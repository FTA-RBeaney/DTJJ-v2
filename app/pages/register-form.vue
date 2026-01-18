<script setup lang="ts">
import { PASS_TYPES } from "@/constants/registerOptions";
const paymentStore = usePaymentStore();
const { setChosenTicket, setRegistrationData, setPayItForward, setHosting } =
  paymentStore;
const {
  chosenTicket,
  payItForwardAmount,
  hostingOption,
  selectedPayItForward,
} = storeToRefs(paymentStore);

const pageLoading = ref(true);
const numberOfSoldFullPasses = ref(0);
const numberOfSoldPartyPasses = ref(0);
const supabase = useSupabaseClient();

let pollInterval: ReturnType<typeof setInterval>;

// Cleanup interval on unmount
onBeforeUnmount(() => {
  clearInterval(pollInterval);
});

const fetchTicketCount = async () => {
  try {
    const { count: ticketCount } = await supabase
      .from("registrations")
      .select("*", { count: "exact", head: true })
      .in("pass_type", ["full", "full-early", "full-late"]);

    const { count: soldPartyPasses } = await supabase
      .from("registrations")
      .select("*", { count: "exact", head: true })
      .in("pass_type", ["party"]);

    numberOfSoldFullPasses.value = ticketCount || 0;
    numberOfSoldPartyPasses.value = soldPartyPasses || 0;

    if (chosenTicket?.value?.value !== "party") {
      setChosenTicket(availableTickets.value[0].value);
    }
  } catch (err) {
    console.error("Error loading ticket data:", err);
  }
};

const fetchTicketCountAgain = async () => {
  useSonner.info("Fetching tickets", {
    description: "Keeping your prices up to date",
    position: "top-center",
  });
  await fetchTicketCount();
};

const activeTicket = computed(() => {
  if (numberOfSoldFullPasses.value < PASS_TYPES[0].quantity) {
    return "full-early";
  } else if (
    numberOfSoldFullPasses.value >= PASS_TYPES[0].quantity &&
    numberOfSoldFullPasses.value < regularFullThreshhold.value
  ) {
    return "full";
  } else if (
    numberOfSoldFullPasses.value >= regularFullThreshhold.value &&
    numberOfSoldFullPasses.value < lateFullThreshhold.value
  ) {
    return "full-late";
  } else {
    return "sold-out";
  }
});

const regularFullThreshhold = computed(() => {
  return PASS_TYPES[0].quantity + PASS_TYPES[1].quantity;
});

const lateFullThreshhold = computed(() => {
  return (
    PASS_TYPES[0].quantity + PASS_TYPES[1].quantity + PASS_TYPES[2].quantity
  );
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

onMounted(async () => {
  // Fetch immediately on mount
  await fetchTicketCount();
  pageLoading.value = false;

  // Set initial ticket selection
  if (availableTickets.value.length > 0) {
    setChosenTicket(availableTickets.value[0].value || "party");
  }

  // Poll every 20 seconds
  pollInterval = setInterval(fetchTicketCountAgain, 200000);
});
</script>

<template>
  <div>
    <div class="mx-auto w-full max-w-7xl p-6">
      <RegistrationSkeleton v-if="pageLoading" />
      <div
        v-if="pageLoading"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <div class="flex flex-col items-center gap-4">
          <UiLoader />
          <p class="text-white">Loading registration form...</p>
        </div>
      </div>
      <StripeForm
        v-else
        :availableTickets="availableTickets"
        :numberOfSoldFullPasses="numberOfSoldFullPasses"
        :numberOfSoldPartyPasses="numberOfSoldPartyPasses"
      />
    </div>
  </div>
</template>
