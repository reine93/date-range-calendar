import { useMemo } from "react";
import type { AvailabilityDay } from "@/lib/calendar-types";

export function usePriceLookup(days: AvailabilityDay[]) {
  return useMemo(() => {
    const map = new Map<string, { price: number; currency?: string | null }>();
    days.forEach((d) => {
      if (d.price != null) map.set(d.date, { price: d.price, currency: d.currency });
    });
    return map;
  }, [days]);
}
