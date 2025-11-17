//data layer
import type { CalendarApiResponse } from "@/lib/calendar-types";
import "server-only";

export async function getCalendarData(): Promise<CalendarApiResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/calendar`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch calendar data");
  }

  return res.json();
}