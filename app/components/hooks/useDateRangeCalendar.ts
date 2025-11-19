// app/components/useDateRangeCalendar.ts
import { useMemo, useState } from "react";
import { type DateRange } from "react-day-picker";
import { addDays, eachDayOfInterval, format, parseISO } from "date-fns";
import type { CalendarDay } from "@/lib/calendar-types";

export function useDateRangeCalendar(availability: CalendarDay[]) {
  const [range, setRange] = useState<DateRange | undefined>();

  const availabilityMap = useMemo(
    () => new Map(availability.map((day) => [day.date, day.status])),
    [availability],
  );

  const isStartingNewRange = !range?.from || (range?.from && range?.to);

  const getDisabledDays = useMemo(
    () => (date: Date) => {
      const isoDate = format(date, "yyyy-MM-dd");
      const status = availabilityMap.get(isoDate);

      //mark checkout day as disabled day if you attempt to start range with it
      if (isStartingNewRange && status === "checkout") {
        return true;
      }

      return status === "unavailable";
    },
    [availabilityMap, isStartingNewRange],
  );

  const checkoutDates = useMemo(
    () => availability.filter((day) => day.status === "checkout").map((day) => parseISO(day.date)),
    [availability],
  );

  function hasCheckoutDayInRange(startDate: Date, endDate: Date): boolean {
    const start = addDays(startDate, 1);
    const end = addDays(endDate, -1);

    // If there are no dates strictly between startDate and endDate, return false to avoid range error
    if (start > end) {
      return false;
    }

    const middleNights = eachDayOfInterval({ start, end });

    for (const date of middleNights) {
      const isoDate = format(date, "yyyy-MM-dd");
      if (availabilityMap.get(isoDate) === "checkout") {
        return true;
      }
    }

    return false;
  }

  const handleRangeSelect = (nextRange: DateRange | undefined) => {
    if (!nextRange) {
      setRange(undefined);
      return;
    }

    const startingNewRangeNow = !range?.from || (range?.from && range?.to);

    //Can't start range on a checkout day
    if (startingNewRangeNow && nextRange.from && !nextRange.to) {
      const isoFrom = format(nextRange.from, "yyyy-MM-dd");
      if (availabilityMap.get(isoFrom) === "checkout") {
        return;
      }
    }

    //Can't create a range where there is checkout date in middle
    if (nextRange.from && nextRange.to) {
      if (hasCheckoutDayInRange(nextRange.from, nextRange.to)) {
        return;
      }
    }

    setRange(nextRange);
  };

  return {
    range,
    getDisabledDays,
    checkoutDates,
    handleRangeSelect,
  };
}
