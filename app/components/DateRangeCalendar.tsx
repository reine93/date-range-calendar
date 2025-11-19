"use client";

import { DayPicker, DayPickerProps } from "react-day-picker";
import type { CalendarDay } from "@/lib/calendar-types";
import { getCalendarStyleConfig } from "./style-config/calendarStyleConfig";
import { useDateRangeCalendar } from "./hooks/useDateRangeCalendar";
import { parseISO } from "date-fns";

type Props = {
  availability: CalendarDay[];
  firstAvailableDate?: CalendarDay["date"];
};

export default function DateRangeCalendar({ availability, firstAvailableDate }: Props) {
  const { range, getDisabledDays, checkoutDates, handleRangeSelect } =
    useDateRangeCalendar(availability);

  const calendarStyling = getCalendarStyleConfig();

  const defaultMonth = firstAvailableDate ? parseISO(firstAvailableDate) : undefined;

  const dayPickerProps: DayPickerProps = {
    mode: "range" as const,
    defaultMonth,
    selected: range,
    onSelect: handleRangeSelect,
    min: 1,
    excludeDisabled: true,
    fixedWeeks: true,
    numberOfMonths: 2,
    animate: true,
    navLayout: "around" as const,
    classNames: calendarStyling,
    disabled: getDisabledDays,
    modifiers: { checkout: checkoutDates },
    modifiersClassNames: {
      checkout: "bg-yellow-200 text-yellow-900 rounded-full",
    },
  };

  return <DayPicker {...dayPickerProps} />;
}
