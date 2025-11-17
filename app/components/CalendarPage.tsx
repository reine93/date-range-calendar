//server wrapper component
import { getCalendarData } from "@/lib/calendar-data";
import DateRangeCalendar from "./DateRangeCalendar";

export default async function CalendarPage() {
  const data = await getCalendarData();

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <DateRangeCalendar availability={data.days} />
    </main>
  );
}