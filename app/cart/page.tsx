import React from "react";
import Button from "../ui/button";
import Cart from "../models/cart";

export default function CartPage() {
    const [cart, setCart] = React.useState<Cart>();

    return <div>
        <p>Shopping Cart</p>
        <div className="word-combos-section">
            <div>
                <p>Word Combo</p>
                <p>Size</p>
                <p>Letter Count</p>
                <p>Price Per Letter</p>
                <p>Price</p>
            </div>
            {/* <div>
                { wordCombos.map(wordCombo => <WordComboItem />) }
            </div> */}
            <Button contents="Add Words" color="secondary" size={30} />
        </div>
        <div className="delivery-section">
            <div>
                <p>Delivery</p>
            </div>
            <div>

            </div>
        </div>
    </div>
}