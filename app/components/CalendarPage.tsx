import { getCalendarData } from "@/lib/calendar-data";
import DateRangeCalendar from "./DateRangeCalendar";
import { getCalendarStyleConfig } from "./style-config/calendarStyleConfig";

export default async function CalendarPage() {
  const { days, firstAvailableDate } = await getCalendarData().catch(() => ({
    days: null,
    firstAvailableDate: null,
  }));

  const styleConfig = getCalendarStyleConfig();

  if (!days) {
    return (
      <main className={styleConfig.layoutStyling.page}>
        <div className={styleConfig.layoutStyling.errorText}>
          Failed to load calendar data. Please try again later.
        </div>
      </main>
    );
  }

  return (
    <main className={styleConfig.layoutStyling.page}>
      <DateRangeCalendar
        availability={days}
        firstAvailableDate={firstAvailableDate}
        style={styleConfig}
      />
    </main>
  );
}
