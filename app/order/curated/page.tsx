"use client";

import React from "react";
import { CartItem } from "@/models/cart_item";
import WindowSlide from "@/app/ui/window_slide";
import Image from "next/image";
import OrderBuilderState, { OrderBuilderPhases, orderBuilderStateReducer } from "./order_builder_state";
import { OrderBuilderBack } from "./order_builder_actions";
import { OrderBuilderOptionsSlide, OrderBuilderSizerSlide, OrderBuilderTextInputSlide } from "./order_builder_slide";
import OptionsSlide from "./options_slide";
import TextInputSlide from "./text_input_slide";
import { useRouter } from "next/navigation";

export default function CuratedPage(props: {
    addCartItem: React.Dispatch<React.SetStateAction<CartItem>>;
}) {
    const [state, dispatch] = React.useReducer(orderBuilderStateReducer, OrderBuilderState.new(true));
    const router = useRouter();

    const onBack = React.useCallback(() => {
        if (state.getPhase() === OrderBuilderPhases.BASE_PHRASE) {
            router.push("/order");
        }
        dispatch(new OrderBuilderBack());
    }, [state]);


    const prevSlideName = React.useMemo(() => {
        try {
            return state.getPrevSlideName();
        } catch {
            return "order type";
        }
    }, [state]);

    const slideIdx = state.slideStack.length - 1;

    return <>
        <WindowSlide eleIdx={slideIdx} className="flex-grow w-full pt-[135px] text-camsii-black">
            {
                state.slideStack.map((slide, idx) => {
                    if (slide instanceof OrderBuilderOptionsSlide) {
                        return <OptionsSlide prompt={slide.prompt} options={slide.options} dispatch={dispatch} key={idx} />;
                    } else if (slide instanceof OrderBuilderTextInputSlide) {
                        return <TextInputSlide prompt={slide.prompt} dispatch={dispatch} key={idx} />;
                    } else if (slide instanceof OrderBuilderSizerSlide) {
                        return <div key={idx}>implement me</div>;
                    }
                })
            }
        </WindowSlide>
        <div className="w-[1000px] mb-[100px]">
            <div className="flex flex-col items-center w-[100px] cursor-pointer" onClick={onBack}>
                <Image src="/back_arrow.png" alt="back arrow" width={48} height={36} />
                <p>{prevSlideName}</p>
            </div>
        </div>
    </>
}
