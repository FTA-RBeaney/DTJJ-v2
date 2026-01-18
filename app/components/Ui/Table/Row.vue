<template>
  <tr data-slot="table-row" :class="styles({ class: props.class })">
    <slot />
  </tr>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const styles = tv({
  base: "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
});
</script>
