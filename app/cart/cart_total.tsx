"use client";
import useCartStore from "@/store/cart_store/hook"

export default function CartTotal() {
    const [cart] = useCartStore();

    return <div className="flex justify-end mt-[40px] w-[1000px] pr-[40px]">
        <p className="text-[30px]">Total:</p>
        <p className="text-[30px] ml-[20px]">${cart.getCost().toFixed(2)}</p>
    </div>
}