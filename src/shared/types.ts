import { Decks, TrackedIndexCardStats } from "../pages/index_cards/types";

export interface GameState {
    [key: string]: unknown;
}

export interface AppStorage {
    name: string;
    status: string;
    avatar: string;
    language: string;
    stats: {
        indexCards: TrackedIndexCardStats;
    };
    states: {
        indexCards: typeof Decks.prototype;
    }
}