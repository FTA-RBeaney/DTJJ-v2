<template>
  <div class="border-border bg-background overflow-hidden rounded-lg border">
    <UiTable>
      <UiTableBody>
        <UiTableRow v-for="(file, index) in files" :key="index">
          <UiTableCell>
            <div class="ml-4 flex min-w-0 flex-1 gap-2">
              <span class="truncate font-medium"> {{ file.name }} </span>
              <span class="flex-shrink-0 text-gray-400">{{ file.size }}</span>
            </div>
          </UiTableCell>
          <UiTableCell class="text-right">
            <UiButton size="sm">Download</UiButton>
          </UiTableCell>
        </UiTableRow></UiTableBody
      >
    </UiTable>
  </div>
</template>

<script setup lang="ts">
const files = [
  {
    name: "welcome_booklet.pdf",
    size: "2.4mb",
  },
  {
    name: "schedule.pdf",
    size: "4.5mb",
  },
  {
    name: "your_pass.pdf",
    size: "4.5mb",
  },
];
</script>
