import { createContext, useContext, useEffect, useState } from "react";
import { Decks, IUserState } from "./types.ts";

interface IAppContext {
  name: string;
  decks: typeof Decks.prototype;
  setName: (name: string) => void;
  saveUserState: () => void;
  resetUserState: () => void;
}

const USER_STATE_KEY = "flashcards-user-state";

const INITIAL_USER_STATE: IUserState = {
  name: "Guest",
  decks: new Decks(),
};

const AppContext = createContext<IAppContext | null>(null);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState(INITIAL_USER_STATE.name);
  const [decks, setDecks] = useState(INITIAL_USER_STATE.decks);

  const saveUserState = () =>
    localStorage.setItem(USER_STATE_KEY, JSON.stringify({ name, decks: decks.allDecks }));

  const loadUserState = () => {
    const userState = localStorage.getItem(USER_STATE_KEY);
    if (!userState) return console.warn("No user state found in local storage");

    const parsedUserState = JSON.parse(userState);
    setName(parsedUserState.name);
    setDecks(new Decks(parsedUserState.decks));
  };

  const resetUserState = () => {
    setName(INITIAL_USER_STATE.name);
    setDecks(new Decks());
    localStorage.removeItem(USER_STATE_KEY);
    window.location.reload();
  };

  useEffect(() => {
    loadUserState();
  }, []);

  return (
    <AppContext.Provider value={{ name, decks, setName, saveUserState, resetUserState }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within an AppContextProvider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AppContext, AppContextProvider, useAppContext };
