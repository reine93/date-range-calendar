"use client";

import React from "react";
import classNames from "classnames";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  disabledClassName?: string;
  hoverClassName?: string;
};

export function PrimaryButton({
  className,
  disabledClassName,
  hoverClassName,
  disabled,
  children,
  ...rest
}: Props) {
  const merged = classNames(className, disabled ? disabledClassName : hoverClassName);

  return (
    <button type="button" className={merged} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
