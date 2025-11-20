import type { ClassNames } from "react-day-picker";

export type DayButtonStyling = {
  dayButtonStyle: string;
  dayPriceStyle: string;
};

export type FormStyling = {
  wrapper: string;
  controlsRow: string;
  trigger: string;
  label: string;
  value: string;
  input: string;
  popover: string;
  overlay: string;
  submit: string;
  submitDisabled: string;
};

export type LayoutStyleClasses = {
  page: string;
  errorText: string;
};

export type CalendarStyleValue = {
  dayButtonStyling: DayButtonStyling;
  layoutStyling: LayoutStyleClasses;
  formStyling: FormStyling;
  dayPickerStyling: ClassNames;
  modifierStyling: Record<string, string>;
};
