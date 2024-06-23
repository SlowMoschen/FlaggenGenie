export interface GameState {
    [key: string]: unknown;
}

export interface AppStorage {
    name: string;
    status: string;
    avatar: string;
    language: string;
}