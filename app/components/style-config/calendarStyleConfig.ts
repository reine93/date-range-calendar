import { getDefaultClassNames, ClassNames } from "react-day-picker";
import type { CalendarStyleClasses, CalendarStyleConfig, LayoutStyleClasses } from "./StyleContext";

const calendarClasses: CalendarStyleClasses = {
  container: "p-4 bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden",
  months: "w-xs md:w-full",
  dayButton:
    "flex flex-col items-center gap-1 py-2 hover:!bg-slate-100 hover:!text-slate-900 transition focus-visible:!ring focus-visible:!ring-slate-300 focus-visible:!ring-offset-1",
  dayPrice: "text-[10px] leading-tight text-slate-500",
  checkoutModifier: "bg-yellow-200 text-yellow-900 rounded-full",
};

const layoutClasses: LayoutStyleClasses = {
  page: "flex min-h-screen items-center justify-center bg-slate-100",
  errorText: "text-red-600",
};

export function buildCalendarStyleConfig(): CalendarStyleConfig {
  return {
    calendar: calendarClasses,
    layout: layoutClasses,
  };
}

export function getCalendarStyleConfig(): {
  dayPickerClassNames: ClassNames;
  styleConfig: CalendarStyleConfig;
  modifierClasses: Record<string, string>;
} {
  const defaults = getDefaultClassNames();
  const styleConfig = buildCalendarStyleConfig();
  const { calendar } = styleConfig;

  const dayPickerClassNames: ClassNames = {
    ...defaults,
    root: `${defaults.root} ${calendar.container}`,
    months: `${defaults.months} ${calendar.months}`,
    day_button: `${defaults.day_button ?? ""} ${calendar.dayButton}`,
  };

  const modifierClasses: Record<string, string> = {
    checkout: calendar.checkoutModifier,
  };

  return {
    styleConfig,
    dayPickerClassNames,
    modifierClasses,
  };
}
