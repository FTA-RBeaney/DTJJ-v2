<template>
  <div>
    <div class="flex justify-start border-b px-6 py-4">
      <UiButton size="sm">
        <Icon name="lucide:plus" />
        New team member
      </UiButton>
    </div>

    <div class="m-6">
      <UiTable>
        <UiTableHeader>
          <UiTableRow class="hover:bg-transparent">
            <UiTableHead>Name</UiTableHead>
            <UiTableHead>Email</UiTableHead>

            <UiTableHead class="text-right">Actions</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="item in data" :key="item.id">
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
                  <span class="text-muted-foreground mt-1 inline-block text-xs">
                    @{{ item.username }}
                  </span>
                </div>
              </div>
            </UiTableCell>
            <UiTableCell>{{ item.email }}</UiTableCell>

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
definePageMeta({
  layout: "admin",
});
const data = [
  {
    id: 1,
    name: "Robert Beaney",
    username: "robertbeaney",
    image: "https://github.com/robertbeaney.png",
    email: "robert@gmail.com",
  },
  {
    id: 2,
    name: "Sonnie Spoon",
    username: "sonnie",
    image: "https://github.com/sonnie.png",
    email: "sonnie@gmail.com",
  },
  {
    id: 3,
    name: "Polina Zotova",
    username: "polinazotova",
    image: "https://github.com/polinazotova.png",
    email: "polina@gmail.com",
  },
  {
    id: 4,
    name: "Jeff Tong",
    username: "jefftong",
    image: "https://github.com/jefftong.png",
    email: "jeff@gmail.com",
  },
  {
    id: 5,
    name: "Rebecca Kelsall",
    username: "rebeccakelsall",
    image: "https://github.com/rebeccakelsall.png",
    email: "rebecca@gmail.com",
  },
];
</script>
