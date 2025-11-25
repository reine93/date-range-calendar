"use client";

import React from "react";
import classNames from "classnames";
import type { FormStyling } from "../style-config/styling-types";

type Props = {
  className?: string;
  filledClassName?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  hasRange: boolean;
  formStyling: FormStyling;
};

export function DateInputField({
  className,
  filledClassName,
  icon,
  children,
  onClick,
  onKeyDown,
  hasRange,
  formStyling,
}: Props) {
  const merged = classNames(className, hasRange ? filledClassName : "");

  return (
    <div role="button" tabIndex={0} className={merged} onClick={onClick} onKeyDown={onKeyDown}>
      <div className={formStyling.inputRow}>
        {icon}
        <div className={formStyling.inputContentRow}>{children}</div>
      </div>
    </div>
  );
}
