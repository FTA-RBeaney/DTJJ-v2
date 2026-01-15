<script setup>
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
  <div>
    <UiContainer class="!max-w-3xl text-center">
      <h1 class="mt-12 mb-0 text-center text-7xl font-bold tracking-wider">
        Teachers
      </h1>
      <p>
        This year we have prioritised teachers from London to celebrate the
        people from our scene who help educate and inspire us.
      </p>
      <p>Lessons will be open-level and primarily solo-focused.</p>
    </UiContainer>
    <div class="mx-auto mt-10 max-w-2xl pb-6">
      <ClientOnly>
        <div class="grid grid-cols-12 items-center justify-center gap-6 py-6">
          <div
            v-for="(member, i) in teachers"
            :key="member.name"
            class="col-span-6 lg:col-span-4"
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
    </div>
  </div>
</template>
