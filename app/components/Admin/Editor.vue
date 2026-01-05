<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

interface Props {
  modelValue: string;
}

interface Emits {
  (e: "update:modelValue", value: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
});

const emit = defineEmits<Emits>();

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: "Enter your content here...",
    }),
  ],
  onUpdate: () => {
    if (editor.value) {
      emit("update:modelValue", JSON.stringify(editor.value.getJSON()));
    }
  },
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (editor.value && newValue) {
      // Accept both JSON objects and strings
      const jsonContent =
        typeof newValue === "string" ? JSON.parse(newValue) : newValue;
      editor.value.commands.setContent(jsonContent, false);
    }
  },
  { deep: true }
);

const toggleBold = () => editor.value?.commands.toggleBold();
const toggleItalic = () => editor.value?.commands.toggleItalic();
const toggleHeading1 = () => editor.value?.commands.toggleHeading({ level: 1 });
const toggleHeading2 = () => editor.value?.commands.toggleHeading({ level: 2 });
const toggleBulletList = () => editor.value?.commands.toggleBulletList();
const toggleOrderedList = () => editor.value?.commands.toggleOrderedList();
const toggleBlockquote = () => editor.value?.commands.toggleBlockquote();

const isMarkActive = (markName: string) => {
  return editor.value?.isActive(markName) ?? false;
};

const getMarkButtonClass = (markName: string) => {
  const baseClass = "rounded transition-colors";
  return isMarkActive(markName)
    ? `${baseClass} bg-primary text-primary-foreground`
    : baseClass;
};
</script>

<template>
  <div class="flex flex-col overflow-hidden rounded-lg">
    <!-- Toolbar -->
    <div class="flex flex-wrap items-center gap-1 border-b px-3 py-1">
      <UiButton
        @click="toggleBold"
        :class="getMarkButtonClass('bold')"
        title="Bold"
        variant="ghost"
      >
        <strong>B</strong>
      </UiButton>

      <UiButton
        @click="toggleItalic"
        :class="getMarkButtonClass('italic')"
        title="Italic"
        variant="ghost"
      >
        <em>I</em>
      </UiButton>

      <UiButton
        @click="toggleHeading1"
        :class="getMarkButtonClass('heading')"
        title="Heading 1"
        variant="ghost"
      >
        <span class="text-sm font-bold">H1</span>
      </UiButton>

      <UiButton
        @click="toggleHeading2"
        :class="getMarkButtonClass('heading')"
        title="Heading 2"
        variant="ghost"
      >
        <span class="text-sm font-bold">H2</span>
      </UiButton>

      <UiButton
        @click="toggleBulletList"
        :class="getMarkButtonClass('bulletList')"
        title="Bullet List"
        variant="ghost"
      >
        <span class="text-sm">•</span>
      </UiButton>

      <UiButton
        @click="toggleOrderedList"
        :class="getMarkButtonClass('orderedList')"
        title="Ordered List"
        variant="ghost"
      >
        <span class="text-sm">1.</span>
      </UiButton>

      <UiButton
        @click="toggleBlockquote"
        :class="getMarkButtonClass('blockquote')"
        title="Blockquote"
        variant="ghost"
      >
        <span class="text-sm">❝</span>
      </UiButton>
    </div>

    <!-- Editor -->
    <div class="prose prose-sm dark:prose-invert bg-background max-w-none p-4">
      <EditorContent :editor="editor" />
    </div>
  </div>
</template>

<style scoped>
/* Prose styling for TipTap editor */
:deep(.ProseMirror) {
  outline: none;
}

:deep(.ProseMirror p.is-editor-empty:first-child::before) {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

:deep(.ProseMirror h1) {
  margin-top: 1rem;
  margin-bottom: 0.75rem;
  font-size: 1.875rem;
  font-weight: 700;
}

:deep(.ProseMirror h2) {
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
}

:deep(.ProseMirror p) {
  margin-bottom: 1rem;
}

:deep(.ProseMirror ul) {
  margin-bottom: 0.5rem;
  list-style-type: disc;
  margin-left: 1.5rem;
}

:deep(.ProseMirror ol) {
  margin-bottom: 0.5rem;
  list-style-type: decimal;
  margin-left: 1.5rem;
}

:deep(.ProseMirror blockquote) {
  margin-bottom: 0.5rem;
  border-left: 4px solid var(--color-primary);
  padding-left: 1rem;
  font-style: italic;
  color: var(--color-muted-foreground);
}

/* :deep(.ProseMirror-focused) {
  border: 1px solid #86b7fe;
  border-radius: 0.375rem;
} */
</style>
