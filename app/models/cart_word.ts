import { z } from "zod";
import { LetterSize, LetterSizes, LetterSizeSchema } from "./letter_size";
import { CURATED_CHOICE_DISCOUNT_PERCENT, PHRASES, PRICE_PER_LETTER } from "@/constants";

export const DISCOUNT_PRICE_PER_LETTER = Math.round((100 - CURATED_CHOICE_DISCOUNT_PERCENT) / 100 * PRICE_PER_LETTER);

export default class CartWord {
    content: string;
    size: LetterSize;

    constructor(content: string, size: LetterSize = LetterSizes.FOUR_FT) {
        this.content = content;
        this.size = size;
    }

    public clone(): CartWord {
        return new CartWord(this.content, this.size);
    }

    public getLetterCount(): number {
        let count = 0;
        for (let char of this.content) {
            if ((char >= 'A' && char <= 'Z') ||
                (char >= 'a' && char <= 'z') ||
                (char >= '0' && char <= '9')) {
                count++;
            }
        }
        return count;
    }

    public isDiscounted(): boolean {
        return PHRASES.includes(this.content);
    }

    public getPreDiscountCost(): number {
        return this.getLetterCount() * PRICE_PER_LETTER;
    }

    public getCost(): number {
        const letterCount = this.getLetterCount()
        return this.isDiscounted() ? DISCOUNT_PRICE_PER_LETTER * letterCount : PRICE_PER_LETTER * letterCount;
    }

    public static fromJson(json: Object): CartWord {
        const validJson = CartWordSchema.parse(json);
        return new CartWord(validJson.content, validJson.size);
    }
}

export const CartWordSchema = z.object({
    content: z.string(),
    size: LetterSizeSchema,
});