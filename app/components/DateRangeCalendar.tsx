"use client";
import { useMemo } from "react";
import { DayPicker, DayPickerProps } from "react-day-picker";
import type { AvailabilityDay } from "@/lib/calendar-types";
import { getCalendarStyleConfig } from "./style-config/calendarStyleConfig";
import { useCalendarRangeSelection } from "./hooks/useCalendarRangeSelection";
import { parseISO } from "date-fns";
import { usePriceLookup } from "./hooks/usePriceLookup";
import { makePriceDayButton } from "./DayButtonWithPrice";

type Props = {
  availability: AvailabilityDay[];
  firstAvailableDate?: AvailabilityDay["date"];
};

export default function DateRangeCalendar({ availability, firstAvailableDate }: Props) {
  const calendarStyling = getCalendarStyleConfig();

  const { range, getDisabledDays, checkoutDates, handleRangeSelect } =
    useCalendarRangeSelection(availability);

  const priceLookup = usePriceLookup(availability);
  const DayButtonWithPrice = useMemo(() => makePriceDayButton(priceLookup), [priceLookup]);

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
    components: { DayButton: DayButtonWithPrice },
  };

  return <DayPicker {...dayPickerProps} />;
}
