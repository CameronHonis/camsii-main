import { z } from "zod";

export const LetterSizes = {
    ZERO: "zero",
    FOUR_FT: "four_ft",
} as const;

export type LetterSize = typeof LetterSizes[keyof typeof LetterSizes];
export const LetterSizeSchema = z.nativeEnum(LetterSizes);

export function toLetterSizeAbbrv(letterSize: LetterSize): string {
    switch (letterSize) {
        case LetterSizes.FOUR_FT:
            return "4 ft"
        case LetterSizes.ZERO:
            return "zero"
        default:
            throw new Error(`missing abbreviation for ${letterSize}`);
    }
}