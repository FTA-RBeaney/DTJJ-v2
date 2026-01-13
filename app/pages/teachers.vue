<script setup>
import Skye from "@/assets/img/teachers/skye.png";
import Trisha from "@/assets/img/teachers/trisha.png";

const teachers = [
  {
    name: "Skye Reynolds",
    img: Skye,
    bio: `Skye Reynolds is a seasoned educator and performer with over a decade of experience in the music industry. Specializing in guitar and vocal techniques, Skye has taught students of all ages and skill levels, helping them unlock their full potential. Her dynamic teaching style combines technical proficiency with creative expression, making learning both effective and enjoyable.

      Beyond teaching, Skye is an accomplished performer, having toured nationally and released several albums. Her passion for music and education shines through in every lesson, inspiring students to pursue their musical dreams with confidence and enthusiasm.`,
  },
  {
    name: "Trisha Smith",
    img: Trisha,
    bio: `Trisha Smith is a dedicated music educator known for her innovative approach to teaching piano and music theory. With a background in classical and contemporary music, Trisha brings a wealth of knowledge and experience to her students. She has a talent for breaking down complex concepts into manageable lessons, ensuring that students not only learn but also enjoy the process.

      Trisha has been involved in various community music programs and has a strong commitment to fostering a love for music in her students. Her lessons are tailored to individual needs, focusing on building skills while nurturing creativity and self-expression.`,
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
