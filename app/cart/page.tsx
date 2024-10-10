"use client";
import React, { Suspense } from "react";
import Button from "../ui/button";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// TODO: add loading skeletons
const CartWords = dynamic(() => import("./cart_words"), { ssr: false, loading: () => <></> });
const DeliveryItems = dynamic(() => import("./delivery_items"), { ssr: false, loading: () => <></> });
const CartTotal = dynamic(() => import("./cart_total"), { ssr: false, loading: () => <></> });

export default function CartPage() {
    const router = useRouter();

    const onCheckoutClick = React.useCallback(() => {
        router.push("/checkout");
    }, []);

    return <div className="flex flex-col items-center pt-[160px] pb-[100px] w-full h-full bg-camsii-offwhite text-black">
        <p className="text-[60px]">Shopping Cart</p>
        <CartWords />
        <Button contents="Add Words" color="secondary" size={30} style="mt-[20px]" />
        <DeliveryItems />
        <CartTotal />
        <div className="flex justify-end w-[1000px] pr-[40px]">
            <Button contents="Checkout" color="primary" size={30} style="mt-[10px]" onClick={onCheckoutClick}/>
        </div>
    </div>
}