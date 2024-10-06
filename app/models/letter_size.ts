export const LetterSizes = {
    ZERO: "zero",
    FOUR_FT: "four_ft",
} as const;

export type LetterSize = typeof LetterSizes[keyof typeof LetterSizes];