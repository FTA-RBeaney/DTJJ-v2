<template>
  <div>
    <div class="m-6">
      <UiTable v-if="data.length > 0">
        <UiTableHeader>
          <UiTableRow class="hover:bg-transparent">
            <UiTableHead>Name</UiTableHead>
            <UiTableHead>Email</UiTableHead>
            <UiTableHead>Team</UiTableHead>
            <UiTableHead>Pass type</UiTableHead>
            <UiTableHead>Role</UiTableHead>
            <UiTableHead>Volunteering?</UiTableHead>
            <UiTableHead>Hosting?</UiTableHead>

            <UiTableHead class="text-right">Actions</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="item in data" :key="item.name">
            <UiTableCell>
              <div class="flex items-center gap-3">
                <UiAvatar class="size-8" :src="item.image" :alt="item.name">
                  <UiAvatarFallback>
                    {{ item.name.charAt(0).toUpperCase() }}
                    {{ item.name.charAt(1).toUpperCase() }}
                  </UiAvatarFallback>
                </UiAvatar>
                <div class="leading-none">
                  <div class="font-medium">{{ item.name }}</div>
                </div>
              </div>
            </UiTableCell>
            <UiTableCell>{{ item.email }}</UiTableCell>
            <UiTableCell>
              <span
                class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold capitalize"
                :class="teamBadgeClass(item.team)"
              >
                <img :src="JamJar" class="size-6" />
                {{ item.team }}
              </span>
            </UiTableCell>
            <UiTableCell>{{ item.passType }}</UiTableCell>
            <UiTableCell>{{ item.role }}</UiTableCell>
            <UiTableCell>
              <span
                class="bg-muted inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
              >
                <span
                  :class="[
                    'size-2 rounded-full',
                    item.volunteering ? 'bg-emerald-500' : 'bg-amber-500',
                  ]"
                />
                {{ item.volunteering ? "Yes" : "No" }}
              </span>
            </UiTableCell>
            <UiTableCell>
              <span
                class="bg-muted inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
              >
                <span
                  :class="[
                    'size-2 rounded-full',
                    item.hosting ? 'bg-emerald-500' : 'bg-amber-500',
                  ]"
                />
                {{ item.hosting ? "Yes" : "No" }}
              </span>
            </UiTableCell>

            <UiTableCell class="text-right">
              <UiButton variant="outline">Edit</UiButton>
            </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import JamJar from "../assets/img/627a3e29a51c556-removebg-preview.png";

definePageMeta({
  layout: "admin",
});

const teamBadgeClass = (team: string) => {
  const palette: Record<string, string> = {
    raspberry: "bg-rose-500/15 text-rose-600 ring-1 ring-rose-500/40",
    blueberry: "bg-indigo-500/15 text-indigo-600 ring-1 ring-indigo-500/40",
    "lemon curd": "bg-amber-300/20 text-amber-700 ring-1 ring-amber-400/60",
  };
  return (
    palette[team.toLowerCase()] ?? "bg-muted text-foreground ring-1 ring-border"
  );
};

const data = [
  {
    name: "Robert Beaney",
    email: "robertbeaney@gmail.com",
    team: "Raspberry",
    passType: "Full pass",
    role: "Lead",
    volunteering: true,
    hosting: true,
  },
  {
    name: "Sonnie Spoon",
    email: "sonnie@gmail.com",
    team: "Blueberry",
    passType: "Party pass",
    role: "Switch",
    volunteering: true,
    hosting: true,
  },
  {
    name: "John Doe",
    email: "john@gmail.com",
    team: "Blueberry",
    passType: "Party pass",
    role: "Lead",
    volunteering: true,
    hosting: true,
  },
  {
    name: "Jane Doe",
    email: "jane@gmail.com",
    team: "Lemon curd",
    passType: "Full pass",
    role: "Follow",
    volunteering: true,
    hosting: true,
  },
  {
    name: "Bob Smith",
    email: "bob@gmail.com",
    team: "Raspberry",
    passType: "Full pass",
    role: "Follow",
    volunteering: true,
    hosting: true,
  },
  {
    name: "Alice Johnson",
    email: "alice@gmail.com",
    team: "Lemon curd",
    passType: "Full pass",
    role: "Follow",
    volunteering: true,
    hosting: true,
  },
  {
    name: "Bob Smith",
    email: "bob@gmail.com",
    team: "Raspberry",
    passType: "Full pass",
    role: "Switch",
    volunteering: true,
    hosting: true,
  },
];
</script>
