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

    return <div className="flex flex-col items-center w-screen">
        <p className="text-[50px]">{props.prompt}</p>
        <div className="flex flex-wrap justify-between gap-[30px] w-[800px] mt-[50px] mb-[100px]">
            {
                props.options.map((option, idx) => {
                    return <Button key={idx} contents={option} onClick={() => onClick(option)} color={"primary"} size={30} />
                })
            }
        </div>
    </div>
}