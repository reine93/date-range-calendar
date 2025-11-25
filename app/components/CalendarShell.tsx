"use client";

import { useState } from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import type { AvailabilityDay } from "@/lib/calendar-types";
import type { CalendarStyleValue } from "./style-config/styling-types";
import { useCalendarRangeSelection } from "./hooks/useCalendarRangeSelection";
import DateRangeCalendar from "./DateRangeCalendar";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { DateSelectionControls } from "./ui-elements/DateSelectionControls";
import { MobileSheet } from "./ui-elements/MobileSheet";

type Props = {
  availability: AvailabilityDay[];
  firstAvailableDate?: AvailabilityDay["date"];
  startMonthISO?: string;
  endMonthISO?: string;
  totalMonthsFromServer?: number;
  style: CalendarStyleValue;
};

function formatRangeLabel(range: DateRange | undefined) {
  if (!range?.from && !range?.to) return "Select Dates";
  if (range?.from && !range.to) return format(range.from, "dd/MM/yyyy");
  return `${format(range.from!, "dd/MM/yyyy")} - ${format(range.to!, "dd/MM/yyyy")}`;
}

export default function CalendarShell({
  availability,
  firstAvailableDate,
  startMonthISO,
  endMonthISO,
  totalMonthsFromServer,
  style,
}: Props) {
  const { range, getDisabledDays, checkoutDates, handleRangeSelect } =
    useCalendarRangeSelection(availability);

  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const { formStyling } = style;
  const label = formatRangeLabel(range);
  const canSubmit = Boolean(range?.from && range?.to);
  const hasRange = Boolean(range?.from || range?.to);

  if (isMobile) {
    return (
      <div className={formStyling.wrapper}>
        <div className={formStyling.mobileWrapper}>
          <div className={formStyling.mobileBar}>
            <div className={formStyling.mobileBarInner}>
              <DateSelectionControls
                label={label}
                canSubmit={canSubmit}
                onToggle={() => setIsOpen((prev) => !prev)}
                onSubmit={() => setIsOpen(false)}
                formStyling={formStyling}
                hasRange={hasRange}
                isMobile={isMobile}
                isOpen={isOpen}
              />
            </div>
          </div>
        </div>

        <MobileSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Choose Period of Stay"
          formStyling={formStyling}
          footer={
            <DateSelectionControls
              label={label}
              canSubmit={canSubmit}
              onToggle={() => {}}
              onSubmit={() => setIsOpen(false)}
              formStyling={formStyling}
              hasRange={hasRange}
              isMobile={isMobile}
              isOpen={isOpen}
            />
          }
        >
          <DateRangeCalendar
            availability={availability}
            firstAvailableDate={firstAvailableDate}
            startMonthISO={startMonthISO}
            endMonthISO={endMonthISO}
            totalMonthsFromServer={totalMonthsFromServer}
            style={style}
            range={range}
            onRangeChange={handleRangeSelect}
            getDisabledDays={getDisabledDays}
            checkoutDates={checkoutDates}
            isOpen={isOpen}
          />
        </MobileSheet>
      </div>
    );
  }

  return (
    <div className={formStyling.wrapper}>
      <DateSelectionControls
        label={label}
        canSubmit={canSubmit}
        onToggle={() => setIsOpen((prev) => !prev)}
        onSubmit={() => setIsOpen(false)}
        formStyling={formStyling}
        hasRange={hasRange}
        isMobile={isMobile}
        isOpen={isOpen}
      />

      {isOpen ? (
        <>
          <div className={formStyling.overlay} aria-hidden onMouseDown={() => setIsOpen(false)} />
          <div className={`${formStyling.popover}`}>
            <DateRangeCalendar
              availability={availability}
              firstAvailableDate={firstAvailableDate}
              startMonthISO={startMonthISO}
              endMonthISO={endMonthISO}
              totalMonthsFromServer={totalMonthsFromServer}
              style={style}
              range={range}
              onRangeChange={handleRangeSelect}
              getDisabledDays={getDisabledDays}
              checkoutDates={checkoutDates}
              isOpen={isOpen}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
