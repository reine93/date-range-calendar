export type CalendarDayStatus = "available" | "unavailable" | "checkout";

export type CalendarDay = {
  date: string;                 // ISO string YYYY-MM-DD
  status: CalendarDayStatus;
  price?: number;               
  currency?: string | null;     
};

export type CalendarApiResponse = {
  days: CalendarDay[];
  firstAvailableDate?: string;
};
