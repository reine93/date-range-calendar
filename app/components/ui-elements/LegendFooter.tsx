"use client";

import React from "react";
import type { LegendStyling } from "../style-config/styling-types";

type Props = {
  legendStyling: LegendStyling;
};

export function LegendFooter({ legendStyling }: Props) {
  return (
    <div className={legendStyling.container}>
      <span className={legendStyling.item}>
        <span className={`${legendStyling.swatch} ${legendStyling.swatchAvailable}`} />
        <span className={legendStyling.label}>Available</span>
      </span>
      <span className={legendStyling.item}>
        <span className={`${legendStyling.swatch} ${legendStyling.swatchCheckin}`} />
        <span className={legendStyling.label}>Check-in</span>
      </span>
      <span className={legendStyling.item}>
        <span className={`${legendStyling.swatch} ${legendStyling.swatchCheckout}`} />
        <span className={legendStyling.label}>Check-out</span>
      </span>
      <span className={legendStyling.item}>
        <span className={`${legendStyling.swatch} ${legendStyling.swatchCheckoutOnly}`} />
        <span className={legendStyling.label}>Check-out only</span>
      </span>
      <span className={legendStyling.item}>
        <span className={`${legendStyling.swatch} ${legendStyling.swatchUnavailable}`} />
        <span className={legendStyling.label}>Unavailable</span>
      </span>
    </div>
  );
}
