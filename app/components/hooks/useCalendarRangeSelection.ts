import { useMemo, useState } from "react";
import { type DateRange } from "react-day-picker";
import { addDays, eachDayOfInterval, format, parseISO } from "date-fns";
import type { AvailabilityDay } from "@/lib/calendar-types";

function toIsoDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function useCalendarRangeSelection(availability: AvailabilityDay[]) {
  const [range, setRange] = useState<DateRange | undefined>();
  console.log("range from ", range?.from, "range to ", range?.to);

  const availabilityMap = useMemo(
    () => new Map(availability.map((day) => [day.date, day.status])),
    [availability],
  );

  const getDisabledDays = useMemo<(date: Date) => boolean>(
    () => (date: Date) => {
      const status = availabilityMap.get(toIsoDate(date));
      return status === "unavailable";
    },
    [availabilityMap],
  );

  const checkoutDates = useMemo(
    () => availability.filter((day) => day.status === "checkout").map((day) => parseISO(day.date)),
    [availability],
  );

  function hasCheckoutDayInRange(startDate: Date, endDate: Date): boolean {
    const start = addDays(startDate, 1);
    const end = addDays(endDate, -1);

    // If there are no dates strictly between startDate and endDate, return false
    if (start > end) {
      return false;
    }

    const middleNights = eachDayOfInterval({ start, end });

    for (const date of middleNights) {
      if (availabilityMap.get(toIsoDate(date)) === "checkout") {
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

    const fromISO = nextRange.from ? toIsoDate(nextRange.from) : null;
    const fromStatus = fromISO ? availabilityMap.get(fromISO) : null;

    // Prevent checkout day to be marked as starting day
    if (fromStatus === "checkout" && !nextRange.to) {
      return;
    }

    // Prevent checkout day to be marked as starting day in case user selects starting day in past
    if (fromStatus === "checkout" && nextRange.to) {
      return;
    }

    // Prevent selecting a date range which has checkout in middle
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
