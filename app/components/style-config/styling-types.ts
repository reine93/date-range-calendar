import type { ClassNames } from "react-day-picker";

export type DayButtonStyling = {
  dayButtonStyle: string;
  dayPriceStyle: string;
};

export type LayoutStyleClasses = {
  page: string;
  errorText: string;
};

export type CalendarStyleValue = {
  dayButtonStyling: DayButtonStyling;
  layoutStyling: LayoutStyleClasses;
  dayPickerStyling: ClassNames;
  modifierStyling: Record<string, string>;
};
