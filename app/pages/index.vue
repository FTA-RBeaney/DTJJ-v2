<script setup lang="ts">
import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Logo from "@/assets/img/logo.png";
import JamSplat from "@/assets/img/jam-splat-trans.svg";
import Skye from "@/assets/img/teachers/skye.png";
import Trisha from "@/assets/img/teachers/trisha.png";
import Junior from "@/assets/img/teachers/junior.png";
import Kanini from "@/assets/img/teachers/kanini.png";

const teachers = [
  {
    img: Skye,
    bio: [
      "Skye was first persuaded to dance Lindy Hop by his mother in 1996, but quickly discovered his own love of social dancing, swing music and the Lindy Hop community.",
      "This led him to a wider interest in dance and he took classes in ballet, modern, and Jazz.",
      "Since 1999 he has taught wherever Lindy Hop is done- from national weekends to international dance camps.",
      "He is a founding member of some the most influential modern Lindy Hop troupes- including Minnie’s Moochers, Mad Dog, Jazz at Four and the Silver Shadows. ",
      "Skye has also won titles at all of the major Lindy Hop competitions- including ULHS, ILHC, ALHC and the World Lindy Hop Championships.",
      "This involvement with Lindy Hop sparked his wider interest in America’s history and cultural heritage- leading him to pursue American Studies at The George Washington University where he received his master’s degree in 2007.",
      "We're extremely fortunate to have Skye in London, and can't wait for him to share his knowledge with us!",
    ],
  },
  {
    img: Trisha,
    bio: [
      "Trisha is a UK based artist, educator, and creative director with decades of experience teaching and working internationally. She brings a deeply personal, culturally informed approach to dance, rooted in Black traditions, musicality, and lived social history.",
      "Her work centres on authenticity, connection, and immersion. Inviting dancers to move beyond patterns and sequences and into meaning.",
      "Trisha explores the shared roots of African American vernacular dances, encouraging students to understand where movement comes from, how it feels, and why it matters.",
      "Known for her engaging teaching style, Trisha creates spaces that are both energetic and joyful. Her background in music and formal training in ballet, jazz, contemporary, and tap gives her teaching strong depth and understanding, especially in rhythm, helping students develop confidence, musicality, and their own expressive voice.",
      "Trisha is driven by a passion for dances from the Black diaspora as living cultural practices, honouring their origins and empowering dancers to move with intention, respect, and authenticity.",
      "We're excited to have Trisha bring her energy and knowledge to the festival, and are also fortunate to have her as a consultant for our event!",
    ],
  },
  {
    img: Junior,
    bio: [
      "Born and raised in South East London, Ademola Junior Laniyan has tap danced on stage at London’s Royal Albert Hall with Robbie Williams; Canadian Tap Pioneer Heather Cornell and in The Purcell Room for Out of the Blues with his tap Mentor Tobias Tak. The Jazz Tap Project were featured in London Jazz Festivals and had the honour of supporting the Jazz legend Jon Hendricks at London’s Ronnie Scott’s Jazz Club.",
      "His tap choreography credits are numerous, including a commission by The Space to choreograph a tap number in collaboration with British Jazz saxophonist Soweto Kinch.",
      "In his efforts to share his love of the dance with others, he co-founded the London Tap Jam, a regular opportunity for tap dancers to jam with each other supported by fantastic live musicians in the heart of London.",
      "We are extremely excited to have Junior on board for the festival to share such an integral part of this dance!",
    ],
  },
  {
    img: Kanini,
    bio: [
      "Kanini is a young dancer and teacher from Zagreb, Croatia. Her enthusiasm for music and dancing has been evident since her childhood when she started playing piano at the age of 7.",
      "Having Kenyan roots in her family, Helena has always been exposed to African music, which stimulated her sensibility for the rhythm. Very soon she started developing interest towards dances like Hip Hop and Dancehall.",
      "After 8 years of exploring various Street dance styles, she saw African American Jazz dancing and immediately felt that it speaks to her on a very deep level.",
      "Currently based in Zagreb, she continues to teach Jazz internationally and online. She endlessly continues to fuel her inspiration with various other dance styles which makes her style innovative and refreshing.",
      "We can't explain how excited we are to have Kanini over as a very special guest teacher for the festival.",
      "She's a huge inspiration to us, and we can't wait for her to inspire you all!",
    ],
  },
];
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
    <UiContainer class="!max-w-5xl">
      <JamSplat class="text-primary fill-primary mx-auto h-24 w-auto" />
    </UiContainer>
    <UiContainer class="!max-w-5xl">
      <h2 class="text-center text-4xl font-bold">Artists</h2>
      <TeacherGrid />
      <JamSplat class="text-primary fill-primary mx-auto mt-18 h-24 w-auto" />
      <h2 class="text-center text-4xl font-bold">Inspirers (TBA)</h2>
      <JamSplat class="text-primary fill-primary mx-auto mt-18 h-24 w-auto" />
      <h2 class="text-center text-4xl font-bold">Music (TBA)</h2>
    </UiContainer>
  </div>
</template>
