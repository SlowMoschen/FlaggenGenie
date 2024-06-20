import { createPortal } from "react-dom";
import { closeCross } from "../../assets";
import { useEffect, useRef } from "react";
import Button from "./Button";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Dialog({ isOpen, onClose, children }: DialogProps) {
  const contentRef = useRef<HTMLDivElement>(null);

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
      <div className="dialog fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-2">
        <div
          className="bg-white p-4 rounded-lg relative w-full max-w-sm max-h-[80%] overflow-y-auto"
          ref={contentRef}
        >
          <Button
            onClick={onClose}
            className="absolute top-2 right-2 h-8 w-8 flex items-center justify-center"
            variant="secondary"
            buttonSize="icon"
          >
            <img src={closeCross} alt="close" className="h-6 w-6" />
          </Button>
          {children}
          <Button onClick={onClose} className="mt-4" variant="primary" buttonSize="medium">
            Schließen
          </Button>
        </div>
      </div>
    ),
    window.document.body
  );
}
