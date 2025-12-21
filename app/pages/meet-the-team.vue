<script setup>
import TeamRob from "@/assets/img/team/rob.png";
import JeffAndPolina from "@/assets/img/team/jeffandpolina.png";
import Rebecca from "@/assets/img/team/rebecca.png";
import Angela from "@/assets/img/team/angela.png";
import Sonnie from "@/assets/img/team/sonnie.png";

const team = [
  {
    name: "Rob Beaney",
    role: "Lead Developer & Organizer",
    img: TeamRob,
    pronouns: "he/him",
    bio: `Rob is the lead developer and organizer of DTJJ. With a passion
          for technology and music, he has been instrumental in bringing
          together a community of like-minded individuals. When he's not
          coding or organizing events, Rob enjoys playing the guitar and
          exploring new music genres.

          As the main point of contact for DTJJ, Rob is dedicated to
          ensuring that every event runs smoothly and that all participants
          have an unforgettable experience. Feel free to reach out to him
          for any inquiries or feedback regarding the festival.`,
  },
  {
    name: "Jeff",
    role: "Community Managers",
    img: JeffAndPolina,
    pronouns: "he/him",
    bio: `Jeff and Polina are the heart of our community management team.
          Their dedication to fostering a welcoming and inclusive
          environment has helped DTJJ grow into the vibrant festival it is
          today. They work tirelessly to ensure that all attendees feel
          connected and engaged, both online and at our events.

          Outside of their roles at DTJJ, Jeff enjoys photography while
          Polina is an avid dancer. Together, they bring a unique blend of
          creativity and energy to the festival experience.`,
  },
  {
    name: "Polina",
    role: "Community Managers",
    img: JeffAndPolina,
    pronouns: "she/her",
    bio: `Jeff and Polina are the heart of our community management team.
          Their dedication to fostering a welcoming and inclusive
          environment has helped DTJJ grow into the vibrant festival it is
          today. They work tirelessly to ensure that all attendees feel
          connected and engaged, both online and at our events.

          Outside of their roles at DTJJ, Jeff enjoys photography while
          Polina is an avid dancer. Together, they bring a unique blend of
          creativity and energy to the festival experience.`,
  },
  {
    name: "Rebecca",
    role: "Logistics Coordinator",
    img: Rebecca,
    pronouns: "she/her",
    bio: `Rebecca is our logistics coordinator, ensuring that every aspect
          of the festival runs seamlessly. From coordinating with vendors to
          managing schedules, her organizational skills are second to none.

          When she's not busy planning events, Rebecca enjoys hiking and
          exploring new places. She's a true multi-faceted individual who
          brings a unique perspective to the festival.`,
  },
  {
    name: "Angela",
    role: "Marketing Specialist",
    img: Angela,
    pronouns: "she/her",
    bio: `Angela leads our marketing efforts, crafting compelling campaigns
          that showcase the unique spirit of DTJJ. Her creativity and
          strategic thinking have been key in expanding our reach and
          attracting new attendees.

          Outside of work, Angela is a foodie who loves trying out new
          recipes and cuisines. Her passion for storytelling and community
          building shines through in everything she does for the festival.`,
  },
  {
    name: "Sonnie",
    role: "Volunteer Coordinator",
    img: Sonnie,
    pronouns: "they/them",
    bio: `Sonnie is responsible for managing our incredible team of
          volunteers. Their enthusiasm and dedication ensure that our
          volunteers are well supported and appreciated throughout the
          festival.

          In their free time, Sonnie enjoys painting and attending art
          exhibitions. Their commitment to fostering a positive volunteer
          experience is vital to the success of DTJJ.`,
  },
];
</script>

<template>
  <div>
    <!-- <div class="relative">
      <img
        :src="JeffAndPolinaLarge"
        alt="Jeff and Polina"
        class="mx-auto h-[400px] w-full rounded-lg bg-fixed object-cover object-center shadow-lg"
      />
      <UiContainer
        class="absolute top-1/2 left-1/2 !max-w-3xl -translate-x-1/2 -translate-y-1/2"
      >
        <h1
          class="mt-12 mb-0 text-center text-7xl font-bold tracking-wider text-white uppercase"
        >
          Meet the team
        </h1>
      </UiContainer>
    </div> -->
    <UiContainer class="!max-w-3xl">
      <h1 class="mt-12 mb-0 text-center text-7xl font-bold tracking-wider">
        Meet the team
      </h1>
    </UiContainer>
    <div class="mx-auto mt-10 max-w-2xl pb-6">
      <div class="grid grid-cols-12 items-center justify-center gap-6 py-6">
        <Motion
          v-for="(member, i) in team"
          :key="member.name"
          :initial="{ opacity: 0, x: -10 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{
            delay: i * 0.25,
            type: 'spring',
            stiffness: 200,
            damping: 25,
          }"
          class="col-span-4"
        >
          <div>
            <Motion :whileHover="{ scale: 1.1 }">
              <img :src="member.img" :alt="member.name" />
              <p class="text-muted-foreground mt-2 text-center text-sm">
                {{ member.pronouns }}
              </p>
            </Motion>
          </div>
        </Motion>
      </div>

      <!-- <Motion
        v-for="(member, i) in team"
        :key="member.name"
        :initial="{ opacity: 0, x: -10 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{
          delay: i * 0.25,
          type: 'spring',
          stiffness: 200,
          damping: 25,
        }"
      >
        <div class="grid grid-cols-12 items-center gap-6 py-6">
          <div
            class="col-span-3"
            :class="i === 1 || i === 3 || i === 5 ? 'order-last' : ''"
          >
            <Motion :whileHover="{ scale: 1.1 }">
              <img :src="member.img" alt="Rob Beaney" />
            </Motion>
          </div>
          <div
            class="col-span-9 flex flex-col items-center justify-center gap-4"
            :class="i === 1 || i === 3 ? 'order-first' : ''"
          >
            <div>
              <h1 class="mb-2 text-3xl font-bold">{{ member.name }}</h1>
              <p class="text-muted-foreground mb-4 text-lg">
                {{ member.role }}
              </p>
              <p class="max-w-3xl">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </Motion> -->
    </div>
  </div>
</template>
