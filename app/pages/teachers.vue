<script setup>
import JamSplat from "@/assets/img/jam-splat-trans.svg";
</script>

<template>
  <div>
    <UiContainer class="!max-w-6xl text-center">
      <h1 class="my-12 text-center text-7xl font-bold tracking-wider">
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
    <JamSplat class="text-primary fill-primary mx-auto mt-20 h-24 w-auto" />
    <UiContainer>
      <div class="mx-auto mt-10 pb-6">
        <h2 class="mt-12 text-center text-6xl font-bold">Your teachers</h2>
        <TeacherList />
        <!-- <TeacherGrid /> -->
      </div>
    </UiContainer>
  </div>
</template>
