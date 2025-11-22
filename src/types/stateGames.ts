export const StateGames = {
    WAITING: "WAITING",
    PLAYING: "PLAYING",
    END: "END"
} as const;

export type StateGames = typeof StateGames[keyof typeof StateGames];