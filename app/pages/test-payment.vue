<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
</script>

<template>
  <UiContainer class="grid grid-cols-2 items-start gap-6 py-6">
    <!-- <div class="mt-12 gap-6 lg:mt-16">
      <UiRadioGroup
        orientation="horizontal"
        class="grid w-full grid-cols-2 gap-4"
      >
        <template v-for="(p, i) in prices" :key="i">
          <div
            class="relative rounded-lg border p-8"
            :class="[
              p.title === chosenTicket?.name
                ? 'border-primary bg-primary/5'
                : 'bg-card',
            ]"
          >
            <UiRadioGroupItem :id="p.id" :value="p.id" class="peer sr-only" />
            <div class="flex items-start justify-between">
              <div class="flex gap-2">
                <h3 class="text-xl font-bold">{{ p.title }} pass</h3>
                <Icon :name="p.icon" class="text-primary size-6" />
              </div>
              <UiBadge v-if="p.featured" variant="default">Recommended</UiBadge>
            </div>

            <div class="my-4">
              <div class="flex items-baseline gap-2">
                <span class="text-5xl font-bold">£{{ p.price }}</span>
              </div>
            </div>

            <div class="mb-8 space-y-4">
              <div
                v-for="(feature, k) in p.features"
                :key="k"
                class="flex items-start gap-3"
              >
                <Icon
                  name="lucide:check-circle-2"
                  class="text-primary mt-0.5 size-5 shrink-0"
                />
                <div>
                  <p class="font-medium">{{ feature.name }}</p>
                  <p class="text-muted-foreground ">
                    {{ feature.description }}
                  </p>
                </div>
              </div>
            </div>

            <UiButton
              class="w-full"
              :variant="p.title === chosenTicket?.name ? 'default' : 'outline'"
              @click="setChosenTicket(p.title)"
            >
              {{ p.cta }}{{ p.title === chosenTicket?.name ? "ed!" : "" }}
            </UiButton>
          </div>
        </template>
      </UiRadioGroup>
    </div> -->

    <StripeForm />

    <RegistrationDetailsTable />
  </UiContainer>
</template>
