<script setup lang="ts">
import { ref, computed } from "vue";

interface Event {
  title: string;
  day: "Friday" | "Saturday" | "Sunday" | "Monday";
  startTime: string;
  endTime: string;
  type?: "lesson" | "party" | "other";
  location?: string;
}

const isLoading = ref(true);

// Helper to convert HH:MM to minutes from midnight
const timeToMinutes = (time: string): number => {
  const parts = time.split(":");
  const hours = Number(parts[0] ?? 0);
  const minutes = Number(parts[1] ?? 0);
  return hours * 60 + minutes;
};

// Start time for our calendar display (9 AM in minutes from midnight)
const CALENDAR_START_TIME_MINUTES = timeToMinutes("09:00");
// Height of a 15-minute slot in pixels
const PIXELS_PER_15_MINUTES = 14; // Based on h-16 = 64px for one hour (4 * 15min)
const PIXELS_PER_MINUTE = PIXELS_PER_15_MINUTES / 15;

const events = ref<Event[]>([
  // Friday - Lindy Hop + Solo Jazz
  {
    title: "Lindy Hop Warmup",
    day: "Friday",
    startTime: "09:30",
    endTime: "10:45",
    type: "lesson",
    location: "Studio A",
  },
  {
    title: "Solo Jazz Foundations",
    day: "Friday",
    startTime: "11:00",
    endTime: "12:15",
    type: "lesson",
    location: "Studio B",
  },
  {
    title: "Lindy Hop Intermediate",
    day: "Friday",
    startTime: "13:00",
    endTime: "14:30",
    type: "lesson",
    location: "Studio A",
  },
  {
    title: "Technique & Styling",
    day: "Friday",
    startTime: "15:00",
    endTime: "16:15",
    type: "other",
    location: "Studio B",
  },
  // Evening party + after party
  {
    title: "Evening Party",
    day: "Friday",
    startTime: "19:00",
    endTime: "23:00",
    type: "party",
    location: "Main Hall",
  },
  {
    title: "After Party",
    day: "Friday",
    startTime: "23:00",
    endTime: "02:00",
    type: "party",
    location: "Basement",
  },

  // Saturday - more lessons with a cultural talk between classes
  {
    title: "Lindy Hop: Social Basics",
    day: "Saturday",
    startTime: "09:00",
    endTime: "10:15",
    type: "lesson",
    location: "Studio A",
  },
  {
    title: "Solo Jazz: Rhythm & Movement",
    day: "Saturday",
    startTime: "10:30",
    endTime: "11:45",
    type: "lesson",
    location: "Studio B",
  },
  // Cultural talk midway between two lessons
  {
    title: "Cultural Talk: Roots of Jazz Dance",
    day: "Saturday",
    startTime: "12:00",
    endTime: "12:45",
    type: "other",
    location: "Lecture Room",
  },
  {
    title: "Lindy Hop Partnering",
    day: "Saturday",
    startTime: "13:15",
    endTime: "14:45",
    type: "lesson",
    location: "Studio A",
  },
  {
    title: "Solo Jazz Advanced",
    day: "Saturday",
    startTime: "15:15",
    endTime: "16:45",
    type: "lesson",
    location: "Studio B",
  },
  {
    title: "Evening Party",
    day: "Saturday",
    startTime: "19:00",
    endTime: "23:00",
    type: "party",
    location: "Main Hall",
  },
  {
    title: "After Party",
    day: "Saturday",
    startTime: "23:00",
    endTime: "02:00",
    type: "party",
    location: "Basement",
  },

  // Sunday
  {
    title: "Lindy Hop Technique",
    day: "Sunday",
    startTime: "09:30",
    endTime: "10:45",
    type: "lesson",
    location: "Studio A",
  },
  {
    title: "Solo Jazz Improvisation",
    day: "Sunday",
    startTime: "11:00",
    endTime: "12:15",
    type: "lesson",
    location: "Studio B",
  },
  {
    title: "Open Practice",
    day: "Sunday",
    startTime: "13:00",
    endTime: "14:30",
    type: "other",
    location: "Studio A",
  },
  {
    title: "Evening Party",
    day: "Sunday",
    startTime: "19:00",
    endTime: "23:00",
    type: "party",
    location: "Main Hall",
  },
  {
    title: "After Party",
    day: "Sunday",
    startTime: "23:00",
    endTime: "02:00",
    type: "party",
    location: "Basement",
  },

  // Monday - shorter evening party
  {
    title: "Lindy Hop Cooldown",
    day: "Monday",
    startTime: "09:30",
    endTime: "10:30",
    type: "lesson",
    location: "Studio A",
  },
  {
    title: "Solo Jazz Review",
    day: "Monday",
    startTime: "11:00",
    endTime: "12:15",
    type: "lesson",
    location: "Studio B",
  },
  {
    title: "Evening Party",
    day: "Monday",
    startTime: "17:00",
    endTime: "21:00",
    type: "party",
    location: "Main Hall",
  },
  {
    title: "After Party",
    day: "Monday",
    startTime: "23:00",
    endTime: "02:00",
    type: "party",
    location: "Basement",
  },
]);

const timeRange = computed(() => {
  const hours = [];
  for (let i = 9; i <= 23; i++) {
    // From 9 AM to 11 PM
    hours.push(`${i.toString().padStart(2, "0")}:00`);
  }
  return hours;
});

const calculatedEvents = computed(() => {
  type Days = Event["day"];
  const groups: Record<
    Days,
    (Event & { top: string; height: string; colorClass?: string })[]
  > = {
    Friday: [],
    Saturday: [],
    Sunday: [],
    Monday: [],
  };

  for (const event of events.value) {
    const startMinutes = timeToMinutes(event.startTime);
    let endMinutes = timeToMinutes(event.endTime);

    // Handle events that go past midnight (endTime earlier than startTime)
    if (endMinutes <= startMinutes) {
      endMinutes += 24 * 60;
    }

    // Calculate start position (top) relative to 9 AM
    const offsetMinutes = startMinutes - CALENDAR_START_TIME_MINUTES;
    const top = offsetMinutes * PIXELS_PER_MINUTE;

    // Calculate height of the event
    const durationMinutes = endMinutes - startMinutes;
    const height = durationMinutes * PIXELS_PER_MINUTE;

    // color coding by event type
    let colorClass = "bg-primary text-primary-foreground";
    if (event.type === "lesson") {
      colorClass = "bg-indigo-600 text-white";
    } else if (event.type === "party") {
      colorClass = "bg-rose-600 text-white";
    } else if (event.type === "other") {
      colorClass = "bg-amber-300 text-foreground";
    }

    // ensure the group exists for the day (narrowed by Record<Days,...>)
    groups[event.day as Days].push({
      ...event,
      top: `${top}px`,
      height: `${height}px`,
      // attach class for styling in template
      colorClass,
    } as Event & { top: string; height: string; colorClass: string });
  }
  return groups;
});

const addEvent = (event: Event) => {
  if (event.title && event.day && event.startTime && event.endTime) {
    events.value.push({ ...event });
  }
};
</script>

<template>
  <JamLoader v-if="isLoading" />
  <div v-else>
    <div class="flex justify-end px-6 py-4">
      <UiButton size="sm"><Icon name="lucide:plus" /> New event</UiButton>
    </div>
    <div class="w-full !max-w-full">
      <UiCard>
        <UiCardContent>
          <EventCalendar />
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold">Schedule</h1>
            <TimetableAddModal @save="addEvent" />
          </div>

          <!-- Modified grid layout for 5 columns (1 for time, 4 for days) -->
          <div
            class="relative mt-8 grid grid-cols-1 gap-8 overflow-y-auto md:grid-cols-3 lg:grid-cols-5"
          >
            <!-- Time Axis Column -->
            <div
              class="bg-background sticky top-0 z-10 hidden border-r border-gray-200 lg:block dark:border-gray-700"
            >
              <div class="h-16"></div>
              <!-- Placeholder for day header alignment -->
              <div class="relative">
                <div
                  v-for="(time, index) in timeRange"
                  :key="index"
                  class="flex h-14 items-start justify-end pr-2 text-sm text-gray-500 dark:text-gray-400"
                  :style="{ paddingTop: index === 0 ? '0' : '8px' }"
                >
                  {{ time }}
                </div>
              </div>
            </div>

            <!-- Day Columns -->
            <div
              v-for="(dayEvents, day) in calculatedEvents"
              :key="day"
              class="relative rounded-lg border p-4"
            >
              <h2 class="text-md mb-4 text-center font-bold">{{ day }}</h2>
              <!-- Time slot lines for visual reference -->
              <div class="absolute inset-0 z-0">
                <div
                  v-for="(time, index) in timeRange"
                  :key="index"
                  class="h-16 border-t border-gray-100 dark:border-gray-800"
                  :class="{ 'border-b-0': index === timeRange.length - 1 }"
                ></div>
              </div>
              <div class="relative h-full">
                <div
                  v-for="(event, index) in dayEvents"
                  :key="index"
                  :class="[
                    event.colorClass || 'bg-primary text-primary-foreground',
                    'absolute z-10 overflow-hidden rounded-lg p-2 text-xs shadow-md transition-shadow duration-200 ease-in-out hover:shadow-lg',
                  ]"
                  :style="{
                    top: event.top,
                    height: event.height,
                    left: '2px',
                    right: '2px',
                  }"
                >
                  <h3 class="font-bold whitespace-normal">{{ event.title }}</h3>
                  <p class="whitespace-normal">
                    {{ event.startTime }} - {{ event.endTime }}
                  </p>
                </div>
                <p
                  v-if="dayEvents.length === 0"
                  class="text-muted-foreground text-center"
                >
                  No events scheduled.
                </p>
              </div>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>
