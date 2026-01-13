<script setup>
import Venue from "@/assets/img/venue/venue.png";
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
        The venue
      </h1>
    </UiContainer>
    <UiContainer class="mx-auto mt-10 grid-cols-12 p-6 lg:grid">
      <ClientOnly>
        <div class="col-span-4 items-center justify-center gap-6 py-6">
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
            <Motion
              :whileHover="{
                x: [0, -6, 6, -4, 4, 0],
                rotate: [0, -2, 2, -1, 1, 0],
                transition: { duration: 0.5 },
              }"
            >
              <div class="rounded-lg border-2 border-black bg-white p-8">
                <img :src="Venue" alt="Venue" class="rounded-lg" />
              </div>
            </Motion>
          </Motion>
        </div>
      </ClientOnly>
      <div class="col-span-6 items-center justify-center gap-6 p-6">
        <div class="text-left">
          <h2 class="text-2xl font-bold">The Venue</h2>
          <p>
            This year's Downtown Jazz Jam will be held at the following venue:
          </p>
          <p class="mt-2 font-semibold">
            The Great Hall, UCS, Frognal, Hampstead
          </p>
          <p>Frognal, London NW3 6XH</p>

          <p class="mt-4">
            The venue is a beautiful and inspiring space that has been carefully
            designed to accommodate our students and teachers. It features a
            modern layout with comfortable seating, excellent acoustics, and
            state-of-the-art sound equipment.
          </p>
          <p>The closest tubes are:</p>
          <ul class="list-disc pl-6">
            <li>Finchley Road (Jubilee and Metropolitan lines)</li>
            <li>Hampstead (Northern line)</li>
            <li>Finchley Road & Frognal (Mildmay + Suffragette lines)</li>
          </ul>
        </div>
      </div>
    </UiContainer>
  </div>
</template>
