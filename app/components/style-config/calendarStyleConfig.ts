import { getDefaultClassNames, ClassNames } from "react-day-picker";
import type {
  CalendarStyleValue,
  LayoutStyleClasses,
  DayButtonStyling,
  FormStyling,
} from "./styling-types";

export function getCalendarStyleConfig(): CalendarStyleValue {
  const defaults = getDefaultClassNames();

  const layoutStyling: LayoutStyleClasses = {
    page: "flex min-h-screen items-center justify-center bg-slate-100",
    errorText: "text-red-600",
  };

  const formStyling: FormStyling = {
    wrapper: "relative flex w-full max-w-4xl flex-col gap-3",
    controlsRow: "flex items-end gap-3",
    trigger: "flex flex-col gap-1 w-72 text-left",
    label: "text-xs uppercase tracking-wide text-slate-500",
    value: "text-sm text-slate-900",
    input:
      "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm hover:border-slate-400 focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-200 transition",
    popover: "absolute z-20 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl p-3",
    overlay: "fixed inset-0 z-10 bg-black/10",
    submit:
      "px-4 py-2 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed",
    submitDisabled:
      "px-4 py-2 rounded-lg bg-slate-300 text-slate-500 font-medium cursor-not-allowed",
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
    formStyling,
    dayPickerStyling,
    modifierStyling,
  };
}
