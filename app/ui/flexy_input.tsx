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
    onFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
    filter?: (input: string) => string;
}) {
    const [text, setText] = React.useState("");
    const ref = props.reff || React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (!ref.current) return;
        ref.current.style.width = "0";
        if (props.focusOnRender) {
            ref.current.focus();
        }
    }, [ref]);

    const onInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const nextVal = props.filter ? props.filter(e.target.value) : e.target.value;
        setText(nextVal);
        props.onNewText(nextVal);
        if (ref.current) {
            const w = textWidth(ref.current);
            ref.current.style.width = `${w}px`;
        }
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