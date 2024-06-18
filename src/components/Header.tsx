import { useEffect, useRef, useState } from "react";
import dots from "../assets/icons/three-dots.svg";
import { useAppContext } from "../Context";

interface DotMenuProps {
  isMenuOpen: boolean;
  onClose: () => void;
}

const DotMenu = ({ isMenuOpen, onClose }: DotMenuProps) => {
  const { resetUserState } = useAppContext();

  const handleReset = () => {
    if (window.confirm("Bist du sicher, dass du alle Daten zurücksetzen möchtest?")) {
      resetUserState();
      onClose();
    }
  };

  return (
    <div
      className={`dot-menu flex flex-col absolute z-50 top-16 right-3 bg-slate-300 p-2 rounded ${
        isMenuOpen ? "" : "hidden"
      }`}
    >
      <button onClick={handleReset} className="hover:bg-slate-400 p-2 rounded-md">
        Zurücksetzen
      </button>
    </div>
  );
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 w-full bg-slate-300 flex justify-center items-center">
      <h1 className="text-2xl font-bold text-white">Flaggen Karteikarten</h1>
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="absolute right-4 hover:bg-slate-400 p-2 rounded-md"
      >
        <img src={dots} alt="menu" className="h-6 w-6" />
      </button>
      <div ref={menuRef}>
        <DotMenu isMenuOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </header>
  );
}
