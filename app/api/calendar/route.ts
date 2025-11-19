import { NextResponse } from "next/server";
import { normalizeCalendar, type RawData } from "@/lib/calendar-normalize";

export async function GET() {
  const externalApiUrl = process.env.EXTERNAL_CALENDAR_URL || "http://localhost:4000/rawcalendar";

  const res = await fetch(externalApiUrl, {
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      {
        error: `Failed to fetch external calendar data: ${res.status} ${res.statusText}`,
      },
      { status: 502 },
    );
  }

  const raw = (await res.json()) as RawData;

  const normalized = normalizeCalendar(raw);

  return NextResponse.json(normalized, { status: 200 });
}
