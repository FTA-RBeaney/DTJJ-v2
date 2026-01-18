<script setup>
import { HOSTING_OPTIONS } from "@/constants/registerOptions";
const paymentStore = usePaymentStore();
const { setChosenTicket, setRegistrationData, setPayItForward, setHosting } =
  paymentStore;

const { hostingOption } = storeToRefs(paymentStore);

const numberOfGuests = ref(0);
</script>

<template>
  <div>
    <UiLabel class="font-lazy mb-1 block text-3xl font-medium">
      Hosting
    </UiLabel>

    <div class="mb-2 items-center gap-2">
      <UiRadioGroup
        orientation="horizontal"
        class="grid gap-4"
        default-value="no-hosting"
      >
        <div
          @click="setHosting(p)"
          v-for="(p, i) in HOSTING_OPTIONS"
          :key="`hosting-${i}`"
        >
          <UiRadioGroupItem
            :id="p.value"
            :value="p.value"
            class="peer sr-only"
            :checked="hostingOption.value === p.value"
            default-value="no-hosting"
          />
          <UiLabel
            :for="p.value"
            class="border-muted peer-data-[state=checked]:border-primary hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary block items-center justify-start gap-3 rounded-md border-2 bg-white p-4 text-black"
          >
            <div class="flex items-center">
              <Icon class="mr-2 h-6 w-6" :name="p.icon" />
              {{ p?.label }}
            </div>
          </UiLabel>
        </div>
      </UiRadioGroup>
    </div>

    <div v-if="hostingOption.value === 'i-can-host'" class="grid">
      <div class="mt-2 mb-4 grid w-full max-w-sm gap-2">
        <UiLabel>How many people can you host?</UiLabel>
        <UiInput
          v-model.number="numberOfGuests"
          placeholder="Number of guests"
          type="number"
        />
      </div>
    </div>
  </div>
</template>
