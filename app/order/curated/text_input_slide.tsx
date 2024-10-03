import React from "react";
import { OrderBuilderAction, OrderBuilderSubmitText } from "./order_builder_actions";
import Button from "@/app/ui/button";
import clsx from "clsx";
import FlexyInput from "@/app/ui/flexy_input";
import { CURSOR_BLINK_MS, WINDOW_SLIDE_MS } from "@/constants";
import textWidth from "@/app/helpers/text_width";
import { hasSpecialCharacters } from "@/app/helpers/hasSpecialCharacters";

function errorsFromInput(input: string): string[] {
    const rtn = [];
    if (hasSpecialCharacters(input)) {
        rtn.push("no special characters allowed");
    }
    if (input.length > 30) {
        rtn.push("too long");
    }
    if (input.length < 2) {
        rtn.push("too short");
    }
    return rtn;
}

export default function TextInputSlide(props: {
    prompt: string,
    dispatch: React.Dispatch<OrderBuilderAction>,
    inputRules?: (input: string) => string[],
}) {
    const [inputText, setInputText] = React.useState("");
    const [inputFocused, setInputFocused] = React.useState(false);
    const [selRange, setSelRange] = React.useState<[number, number]>([0, 0]);
    const [caretBlinkHidden, setCursorBlinkHidden] = React.useState(false);
    const [inputErrors, setInputErrors] = React.useState<string[]>([]);
    const inputContainerRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const caretRef = React.useRef<HTMLParagraphElement>(null);

    // input error feedback
    React.useEffect(() => {
        const baseErrors = errorsFromInput(inputText);
        if (props.inputRules)
            baseErrors.concat(props.inputRules(inputText));
        setInputErrors(errorsFromInput(inputText));
    }, [inputText]);

    // selection change
    React.useEffect(() => {
        const onSelectionChange = () => {
            if (inputRef.current && document.activeElement === inputRef.current) {
                const { selectionStart, selectionEnd } = inputRef.current;
                setSelRange([selectionStart || 0, selectionEnd || 0]);
            }
        }
        document.addEventListener("selectionchange", onSelectionChange);

        return () => document.removeEventListener("selectionchange", onSelectionChange);
    }, [inputRef]);

    // style caret
    React.useEffect(() => {
        if (!inputRef.current || !caretRef.current || !inputContainerRef.current) return;
        const preCaretText = inputText.substring(0, selRange[0]);
        const selTextOffsetPx = textWidth(inputRef.current, preCaretText);
        const { left: inputAbsLeftPx } = inputRef.current.getBoundingClientRect();
        const { left: inputContainerAbsLeftPx } = inputContainerRef.current.getBoundingClientRect();
        const baseOffsetPx = inputAbsLeftPx - inputContainerAbsLeftPx;
        caretRef.current.style.left = `${baseOffsetPx + selTextOffsetPx}px`;
    }, [selRange, inputText]);

    // caret blink
    React.useEffect(() => {
        let _cursorBlinkHidden = false;
        setCursorBlinkHidden(false);
        const intervalId = setInterval(() => {
            _cursorBlinkHidden = !_cursorBlinkHidden;
            setCursorBlinkHidden(_cursorBlinkHidden);
        }, CURSOR_BLINK_MS);

        return () => clearInterval(intervalId);
    }, [inputText, inputFocused, selRange]);

    // delayed (for anims) focus on mount
    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!inputRef.current) return;
            inputRef.current.focus();
        }, WINDOW_SLIDE_MS);

        return () => clearTimeout(timeoutId);
    }, [inputRef.current]);

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

    const selText = React.useMemo(() => {
        const selText = inputText.substring(selRange[0], selRange[1]);
        if (!selText && selRange[0] < inputText.length)
            return inputText.substring(selRange[0], selRange[0] + 1);
        return selText || "  ";
    }, [inputText, selRange]);

    return <div className="flex flex-col items-center w-screen">
        <p className="text-[50px]">{props.prompt}</p>
        <form onSubmit={onSubmit} className="flex flex-col items-center">
            <div
                ref={inputContainerRef}
                className="relative flex py-[10px] px-[25px] mt-[100px] cursor-text rounded-[10px] bg-[rgba(0,0,0,0.1)]"
                onClick={onTextAreaClick}>
                <p className="text-[40px] pr-[10px]">{">"}</p>
                <FlexyInput
                    onNewText={onNewText}
                    reff={inputRef}
                    onFocus={(e) => setInputFocused(true)}
                    onBlur={(e) => setInputFocused(false)}
                    className="bg-transparent border-none outline-none text-[40px] caret-transparent font-bold"
                    minWidthPx={200}
                />
                <p
                    ref={caretRef}
                    id="caret"
                    className={clsx(
                        "absolute bg-camsii-black text-white text-[40px] pointer-events-none whitespace-pre-wrap font-bold",
                        (!inputFocused || caretBlinkHidden) && "hidden",
                    )}>{selText}</p>
            </div>
            {inputText && inputErrors.length === 0 && <Button contents="Enter" color="primary" size={30} style="mt-[25px]" />}
            {
                inputErrors.length > 0 && <div>
                    {
                        inputErrors.map((err, idx) =>
                            <p
                                className="text-[20px]"
                                key={idx}
                            >
                                {err}
                            </p>)
                    }

                </div>
            }
        </form>
    </div>
}