//server wrapper component
import { getCalendarData } from "@/lib/calendar-data";
import DateRangeCalendar from "./DateRangeCalendar";

export default async function CalendarPage() {
  const { days, firstAvailableDate } = await getCalendarData().catch(() => ({
    days: null,
    firstAvailableDate: null,
  }));

  if (!days) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="text-red-600">Failed to load calendar data. Please try again later.</div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <DateRangeCalendar availability={days} firstAvailableDate={firstAvailableDate} />
    </main>
  );
}
