"use client";
import { useState } from "react";
import { DayPicker, DayPickerProps, type DateRange } from "react-day-picker";
import type { AvailabilityDay } from "@/lib/calendar-types";
import type { CalendarStyleValue } from "./style-config/styling-types";
import { differenceInCalendarMonths, parseISO } from "date-fns";
import { usePriceLookup } from "./hooks/usePriceLookup";
import { makeDayButtonWithPrice } from "./DayButtonWithPrice";
import { useMobileMonthScroll } from "./hooks/useMobileMonthScroll";
import { useMediaQuery } from "./hooks/useMediaQuery";

type Props = {
  availability: AvailabilityDay[];
  firstAvailableDate?: AvailabilityDay["date"];
  style: CalendarStyleValue;
  range: DateRange | undefined;
  onRangeChange: (next: DateRange | undefined) => void;
  getDisabledDays: (date: Date) => boolean;
  checkoutDates: Date[];
  isOpen?: boolean;
};

export default function DateRangeCalendar({
  availability,
  firstAvailableDate,
  style,
  range,
  onRangeChange,
  getDisabledDays,
  checkoutDates,
  isOpen = true,
}: Props) {
  const { dayPickerStyling, modifierStyling, dayButtonStyling } = style;
  const priceLookup = usePriceLookup(availability);
  const DayButtonWithPrice = makeDayButtonWithPrice(priceLookup, dayButtonStyling);
  const isMobile = useMediaQuery("(max-width: 639px)");
  const initialMonth = firstAvailableDate ? parseISO(firstAvailableDate) : undefined;
  const [currentMonthView, setCurrentMonthView] = useState<Date | undefined>(
    range?.from ?? initialMonth,
  );
  const startMonth = availability[0] ? parseISO(availability[0].date) : undefined;
  const endMonth =
    availability.length > 0 ? parseISO(availability[availability.length - 1].date) : undefined;
  const totalMonths = Math.max(
    1,
    startMonth && endMonth
      ? differenceInCalendarMonths(endMonth, startMonth) + 1
      : availability.length,
  );
  const displayedMonth = currentMonthView ?? initialMonth;

  const handleSelect = (nextRange: DateRange | undefined) => {
    if (!currentMonthView && nextRange?.from) {
      setCurrentMonthView(nextRange.from);
    }
    onRangeChange(nextRange);
  };

  // Mobile needs a manual scroll-to-month because daypicker nav controls are hidden and we render many months.
  // This hook scrolls to the selected/initial month on open without resetting the user's scroll after clears.
  const mobileCalendarRef = useMobileMonthScroll<HTMLDivElement>({
    isOpen: isMobile && isOpen,
    range,
    initialMonth,
    startMonth,
  });

  const sharedDayPickerProps: DayPickerProps = {
    mode: "range" as const,
    defaultMonth: initialMonth,
    selected: range,
    onSelect: handleSelect,
    min: 1,
    excludeDisabled: true,
    fixedWeeks: true,
    animate: true,
    disabled: getDisabledDays,
    modifiers: { checkout: checkoutDates },
    modifiersClassNames: modifierStyling,
    components: { DayButton: DayButtonWithPrice },
  };

  const desktopDayPickerProps: DayPickerProps = {
    ...sharedDayPickerProps,
    month: displayedMonth,
    onMonthChange: setCurrentMonthView,
    numberOfMonths: 2,
    navLayout: "around" as const,
    startMonth,
    endMonth,
    classNames: dayPickerStyling,
  };

  const mobileDayPickerProps: DayPickerProps = {
    ...sharedDayPickerProps,
    numberOfMonths: Math.min(Math.max(1, totalMonths), 19),
    hideNavigation: true,
    classNames: {
      ...dayPickerStyling,
      root: `${dayPickerStyling.root} ${style.mobileDayPickerRoot}`,
      months: `${dayPickerStyling.months} ${style.mobileDayPickerMonths}`,
      nav: "hidden",
    },
  };

  return (
    <>
      {!isMobile ? (
        <div className={style.desktopDayPickerWrapper}>
          <DayPicker {...desktopDayPickerProps} />
        </div>
      ) : null}
      {isMobile ? (
        <div ref={mobileCalendarRef} className={style.mobileDayPickerWrapper}>
          <DayPicker {...mobileDayPickerProps} />
        </div>
      ) : null}
    </>
  );
}
