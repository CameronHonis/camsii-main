import Cart from "./cart";
import CartWord from "./cart_word";
import Delivery from "./delivery";
import { LetterSizes } from "./letter_size";

describe("Cart", () => {
    describe("fromJson", () => {
        it("parses valid json obj", async () => {
            const cartWords = [
                new CartWord("first phrase", LetterSizes.FOUR_FT),
                new CartWord("second", LetterSizes.ZERO),
            ];
            const delivery = new Delivery(
                "123 Street, Seattle, Washington",
                new Date("2000-08-30T07:00:00"),
                new Date("2002-07-19T09:00:00"),
                false,
                50, true
            );
            const cart = new Cart(cartWords, delivery);
            const cartJson = JSON.parse(JSON.stringify(cart));
            const parsedCart = await Cart.fromJson(cartJson);
            expect(parsedCart).toEqual(cart);
        });
    });
});