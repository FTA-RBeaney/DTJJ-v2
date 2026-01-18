<script setup>
import Venue from "@/assets/img/venue/venue.webp";
import StJohns from "@/assets/img/venue/st-johns.png";
import PaxLodge from "@/assets/img/venue/pax-lodge.jpg";
import HaverstockSchool from "@/assets/img/venue/haverstock-school.jpg";

const venues = [
  {
    id: "st-johns",
    day: "Saturday",
    name: "St John's Church",
    image: StJohns,
    address: {
      line1: "St John's, Downshire Hill",
      line2: "Hampstead",
      city: "London",
      postcode: "NW3 1NU",
    },
    description:
      "St John's Church is a stunning space, only 15 mins from our evening venue, right next to a road with cute cafes and Hampstead Heath.",
    tubes: [
      { station: "Hampstead Heath", lines: "Mildmay and Suffragette lines" },
      { station: "Belsize Park", lines: "Northern line" },
      { station: "Hampstead", lines: "Northern line" },
    ],
  },
  {
    id: "pax-lodge",
    day: "Saturday",
    name: "Pax Lodge",
    image: PaxLodge,
    address: {
      line1: "12C Lyndhurst Rd",
      city: "London",
      postcode: "NW3 5PQ",
    },
    description:
      "Only 15 mins from our evening venue, Pax Lodge does not only offer a space for our classes, but is also an affordable option for your accommodation, should you require it.",
    tubes: [
      { station: "Hampstead Heath", lines: "Mildmay and Suffragette lines" },
      { station: "Belsize Park", lines: "Northern line" },
    ],
  },
  {
    id: "haverstock",
    day: "Sunday & Monday",
    name: "Haverstock School",
    image: HaverstockSchool,
    address: {
      line1: "24 Haverstock Hill",
      line2: "Chalk Farm",
      city: "London",
      postcode: "NW3 2BQ",
    },
    description: "",
    tubes: [
      { station: "Chalk Farm", lines: "Northern Line" },
      { station: "Kentish Town West", lines: "Mildmay Line" },
    ],
  },
];
</script>

<template>
  <div>
    <ClientOnly>
      <div
        class="relative h-[400px] bg-cover bg-fixed bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${Venue})` }"
      >
        <div
          class="absolute inset-0 flex items-center justify-center bg-black/50"
        >
          <h1
            class="px-4 text-center text-5xl font-bold text-white lg:text-7xl"
          >
            The Venues
          </h1>
        </div>
      </div>
    </ClientOnly>
    <!-- <UiContainer class="!max-w-3xl text-center">
      <h1 class="my-16 text-center text-7xl font-bold tracking-wider">
        The venues
      </h1>
      <p class="mb-8 text-lg">
        This year's Downtown Jazz Jam will be held at the following venues:
      </p>
    </UiContainer> -->

    <UiContainer>
      <ClientOnly>
        <div class="mt-10 grid-cols-12 lg:grid">
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

          <div
            class="col-span-6 items-center justify-center gap-6 py-6 md:px-10"
          >
            <div class="text-left">
              <h2 class="text-4xl font-bold">Evening Party Venue</h2>
              <p>
                This year's Downtown Jazz Jam will be held at the following
                venue:
              </p>
              <p class="mt-2 font-semibold">
                The Great Hall, UCS, Frognal, Hampstead
              </p>
              <p>Frognal, London NW3 6XH</p>

              <p class="mt-4">
                The venue is a beautiful and inspiring space that has been
                carefully designed to accommodate our students and teachers. It
                features a modern layout with comfortable seating, excellent
                acoustics, and state-of-the-art sound equipment.
              </p>
              <p>The closest tubes are:</p>
              <ul class="list-disc pl-6">
                <li>Finchley Road (Jubilee and Metropolitan lines)</li>
                <li>Hampstead (Northern line)</li>
                <li>Finchley Road & Frognal (Mildmay + Suffragette lines)</li>
              </ul>
            </div>
          </div>
        </div>
      </ClientOnly>
    </UiContainer>

    <UiContainer class="mx-auto">
      <div class="space-y-6">
        <h2 class="text-4xl font-bold">Class Venues</h2>
        <ClientOnly>
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="(venue, index) in venues"
              :key="venue.id"
              class="flex flex-col gap-6"
            >
              <Motion
                :whileInView="{ opacity: 1, scale: 1 }"
                :inViewOptions="{ once: true }"
                :initial="{ opacity: 0, scale: 0 }"
                :transition="{
                  delay: index * 0.25,
                  duration: 0.4,
                  scale: { type: 'spring', visualDuration: 0.4, bounce: 0.2 },
                }"
              >
                <div class="rounded-lg border-2 border-black bg-white p-6">
                  <div class="grid flex-col gap-6 md:flex-row">
                    <div class="flex-1">
                      <span
                        class="inline-block rounded-full bg-black px-3 py-1 text-sm font-semibold text-white"
                      >
                        {{ venue.day }}
                      </span>
                    </div>
                    <div>
                      <img
                        :src="venue.image"
                        :alt="venue.name"
                        class="aspect-video h-48 w-full rounded-lg object-cover md:h-full"
                      />
                    </div>
                  </div>
                </div>
              </Motion>
              <div>
                <h2 class="mt-2 text-2xl font-bold">{{ venue.name }}</h2>

                <ul class="mt-3 list-none space-y-1 text-gray-700">
                  <li>{{ venue.address.line1 }}</li>
                  <li v-if="venue.address.line2">
                    {{ venue.address.line2 }}
                  </li>
                  <li>{{ venue.address.city }}</li>
                  <li class="font-semibold">
                    {{ venue.address.postcode }}
                  </li>
                </ul>

                <p v-if="venue.description" class="mt-4 text-gray-600">
                  {{ venue.description }}
                </p>

                <div class="mt-4">
                  <p class="font-semibold">The closest tubes are:</p>
                  <ul class="mt-1 list-disc">
                    <li v-for="tube in venue.tubes" :key="tube.station">
                      {{ tube.station }} ({{ tube.lines }})
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </ClientOnly>
      </div>
    </UiContainer>
  </div>
</template>

<style scoped>
.list-none {
  padding: 0;
  margin: 0;

  li {
    list-style: none;
    margin-bottom: 0;
    margin-left: 0;
    padding: 0;
  }
}
</style>
