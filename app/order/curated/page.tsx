"use client";

import React from "react";
import WindowSlide from "@/app/ui/window_slide";
import Image from "next/image";
import { useRouter } from "next/navigation";
import OptionsSlide from "../options_slide";
import { OrderBuilderBack } from "../order_builder_actions";
import { OrderBuilderOptionsSlide, OrderBuilderTextInputSlide, OrderBuilderSizerSlide } from "../order_builder_slide";
import OrderBuilderState, { orderBuilderStateReducer, OrderBuilderPhases } from "../order_builder_state";
import SizeSlide from "../size_slide";
import TextInputSlide from "../text_input_slide";
import Cart from "@/app/models/cart";

export default function CuratedOrderPage(props: {
    addCartItem: React.Dispatch<React.SetStateAction<Cart>>;
}) {
    const [state, dispatch] = React.useReducer(orderBuilderStateReducer, OrderBuilderState.new(true));
    const router = useRouter();

    const onBack = React.useCallback(() => {
        if (state.getPhase() === OrderBuilderPhases.BASE_PHRASE) {
            router.push("/order");
            return;
        }
        dispatch(new OrderBuilderBack());
    }, [state, router]);

    React.useEffect(() => {
        if (state.getPhase() === OrderBuilderPhases.SIZES) {
            router.push("/cart");
        }
    }, [state, router]);


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
                        return <SizeSlide words={state.getCartWords()} onSelect={() => {}} key={idx} />;
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
