<script setup>
import Skye from "@/assets/img/teachers/skye.png";
import Trisha from "@/assets/img/teachers/trisha.png";
import Junior from "@/assets/img/teachers/junior.png";
import Kanini from "@/assets/img/teachers/kanini.png";
import JamSplat from "@/assets/img/jam-splat-trans.svg";

const teachers = [
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
];
</script>

<template>
  <ClientOnly>
    <div class="grid gap-16 lg:gap-24">
      <div v-for="(member, i) in teachers" :key="member.name">
        <div
          class="items-center justify-center gap-12 md:flex"
          :class="i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'"
        >
          <div class="md:w-3/12">
            <Motion
              :initial="{ opacity: 0, x: i % 2 === 0 ? -10 : 10 }"
              :inViewOptions="{ once: true }"
              :whileInView="{
                x: [i % 2 === 0 ? -50 : 50, -6, 6, -4, 4, 0],
                rotate: [0, -2, 2, -1, 1, 0],
                transition: { duration: 0.75 },
                opacity: 1,
              }"
            >
              <img
                :src="member.img"
                :alt="member.name"
                class="mb-10 w-full rounded-lg"
              />
            </Motion>
          </div>
          <div class="md:w-8/12">
            <h3 class="mt-4 text-center text-xl font-bold">
              {{ member.name }}
            </h3>
            <p v-for="(p, i) in member.bio" :key="i" class="text-left">
              {{ p }}
            </p>
          </div>
        </div>
        <!-- <JamSplat class="text-primary fill-primary mx-auto mt-18 h-24 w-auto" /> -->
      </div>
    </div>
  </ClientOnly>
</template>
