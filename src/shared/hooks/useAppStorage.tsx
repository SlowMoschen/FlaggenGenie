import { useEffect } from "react";
import { APP } from "../configs";
import { AppStorage } from "../types";

const INITIAL_STATE: AppStorage = {
  name: "John Doe",
  status: "Brave Rookie",
  avatar: "/avatars/avatar-1.svg",
  language: "en",
};

export function useAppStorage() {
  const storeState = (state: AppStorage) =>
    localStorage.setItem(APP.STORAGE_KEY, JSON.stringify(state));

  const storeItem = (key: keyof AppStorage, value: string) => {
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

  const getStoredItem = (key: keyof AppStorage) => {
    const storedState = getStoredState();
    return storedState ? storedState[key] : null;
  };

  const resetStorage = () => localStorage.removeItem(APP.STORAGE_KEY);

  useEffect(() => {
    const storedState = getStoredState();
    if (!storedState) storeState(INITIAL_STATE);
  }, []);

  return { storeItem, getStoredState, resetStorage, storeState, getStoredItem };
}
