import { countries } from "../../Countries";

export interface ICard {
  id: number;
  type: "text" | "image";
  front: string;
  back: string;
}

export type IDeck = ICard[];

export type DeckIndex = 0 | 1 | 2 | 3;

const shuffledCountries = [...countries].sort(() => Math.random() - 0.5);
const startDeck: IDeck = shuffledCountries.map((country, index) => ({
  id: index,
  type: "image",
  front: country.flagSrc,
  back: country.abbreviation,
}));
const devDeck: IDeck = startDeck.slice(0, 5);

const initialDecks: IDeck[] = [startDeck, [], [], []];

export class Decks {
  private decks: IDeck[] = import.meta.env.DEV ? [devDeck, [], [], []] : initialDecks;

  constructor(savedDecks?: IDeck[]) {
    if (savedDecks) this.decks = savedDecks;
  }

  getDeck(index: DeckIndex) {
    return this.decks[index];
  }

  getDeckLength(index: DeckIndex) {
    return this.decks[index]?.length ?? 0;
  }

  get length() {
    return this.decks.length;
  }

  get allDecks() {
    return this.decks;
  }
}

export interface IUserState {
  decks: typeof Decks.prototype;
  stats: {
    correct: number;
    incorrect: number;
    total: number;
    correctStreak: number;
    maxCorrectStreak: number;
    correctPercentage: number;
    incorrectPercentage: number;
  };
}
