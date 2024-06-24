import { useEffect, useState } from "react";
import { useAppStorage } from "../../shared/hooks/useAppStorage.tsx";
import { DeckIndex, Decks, TrackedIndexCardStats } from "./types.ts";

export const useIndexCardsLogic = (decks: typeof Decks.prototype) => {
  const { getStoredItem, storeItem } = useAppStorage();
  const [stats, setStats] = useState<TrackedIndexCardStats>(getStoredItem("stats")!.indexCards!);
  const [deckIndex, setDeckIndex] = useState<DeckIndex>(0);
  const [currentDeck, setCurrentDeck] = useState(decks.getDeck(deckIndex));
  const [currentCard, setCurrentCard] = useState(currentDeck?.[0] || null);

  const isLastDeck = deckIndex === decks.length - 1;
  const isFirstDeck = deckIndex === 0;

  const handleCorrect = async () => {
    const removedCard = currentDeck?.shift();
    if (!removedCard) return;

    if (isLastDeck) {
      decks.getDeck(deckIndex)?.push(removedCard);
    } else {
      decks.getDeck((deckIndex + 1) as DeckIndex)?.push(removedCard);
    }
    setCurrentCard(decks.getDeck(deckIndex)?.[0]);
    updateStats(true);
    saveState();
  };

  const handleIncorrect = async () => {
    const removedCard = currentDeck?.shift();
    if (!removedCard) return;

    if (isFirstDeck) {
      decks.getDeck(deckIndex)?.push(removedCard);
    } else {
      decks.getDeck((deckIndex - 1) as DeckIndex)?.push(removedCard);
    }
    setCurrentCard(decks.getDeck(deckIndex)?.[0]);
    updateStats(false);
    saveState();
  };

  const handleNextDeck = () => {
    if (isLastDeck) return;
    setDeckIndex((prev) => (prev + 1) as DeckIndex);
    saveState();
  };

  const handlePreviousDeck = () => {
    if (isFirstDeck) return;
    setDeckIndex((prev) => (prev - 1) as DeckIndex);
    saveState();
  };

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

  const saveState = () => {
    const allStats = getStoredItem("stats");
    storeItem("stats", { ...allStats, indexCards: stats });
    storeItem("states", { indexCards: decks });
  };

  useEffect(() => {
    setCurrentDeck(decks.getDeck(deckIndex));
    setCurrentCard(decks.getDeck(deckIndex)?.[0]);
  }, [deckIndex, decks]);

  return {
    deckIndex,
    currentCard,
    handleCorrect,
    handleIncorrect,
    handleNextDeck,
    handlePreviousDeck,
    stats,
  };
};
