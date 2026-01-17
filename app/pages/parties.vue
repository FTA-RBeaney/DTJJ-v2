<script setup>
import Venue from "@/assets/img/venue/venue.webp";
</script>

<template>
  <div class="">
    <UiContainer class="!max-w-3xl text-center">
      <h1 class="my-16 text-center text-7xl font-bold tracking-wider">
        Parties
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
              <div
                class="mx-auto max-w-md rounded-lg border-2 border-black bg-white p-8"
              >
                <img :src="Venue" alt="Venue" class="rounded-lg" />
              </div>
            </Motion>
          </Motion>
        </div>
      </ClientOnly>
      <div class="col-span-6 items-center justify-center gap-6 p-6">
        <div class="text-left">
          <h2 class="text-2xl font-bold">Evening Party Venue</h2>
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
