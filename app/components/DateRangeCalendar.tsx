"use client";
import { useState } from "react";
import { DayPicker, DayPickerProps, type DateRange } from "react-day-picker";
import type { AvailabilityDay } from "@/lib/calendar-types";
import type { CalendarStyleValue } from "./style-config/styling-types";
import { parseISO } from "date-fns";
import { usePriceLookup } from "./hooks/usePriceLookup";
import { makeDayButtonWithPrice } from "./DayButtonWithPrice";

type Props = {
  availability: AvailabilityDay[];
  firstAvailableDate?: AvailabilityDay["date"];
  style: CalendarStyleValue;
  range: DateRange | undefined;
  onRangeChange: (next: DateRange | undefined) => void;
  getDisabledDays: (date: Date) => boolean;
  checkoutDates: Date[];
};

export default function DateRangeCalendar({
  availability,
  firstAvailableDate,
  style,
  range,
  onRangeChange,
  getDisabledDays,
  checkoutDates,
}: Props) {
  const { dayPickerStyling, modifierStyling, dayButtonStyling } = style;
  const priceLookup = usePriceLookup(availability);
  const DayButtonWithPrice = makeDayButtonWithPrice(priceLookup, dayButtonStyling);

  const initialMonth = firstAvailableDate ? parseISO(firstAvailableDate) : undefined;
  const [currentMonthView, setCurrentMonthView] = useState<Date | undefined>(
    range?.from ?? initialMonth,
  );
  const startMonth = availability[0] ? parseISO(availability[0].date) : undefined;
  const endMonth =
    availability.length > 0 ? parseISO(availability[availability.length - 1].date) : undefined;
  const displayedMonth = currentMonthView ?? initialMonth;

  const handleSelect = (nextRange: DateRange | undefined) => {
    if (!currentMonthView && nextRange?.from) {
      setCurrentMonthView(nextRange.from);
    }
    onRangeChange(nextRange);
  };

  const dayPickerProps: DayPickerProps = {
    mode: "range" as const,
    defaultMonth: initialMonth,
    month: displayedMonth,
    onMonthChange: setCurrentMonthView,
    selected: range,
    onSelect: handleSelect,
    min: 1,
    excludeDisabled: true,
    fixedWeeks: true,
    numberOfMonths: 2,
    animate: true,
    navLayout: "around" as const,
    startMonth,
    endMonth,
    classNames: dayPickerStyling,
    disabled: getDisabledDays,
    modifiers: { checkout: checkoutDates },
    modifiersClassNames: modifierStyling,
    components: { DayButton: DayButtonWithPrice },
  };

  return <DayPicker {...dayPickerProps} />;
}
