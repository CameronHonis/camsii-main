import { ElementType, ReactNode, MouseEvent, CSSProperties } from "react";
import clsx from "clsx";

export type ButtonProps = {
    onClick?: (e: MouseEvent) => {};
    contents: ReactNode;
    color: "primary" | "secondary" | string | string[];
    size: number; // text and padding are linearly correlated
    style?: string | CSSProperties; // either tailwind or react inline styles
};

export default function Button(props: ButtonProps) {
    const { onClick, contents, color, size, style } = props;

    return <button className={clsx(
        "flex items-center justify-between text-white",
        typeof style === "string" && style,
        color === "primary" && "bg-camsii-black",
        color === "secondary" && "bg-camsii-blue",
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