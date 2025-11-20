export type AvailabilityStatus = "available" | "unavailable" | "checkout";

export type AvailabilityDay = {
  date: string; // ISO string YYYY-MM-DD
  status: AvailabilityStatus;
  price?: number;
  currency?: string | null;
};

export type CalendarApiResponse = {
  days: AvailabilityDay[];
  firstAvailableDate?: string;
};
