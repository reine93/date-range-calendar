import type { CalendarDay } from '@/lib/calendar-types';

const day = (
  date: string,
  status: CalendarDay['status'],
  price?: number,
): CalendarDay => ({ date, status, price });


export const mockCalendarDays: CalendarDay[] = [
  // Available streak with prices
  day('2025-11-10', 'available', 80),
  day('2025-11-11', 'available', 80),
  day('2025-11-12', 'available', 85),
  day('2025-11-13', 'available', 90),

  // Fully unavailable block (e.g. hotel is full)
  day('2025-11-14', 'unavailable'),
  day('2025-11-15', 'unavailable'),

  // Another available streak with different prices
  day('2025-11-16', 'available', 100),
  day('2025-11-17', 'available', 100),
  day('2025-11-18', 'available', 110),

  // Single unavailable day inside an otherwise available period
  // Nice for testing “checkout date” behavior.
  day('2025-11-19', 'unavailable'),

  // Some more availability after the gap
  day('2025-11-20', 'available', 95),
  day('2025-11-21', 'available', 95),
  day('2025-11-22', 'available', 90),
];
