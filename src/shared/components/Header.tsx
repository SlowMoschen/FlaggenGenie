import React, { useEffect, useRef, useState } from "react";
import dots from "../../assets/icons/three-dots.svg";
import { arrow } from "../../assets";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  dotMenu?: React.ReactNode;
  redirectHome?: boolean;
}

export default function Header({ title, dotMenu, redirectHome }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const redirect = useNavigate();

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
    <>
      <header className="h-16 w-full bg-slate-300 flex justify-center items-center">
        {redirectHome && (
          <button
            onClick={() => redirect("/")}
            className="absolute left-4 hover:bg-slate-400 p-2 rounded-md"
          >
            <img src={arrow} alt="home" className="h-6 w-6" />
          </button>
        )}
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {dotMenu && (
          <>
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="absolute right-4 hover:bg-slate-400 p-2 rounded-md"
            >
              <img src={dots} alt="menu" className="h-6 w-6" />
            </button>
            <div ref={menuRef}>{isMenuOpen && dotMenu}</div>
          </>
        )}
      </header>
    </>
  );
}
