import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../Context";
import dots from "../assets/icons/three-dots.svg";
import Dialog from "./Dialog";

interface DotMenuProps {
  isMenuOpen: boolean;
  onClose: () => void;
}

const HelpDialog = () => (
  <div className="py-5">
    <div>
      <h3 className="text-2xl font-semibold text-center">Warum Karteikarten ?</h3>
      <p className="mt-5">
        Karteikarten sind ein effektives Mittel, um Wissen zu lernen und zu wiederholen. Die
        Karteikarten ermöglichen es dir einfach die Flaggen der Welt zu lernen.
      </p>
    </div>
    <div>
      <h3 className="text-2xl font-semibold text-center mt-5">Wie funktioniert es ?</h3>
      <p className="mt-5">
      <span className="underline">Klicke auf die Karteikarte</span>, um die Antwort anzuzeigen.
      </p>
      <p className="mt-5">
        Klicke auf das <span className="font-bold">"X"</span> solltest du die Karteikarte nicht kennen. Klicke auf das <span className="font-bold">"Häkchen"</span>, wenn du die Karteikarte kennst.
      </p>
      <p className="mt-5">
        Richtige Karteikarten werden in das <span className="underline">nächste</span> Deck verschoben und falsche in das <span className="underline">vorherige</span> Deck.
      </p>
      <p className="mt-5">
        Du kannst jederzeit auf <span className="font-bold">"Zurücksetzen"</span> klicken, um alle Daten zurückzusetzen.
      </p>
    </div>
  </div>
);

const DotMenu = ({ isMenuOpen, onClose }: DotMenuProps) => {
  const { resetUserState } = useAppContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);

  const handleReset = () => {
    if (window.confirm("Bist du sicher, dass du alle Daten zurücksetzen möchtest?")) {
      resetUserState();
      onClose();
    }
  };

  const handleHelp = () => {
    setDialogContent(<HelpDialog />);
    setIsDialogOpen(true);
    onClose();
  };

  return (
    <div
      className={`dot-menu flex flex-col absolute z-50 top-16 right-3 bg-slate-300 p-2 rounded ${
        isMenuOpen ? "" : "hidden"
      }`}
    >
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        {dialogContent}
      </Dialog>
      <button onClick={handleReset} className="hover:bg-slate-400 p-2 rounded-md">
        Zurücksetzen
      </button>
      <button onClick={handleHelp} className="hover:bg-slate-400 p-2 rounded-md">
        Hilfe
      </button>
    </div>
  );
};

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
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
    <>
      <header className="h-16 w-full bg-slate-300 flex justify-center items-center">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
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
    </>
  );
}
