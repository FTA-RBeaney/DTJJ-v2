<script setup lang="ts">
import JamJar from "@/assets/img/627a3e29a51c556-removebg-preview.png";
import {
  HOSTING_OPTIONS,
  COMMUNITY_OPTIONS,
  TRAVEL_OPTIONS,
} from "@/constants/registerOptions";

const props = defineProps<{
  data: any;
}>();

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

const fullName = computed(() => {
  if (!props.data) return "";
  return `${props.data.name.first} ${props.data.name?.last}`;
});

const hostedOptions = (item) => {
  if (!item) return "";

  // find the matching item in HOSTING_OPTIONS and return the label
  return HOSTING_OPTIONS.find((option) => option.value === item)?.label;
};

// take an item from the community array and return apprpopriate label
const communityOptions = (item) => {
  if (!item) return "";

  // find the matching item in COMMUNITY_OPTIONS and return the label
  return COMMUNITY_OPTIONS.find((option) => option.value === item)?.label;
};

const travelOptions = (item) => {
  if (!item) return "";

  return TRAVEL_OPTIONS.find((option) => option.value === item)?.label;
};
</script>

<template>
  <div class="grid gap-4">
    <div
      v-if="data"
      class="border-border bg-background overflow-hidden rounded-lg border"
    >
      <UiTable>
        <UiTableBody>
          <template v-for="(item, index) in data" :key="index">
            <UiTableRow>
              <UiTableCell class="bg-muted/50 py-2 font-medium">
                {{ index }}
              </UiTableCell>
              <UiTableCell>
                <template v-if="index === 'pass'">
                  <UiBadge variant="default" class="px-4 py-2">
                    {{ item?.label }}
                    <Icon
                      :name="
                        item.label === 'Full pass'
                          ? 'lucide:star'
                          : 'lucide:party-popper'
                      "
                    />
                  </UiBadge>
                </template>
                <template v-else-if="index === 'name'">
                  {{ fullName }}
                </template>
                <template v-else-if="index === 'pay_it_forward'">
                  <UiBadge variant="default"> Yes </UiBadge>
                </template>
                <template v-else-if="index === 'hosting'">
                  <UiBadge variant="default">
                    {{ hostedOptions(item) }}
                  </UiBadge>
                </template>
                <template v-else-if="index === 'musician'">
                  <UiBadge variant="default">
                    {{ item.instrument }}
                  </UiBadge>
                </template>
                <template v-else-if="index === 'merch' && item.want">
                  <UiBadge variant="default">
                    {{ item.size }}
                  </UiBadge>
                </template>

                <template v-else-if="index === 'travel_method'">
                  {{ travelOptions(item) }}
                </template>
                <template v-else-if="index === 'community'">
                  <div class="flex flex-wrap gap-2">
                    <UiBadge
                      variant="default"
                      v-for="community in item"
                      :key="community"
                    >
                      {{ communityOptions(community) }}
                    </UiBadge>
                  </div>
                </template>
                <template v-else>
                  {{ item }}
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
