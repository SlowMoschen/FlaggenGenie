import { createContext, useContext, useEffect, useState } from "react";
import { Decks, IIndexGameState,  } from "./types.ts";

interface IAppContext {
  decks: typeof Decks.prototype;
  stats: IIndexGameState["stats"];
  saveUserState: () => void;
  resetUserState: () => void;
  updateStats: (correct: boolean) => void;
}

const GAME_STATE_KEY = "flashcards-user-state";

const INITIAL_GAME_STATE: IIndexGameState = {
  decks: new Decks(),
  stats: {
    correct: 0,
    incorrect: 0,
    total: 0,
    correctStreak: 0,
    maxCorrectStreak: 0,
    correctPercentage: 0,
    incorrectPercentage: 0,
  },
};

const IndexCardContext = createContext<IAppContext | null>(null);

const IndexCardContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [decks, setDecks] = useState(INITIAL_GAME_STATE.decks);
  const [stats, setStats] = useState(INITIAL_GAME_STATE.stats);

  const updateStats = (correct: boolean) => {
    const updatedStats = { ...stats };
    updatedStats.total += 1;
    if (correct) {
      updatedStats.correct += 1;
      updatedStats.correctStreak += 1;
      if (updatedStats.correctStreak > updatedStats.maxCorrectStreak)
        updatedStats.maxCorrectStreak = updatedStats.correctStreak;
      updatedStats.correctPercentage = Math.round(
        (updatedStats.correct / updatedStats.total) * 100
      );
    } else {
      updatedStats.incorrect += 1;
      updatedStats.correctStreak = 0;
      updatedStats.incorrectPercentage = Math.round(
        (updatedStats.incorrect / updatedStats.total) * 100
      );
    }
    setStats(updatedStats);
  };

  const saveUserState = () =>
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify({ decks: decks.allDecks, stats }));

  const loadUserState = () => {
    const userState = localStorage.getItem(GAME_STATE_KEY);
    if (!userState) return console.warn("No user state found in local storage");

    const parsedUserState = JSON.parse(userState);
    setDecks(new Decks(parsedUserState.decks));
    setStats(parsedUserState.stats);
  };

  const resetUserState = () => {
    setDecks(new Decks());
    setStats(INITIAL_GAME_STATE.stats);
    localStorage.removeItem(GAME_STATE_KEY);
    window.location.reload();
  };

  useEffect(() => {
    loadUserState();
  }, []);

  return (
    <IndexCardContext.Provider value={{ decks, stats, saveUserState, resetUserState, updateStats }}>
      {children}
    </IndexCardContext.Provider>
  );
};

const useIndexCardContext = () => {
  const context = useContext(IndexCardContext);
  if (!context) throw new Error("useAppContext must be used within an AppContextProvider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { IndexCardContext, IndexCardContextProvider, useIndexCardContext };

