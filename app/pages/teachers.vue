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
        Lessons
      </h1>
      <!-- <p>
        This year we have prioritised teachers from London to celebrate the
        people from our scene who help educate and inspire us.
      </p> -->

      <p>
        Katherine Dunham, John Bubbles, Josephine Baker, Bill Bojangles Robinson
      </p>
      <p>
        These jazz dance icons are the forebears of the dance we love, and their
        movements, teachings and techniques are in the DNA of the music and
        dance that we do today.
      </p>
      <p>
        The tracks at this event are not levelled. Instead, each stream is about
        the movement, impact and influence of each icon - and we've asked our
        teachers to be inspired by them, and create class content specifically
        tailored to what speaks to them about the artist.
      </p>
      <p>
        The majority of classes will be solo, but there will be some partnered
        ones. In those, they will be taught as ELEF (everyone leads, everyone
        follows) - so we ask you to be generous with your classmates who may not
        have experience of this approach.
      </p>
    </UiContainer>
    <div class="mx-auto mt-10 max-w-2xl pb-6">
      <h2 class="text-center text-4xl font-bold">Your teachers</h2>
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
