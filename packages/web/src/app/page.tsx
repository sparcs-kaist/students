"use client";

import Calendar from "../common/components/Calendar/Calendar";

const Home = () => (
  <>
    <div>Welcome to SPARCS Students!</div>
    <Calendar
      existDates={[new Date("2024-11-07"), new Date("2024-11-11")]}
      eventPeriods={[
        { start: new Date("2024-11-01"), end: new Date("2024-11-01") },
      ]}
      selectedDates={[new Date("2024-11-17")]}
      size="md"
      width={354}
    />
    <Calendar
      existDates={[new Date("2024-11-07"), new Date("2024-11-11")]}
      eventPeriods={[
        { start: new Date("2024-11-01"), end: new Date("2024-11-08") },
      ]}
      selectedDates={[new Date("2024-11-17")]}
      size="md"
      width={354}
    />
    <Calendar
      existDates={[new Date("2024-11-07"), new Date("2024-11-11")]}
      eventPeriods={[
        { start: new Date("2024-11-01"), end: new Date("2024-11-01") },
      ]}
      selectedDates={[new Date("2024-11-17")]}
      size="md"
      title="학사일정"
      width={354}
    />
    <Calendar
      existDates={[
        new Date("2024-11-04"),
        new Date("2024-11-07"),
        new Date("2024-11-11"),
        new Date("2024-11-24"),
        new Date("2024-11-29"),
        new Date("2024-11-30"),
        new Date("2024-12-01"),
      ]}
      eventPeriods={[
        { start: new Date("2024-11-01"), end: new Date("2024-11-01") },
      ]}
      selectedDates={[new Date("2024-11-17")]}
      size="md"
      title="학사일정"
      width={354}
    />
  </>
);
export default Home;
