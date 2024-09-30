import { LetterSize, LetterSizes } from "./letter_size";
import CartWord from "./cart_word";

export class CartItem {
    words: CartWord[];

    constructor(words: CartWord[]) {
        this.words = words;
    }

    public setPhrase(phrase: string, size: LetterSize = LetterSizes.ZERO) {
        const words = phrase.split(" ");
        this.words = words.map(word => new CartWord(word, size));
    }

    public setAllSize(size: LetterSize) {
        this.words.forEach(word => word.size = size);
    }

    public clone(): CartItem {
        const wordsClone = this.words.map(word => word.clone());
        return new CartItem(wordsClone);
    }

    public static null(): CartItem {
        return new CartItem([]);
    }
}