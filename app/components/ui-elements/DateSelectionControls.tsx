"use client";

import { MdCalendarToday } from "react-icons/md";
import { IoArrowForwardOutline } from "react-icons/io5";
import type { FormStyling } from "../style-config/styling-types";
import { DateInputField } from "./DateInputField";
import { PrimaryButton } from "./PrimaryButton";

type Props = {
  label: string;
  canSubmit: boolean;
  onToggle: () => void;
  onSubmit: () => void;
  formStyling: FormStyling;
  hasRange: boolean;
  isMobile: boolean;
  isOpen: boolean;
};

export function DateSelectionControls({
  label,
  canSubmit,
  onToggle,
  onSubmit,
  formStyling,
  hasRange,
  isMobile,
  isOpen,
}: Props) {
  const inputClasses = [
    formStyling.trigger,
    formStyling.input,
    isMobile && isOpen ? formStyling.inputMobileOpen : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={formStyling.controlsRow}>
      <DateInputField
        className={inputClasses}
        filledClassName={formStyling.inputFilled}
        hasRange={hasRange}
        formStyling={formStyling}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.currentTarget !== e.target) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        icon={<MdCalendarToday className={formStyling.inputIcon} />}
      >
        <div className={formStyling.textRow}>
          <div className={formStyling.textColumn}>
            {hasRange ? (
              <>
                <span className={formStyling.label}>Select Dates</span>
                <span className={formStyling.subValue}>{label}</span>
              </>
            ) : (
              <span className={formStyling.value}>{label}</span>
            )}
          </div>
          <span className={formStyling.inputCaret}>
            <svg
              className={`${formStyling.inputCaretIcon} ${isMobile ? "rotate-180" : ""}`}
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
            <span className="hidden md:inline">Confirm</span>
            <IoArrowForwardOutline className={formStyling.submitIcon} />
          </PrimaryButton>
        </div>
      </DateInputField>
    </div>
  );
}
