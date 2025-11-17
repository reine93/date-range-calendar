"use client";

import { useEffect, useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import type { CalendarDay } from "@/lib/calendar-types";
import { getCalendarStyleConfig } from "./style-config/calendarStyleConfig";

type Props = {
  availability: CalendarDay[];
};

export default function DateRangeCalendar({ availability }: Props) {
  const [range, setRange] = useState<DateRange | undefined>();
  const calendarStyling = getCalendarStyleConfig();

  //useEffect for testing purposes
  useEffect(() => {console.log('availability:', availability)}, [])


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
