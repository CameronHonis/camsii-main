import React from "react";
import { OrderBuilderAction, OrderBuilderSubmitText } from "./order_builder_actions";
import Button from "@/app/ui/button";

export default function TextInputSlide(props: {
    prompt: string,
    dispatch: React.Dispatch<OrderBuilderAction>,
}) {
    const [inputText, setInputText] = React.useState("");

    const onInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    }, []);

    const onSubmit = React.useCallback((e: React.FormEvent) => {
        e.preventDefault();
        props.dispatch(new OrderBuilderSubmitText(inputText));
    }, []);

    return <div>
        <div>
            <p>{props.prompt}</p>
            <form onSubmit={onSubmit}>
                <div className="flex">
                    <p>{">"}</p>
                    <div></div>
                    <input
                        className="text-black"
                        type="text"
                        placeholder="Start Typing"
                        onChange={onInputChange}
                        value={inputText}
                    ></input>
                </div>
                <Button contents="Enter" color="primary" size={30} />
            </form>
        </div>
    </div>
}