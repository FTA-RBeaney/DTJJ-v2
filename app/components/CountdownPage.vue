<script setup lang="ts">
import logo from "@/assets/img/logo.png";

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
</script>

<template>
  <section
    class="page-hero relative bg-[#fdf4ee] px-4 pt-10 pb-10 lg:pt-20 lg:pb-20"
  >
    <p>
      We are offering Early Bird prices for the first 50 people to register for
      full passes, then regular pricing for the next 100 full passes, then late
      pricing for the last 50 full passes. Party passes will cover parties for
      all 4 nights and stay the same price throughout. We aim to have individual
      night tickets available closer to the time once we have a better idea of
      demand.
    </p>
    <p>Pricing:</p>
    <ul>
      <li>Early bird full class and party pass: £195 (50 available)</li>
      <li>Regular: £215 (100 available)</li>
      <li>Late: £235 (50 available)</li>
      <li>Full party pass: £90 (all 4 parties)</li>
    </ul>
    <p>We will also be offering the following options:</p>
    <ul>
      <li>
        Pay a bit more on the ticket price to cover attendees who aren’t
        financially able to cover the full ticket price (self selecting on the
        form)
      </li>
      <li>
        Pay a bit less on the ticket price if it’s a bit of stretch and you
        can’t volunteer (self selecting on the form)
      </li>
      <li>
        Pay a lot less on the ticket price if you are on benefits (will require
        you to email us for a quick chat)
      </li>
      <li>
        The option to pay in installments (will require you to email us for a
        quick chat)
      </li>
      <li>
        The option to share your class pass with a co-parent or carer (will
        require you to email us for a quick chat)
      </li>
    </ul>
    <div class="mt-16 flex w-full items-center justify-center">
      <div class="z-20 mx-auto w-[320px] sm:w-[600px]">
        <!-- <Transition name="fade" appear> -->
        <div class="mx-auto max-w-[1900px] space-y-5 text-center">
          <transition-fade>
            <div
              class="mx-auto max-w-xl rounded-xl border-2 border-black bg-white p-8 md:p-16"
            >
              <p class="font-lazy text-4xl text-black">Tickets go on sale:</p>
              <div class="mx-auto mb-2 flex max-w-2xl justify-center lg:mb-6">
                <Countdown
                  :date="new Date('February 01, 2026 00:00:00')"
                  v-slot="{ days, hours, minutes, seconds }"
                >
                  <div
                    class="grid auto-cols-max grid-flow-col gap-3 text-center lg:gap-5"
                  >
                    <div class="flex flex-col items-center p-2 text-black">
                      <span class="font-mono text-5xl">
                        <span
                          :style="`--value: ${days}`"
                          aria-live="polite"
                          aria-label="days"
                          >{{ days }}</span
                        >
                      </span>
                      days
                    </div>

                    <div class="flex flex-col items-center p-2 text-black">
                      <span class="countdown font-mono text-5xl">
                        <span
                          :style="`--value: ${hours}`"
                          aria-live="polite"
                          aria-label="hours"
                          >{{ hours }}</span
                        >
                      </span>
                      hours
                    </div>
                    <div class="flex flex-col items-center p-2 text-black">
                      <span class="countdown font-mono text-5xl">
                        <span
                          :style="`--value: ${minutes}`"
                          aria-live="polite"
                          aria-label="minutes"
                          >{{ minutes }}</span
                        >
                      </span>
                      min
                    </div>
                    <div class="flex flex-col items-center p-2 text-black">
                      <span class="countdown font-mono text-5xl">
                        <span
                          :style="`--value: ${seconds}`"
                          aria-live="polite"
                          aria-label="seconds"
                          >{{ seconds }}</span
                        >
                      </span>
                      sec
                    </div>
                  </div>
                </Countdown>
              </div>
            </div>
          </transition-fade>
        </div>
        <!-- </Transition> -->
      </div>
    </div>
  </section>
</template>

<style scoped>
@font-face {
  font-family: "Garet-Heavy";
  src: url("@/assets/fonts/Garet-Heavy.otf") format("opentype");
}

h1 {
  font-family: "Garet-Heavy", sans-serif;
  font-weight: 900;
  /* color: #cd3035; */
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: -2px;
  font-size: 12vw;

  @media screen and (min-width: 1024px) {
    font-size: 10vw;
    letter-spacing: -8px;
    line-height: 0.8;
  }

  @media screen and (min-width: 1400px) {
    font-size: 170px;
  }
  @media screen and (min-width: 1800px) {
    font-size: 230px;
  }
}

h2 {
  font-family: "Garet-Heavy", sans-serif;
  text-transform: uppercase;
}

.font-mono {
  font-family: "Garet-Heavy", sans-serif;
  color: black;
  font-size: 2.4rem;

  @media screen and (min-width: 640px) {
    font-size: 5rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition:
    transform 0.8s ease,
    opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(-100px);
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    transform 0.8s ease,
    opacity 0.8s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  transform: translateY(-500px);
  opacity: 0;
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.fader {
  background: white;
  --mask-visible: rgba(0, 0, 0, 0.3);
  --mask-ease: rgba(0, 0, 0, 0.4);
  --mask-invisible: rgba(0, 0, 0, 0.2);
  --mask-off: transparent;
  --horizontal-size: 20%;
  --vertical-size: 100%;
  --mask-bottom: linear-gradient(
    to bottom,
    var(--mask-visible) calc(100% - var(--vertical-size)),
    var(--mask-ease) calc(100% - (var(--vertical-size) / 4)),
    var(--mask-invisible) 100%
  );
  --mask-right: linear-gradient(
    to right,
    var(--mask-invisible),
    var(--mask-visible) var(--horizontal-size),
    var(--mask-visible) calc(100% - var(--horizontal-size)),
    var(--mask-invisible) 100%
  );
  contain: strict;
  isolation: isolate;
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  position: absolute;
  inset: 0;
  /* max-width: 1600px; */
  margin-inline: auto;

  -webkit-mask-image: var(--mask-bottom);
  mask-image: var(--mask-bottom);
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
  opacity: 1;
  will-change: transform;

  height: 100vh;
}
</style>
