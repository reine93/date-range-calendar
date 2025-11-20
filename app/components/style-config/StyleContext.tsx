"use client";

import { createContext, useContext } from "react";

export type CalendarStyleClasses = {
  container: string;
  months: string;
  dayButton: string;
  dayPrice: string;
  checkoutModifier: string;
};

export type LayoutStyleClasses = {
  page: string;
  errorText: string;
};

export type CalendarStyleConfig = {
  calendar: CalendarStyleClasses;
  layout: LayoutStyleClasses;
};

const CalendarStyleContext = createContext<CalendarStyleConfig | null>(null);

export function CalendarStyleProvider({
  value,
  children,
}: {
  value: CalendarStyleConfig;
  children: React.ReactNode;
}) {
  return <CalendarStyleContext.Provider value={value}>{children}</CalendarStyleContext.Provider>;
}

export function useCalendarStyleConfig(): CalendarStyleConfig {
  const ctx = useContext(CalendarStyleContext);
  if (!ctx) {
    throw new Error("CalendarStyleProvider is missing in the component tree.");
  }
  return ctx;
}
