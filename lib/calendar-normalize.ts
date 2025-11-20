import "server-only";
import type { AvailabilityDay, CalendarApiResponse } from "./calendar-types";

export type RawEntry = {
  date: string;
  rateFromValue: number | null;
  rateFromCurrency: string | null;
  available: boolean;
  unitId: string;
};

export type RawData = {
  [isoDate: string]: RawEntry[];
};

export function normalizeCalendar(rawData: RawData): CalendarApiResponse {
  // Although provided dataset appears sorted, JSON key order is not guaranteed.
  // ISO dates are lexicographically sortable, so Object.keys().sort() is safe.
  const sortedDates = Object.keys(rawData).sort();

  const normalizedDays: AvailabilityDay[] = [];
  let firstAvailableDate: string | undefined;
  let previousWasAvailable = false;

  // Iterate through sorted dates
  for (const date of sortedDates) {
    const entries = rawData[date];

    // In provided dataset there is only one unit per date, so we use the first item.
    const entry = entries[0];

    const isAvailable = !!entry.available;

    // Default status based on availability
    let status: AvailabilityDay["status"] = isAvailable ? "available" : "unavailable";

    // If current date is not available but previous was, mark as checkout date.
    if (!isAvailable && previousWasAvailable) {
      status = "checkout";
    }

    // Mark first available date
    if (isAvailable && !firstAvailableDate) {
      firstAvailableDate = date;
    }

    normalizedDays.push({
      date,
      status,
      price: entry.rateFromValue ?? undefined,
      currency: entry.rateFromCurrency,
    });

    previousWasAvailable = isAvailable;
  }

  return {
    days: normalizedDays,
    firstAvailableDate,
  };
}
