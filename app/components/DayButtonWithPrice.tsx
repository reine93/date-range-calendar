import { DayButton, type DayButtonProps } from "react-day-picker";
import { format } from "date-fns";
import type { DayButtonStyling } from "./style-config/styling-types";

type DayPrice = { price: number; currency?: string | null };
type PriceLookup = Map<string, DayPrice>;

function getCurrencySymbol(currency: string) {
  const parts = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
    currencyDisplay: "narrowSymbol",
  }).formatToParts(0);

  return parts.find((part) => part.type === "currency")?.value ?? currency;
}

function formatPrice(priceInfo: DayPrice) {
  const formattedNumber = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 0,
  }).format(priceInfo.price);

  if (priceInfo.currency) {
    const symbol = getCurrencySymbol(priceInfo.currency);
    return `${formattedNumber} ${symbol}`;
  }

  return `${formattedNumber} $`; // fallback if no currency
}

export function makeDayButtonWithPrice(prices: PriceLookup, dayButtonStyling: DayButtonStyling) {
  return function DayButtonWithPrice(props: DayButtonProps) {
    const { dayButtonStyle, dayPriceStyle } = dayButtonStyling;
    const date = format(props.day.date, "yyyy-MM-dd");
    const priceInfo = prices.get(date);
    const hasPrice = priceInfo && priceInfo.price != null;

    return (
      <DayButton {...props} className={`${props.className ?? ""} ${dayButtonStyle}`}>
        <span className="leading-none">{props.children}</span>
        {hasPrice ? <span className={dayPriceStyle}>{formatPrice(priceInfo!)}</span> : null}
      </DayButton>
    );
  };
}
