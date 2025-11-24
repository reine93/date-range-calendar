"use client";

import { useState } from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import type { AvailabilityDay } from "@/lib/calendar-types";
import type { CalendarStyleValue, FormStyling } from "./style-config/styling-types";
import { useCalendarRangeSelection } from "./hooks/useCalendarRangeSelection";
import DateRangeCalendar from "./DateRangeCalendar";
import { PrimaryButton } from "./ui-elements/PrimaryButton";
import { DateInputField } from "./ui-elements/DateInputField";
import { MdCalendarToday } from "react-icons/md";

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

function DateSelectionControls({
  label,
  canSubmit,
  onToggle,
  onSubmit,
  formStyling,
  hasRange,
}: {
  label: string;
  canSubmit: boolean;
  onToggle: () => void;
  onSubmit: () => void;
  formStyling: FormStyling;
  hasRange: boolean;
}) {
  return (
    <div className={formStyling.controlsRow}>
      <DateInputField
        className={`${formStyling.trigger} ${formStyling.input}`}
        filledClassName={formStyling.inputFilled}
        hasRange={hasRange}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        icon={<MdCalendarToday className={`${formStyling.inputIcon}`} />}
      >
        <div className={formStyling.textRow}>
          <div className={formStyling.textColumn}>
            {hasRange ? (
              <>
                <span className={formStyling.label}>Select Dates</span>
                <span className={`${formStyling.subValue}`}>{label}</span>
              </>
            ) : (
              <span className={`${formStyling.value}`}>{label}</span>
            )}
          </div>
          <span className={formStyling.inputCaret}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </div>
        <div className={formStyling.inputButton}>
          <PrimaryButton
            className={formStyling.submit}
            hoverClassName={formStyling.submitHover}
            disabledClassName={formStyling.submitDisabled}
            disabled={!canSubmit}
            onClick={(e) => {
              e.stopPropagation();
              onSubmit();
            }}
          >
            Confirm
          </PrimaryButton>
        </div>
      </DateInputField>
    </div>
  );
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

  const { formStyling } = style;
  const label = formatRangeLabel(range);
  const canSubmit = Boolean(range?.from && range?.to);
  const hasRange = Boolean(range?.from || range?.to);

  return (
    <div className={formStyling.wrapper}>
      <DateSelectionControls
        label={label}
        canSubmit={canSubmit}
        onToggle={() => setIsOpen((prev) => !prev)}
        onSubmit={() => setIsOpen(false)}
        formStyling={formStyling}
        hasRange={hasRange}
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
