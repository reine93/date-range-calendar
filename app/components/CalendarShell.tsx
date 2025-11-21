"use client";

import { useState } from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import type { AvailabilityDay } from "@/lib/calendar-types";
import type { CalendarStyleValue, FormStyling } from "./style-config/styling-types";
import { useCalendarRangeSelection } from "./hooks/useCalendarRangeSelection";
import DateRangeCalendar from "./DateRangeCalendar";

type Props = {
  availability: AvailabilityDay[];
  firstAvailableDate?: AvailabilityDay["date"];
  style: CalendarStyleValue;
};

function formatRangeLabel(range: DateRange | undefined) {
  if (!range?.from && !range?.to) return "Select dates";
  if (range?.from && !range.to) return format(range.from, "MMM d");
  return `${format(range.from!, "MMM d")} – ${format(range.to!, "MMM d")}`;
}

function DateSelectionControls({
  label,
  canSubmit,
  onToggle,
  onSubmit,
  formStyling,
}: {
  label: string;
  canSubmit: boolean;
  onToggle: () => void;
  onSubmit: () => void;
  formStyling: FormStyling;
}) {
  return (
    <div className={formStyling.controlsRow}>
      <button
        type="button"
        className={`${formStyling.trigger} ${formStyling.input}`}
        onClick={onToggle}
      >
        <span className={formStyling.label}>Dates</span>
        <span className={formStyling.value}>{label}</span>
      </button>
      <button
        type="button"
        className={canSubmit ? formStyling.submit : formStyling.submitDisabled}
        disabled={!canSubmit}
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default function CalendarShell({ availability, firstAvailableDate, style }: Props) {
  const { range, getDisabledDays, checkoutDates, handleRangeSelect } =
    useCalendarRangeSelection(availability);

  const [isOpen, setIsOpen] = useState(false);

  const { formStyling } = style;
  const label = formatRangeLabel(range);
  const canSubmit = Boolean(range?.from && range?.to);

  return (
    <div className={formStyling.wrapper}>
      <DateSelectionControls
        label={label}
        canSubmit={canSubmit}
        onToggle={() => setIsOpen((prev) => !prev)}
        onSubmit={() => setIsOpen(false)}
        formStyling={formStyling}
      />

      {isOpen ? (
        <>
          <div className={formStyling.overlay} aria-hidden onMouseDown={() => setIsOpen(false)} />
          <div className={`${formStyling.popover} z-20`}>
            <DateRangeCalendar
              availability={availability}
              firstAvailableDate={firstAvailableDate}
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
