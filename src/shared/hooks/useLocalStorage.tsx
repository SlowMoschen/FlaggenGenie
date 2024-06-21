import { APP } from "../configs";
import { AppStorage } from "../types";

export function useAppStorage() {
  const storeState = (state: AppStorage) =>
    localStorage.setItem(APP.STORAGE_KEY, JSON.stringify(state));

  const storeItem = (key: keyof AppStorage, value: string) => {
    const storedState = getStoredState();
    if (storedState) {
      const newState = { ...storedState, [key]: value };
      storeState(newState);
    } else {
      throw new Error("No stored state found");
    }
  };

  const getStoredState = (): AppStorage | null => {
    const storedState = localStorage.getItem(APP.STORAGE_KEY);
    return storedState ? JSON.parse(storedState) : null;
  };

  const getStoredItem = (key: keyof AppStorage): string | null => {
    const storedState = getStoredState();
    return storedState ? storedState[key] : null;
  };

  const resetStorage = () => localStorage.removeItem(APP.STORAGE_KEY);

  return { storeItem, getStoredState, resetStorage, storeState, getStoredItem };
}
