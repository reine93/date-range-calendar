import { getDefaultClassNames, ClassNames } from "react-day-picker";
import type { CalendarStyleValue, LayoutStyleClasses, DayButtonStyling } from "./StyleContext";

export function getCalendarStyleConfig(): CalendarStyleValue {
  const defaults = getDefaultClassNames();

  const layoutStyling: LayoutStyleClasses = {
    page: "flex min-h-screen items-center justify-center bg-slate-100",
    errorText: "text-red-600",
  };

  const dayPickerContainer =
    "p-4 bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden";
  const dayPickerMonths = "w-xs md:w-full";
  const checkoutModifier = "bg-yellow-200 text-yellow-900 rounded-full";

  const dayPickerStyling: ClassNames = {
    ...defaults,
    root: `${defaults.root} ${dayPickerContainer}`,
    months: `${defaults.months} ${dayPickerMonths}`,
  };

  const modifierStyling: Record<string, string> = {
    checkout: checkoutModifier,
  };

  const dayButtonStyling: DayButtonStyling = {
    dayButtonStyle:
      "flex flex-col items-center gap-1 py-2 hover:!bg-slate-100 hover:!text-slate-900 transition focus-visible:!ring focus-visible:!ring-slate-300 focus-visible:!ring-offset-1",
    dayPriceStyle: "text-[10px] leading-tight text-slate-500",
  };

  return {
    dayButtonStyling,
    layoutStyling,
    dayPickerStyling,
    modifierStyling,
  };
}
