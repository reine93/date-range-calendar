"use client";
import { useState } from "react";
import { DayPicker, DayPickerProps, type DateRange } from "react-day-picker";
import { format } from "date-fns";
import type { AvailabilityDay } from "@/lib/calendar-types";
import type { CalendarStyleValue } from "./style-config/styling-types";
import { parseISO } from "date-fns";
import { usePriceLookup } from "./hooks/usePriceLookup";
import { makeDayButtonWithPrice } from "./DayButtonWithPrice";
import { useMobileMonthScroll } from "./hooks/useMobileMonthScroll";
import { useMediaQuery } from "./hooks/useMediaQuery";

type Props = {
  availability: AvailabilityDay[];
  firstAvailableDate?: AvailabilityDay["date"];
  startMonthISO?: string;
  endMonthISO?: string;
  totalMonthsFromServer?: number;
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
  startMonthISO,
  endMonthISO,
  totalMonthsFromServer,
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
  const isMobile = useMediaQuery("(max-width: 767px)");
  const initialMonth = firstAvailableDate ? parseISO(firstAvailableDate) : undefined;
  const startMonth = startMonthISO ? parseISO(startMonthISO) : undefined;
  const endMonth = endMonthISO ? parseISO(endMonthISO) : undefined;
  const totalMonths = totalMonthsFromServer ?? 0;
  const [currentMonthView, setCurrentMonthView] = useState<Date | undefined>(
    range?.from ?? initialMonth,
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
    weekStartsOn: 1,
    formatters: {
      formatWeekdayName: (date, options) =>
        format(date, "EEE", options?.locale ? { locale: options.locale } : undefined).toUpperCase(),
    },
    defaultMonth: initialMonth,
    selected: range,
    onSelect: handleSelect,
    min: 1,
    excludeDisabled: true,
    fixedWeeks: true,
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
