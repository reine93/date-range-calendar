//server wrapper component
import { getCalendarData } from "@/lib/calendar-data";
import DateRangeCalendar from "./DateRangeCalendar";

export default async function CalendarPage() {
  try {
    const data = await getCalendarData();
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100">
        <DateRangeCalendar availability={data.days} />
      </main>
    );
  } catch (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-red-600">
          Failed to load calendar data. Please try again later.
        </div>
      </main>
    );
  }
}