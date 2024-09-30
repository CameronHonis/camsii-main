import { LetterSize, LetterSizes } from "./letter_size";

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
}