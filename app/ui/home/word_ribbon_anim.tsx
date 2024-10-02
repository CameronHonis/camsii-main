"use client"

import textWidth from "@/app/helpers/text_width";
import clsx from "clsx";
import React from "react";

type Props = {
    words: string[];
    wordSpacePx: number;
    fontSizePx: number;
    MsPerPx: number;
    reversed?: boolean;
    style?: string;
    textStyle?: string;
}

export default function WordRibbon(props: Props) {
    const { words, wordSpacePx, fontSizePx, MsPerPx, reversed, style, textStyle } = props;

    const wordRefs = React.useRef<(HTMLParagraphElement | null)[]>([]);

    React.useEffect(() => {
        let accWidth = 0;
        for (let i = 0; i < words.length; i++) {
            const wordRef = wordRefs.current[i];
            if (!wordRef) continue;
            if (reversed) {
                wordRef.style.right = `${accWidth}px`;
            } else {
                wordRef.style.left = `${accWidth}px`;
            }
            const word = words[i];
            const wordWidth = textWidth(wordRef);
            accWidth += wordWidth + wordSpacePx;
        }

        const intervalId = setInterval(() => {
            for (let i = 0; i < words.length; i++) {
                const wordRef = wordRefs.current[i];
                if (!wordRef || !wordRef.offsetParent) continue;
                const { left: parLeft, right: parRight } = wordRef.offsetParent.getBoundingClientRect();
                const { left: absLeft, right: absRight } = wordRef.getBoundingClientRect();
                const relLeft = absLeft - parLeft;
                const relRight = parRight - absRight;
                const wordWidth = textWidth(wordRef);

                if (reversed) {
                    let nextRelRight = relRight - 1;
                    if (nextRelRight < -wordWidth) {
                        nextRelRight += accWidth;
                    }
                    wordRef.style.right = `${nextRelRight}px`;
                } else {
                    let nextRelLeft = relLeft - 1;
                    if (nextRelLeft < -wordWidth) {
                        nextRelLeft += accWidth;
                    }
                    wordRef.style.left = `${nextRelLeft}px`;
                }

            }
        }, MsPerPx);

        return () => clearInterval(intervalId);
    }, [words, wordSpacePx, reversed]);

    return <div className={clsx(
        "relative w-full overflow-hidden",
        typeof style === "string" && style,
    )}
        style={{ height: fontSizePx }}
    >
        {words.map((word, idx) => (
            <p
                key={idx}
                ref={el => { wordRefs.current[idx] = el }}
                style={{ fontSize: fontSizePx, height: fontSizePx }}
                className={clsx(
                    "absolute uppercase font-bold text-nowrap leading-tight",
                    textStyle
                )}
            >
                {word}
            </p>
        ))}
    </div>
}