"use client";

import * as React from "react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

import {
  DatePicker,
  DateRangePicker,
} from "@/registry/layout/date-picker/date-picker";

export const importLine = `import { DatePicker, DateRangePicker } from "@/components/ui/date-picker"`;

function BasicDatePicker() {
  const [date, setDate] = useState<Date | undefined>();
  return <DatePicker date={date} onDateChange={setDate} />;
}

function BasicDateRangePicker() {
  const [range, setRange] = useState<DateRange | undefined>();
  return (
    <DateRangePicker
      dateRange={range}
      onDateRangeChange={setRange}
    />
  );
}

export const demos = [
  {
    title: "Date picker",
    component: <BasicDatePicker />,
    code: `const [date, setDate] = useState<Date | undefined>();

<DatePicker date={date} onDateChange={setDate} />`,
  },
  {
    title: "Date range picker",
    component: <BasicDateRangePicker />,
    code: `const [range, setRange] = useState<DateRange | undefined>();

<DateRangePicker
  dateRange={range}
  onDateRangeChange={setRange}
/>`,
  },
];
