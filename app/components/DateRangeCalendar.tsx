"use client";
import { useMemo, useState } from "react";
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
  const priceLookup = usePriceLookup(availability);
  const { dayPickerStyling, modifierStyling, dayButtonStyling } = style;

  const DayButtonWithPrice = makeDayButtonWithPrice(priceLookup, dayButtonStyling);

  const initialMonth = useMemo(
    () => (firstAvailableDate ? parseISO(firstAvailableDate) : undefined),
    [firstAvailableDate],
  );
  const [userMonth, setUserMonth] = useState<Date | undefined>(range?.from ?? initialMonth);
  const displayedMonth = userMonth ?? range?.from ?? initialMonth;

  const handleSelect = (nextRange: DateRange | undefined) => {
    if (nextRange?.from && nextRange?.to) {
      setUserMonth(nextRange.from);
    }
    onRangeChange(nextRange);
  };

  const dayPickerProps: DayPickerProps = {
    mode: "range" as const,
    defaultMonth: initialMonth,
    month: displayedMonth,
    onMonthChange: setUserMonth,
    selected: range,
    onSelect: handleSelect,
    min: 1,
    excludeDisabled: true,
    fixedWeeks: true,
    numberOfMonths: 2,
    animate: true,
    navLayout: "around" as const,
    classNames: dayPickerStyling,
    disabled: getDisabledDays,
    modifiers: { checkout: checkoutDates },
    modifiersClassNames: modifierStyling,
    components: { DayButton: DayButtonWithPrice },
  };

  return <DayPicker {...dayPickerProps} />;
}
