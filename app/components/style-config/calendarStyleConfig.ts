import { getDefaultClassNames, ClassNames } from "react-day-picker";

export function getCalendarStyleConfig(): ClassNames {
  const defaults = getDefaultClassNames();
  console.log('debug class names', defaults)

  return {
    ...defaults,
    root: `${defaults.root} p-4 bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden`,
    months: `${defaults.months} w-xs md:w-full `
  };
}