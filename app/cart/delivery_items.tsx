"use client";
import { OVERNIGHT_DELIVERY_PRICE, OVERNIGHT_RANGE, PRICE_PER_EXT_CORD_FT, PRICE_PER_MILE_OVER_50 } from "@/constants";
import useCartStore from "@/store/cart_store/hook";
import React from "react";

export default function DeliveryItems() {
    const [cart] = useCartStore();

    const miles = cart.delivery.distMiles;

    const formatTimeAMPM = React.useCallback((date: Date) => {
        const hours = date.getHours();
        const mins = date.getMinutes();
        console.log(mins);

        let dispHours = hours % 12;
        dispHours = dispHours || 12;
        const dispMins = mins < 10 ? `0${mins}` : mins.toString();
        const ampm = hours >= 12 ? "PM" : "AM";

        return `${dispHours}:${dispMins} ${ampm}`;
    }, []);

    return <div>
        <div className="w-[1000px] pl-[75px] mt-[20px]">
            <p className="text-[30px] text-camsii-gray font-semibold">Delivery</p>
        </div>
        <div className="flex flex-col">
            <div className="flex justify-between items-center bg-white px-[40px] py-[20px] rounded-[10px]">
                <div className="flex items-center">
                    <p className="text-[25px]">Base Delivery Fee</p>
                    <p className="text-[20px] text-white bg-camsii-black ml-[10px] px-[10px] py-[5px] rounded-[10px]">
                        {miles <= 50 ? "<50" : Math.round(miles)} Miles
                    </p>
                </div>
                <p className="text-[30px]">${cart.delivery.getBaseDeliveryCost().toFixed(2)}</p>
            </div>
            {cart.delivery.getIsOvernightDropoff() &&
                <div className="flex justify-between items-center mt-[20px] bg-white px-[40px] py-[20px] rounded-[10px]">
                    <div className="flex items-center">
                        <p className="text-[25px]">Overnight Dropoff</p>
                        <p className="text-[20px] text-white bg-camsii-black ml-[10px] px-[10px] py-[5px] rounded-[10px]">

                            {formatTimeAMPM(cart.delivery.dropoffDatetime)}
                        </p>
                    </div>
                    <p className="text-[30px]">${OVERNIGHT_DELIVERY_PRICE.toFixed(2)}</p>
                </div>}
            {cart.delivery.getIsOvernightPickup() &&
                <div className="flex justify-between items-center mt-[20px] bg-white px-[40px] py-[20px] rounded-[10px]">
                    <div className="flex items-center">
                        <p className="text-[25px]">Overnight Pickup</p>
                        <p className="text-[20px] text-white bg-camsii-black ml-[10px] px-[10px] py-[5px] rounded-[10px]">

                            {formatTimeAMPM(cart.delivery.pickupDatetime)}
                        </p>
                    </div>
                    <p className="text-[30px]">${OVERNIGHT_DELIVERY_PRICE.toFixed(2)}</p>
                </div>}
            {cart.delivery.extCordFt > 0 &&
                <div className="flex justify-between items-center mt-[20px] bg-white px-[40px] py-[20px] rounded-[10px]">
                    <div className="flex items-center">
                        <p className="text-[25px]">Extension Cord</p>
                        <p className="text-[20px] text-white bg-camsii-black ml-[10px] px-[10px] py-[5px] rounded-[10px]">

                            {cart.delivery.extCordFt} FT
                        </p>
                    </div>
                    <p className="text-[30px]">${cart.delivery.getExtCordCost().toFixed(2)}</p>
                </div>}
        </div>
    </div >
}