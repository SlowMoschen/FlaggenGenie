import { useEffect } from "react";
import { Decks } from "../../pages/index_cards/types";
import { APP } from "../configs";
import { AppStorage } from "../types";

const INITIAL_STATE: AppStorage = {
  name: "John Doe",
  status: "Brave Rookie",
  avatar: "/avatars/avatar-1.svg",
  language: "en",
  stats: {
    indexCards: {
      correct: 0,
      incorrect: 0,
      total: 0,
      correctStreak: 0,
      maxCorrectStreak: 0,
      correctPercentage: 0,
      incorrectPercentage: 0,
    },
  },
  states: {
    indexCards: new Decks(),
  },
};

export function useAppStorage() {
  const storeState = (state: AppStorage) =>
    localStorage.setItem(APP.STORAGE_KEY, JSON.stringify(state));

  const storeItem = (key: keyof AppStorage, value: unknown) => {
    const storedState = getStoredState();
    if (storedState) {
      const newState = { ...storedState, [key]: value };
      storeState(newState);
    } else {
      const newState = { ...INITIAL_STATE, [key]: value };
      storeState(newState);
    }
  };

  const getStoredState = (): AppStorage | null => {
    const storedState = localStorage.getItem(APP.STORAGE_KEY);
    return storedState ? JSON.parse(storedState) : null;
  };

  const getStoredItem = <T extends keyof AppStorage>(key: T): AppStorage[T] | null => {
    const storedState = getStoredState();
    return storedState ? storedState[key] : null;
  }

  const resetStorage = () => localStorage.removeItem(APP.STORAGE_KEY);

  const resetStoredStats = (key: keyof AppStorage['stats']) => {
    const storedState = getStoredState();
    if (storedState) {
      const newState = { ...storedState, stats: { ...storedState.stats, [key]: INITIAL_STATE.stats[key] } };
      storeState(newState);
    }
  };

  const resetStoredStates = (key: keyof AppStorage['states']) => {
    const storedState = getStoredState();
    if (storedState) {
      const newState = { ...storedState, states: { ...storedState.states, [key]: INITIAL_STATE.states[key] } };
      storeState(newState);
    }
  };

  useEffect(() => {
    const storedState = getStoredState();
    if (!storedState) storeState(INITIAL_STATE);
  }, []);

  return { storeItem, getStoredState, resetStorage, storeState, getStoredItem, resetStoredStats, resetStoredStates};
}
