<script setup lang="ts">
import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Logo from "@/assets/img/logo.png";
import JamSplat from "@/assets/img/jam-splat-trans.svg";

const supabase = useSupabaseClient();

const content = computed(() => data.value ?? null);

const htmlContent = computed(() => {
  if (!content.value) return "";
  try {
    return generateHTML(content.value, [
      StarterKit,
      Placeholder.configure({
        placeholder: "Enter your content here...",
      }),
    ]);
  } catch (error) {
    console.error("Error generating HTML from TipTap content:", error);
    return "";
  }
});

const {
  data,
  pending,
  error: asyncError,
  refresh,
} = await useAsyncData("about", async () => {
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

    return data?.content || null;
  } catch (err) {
    console.error("Error fetching page content:", err);
    useSonner.error("Failed to load page content");
    return null;
  }
});

// `content` is a computed alias of the async `data`, so no extra watcher is needed.
</script>

<template>
  <div>
    <UiContainer class="mt-10 !max-w-3xl">
      <img :src="Logo" alt="Jam Logo" class="mx-auto h-32 w-auto" />
      <h1 class="mt-12 mb-0 text-center text-7xl font-bold tracking-wider">
        About
      </h1>
    </UiContainer>

    <UiContainer class="!max-w-3xl py-14 text-center">
      <div class="wpb_wrapper">
        <div v-if="htmlContent" v-html="htmlContent" class="mb-6"></div>
      </div>
    </UiContainer>
    <UiContainer class="!max-w-3xl">
      <Motion
        :whileInView="{ opacity: 1, scale: 1 }"
        :inViewOptions="{ once: true }"
        :initial="{ opacity: 0, scale: 0 }"
        :transition="{
          duration: 0.4,
          scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
        }"
      >
        <JamSplat class="text-primary fill-primary mx-auto h-24 w-auto" />
      </Motion>
    </UiContainer>
  </div>
</template>
