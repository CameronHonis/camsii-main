import { LetterSize, LetterSizes } from "./letter_size";
import CartWord, { CartWordSchema } from "./cart_word";
import Delivery, { DeliverySchema } from "./delivery";
import { z } from "zod";

export default class Cart {
    words: CartWord[];
    delivery: Delivery;

    constructor(words: CartWord[], delivery: Delivery) {
        this.words = words;
        this.delivery = delivery;
    }

    public setPhrase(phrase: string, size: LetterSize = LetterSizes.ZERO) {
        const words = phrase.split(" ");
        this.words = words.map(word => new CartWord(word, size));
    }

    public setAllSize(size: LetterSize) {
        this.words.forEach(word => word.size = size);
    }

    public hasDeliveryInfo(): boolean {
        return !this.delivery.isNull();
    }

    public clone(): Cart {
        const wordsClone = this.words.map(word => word.clone());
        return new Cart(wordsClone, this.delivery.clone());
    }

    public static null(): Cart {
        return new Cart([], Delivery.null());
    }

    public static fromJson(json: Object): Cart {
        const validJson = CartSchema.parse(json);
        return new Cart(
            validJson.words.map(CartWord.fromJson),
            Delivery.fromJson(validJson.delivery)
        );
    }
}

export const CartSchema = z.object({
    words: z.array(CartWordSchema),
    delivery: DeliverySchema,
});