"use client";

import React from "react";
import classNames from "classnames";

type Props = {
  className?: string;
  filledClassName?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  hasRange: boolean;
};

export function DateInputField({
  className,
  filledClassName,
  icon,
  children,
  onClick,
  onKeyDown,
  hasRange,
}: Props) {
  const merged = classNames(className, hasRange ? filledClassName : "");

  return (
    <div role="button" tabIndex={0} className={merged} onClick={onClick} onKeyDown={onKeyDown}>
      <div className="flex w-full items-center gap-3">
        {icon}
        <div className="flex flex-1 items-center gap-2">{children}</div>
      </div>
    </div>
  );
}
