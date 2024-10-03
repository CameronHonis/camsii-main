import React from "react";
import textWidth from "../helpers/text_width";

function resize(input: HTMLInputElement) {
    const tmp = document.createElement("div");
    tmp.style.padding = "0";
    if (getComputedStyle)
        tmp.style.cssText = getComputedStyle(input, null).cssText;
    tmp.style.width = "";
    tmp.style.position = "absolute";
    tmp.innerHTML = input.value;
    input.parentNode!.appendChild(tmp);
    const width = tmp.clientWidth;
    tmp.parentNode!.removeChild(tmp);
    input.style.width = `${width}px`;
}

export default function FlexyInput(props: {
    onNewText: (e: string) => void;
    className?: string;
    type?: string;
    reff?: React.RefObject<HTMLInputElement>;
    placeholder?: string;
    focusOnRender?: boolean;
    minWidthPx?: number;
    onFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
    filter?: (input: string) => string;
}) {
    const [text, setText] = React.useState("");
    const ref = props.reff || React.useRef<HTMLInputElement>(null);

    const resize = React.useCallback(() => {
        if (!ref.current) return;
        const minWidthPx = props.minWidthPx || 0;
        const widthPx = Math.max(textWidth(ref.current), minWidthPx);
        ref.current.style.width = `${widthPx}px`;
    }, []);

    React.useEffect(() => {
        if (ref.current && props.focusOnRender) {
            ref.current.focus();
        }
        resize();
    }, [ref]);

    const onInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const nextVal = props.filter ? props.filter(e.target.value) : e.target.value;
        setText(nextVal);
        props.onNewText(nextVal);
        resize();
    }, [ref]);

    return <input
        ref={ref}
        type={props.type}
        onChange={onInputChange}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        value={text}
        className={props.className}
        placeholder={props.placeholder}
    />;
}