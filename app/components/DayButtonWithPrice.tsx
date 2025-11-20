import { DayButton, type DayButtonProps } from "react-day-picker";
import { format } from "date-fns";
import type { DayButtonStyling } from "./style-config/styling-types";

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

export function makePriceDayButton(prices: PriceLookup, dayButtonStyling: DayButtonStyling) {
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
