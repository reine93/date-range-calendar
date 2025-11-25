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
    page: "flex min-h-screen justify-center bg-gradient-to-b from-white via-slate-50 to-slate-200 py-10 px-4",
    errorText: "text-red-600",
  };

  const formStyling: FormStyling = {
    wrapper: "relative flex flex-col items-center gap-4 w-full md:mt-0",
    controlsRow: "flex items-center justify-center w-full",
    trigger:
      "flex items-center gap-3 text-left transition-all duration-200 w-full min-w-[16rem] max-w-[20rem] md:min-w-[18rem] md:max-w-[24rem] flex-shrink-0 relative",
    label: "text-sm font-semibold text-[#6f6d77] transition-all duration-200 leading-none",
    subValue: "text-sm text-[#6f6d77] leading-tight",
    value: "text-base font-light text-[#48455499] transition-all duration-200",
    input:
      "flex items-center justify-between rounded-[999px] border border-transparent bg-white md:pl-10 pr-24 md:pr-28 py-2.5 shadow-[0_8px_24px_#0000001e] transition-all duration-200 min-h-[56px]",
    inputMobileOpen: "shadow-none bg-white border-transparent rounded-[20px]",
    inputFilled: "w-full",
    inputIcon: "text-[18px] leading-none text-[#484554]/40",
    inputCaret: "text-[#8b8995]",
    inputCaretIcon: "w-5 h-5",
    inputButton: "absolute right-3 top-1/2 -translate-y-1/2 flex items-center",
    inputRow: "flex w-full items-center gap-2 justify-center md:justify-start",
    inputContentRow: "flex items-center gap-1.5 justify-center md:justify-start",
    textRow: "flex items-center gap-1.5 justify-center md:justify-start",
    textColumn: "flex flex-col items-start justify-center gap-0.5 min-h-[2.7rem] min-w-[3rem]",
    popover: "relative z-20 mt-3 w-full max-w-4xl flex justify-center",
    overlay: "fixed inset-0 z-10 bg-black/10",
    submit:
      "rounded-full bg-[#0050FF] text-white text-sm font-semibold px-3 py-3 md:px-6 md:py-3 transition-colors duration-150 min-w-12 min-h-12",
    submitHover: "hover:bg-[#0050FFCC] active:bg-[#0050FFCC] focus-visible:bg-[#0050FFCC]",
    submitDisabled:
      "rounded-full bg-[#48455433] text-gray-600 text-sm font-semibold px-3 py-3 md:px-6 md:py-3 cursor-not-allowed min-w-12 min-h-12",
    submitIcon: "text-white text-xl md:hidden",
    mobileWrapper: "fixed inset-x-0 bottom-4 px-4",
    mobileBar: "w-full flex justify-center",
    mobileBarInner: "w-full max-w-md",
    mobileSheetOverlay: "fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40",
    mobileSheet: "fixed inset-0 z-50 flex flex-col bg-white overflow-hidden",
    mobileSheetHeader:
      "px-4 pt-3 pb-2 border-b border-slate-200 flex flex-col gap-2 bg-white sticky top-0 z-10",
    mobileHandle: "mx-auto mt-1 h-1.5 w-12 rounded-full bg-slate-300",
    mobileSheetTitle: "text-lg font-semibold text-[#2f2d32]",
    mobileSheetClose: "text-[#484554] p-2 -mr-2",
    mobileSheetBody:
      "relative flex-1 overflow-y-auto px-2 pb-24 pt-2 bg-white [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
    mobileSheetBodyInner: "w-full max-w-[26rem] md:max-w-[28rem] mx-auto px-3 md:px-4 relative",
    mobileSheetMask:
      "[mask-image:linear-gradient(to_bottom,transparent,black_1.5rem,black_calc(100%-9.5rem),transparent)]",
    mobileSheetFadeTop:
      "pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-white to-transparent",
    mobileSheetFadeBottom:
      "pointer-events-none absolute inset-x-0 bottom-0 h-[20rem] bg-gradient-to-t from-white to-transparent",
    mobileSheetFooter: "sticky bottom-0 bg-white border-t border-slate-200 px-4 py-4",
    mobileSheetFooterInner: "w-full max-w-md mx-auto",
  };

  const dayPickerContainer =
    "p-4 bg-white rounded-none md:rounded-[12px] shadow-none md:shadow-[0_12px_40px_#0000001e] border border-transparent overflow-hidden w-full md:max-w-4xl";
  const dayPickerMonths =
    "relative flex flex-col gap-6 md:flex-row md:justify-center md:gap-10 md:[&>div]:px-6 md:after:absolute md:after:inset-y-4 md:after:left-1/2 md:after:w-px md:after:bg-[#48455433] md:after:-translate-x-1/2 [&>div:not(:last-child)]:border-b [&>div:not(:last-child)]:border-[#48455433] [&>div]:pb-6 md:[&>div:not(:last-child)]:border-0 md:[&>div]:pb-0";
  const checkoutModifier =
    "relative !bg-transparent rounded-none [border-radius:0] before:content-[''] before:absolute before:inset-0 before:bg-[#4845540D] before:[clip-path:polygon(0_0,100%_100%,100%_0)] before:-z-10 z-10";
  const mobileDayPickerRoot =
    "max-h-[80vh] overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";
  const mobileDayPickerMonths = "";
  const desktopDayPickerWrapper = "block";
  const mobileDayPickerWrapper = "block";

  const rangeBase = "bg-[#0050FF]/40 text-[#2f2d32]";
  const dayPickerStyling: ClassNames = {
    ...defaults,
    root: `${defaults.root} ${dayPickerContainer}`,
    chevron: `${defaults.chevron} !fill-[#48455499]`,
    months: `${defaults.months} ${dayPickerMonths}`,
    month_caption: `${defaults.month_caption ?? ""} flex justify-center text-center`,
    caption_label: `${defaults.caption_label ?? ""} uppercase text-[#0050FF] text-base font-medium leading-[0.8] text-center`,
    weekday: `${defaults.weekday ?? ""} uppercase tracking-wide last:text-[#0050FF]`,
    selected: `${rangeBase}`,
    range_start: `${rangeBase}`,
    range_middle: `${rangeBase}`,
    range_end: `${rangeBase} !bg-transparent text-[#2f2d32] relative after:content-[''] after:absolute after:inset-0 after:bg-[#0050FF]/40 after:[clip-path:polygon(0_100%,100%_100%,0_0)] after:-z-10 z-10`,
    disabled: `${defaults.disabled ?? ""} bg-[#4845540D] rounded-none [border-radius:0]`,
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
