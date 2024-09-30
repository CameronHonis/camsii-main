import React from "react";
import { OrderBuilderAction, OrderBuilderSelectOption } from "./order_builder_actions";
import Button from "@/app/ui/button";

export default function OptionsSlide(props: {
    prompt: string,
    options: string[],
    dispatch: React.Dispatch<OrderBuilderAction>,
}) {
    const onClick = React.useCallback((option: string) => {
        props.dispatch(new OrderBuilderSelectOption(option));
    }, [props.dispatch]);

    return <div>
        <p>{props.prompt}</p>
        <div>
            {
                props.options.map((option, idx) => {
                    return <Button key={idx} contents={option} onClick={() => onClick(option)} color={"primary"} size={30} />
                })
            }
        </div>
    </div>
}