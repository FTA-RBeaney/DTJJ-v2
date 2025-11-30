<template>
  <div class="flex w-full items-center justify-center">
    <UiDialog v-model:open="dialog">
      <UiDialogTrigger as-child>
        <UiButton variant="outline">Edit Profile</UiButton>
      </UiDialogTrigger>

      <UiDialogContent
        class="sm:max-w-[425px]"
        title="Edit profile"
        description="Make changes to your profile here. Click save when you're done."
      >
        <template #content>
          <div>
            <div class="grid gap-4 py-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <UiLabel for="title" class="text-right">Title</UiLabel>
                <UiInput
                  id="title"
                  v-model="newEvent.title"
                  class="col-span-3"
                />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <UiLabel for="day" class="text-right">Day</UiLabel>
                <UiSelect v-model="newEvent.day">
                  <UiSelectTrigger class="col-span-3">
                    <UiSelectValue placeholder="Select a day" />
                  </UiSelectTrigger>
                  <UiSelectContent>
                    <UiSelectGroup>
                      <UiSelectItem value="Friday">Friday</UiSelectItem>
                      <UiSelectItem value="Saturday">Saturday</UiSelectItem>
                      <UiSelectItem value="Sunday">Sunday</UiSelectItem>
                      <UiSelectItem value="Monday">Monday</UiSelectItem>
                    </UiSelectGroup>
                  </UiSelectContent>
                </UiSelect>
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <UiLabel for="startTime" class="text-right">Start Time</UiLabel>
                <UiInput
                  id="startTime"
                  v-model="newEvent.startTime"
                  type="time"
                  class="col-span-3"
                />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <UiLabel for="endTime" class="text-right">End Time</UiLabel>
                <UiInput
                  id="endTime"
                  v-model="newEvent.endTime"
                  type="time"
                  class="col-span-3"
                />
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <UiDialogFooter>
            <UiButton
              variant="outline"
              type="button"
              class="mt-2 sm:mt-0"
              @click="closeDialog(false)"
            >
              Cancel
            </UiButton>
            <UiButton type="submit" @click="handleAdd()">Save</UiButton>
          </UiDialogFooter>
        </template>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
const dialog = ref(false);
const emits = defineEmits(["save"]);

const closeDialog = (save: boolean) => {
  useSonner(save ? "Profile updated" : "Changes discarded", {
    description: `Your changes have been ${save ? "saved" : "discarded"}.`,
    duration: 7000,
  });
  dialog.value = false;
};

const newEvent = ref({
  title: "",
  day: "Saturday" as const,
  startTime: "",
  endTime: "",
});

const handleAdd = () => {
  emits("save", newEvent.value);
  closeDialog(true);
};
</script>
