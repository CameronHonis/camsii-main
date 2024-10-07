import { z } from "zod";
import { LetterSize, LetterSizes, LetterSizeSchema } from "./letter_size";

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

    public static fromJson(json: Object): Promise<CartWord> {
        return new Promise((resolve, reject) => {
            const validJson = CartWordSchema.parse(json);
            resolve(new CartWord(validJson.content, validJson.size));
        });
    }
}

export const CartWordSchema = z.object({
    content: z.string(),
    size: LetterSizeSchema,
});