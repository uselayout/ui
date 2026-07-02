"use client";

import * as React from "react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { Calendar } from "@/registry/layout/calendar/calendar";

export const importLine = `import { Calendar } from "@/components/ui/calendar"`;

function SingleSelectCalendar() {
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      className="rounded-md border border-border"
    />
  );
}

function RangeCalendar() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
  });
  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      numberOfMonths={2}
      className="rounded-md border border-border"
    />
  );
}

export const demos = [
  {
    title: "Single date",
    component: <SingleSelectCalendar />,
    code: `const [selected, setSelected] = useState<Date | undefined>(new Date());

<Calendar
  mode="single"
  selected={selected}
  onSelect={setSelected}
  className="rounded-md border border-border"
/>`,
  },
  {
    title: "Date range",
    component: <RangeCalendar />,
    code: `const [range, setRange] = useState<DateRange | undefined>({
  from: new Date(),
  to: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
});

<Calendar
  mode="range"
  selected={range}
  onSelect={setRange}
  numberOfMonths={2}
  className="rounded-md border border-border"
/>`,
  },
];
