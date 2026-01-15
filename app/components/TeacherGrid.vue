<script setup lang="ts">
import Skye from "@/assets/img/teachers/skye.png";
import Trisha from "@/assets/img/teachers/trisha.png";
import Junior from "@/assets/img/teachers/junior.png";
import Kanini from "@/assets/img/teachers/kanini.png";

const teachers = [
  {
    img: Skye,
  },
  {
    img: Trisha,
  },
  {
    img: Junior,
  },
  {
    img: Kanini,
  },
];
</script>
<template>
  <ClientOnly>
    <div class="grid grid-cols-12 items-center justify-center gap-6 py-6">
      <div
        v-for="(member, i) in teachers"
        :key="member.name"
        class="col-span-6 lg:col-span-3"
      >
        <Motion
          :initial="{ opacity: 0, x: -10 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{
            delay: i * 0.25,
            type: 'spring',
            stiffness: 200,
            damping: 25,
          }"
        >
          <Motion :whileHover="{ scale: 1.1 }">
            <img :src="member.img" :alt="member.name" />
          </Motion>
        </Motion>
      </div>
    </div>
  </ClientOnly>
</template>
