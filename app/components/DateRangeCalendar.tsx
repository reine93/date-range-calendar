// DateRangeCalendar.tsx
"use client";

import { useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";

export default function DateRangeCalendar() {
  const [range, setRange] = useState<DateRange | undefined>();

  return (
    <div className="p-4 bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        fixedWeeks
        numberOfMonths={2}
        animate
        navLayout="around"
      />
    </div>
  );
}
