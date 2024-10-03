import { ReactNode, MouseEvent, CSSProperties } from "react";
import clsx from "clsx";

// TODO: parse contents using props.children default prop
export default function Button(props: {
    onClick?: (e: MouseEvent) => void,
    contents: ReactNode;
    color: "primary" | "secondary" | string | string[];
    size: number;
    style?: string | CSSProperties;
}) {
    const { onClick, contents, color, size, style } = props;

    return <button className={clsx(
        "relative flex items-center justify-between shadow-[0_4px_4px_rgba(0,0,0,0.25)]",
        typeof style === "string" && style,
        color === "primary" && "bg-camsii-black text-white",
        color === "secondary" && "bg-camsii-blue text-white",
        color !== "primary" && color !== "secondary" && color,
    )}
        style={getButtonStyles(size, style)}
        onClick={onClick}
    >
        {contents}
    </button>
}

function getButtonStyles(size: number, override?: string | CSSProperties): CSSProperties {
    const hPad = Math.round(.7 * size);
    const vPad = Math.round(.35 * size);
    const r = Math.round(.5 * size);

    // transform into strictly react styles
    override = override && typeof override === "object" ? override : {};

    return {
        fontSize: Math.floor(size),
        paddingLeft: hPad,
        paddingRight: hPad,
        paddingTop: vPad,
        paddingBottom: vPad,
        borderRadius: r,
        ...override,
    };
}