"use client";

import type { ReactNode } from "react";
import { IoCloseOutline } from "react-icons/io5";
import type { FormStyling } from "../style-config/styling-types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  formStyling: FormStyling;
  children: ReactNode;
  footer: ReactNode;
};

export function MobileSheet({ isOpen, onClose, title, formStyling, children, footer }: Props) {
  if (!isOpen) return null;

  return (
    <>
      <div className={formStyling.mobileSheetOverlay} aria-hidden onMouseDown={onClose} />
      <div className={formStyling.mobileSheet}>
        <div className={formStyling.mobileSheetHeader}>
          <div className={formStyling.mobileHandle} />
          <div className="flex items-center justify-between">
            <span className={formStyling.mobileSheetTitle}>{title}</span>
            <button type="button" className={formStyling.mobileSheetClose} onClick={onClose}>
              <IoCloseOutline size={24} />
            </button>
          </div>
        </div>

        <div className={formStyling.mobileSheetBody}>
          <div className="relative">
            <div className={formStyling.mobileSheetFadeTop} />
            <div className={formStyling.mobileSheetFadeBottom} />
            <div className={`${formStyling.mobileSheetBodyInner} ${formStyling.mobileSheetMask}`}>
              {children}
            </div>
          </div>
        </div>

        <div className={formStyling.mobileSheetFooter}>
          <div className={formStyling.mobileSheetFooterInner}>{footer}</div>
        </div>
      </div>
    </>
  );
}
