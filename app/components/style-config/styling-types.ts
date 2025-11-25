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
  inputMobileOpen: string;
  inputFilled: string;
  inputButton: string;
  inputIcon: string;
  inputCaret: string;
  inputCaretIcon: string;
  inputRow: string;
  inputContentRow: string;
  textRow: string;
  textColumn: string;
  popover: string;
  overlay: string;
  submit: string;
  submitHover: string;
  submitDisabled: string;
  submitIcon: string;
  mobileWrapper: string;
  mobileBar: string;
  mobileBarInner: string;
  mobileSheetOverlay: string;
  mobileSheet: string;
  mobileSheetHeader: string;
  mobileHandle: string;
  mobileSheetTitle: string;
  mobileSheetClose: string;
  mobileSheetBody: string;
  mobileSheetFadeTop: string;
  mobileSheetFadeBottom: string;
  mobileSheetFooter: string;
  mobileSheetFooterInner: string;
  mobileSheetBodyInner: string;
  mobileSheetMask: string;
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
