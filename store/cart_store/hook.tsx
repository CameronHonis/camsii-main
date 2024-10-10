"use client"

import usePersistantReducer from "@/app/hooks/use_persistant_reducer";
import reduceCartStore from "./reducers";
import Cart from "@/app/models/cart";
import CartWord from "@/app/models/cart_word";
import { LetterSizes } from "@/app/models/letter_size";
import Delivery from "@/app/models/delivery";

const INIT_CART = new Cart([
    new CartWord("marry me", LetterSizes.FOUR_FT),
    new CartWord("custom order", LetterSizes.FOUR_FT),
], new Delivery(
    "123 Street, Seattle, Washington",
    34,
    new Date("2000-08-30T22:00:00"),
    new Date("2002-07-19T00:00:00"),
    false,
    50, true
));

function cartStoreParser(raw: string): Cart {
    const cartObj = JSON.parse(raw);
    return Cart.fromJson(cartObj);
}

export default function useCartStore() {
    return usePersistantReducer("cart", reduceCartStore, INIT_CART, JSON.stringify, cartStoreParser, true);
}