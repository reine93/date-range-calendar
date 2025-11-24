import { getDefaultClassNames, ClassNames } from "react-day-picker";
import type {
  CalendarStyleValue,
  LayoutStyleClasses,
  DayButtonStyling,
  FormStyling,
} from "./styling-types";

export function getCalendarStyleConfig(): CalendarStyleValue {
  const defaults = getDefaultClassNames();
  console.log(defaults);

  const layoutStyling: LayoutStyleClasses = {
    page: "flex min-h-screen justify-center bg-gradient-to-b from-white via-slate-50 to-slate-200 py-10 px-4",
    errorText: "text-red-600",
  };

  const formStyling: FormStyling = {
    wrapper: "relative flex flex-col items-center gap-4 w-full",
    controlsRow: "flex items-center justify-center gap-3 w-full",
    trigger:
      "flex items-center gap-3 text-left transition-all duration-200 w-full min-w-[18rem] max-w-[28rem] flex-shrink-0 relative",
    label: "text-sm font-semibold text-[#6f6d77] transition-all duration-200 leading-none",
    subValue: "text-sm text-[#6f6d77] leading-tight",
    value: "text-base font-light text-[#48455499] transition-all duration-200",
    input:
      "flex items-center justify-between rounded-full border border-transparent bg-white pl-10 pr-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-200 min-h-[60px]",
    inputFilled: "w-full sm:w-[24rem]",
    inputIcon: "text-[18px] leading-none text-[#484554]/40",
    inputCaret: "text-[#8b8995]",
    inputButton: "absolute right-2 top-1/2 -translate-y-1/2 flex items-center",
    textRow: "flex flex-1 items-center justify-start gap-2",
    textColumn: "flex flex-col justify-center gap-0.5",
    popover: "relative z-20 mt-3 w-full max-w-4xl flex justify-center",
    overlay: "fixed inset-0 z-10 bg-black/10",
    submit:
      "rounded-full bg-[#0050FF] text-white text-sm font-semibold px-6 py-3 transition-colors duration-150",
    submitHover: "hover:bg-[#0050FFCC]",
    submitDisabled:
      "rounded-full bg-[#48455433] text-gray-600 text-sm font-semibold px-6 py-3 cursor-not-allowed",
  };

  const dayPickerContainer =
    "p-4 bg-white rounded-[12px] shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-transparent overflow-hidden w-full max-w-4xl";
  const dayPickerMonths = "flex flex-col sm:flex-row sm:gap-6";
  const checkoutModifier =
    "relative !bg-transparent rounded-none [border-radius:0] before:content-[''] before:absolute before:inset-0 before:bg-[rgba(72,69,84,0.05)] before:[clip-path:polygon(0_0,100%_100%,100%_0)] before:-z-10 z-10";
  const mobileDayPickerRoot =
    "max-h-[80vh] overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";
  const mobileDayPickerMonths = "";
  const desktopDayPickerWrapper = "hidden sm:block";
  const mobileDayPickerWrapper = "sm:hidden";

  // Force square edges for selected range pills (DayPicker defaults round them).
  const rangeBase = "bg-[#0050FF]/40 text-[#2f2d32]";
  const dayPickerStyling: ClassNames = {
    ...defaults,
    root: `${defaults.root} ${dayPickerContainer}`,
    chevron: `${defaults.chevron} !fill-[#48455499]`,
    months: `${defaults.months} ${dayPickerMonths}`,
    selected: `${rangeBase}`,
    range_start: `${rangeBase}`,
    range_middle: `${rangeBase}`,
    range_end: `${rangeBase} !bg-transparent text-[#2f2d32] relative after:content-[''] after:absolute after:inset-0 after:bg-[#0050FF]/40 after:[clip-path:polygon(0_100%,100%_100%,0_0)] after:-z-10 z-10`,
    disabled: `${defaults.disabled ?? ""} bg-[rgba(72,69,84,0.05)] rounded-none [border-radius:0]`,
  };

  const modifierStyling: Record<string, string> = {
    checkout: checkoutModifier,
  };

  const dayButtonStyling: DayButtonStyling = {
    dayButtonStyle:
      "flex flex-col items-center gap-1 py-2 hover:!bg-[#0050FF1A] hover:!text-slate-900 hover:!rounded-none transition focus-visible:!ring focus-visible:!ring-slate-300 focus-visible:!ring-offset-1",
    dayPriceStyle: "text-[10px] leading-tight text-slate-500",
  };

  return {
    dayButtonStyling,
    layoutStyling,
    formStyling,
    dayPickerStyling,
    mobileDayPickerRoot,
    mobileDayPickerMonths,
    desktopDayPickerWrapper,
    mobileDayPickerWrapper,
    modifierStyling,
  };
}
