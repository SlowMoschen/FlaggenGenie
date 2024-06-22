import { createPortal } from "react-dom";
import { closeCross } from "../../assets";
import { useEffect, useRef } from "react";
import Button from "./Button";
import { useTranslation } from "react-i18next";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Dialog({ isOpen, onClose, children }: DialogProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      event.stopPropagation();
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mouseup", handleClickOutside);

    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    (
      <div className="dialog fixed inset-0 z-[100] flex items-center justify-center bg-background-50 bg-opacity-30 p-2">
        <div
          className="bg-background-950 p-4 rounded-lg relative w-full max-w-sm min-h-[50%] max-h-[80%] overflow-y-auto border-8 border-primary-500"
          ref={contentRef}
        >
          <Button
            onClick={onClose}
            className="absolute top-2 right-2 h-8 w-8 flex items-center justify-center"
            variant="secondary"
            buttonSize="xsmall"
          >
            <img src={closeCross} alt="close" className="h-6 w-6" />
          </Button>
          {children}
          <Button onClick={onClose} className="mt-4" variant="primary" buttonSize="medium">
            {t("button.close")}
          </Button>
        </div>
      </div>
    ),
    window.document.body
  );
}
