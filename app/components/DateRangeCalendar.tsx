"use client";
import { DayPicker, DayPickerProps } from "react-day-picker";
import type { AvailabilityDay } from "@/lib/calendar-types";
import type { CalendarStyleValue } from "./style-config/styling-types";
import { useCalendarRangeSelection } from "./hooks/useCalendarRangeSelection";
import { parseISO } from "date-fns";
import { usePriceLookup } from "./hooks/usePriceLookup";
import { makeDayButtonWithPrice } from "./DayButtonWithPrice";

type Props = {
  availability: AvailabilityDay[];
  firstAvailableDate?: AvailabilityDay["date"];
  style: CalendarStyleValue;
};

export default function DateRangeCalendar({ availability, firstAvailableDate, style }: Props) {
  const { range, getDisabledDays, checkoutDates, handleRangeSelect } =
    useCalendarRangeSelection(availability);

  const priceLookup = usePriceLookup(availability);
  const { dayPickerStyling, modifierStyling, dayButtonStyling } = style;

  const DayButtonWithPrice = makeDayButtonWithPrice(priceLookup, dayButtonStyling);

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
    classNames: dayPickerStyling,
    disabled: getDisabledDays,
    modifiers: { checkout: checkoutDates },
    modifiersClassNames: modifierStyling,
    components: { DayButton: DayButtonWithPrice },
  };

  return <DayPicker {...dayPickerProps} />;
}
