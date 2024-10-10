"use client";
import useCartStore from "@/store/cart_store/hook";
import React from "react";
import { toLetterSizeAbbrv } from "../models/letter_size";
import { CURATED_CHOICE_DISCOUNT_PERCENT, PHRASES, PRICE_PER_LETTER } from "@/constants";
import { DISCOUNT_PRICE_PER_LETTER } from "../models/cart_word";


export default function CartWords() {
    const [cart] = useCartStore();

    return <div className="flex flex-col items-center word-combos-section mt-[75px]">
        <div className="grid grid-cols-3 w-[1000px] px-[40px] text-camsii-gray">
            <p>Word Combo</p>
            <p className="pl-[20px]">Size</p>
            <div className="flex justify-self-end pr-[30px]">
                <p className="text-nowrap">Count</p>
                <p className="text-nowrap ml-[60px]">Per Letter</p>
                <p className="text-nowrap ml-[120px]">Price</p>
            </div>
        </div>
        <div className="flex flex-col gap-[20px]">
            {cart.words.map((wordCombo, idx) => PHRASES.includes(wordCombo.content) ?
                <div key={idx} className="grid w-[1000px] grid-cols-3 gap-y-[20px] bg-white px-[40px] rounded-[10px] py-[20px]">
                    <p className="text-[30px] font-semibold uppercase">{wordCombo.content}</p>
                    <p className="text-[30px] uppercase">{toLetterSizeAbbrv(wordCombo.size)}</p>
                    <div className="flex items-center gap-[40px] justify-self-end text-[20px]">
                        <p>{wordCombo.getLetterCount()}</p>
                        <p>x</p>
                        <p className="text-camsii-silver line-through">${PRICE_PER_LETTER}</p>
                        <p className="text-camsii-silver">=</p>
                        <p className="text-[30px] text-camsii-silver line-through">
                            ${wordCombo.getPreDiscountCost().toFixed(2)}
                        </p>
                    </div>
                    <div></div>
                    <div className="flex items-center gap-[40px] justify-self-end col-span-2 text-[20px]">
                        <p className="bg-camsii-light-pink px-[10px] rounded-[10px] font-bold">discount {CURATED_CHOICE_DISCOUNT_PERCENT}%</p>
                        <p>${DISCOUNT_PRICE_PER_LETTER}</p>
                        <p>=</p>
                        <p className="text-[30px]">
                            ${wordCombo.getCost().toFixed(2)}
                        </p>
                    </div>
                </div>
                :
                <div key={idx} className="grid w-[1000px] grid-cols-3 gap-y-[20px] bg-white px-[40px] rounded-[10px] py-[20px]">
                    <p className="text-[30px] font-semibold uppercase">{wordCombo.content}</p>
                    <p className="text-[30px] uppercase">{toLetterSizeAbbrv(wordCombo.size)}</p>
                    <div className="flex items-center gap-[40px] justify-self-end text-[20px]">
                        <p>{wordCombo.getLetterCount()}</p>
                        <p>x</p>
                        <p>${PRICE_PER_LETTER}</p>
                        <p>=</p>
                        <p className="text-[30px]">
                            ${wordCombo.getCost().toFixed(2)}
                        </p>
                    </div>
                </div>
            )}
        </div>
    </div >
}