<script setup lang="ts">
definePageMeta({
  layout: "admin",
  title: "About Admin",
});

const supabase = useSupabaseClient();

const content = ref<any>(null);
const isLoading = ref<boolean>(false);
const isSaving = ref<boolean>(false);

// Fetch existing content on mount
onMounted(async () => {
  isLoading.value = true;
  try {
    const { data, error } = await supabase
      .from("dtjj_pages")
      .select("content")
      .eq("slug", "about")
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows found, which is expected for new pages
      throw error;
    }

    if (data && data.content) {
      // Store JSONB object directly for editor
      content.value = data.content;
    }
  } catch (error) {
    console.error("Error fetching page content:", error);
    useSonner.error("Failed to load page content");
  } finally {
    isLoading.value = false;
  }
});

// Save content to Supabase
const savePage = async () => {
  if (!content.value) {
    useSonner.error("Content cannot be empty");
    return;
  }

  isSaving.value = true;
  try {
    // Parse JSON string from editor if needed
    let jsonContent: Record<string, any>;
    try {
      jsonContent =
        typeof content.value === "string"
          ? JSON.parse(content.value)
          : content.value;
    } catch (e) {
      console.error("Invalid JSON content:", e);
      useSonner.error("Invalid content format");
      isSaving.value = false;
      return;
    }

    const { error } = await supabase.from("dtjj_pages").upsert(
      {
        slug: "about",
        content: jsonContent,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "slug",
      }
    );

    if (error) {
      throw error;
    }

    useSonner.success("Page saved successfully!");
  } catch (error) {
    console.error("Error saving page:", error);
    useSonner.error("Failed to save page content");
  } finally {
    isSaving.value = false;
  }
};
</script>

<template>
  <div class="">
    <div class="p-6 pb-0">
      <h1 class="mb-2 !font-sans text-2xl font-bold">About Page</h1>
      <p class="text-muted-foreground">
        Edit the content that appears on the public about page
      </p>
    </div>

    <div v-if="isLoading" class="flex justify-center py-12">
      <UiLoader />
    </div>

    <template v-else>
      <div class="space-y-4">
        <div>
          <!-- <TipTapEditor v-model="content" /> -->
          <AdminEditor v-model="content" />
        </div>

        <div class="flex justify-end px-3">
          <UiButton
            @click="savePage"
            :disabled="isSaving || !content"
            class="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span v-if="!isSaving">Save Changes</span>
            <span v-else class="flex items-center gap-2">
              <UiLoader class="h-4 w-4" />
              Saving...
            </span>
          </UiButton>
        </div>
      </div>
    </template>
  </div>
</template>
