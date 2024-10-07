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

    public static fromJson(json: Object): Promise<Cart> {
        return new Promise((resolve, reject) => {
            try {
                const validJson = CartSchema.parse(json);
                const cartWordProms = validJson.words.map(CartWord.fromJson);
                const deliveryProm = Delivery.fromJson(validJson.delivery);
                Promise.all([deliveryProm, ...cartWordProms]).then((results) => {
                    const [delivery, ...cartWords] = results;
                    resolve(new Cart(cartWords, delivery));
                }).catch(err => { throw err });
            } catch (err) {
                reject(new Error(`cannot build, got ${err}`));
            }
        });
    }
}

export const CartSchema = z.object({
    words: z.array(CartWordSchema),
    delivery: DeliverySchema,
});