import React from "react";
import { OrderBuilderAction, OrderBuilderSubmitText } from "./order_builder_actions";
import Button from "@/app/ui/button";
import clsx from "clsx";
import FlexyInput from "@/app/ui/flexy_input";
import { CURSOR_BLINK_MS } from "@/constants";

export default function TextInputSlide(props: {
    prompt: string,
    dispatch: React.Dispatch<OrderBuilderAction>,
}) {
    const [inputText, setInputText] = React.useState("");
    const [inputFocused, setInputFocused] = React.useState(false);
    const [cursorBlinkHidden, setCursorBlinkHidden] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const caretRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        let _cursorBlinkHidden = false;
        setCursorBlinkHidden(false);
        const intervalId = setInterval(() => {
            _cursorBlinkHidden = !_cursorBlinkHidden;
            setCursorBlinkHidden(_cursorBlinkHidden);
        }, CURSOR_BLINK_MS);

        return () => clearInterval(intervalId);
    }, [inputText]);

    const onTextAreaClick = React.useCallback(() => {
        if (!inputRef.current) return;
        inputRef.current.focus();
    }, []);

    const onNewText = React.useCallback((newText: string) => {
        setInputText(newText);
    }, []);

    const onSubmit = React.useCallback((e: React.FormEvent) => {
        e.preventDefault();
        props.dispatch(new OrderBuilderSubmitText(inputText));
    }, []);

    return <div className="flex flex-col items-center w-screen">
        <p className="text-[50px]">{props.prompt}</p>
        <form onSubmit={onSubmit} className="flex flex-col items-center">
            <div className="relative flex py-[10px] px-[100px] cursor-text" onClick={onTextAreaClick}>
                <p className="text-[30px]">{">"}</p>
                <FlexyInput
                    onNewText={onNewText}
                    reff={inputRef}
                    onFocus={(e) => setInputFocused(true)}
                    onBlur={(e) => setInputFocused(false)}
                    className="bg-transparent border-none outline-none caret-transparent text-[30px]"
                    focusOnRender
                />
                <div
                    ref={caretRef}
                    className={clsx(
                        "bg-camsii-black w-[8px] h=[1ch]",
                        (!inputFocused || cursorBlinkHidden) && "hidden",
                    )}></div>
            </div>
            { inputText && <Button contents="Enter" color="primary" size={30} /> }
        </form>
    </div>
}