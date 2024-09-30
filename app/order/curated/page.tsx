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

export default function CuratedPage(props: {
    addCartItem: React.Dispatch<React.SetStateAction<CartItem>>;
}) {
    const [state, dispatch] = React.useReducer(orderBuilderStateReducer, OrderBuilderState.new(true));

    const onBack = React.useCallback(() => {
        if (state.getPhase() === OrderBuilderPhases.BASE_PHRASE) {
            // reroute to /order
            console.log("implement reroute to /order");
            return;
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

    return <div>
        <WindowSlide eleIdx={slideIdx} className="w-[500px] h-[500px]">
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
        <div className="cursor-pointer" onClick={onBack}>
            <Image src="" alt="" width={0} height={0} />
            <p>{prevSlideName}</p>
        </div>
    </div>
}
