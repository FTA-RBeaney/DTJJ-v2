<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script lang="ts" setup>
import FullCalendar from "@fullcalendar/vue3";
import dayjs from "dayjs";
import type { CalendarOptions, EventInput } from "@fullcalendar/core";

// color palette for event types
const COLORS = {
  lesson: "#4f46e5", // indigo-600
  party: "#e11d48", // rose-600
  other: "#f59e0b", // amber-400
};

// Use specific dates: 2026-05-01 (Friday) .. 2026-05-04 (Monday)
const baseFri = dayjs("2026-05-01");
const baseSat = baseFri.add(1, "day");
const baseSun = baseFri.add(2, "day");
const baseMon = baseFri.add(3, "day");

const eventsList: EventInput[] = [
  // Friday
  {
    title: "Lindy Hop Warmup",
    start: baseFri.hour(9).minute(30).toDate(),
    end: baseFri.hour(10).minute(45).toDate(),
    color: COLORS.lesson,
  },
  {
    title: "Solo Jazz Foundations",
    start: baseFri.hour(11).minute(0).toDate(),
    end: baseFri.hour(12).minute(15).toDate(),
    color: COLORS.lesson,
  },
  {
    title: "Technique & Styling",
    start: baseFri.hour(15).minute(0).toDate(),
    end: baseFri.hour(16).minute(15).toDate(),
    color: COLORS.other,
  },
  {
    title: "Evening Party",
    start: baseFri.hour(19).minute(0).toDate(),
    end: baseFri.hour(23).minute(0).toDate(),
    color: COLORS.party,
  },
  {
    title: "After Party",
    start: baseFri.hour(23).minute(0).toDate(),
    end: baseSat.hour(2).minute(0).toDate(),
    color: COLORS.party,
  },

  // Saturday
  {
    title: "Lindy Hop: Social Basics",
    start: baseSat.hour(9).minute(0).toDate(),
    end: baseSat.hour(10).minute(15).toDate(),
    color: COLORS.lesson,
  },
  {
    title: "Solo Jazz: Rhythm & Movement",
    start: baseSat.hour(10).minute(30).toDate(),
    end: baseSat.hour(11).minute(45).toDate(),
    color: COLORS.lesson,
  },
  {
    title: "Cultural Talk: Roots of Jazz Dance",
    start: baseSat.hour(12).minute(0).toDate(),
    end: baseSat.hour(12).minute(45).toDate(),
    color: COLORS.other,
  },
  {
    title: "Lindy Hop Partnering",
    start: baseSat.hour(13).minute(15).toDate(),
    end: baseSat.hour(14).minute(45).toDate(),
    color: COLORS.lesson,
  },
  {
    title: "Solo Jazz Advanced",
    start: baseSat.hour(15).minute(15).toDate(),
    end: baseSat.hour(16).minute(45).toDate(),
    color: COLORS.lesson,
  },
  {
    title: "Evening Party",
    start: baseSat.hour(19).minute(0).toDate(),
    end: baseSat.hour(23).minute(0).toDate(),
    color: COLORS.party,
  },
  {
    title: "After Party",
    start: baseSat.hour(23).minute(0).toDate(),
    end: baseSun.hour(2).minute(0).toDate(),
    color: COLORS.party,
  },

  // Sunday
  {
    title: "Lindy Hop Technique",
    start: baseSun.hour(9).minute(30).toDate(),
    end: baseSun.hour(10).minute(45).toDate(),
    color: COLORS.lesson,
  },
  {
    title: "Solo Jazz Improvisation",
    start: baseSun.hour(11).minute(0).toDate(),
    end: baseSun.hour(12).minute(15).toDate(),
    color: COLORS.lesson,
  },
  {
    title: "Open Practice",
    start: baseSun.hour(13).minute(0).toDate(),
    end: baseSun.hour(14).minute(30).toDate(),
    color: COLORS.other,
  },
  {
    title: "Evening Party",
    start: baseSun.hour(19).minute(0).toDate(),
    end: baseSun.hour(23).minute(0).toDate(),
    color: COLORS.party,
  },
  {
    title: "After Party",
    start: baseSun.hour(23).minute(0).toDate(),
    end: baseMon.hour(2).minute(0).toDate(),
    color: COLORS.party,
  },

  // Monday
  {
    title: "Lindy Hop Cooldown",
    start: baseMon.hour(9).minute(30).toDate(),
    end: baseMon.hour(10).minute(30).toDate(),
    color: COLORS.lesson,
  },
  {
    title: "Solo Jazz Review",
    start: baseMon.hour(11).minute(0).toDate(),
    end: baseMon.hour(12).minute(15).toDate(),
    color: COLORS.lesson,
  },
  {
    title: "Evening Party",
    start: baseMon.hour(17).minute(0).toDate(),
    end: baseMon.hour(21).minute(0).toDate(),
    color: COLORS.party,
  },
  {
    title: "After Party",
    start: baseMon.hour(23).minute(0).toDate(),
    end: baseMon.add(1, "day").hour(2).minute(0).toDate(),
    color: COLORS.party,
  },
];
import listPlugin from "@fullcalendar/list";

const calendarOptions: CalendarOptions = {
  plugins: [listPlugin],
  initialView: "listMonth",
  // default the calendar to the weekend starting Friday 1st May 2026
  initialDate: dayjs("2026-05-01").toDate(),
  editable: true,
  nowIndicator: true,
  dateClick(arg) {
    useSonner("Date clicked", {
      description: dayjs(arg.dateStr).format("dddd, MMMM D, YYYY h:mm A"),
    });
  },
  eventClick(arg) {
    useSonner("Event clicked", {
      description: arg.event.title,
    });
  },
  stickyHeaderDates: true,
  headerToolbar: {
    left: "prevYear,prev,today,next,nextYear",
    center: "title",
    right: "listDay,listWeek,listMonth",
  },
  footerToolbar: {
    left: "prevYear,prev,today,next,nextYear",
    center: "",
    right: "listWeek,listDay,listMonth",
  },
  buttonText: {
    listWeek: "List Week",
    listDay: "List Day",
    listMonth: "List Month",
  },
  events: eventsList,
};
</script>
