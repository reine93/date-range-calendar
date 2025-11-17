// DateRangeCalendar.tsx
"use client";

import { useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { getCalendarStyleConfig } from "./style-config/calendarStyleConfig";

export default function DateRangeCalendar() {
  const [range, setRange] = useState<DateRange | undefined>();
  const calendarStyling = getCalendarStyleConfig();

  return (
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        fixedWeeks
        numberOfMonths={2}
        animate
        navLayout="around"
        classNames={calendarStyling}
      />
  );
}
