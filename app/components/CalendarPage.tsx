//server wrapper component
import { getCalendarData } from "@/lib/calendar-data";
import DateRangeCalendar from "./DateRangeCalendar";
import { CalendarStyleProvider } from "./style-config/StyleContext";
import { getCalendarStyleConfig } from "./style-config/calendarStyleConfig";

export default async function CalendarPage() {
  const { days, firstAvailableDate } = await getCalendarData().catch(() => ({
    days: null,
    firstAvailableDate: null,
  }));

  const { styleConfig } = getCalendarStyleConfig();

  if (!days) {
    return (
      <CalendarStyleProvider value={styleConfig}>
        <main className={styleConfig.layout.page}>
          <div className={styleConfig.layout.errorText}>
            Failed to load calendar data. Please try again later.
          </div>
        </main>
      </CalendarStyleProvider>
    );
  }

  return (
    <CalendarStyleProvider value={styleConfig}>
      <main className={styleConfig.layout.page}>
        <DateRangeCalendar availability={days} firstAvailableDate={firstAvailableDate} />
      </main>
    </CalendarStyleProvider>
  );
}
