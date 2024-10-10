import Action from "@/app/models/action";
import CartWord from "@/app/models/cart_word";
import Delivery from "@/app/models/delivery";

export class SetDeliveryAction implements Action<Delivery> {
    readonly type = CartStoreActions.SET_DELIVERY;

    constructor(readonly payload: Delivery) {}
}

export class AddCartWordAction implements Action<CartWord> {
    readonly type = CartStoreActions.ADD_CART_WORD;

    constructor(readonly payload: CartWord) {}
}

export class RemoveCartWordAction implements Action<{idx: number}> {
    readonly type = CartStoreActions.REMOVE_CART_WORD;

    constructor(readonly payload: {idx: number}) {}
}

export const CartStoreActions = {
    SET_DELIVERY: "set_delivery",
    ADD_CART_WORD: "add_cart_word",
    REMOVE_CART_WORD: "remove_cart_word",
} as const;

export type CartStoreAction = typeof CartStoreActions[keyof typeof CartStoreActions];