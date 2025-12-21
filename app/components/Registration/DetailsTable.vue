<script setup lang="ts">
import JamJar from "@/assets/img/627a3e29a51c556-removebg-preview.png";
const paymentStore = usePaymentStore();
const { registrationData } = storeToRefs(paymentStore);

// Ensure registrationData is always typed as RegistrationData
if (!registrationData.value) {
  registrationData.value = {
    name: { first: "", last: "" },
    pronouns: "",
    role: "",
    pass: { name: "" },
    volunteering: false,
    hosting: "",
    musician: { participates: false, instrument: "" },
    merch: { want: false, size: "" },
    optional: {},
  } as RegistrationData;
}

// Explicitly type registrationData as Ref<RegistrationData>
const registrationDataTyped =
  registrationData as import("vue").Ref<RegistrationData>;

type RegistrationData = {
  name: {
    first: string;
    last: string;
  };
  pronouns: string;
  role: string;
  pass: {
    name: string;
  };
  volunteering: boolean;
  hosting: string;
  musician: {
    participates: boolean;
    instrument?: string;
  };
  merch: {
    want: boolean;
    size?: string;
  };
  optional?: Record<string, any>;
};

const teamBadgeClass = (team: string) => {
  const palette: Record<string, string> = {
    raspberry: "bg-rose-500/15 text-rose-600 ring-1 ring-rose-500/40",
    blueberry: "bg-indigo-500/15 text-indigo-600 ring-1 ring-indigo-500/40",
    "lemon curd": "bg-amber-300/20 text-amber-700 ring-1 ring-amber-400/60",
  };
  return (
    palette[team?.toLowerCase()] ??
    "bg-muted text-foreground ring-1 ring-border"
  );
};
const accountDetails = computed(() => {
  return [
    {
      label: "Name",
      value: "Robert Beaney",
    },
    {
      label: "Pronouns",
      value: "he/him",
    },
    {
      label: "Primary role",
      value: "Lead",
    },
    {
      label: "Pass type",
      value: "Full pass",
    },

    {
      label: "Volunteering",
      value: registrationDataTyped.value.volunteering ? "Yes" : "No",
    },
    {
      label: "Hosting status",
      value:
        registrationDataTyped.value.hosting === "i-can-host"
          ? "Hosting"
          : "Not hosting",
    },
    {
      label: "Musician",
      value: `${registrationDataTyped.value.musician?.participates ? "Yes" : "No"}${
        registrationDataTyped.value.musician?.participates
          ? ` (${registrationDataTyped.value.musician?.instrument})`
          : ""
      }`,
    },
    {
      label: "Merch",
      value: registrationDataTyped.value.merch?.want
        ? `${registrationDataTyped.value.merch?.size}`
        : "No",
    },
  ];
});
</script>

<template>
  <div class="grid gap-4">
    <div
      v-if="accountDetails"
      class="border-border bg-background overflow-hidden rounded-lg border"
    >
      <UiTable>
        <UiTableBody>
          <template v-for="(item, index) in accountDetails" :key="index">
            <UiTableRow>
              <UiTableCell class="bg-muted/50 py-2 font-medium">
                {{ item.label }}
              </UiTableCell>
              <UiTableCell>
                <template v-if="item.label === 'Pass type'">
                  <UiBadge variant="default">
                    {{ item.value }}
                    <Icon
                      :name="
                        item.value === 'Full pass'
                          ? 'lucide:star'
                          : 'lucide:party-popper'
                      "
                    />
                  </UiBadge>
                </template>
                <template
                  v-else-if="item.label === 'Merch' && item.value !== 'No'"
                >
                  <UiBadge variant="default">
                    {{ item.value }}
                  </UiBadge>
                </template>
                <template v-else>
                  {{ item.value }}
                </template>
              </UiTableCell>
            </UiTableRow>
          </template>
          <UiTableRow>
            <UiTableCell class="bg-muted/50 py-2 font-medium">Team</UiTableCell>
            <UiTableCell>
              <span
                class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold capitalize"
                :class="teamBadgeClass('raspberry')"
              >
                <img :src="JamJar" class="size-6" />
                Raspberry
              </span>
            </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>
  </div>
</template>
