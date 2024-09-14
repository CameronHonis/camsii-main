import { ElementType, ReactNode, MouseEvent } from "react";
import clsx from "clsx";

export type ButtonProps = {
    onClick?: (e: MouseEvent) => {}
    contents: ReactNode;
    color: "primary" | "secondary" | string | string[];
    size: number; // text and padding are all linearly correlated
};

export default function Button(props: ButtonProps) {
    const { onClick, contents, color, size } = props;

    return <button className={clsx(
        textSizeClassName(size),
        horizPaddingClassName(size),
        verticalPaddingClassName(size),
        "flex items-center justify-between text-white",
        color === "primary" && "bg-camsii-black",
        color === "secondary" && "bg-camsii-blue",
        color !== "primary" && color !== "secondary" && color,
    )}
        onClick={onClick}
    >
        {contents}
    </button>
}

function textSizeClassName(size: number): string {
    const px = Math.floor(size);
    const rtn = `px-[${px}px]`;
    console.log(rtn);
    return rtn;
}

function horizPaddingClassName(size: number): string {
    const px = Math.floor(size / 1.5);
    return `px-[${px}px]`;
}

function verticalPaddingClassName(size: number): string {
    const px = Math.floor(size / 3);
    return `px-[${px}px]`;
}