<script setup>
defineProps({
  chosenTicket: {
    type: Object,
    default: () => ({}),
  },
  payItForward: {
    type: Object,
    default: () => ({}),
  },
  hostingOption: {
    type: Object,
    default: () => ({}),
  },
  volunteering: {
    type: Boolean,
    default: false,
  },
  isMusician: {
    type: Boolean,
    default: false,
  },
  musicianInstrument: {
    type: String,
    default: "",
  },
  merch: {
    type: Object,
    default: () => ({}),
  },
});
</script>
<template>
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
    <UiTooltip v-if="payItForward.type === 'donate' && payItForward.amount">
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
        <span> Merch: T-shirt ({{ merch.size || "no size selected" }}) </span>
      </UiTooltipContent>
    </UiTooltip>
  </div>
</template>
>
