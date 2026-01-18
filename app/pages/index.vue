<script setup lang="ts">
import Logo from "@/assets/img/logo.png";
import JamSplat from "@/assets/img/jam-splat-trans.svg";
import Band from "@/assets/img/imageThree.webp";

// SEO Meta Tags
useSeoMeta({
  title: "Downtown Jazz Jam | London Swing Dance Festival",
  description:
    "Downtown Jazz Jam is a London Swing Dance festival that celebrates the vibrant culture of swing dancing through live music, dance workshops, and social events. Join us for an inclusive celebration of jazz dance.",
  keywords:
    "swing dance, London, jazz dance, Lindy Hop, dance festival, dance workshops, live music, social dancing, UK swing dance",
  author: "Downtown Jazz Jam",
  robots: "index, follow",

  // Open Graph
  ogType: "website",
  ogTitle: "Downtown Jazz Jam | London Swing Dance Festival",
  ogDescription:
    "A London Swing Dance festival celebrating the vibrant culture of swing dancing through live music, dance workshops, and social events.",
  ogUrl: "https://downtownjazzjam.uk",
  ogSiteName: "Downtown Jazz Jam",
  ogLocale: "en_GB",
  ogImage: "https://downtownjazzjam.uk/og-image.png",
  ogImageWidth: "1200",
  ogImageHeight: "630",
  ogImageAlt: "Downtown Jazz Jam - London Swing Dance Festival",

  // Twitter Card
  twitterCard: "summary_large_image",
  twitterTitle: "Downtown Jazz Jam | London Swing Dance Festival",
  twitterDescription:
    "A London Swing Dance festival celebrating the vibrant culture of swing dancing through live music, dance workshops, and social events.",
  twitterImage: "https://downtownjazzjam.uk/og-image.png",
  twitterImageAlt: "Downtown Jazz Jam - London Swing Dance Festival",
});

// Additional head elements
useHead({
  link: [{ rel: "canonical", href: "https://downtownjazzjam.uk" }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Event",
        name: "Downtown Jazz Jam",
        description:
          "Downtown Jazz Jam is a London Swing Dance festival that celebrates the vibrant culture of swing dancing through live music, dance workshops, and social events.",
        url: "https://downtownjazzjam.uk",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: "London",
          address: {
            "@type": "PostalAddress",
            addressLocality: "London",
            addressCountry: "GB",
          },
        },
        organizer: {
          "@type": "Organization",
          name: "Downtown Jazz Jam",
          url: "https://downtownjazzjam.uk",
        },
        performer: [
          {
            "@type": "Person",
            name: "Skye Humphries",
          },
          {
            "@type": "Person",
            name: "Trisha",
          },
          {
            "@type": "Person",
            name: "Junior Laniyan",
          },
          {
            "@type": "Person",
            name: "Kanini",
          },
        ],
      }),
    },
  ],
});
</script>

<template>
  <div>
    <UiContainer class="mt-10 !max-w-3xl">
      <Motion
        class="hidden md:mr-10 md:flex"
        :initial="{
          opacity: 0,
          y: -80,
        }"
        :animate="{
          opacity: 1,
          y: 0,
        }"
        :transition="{ type: 'spring', stiffness: 200, damping: 25 }"
        :whileHover="{
          x: [0, -6, 6, -4, 4, 0],
          rotate: [0, -2, 2, -1, 1, 0],
          transition: { duration: 0.5 },
        }"
      >
        <img :src="Logo" alt="Jam Logo" class="mx-auto h-62 w-auto" />
      </Motion>
      <h1 class="mt-12 mb-0 text-center text-7xl font-bold tracking-wider">
        Welcome to the Jam!
      </h1>
    </UiContainer>

    <UiContainer class="!max-w-4xl py-14 text-center">
      <p>
        Downtown Jazz Jam is a London Swing Dance festival that celebrates the
        vibrant culture of swing dancing through live music, dance workshops,
        and social events.
      </p>
      <p>
        The first edition will be centred around celebrating the rich history of
        swing dance in London and the UK, with a focus on the people and
        communities that have shaped the scene over the years.
      </p>
      <p>
        Our mission is to create an inclusive and welcoming environment for
        dancers of all levels to come together and share their love of jazz
        dance.
      </p>
      We are a team of dancers, teachers and organisers, who between us have
      many years experience - but this is the first time we have worked together
      in this team configuration, which is exciting!
      <p>
        We’ll be hosting an open forum for you to come and get to know us on the
        24th Jan [link] - please join us!
      </p>
    </UiContainer>

    <ClientOnly>
      <div
        class="relative my-28 h-[500px] bg-cover bg-fixed bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${Band})` }"
      >
        <div
          class="absolute inset-0 flex flex-col items-center justify-center bg-black/50"
        >
          <UiContainer class="text-center text-white">
            <h1
              class="mb-8 px-4 text-center text-5xl font-bold text-white lg:text-7xl"
            >
              The Jazz Jam
            </h1>
            <p>
              Downtown Jazz Jam might not actually be down town, but we ARE
              organising an actual jazz jam!!
            </p>
            <p>
              ALL levels of musicians are welcome to jump in, especially those
              who aren’t in ensembles or groups though! When registering, let us
              know which instruments you play and whether you can bring your
              own. As the event gets closer, we’ll add you to a WhatsApp group
              where our jazz jam leaders will help bring everything together.
            </p>
            <p>Pack your instruments and let’s play!</p>
          </UiContainer>
        </div>
      </div>
    </ClientOnly>

    <UiContainer class="!max-w-5xl">
      <Motion
        :whileInView="{ opacity: 1, scale: 1 }"
        :inViewOptions="{ once: true }"
        :initial="{ opacity: 0, scale: 0 }"
        :transition="{
          duration: 0.4,
          scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
        }"
      >
        <JamSplat class="text-primary fill-primary mx-auto h-24 w-auto" />
      </Motion>
    </UiContainer>
    <UiContainer class="!max-w-5xl">
      <h2 class="text-center text-4xl font-bold">Artists</h2>
      <TeacherGrid />
      <!-- <Motion
        :whileInView="{ opacity: 1, scale: 1 }"
        :inViewOptions="{ once: true }"
        :initial="{ opacity: 0, scale: 0 }"
        :transition="{
          duration: 0.4,
          scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
        }"
      >
        <JamSplat class="text-primary fill-primary mx-auto mt-18 h-24 w-auto" />
      </Motion>
      <h2 class="text-center text-4xl font-bold">Inspirers (TBA)</h2> -->
      <Motion
        :whileInView="{ opacity: 1, scale: 1 }"
        :inViewOptions="{ once: true }"
        :initial="{ opacity: 0, scale: 0 }"
        :transition="{
          duration: 0.4,
          scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
        }"
      >
        <JamSplat class="text-primary fill-primary mx-auto mt-18 h-24 w-auto" />
      </Motion>
      <h2 class="text-center text-4xl font-bold">Music (TBA)</h2>
    </UiContainer>
  </div>
</template>
