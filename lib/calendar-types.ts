export type CalendarDayStatus = 'available' | 'unavailable';

export type CalendarDay = {
  date: string;
  status: CalendarDayStatus;
  price?: number;
};

export type CalendarApiResponse = {
  days: CalendarDay[];
};