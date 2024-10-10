import Action from "@/app/models/action";
import Cart from "@/app/models/cart";
import { CartStoreActions } from "./actions";

export default function reduceCartStore(state: Cart, action: Action): Cart {
    const nextState = state.clone();
    switch (action.type) {
        case CartStoreActions.SET_DELIVERY:
            nextState.delivery = action.payload;
            break;
        case CartStoreActions.ADD_CART_WORD:
            nextState.words.push(action.payload);
            break;
        case CartStoreActions.REMOVE_CART_WORD:
            nextState.words.splice(action.payload, 1);
            break;
        default:
            throw new Error(`No reducer handles actions with type: ${action.type}`);
    }
    return nextState;
}