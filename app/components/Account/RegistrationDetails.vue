<template>
  <div>
    <div class="border-border bg-background overflow-hidden rounded-lg border">
      <UiTable>
        <UiTableBody>
          <UiTableRow
            v-for="(detail, index) in accountDetails"
            :key="index"
            class="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r"
          >
            <UiTableCell class="bg-muted/50 py-2 font-medium">{{
              detail.label
            }}</UiTableCell>
            <UiTableCell v-if="detail.label === 'Team'">
              <span
                class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold capitalize"
                :class="teamBadgeClass(detail.value)"
              >
                <img :src="JamJar" class="size-6" />
                {{ detail.value }}
              </span>
            </UiTableCell>
            <UiTableCell v-else-if="detail.label === 'Volunteering'">
              <span
                class="bg-muted inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
              >
                <span
                  :class="['size-2 rounded-full', statusClass(detail.value)]"
                />
                {{ detail.value }}
              </span>
            </UiTableCell>
            <UiTableCell v-else class="py-2">{{ detail.value }}</UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import JamJar from "@/assets/img/627a3e29a51c556-removebg-preview.png";
type Attendee = {
  signedUp: string;
  passType: string;
  role: string;
  volunteering: boolean;
  hostingStatus: string;
  team: string;
};

const props = defineProps<{
  attendee: Attendee;
}>();

const accountDetails = [
  {
    label: "Signed up",
    value: props.attendee.signedUp,
  },
  {
    label: "Pass type",
    value: props.attendee.passType,
  },
  {
    label: "Primary role",
    value: props.attendee.role,
  },
  {
    label: "Volunteering",
    value: props.attendee.volunteering ? "Yes" : "No",
  },
  {
    label: "Hosting status",
    value: props.attendee.hostingStatus,
  },
  {
    label: "Team",
    value: props.attendee.team,
  },
];

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

const statusClass = (status: boolean) => {
  return status ? "bg-emerald-500" : "bg-amber-500";
};
</script>
