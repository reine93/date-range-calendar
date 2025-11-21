"use client";

import { useEffect, useRef } from "react";
import type { DateRange } from "react-day-picker";

type Args = {
  isOpen: boolean;
  range: DateRange | undefined;
  initialMonth?: Date;
  startMonth?: Date;
};

/**
 * Keeps the mobile DayPicker scrolled to the relevant month when the popover opens,
 * without resetting the view after a selection is cleared.
 */
export function useMobileMonthScroll<T extends HTMLElement>({
  isOpen,
  range,
  initialMonth,
  startMonth,
}: Args) {
  const containerRef = useRef<T | null>(null);
  const wasOpenRef = useRef<boolean>(false);
  const prevRangeFromRef = useRef<Date | null>(range?.from ?? null);

  useEffect(() => {
    const wasOpen = wasOpenRef.current;
    wasOpenRef.current = isOpen;
    const prevRangeFrom = prevRangeFromRef.current;
    prevRangeFromRef.current = range?.from ?? null;

    if (!isOpen || !containerRef.current) return;

    const rangeCleared = wasOpen && prevRangeFrom && !range?.from && !range?.to;
    if (rangeCleared) return;

    // Target month: selected start when present; otherwise first available on initial open.
    const targetMonth = range?.from ?? (!wasOpen ? (initialMonth ?? startMonth) : undefined);
    if (!targetMonth) return;

    const targetKey = targetMonth.toISOString().slice(0, 7);
    if (prevRangeFrom && prevRangeFrom.toISOString().slice(0, 7) === targetKey && wasOpen) {
      return; // already at this month; avoid redundant scroll
    }

    const label = new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric" }).format(
      targetMonth,
    );

    // Find the caption matching the target month and scroll it into view.
    const captions = containerRef.current.querySelectorAll(".rdp-month_caption .rdp-caption_label");
    const match = Array.from(captions).find(
      (node) => node instanceof HTMLElement && node.textContent?.trim() === label,
    ) as HTMLElement | undefined;

    const monthEl = match?.closest(".rdp-month") as HTMLElement | null;
    monthEl?.scrollIntoView({ block: "start", behavior: wasOpen ? "smooth" : "auto" });
  }, [isOpen, range?.from, range?.to, initialMonth, startMonth]);

  return containerRef;
}
