"use client";

import { DayButton, type DayButtonProps } from "react-day-picker";
import { format } from "date-fns";
import { useCalendarStyleConfig } from "./style-config/StyleContext";

type DayPrice = { price: number; currency?: string | null };
type PriceLookup = Map<string, DayPrice>;

function formatPrice(priceInfo: DayPrice) {
  if (priceInfo.currency) {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: priceInfo.currency,
      maximumFractionDigits: 0,
    }).format(priceInfo.price);
  }
  return `$${priceInfo.price}`; // fallback if no currency
}

export function makePriceDayButton(prices: PriceLookup) {
  return function DayButtonWithPrice(props: DayButtonProps) {
    const {
      calendar: { dayButton, dayPrice },
    } = useCalendarStyleConfig();
    const date = format(props.day.date, "yyyy-MM-dd");
    const priceInfo = prices.get(date);
    const hasPrice = priceInfo && priceInfo.price != null;

    return (
      <DayButton {...props} className={`${props.className ?? ""} ${dayButton}`}>
        <span className="leading-none">{props.children}</span>
        {hasPrice ? <span className={dayPrice}>{formatPrice(priceInfo!)}</span> : null}
      </DayButton>
    );
  };
}
