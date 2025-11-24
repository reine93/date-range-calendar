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
  subValue: string;
  input: string;
  inputFilled: string;
  inputButton: string;
  inputIcon: string;
  inputCaret: string;
  textRow: string;
  textColumn: string;
  popover: string;
  overlay: string;
  submit: string;
  submitHover: string;
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
  mobileDayPickerRoot: string;
  mobileDayPickerMonths: string;
  desktopDayPickerWrapper: string;
  mobileDayPickerWrapper: string;
  modifierStyling: Record<string, string>;
};
