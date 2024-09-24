"use client";

import { useTypewriter } from "@/app/hooks/use_typewriter";
import clsx from "clsx";
import React from "react";

const WORD_DURATION_MS = 3000;
const NEXT_CHAR_MS = 100;
const CURSOR_BLINK_MS = 750;
const WORDS = ["yeehaw yall", "howdy partner", "god bless texas", "happy anniversary", "happy new years", "happier than ever"];

function getNextWord(prev: string): string {
    const currIdx = WORDS.findIndex(word => word === prev);
    const nextIdx = (currIdx + 1) % WORDS.length;
    return WORDS[nextIdx];
}

export default function CustomizeAnim() {
    const [display, targ, setTarg] = useTypewriter("", WORDS[0], NEXT_CHAR_MS);
    const [isCursorVisible, setIsCursorVisible] = React.useState(true);

    React.useEffect(() => {
        if (display !== targ) return;
        const nextWord = getNextWord(display);

        const timeoutId = setTimeout(() => {
            setTarg(nextWord);
        }, WORD_DURATION_MS);

        return () => clearTimeout(timeoutId);
    }, [display, targ, setTarg]);

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsCursorVisible(!isCursorVisible);
        }, CURSOR_BLINK_MS);

        return () => clearTimeout(timeoutId);
    }, [isCursorVisible]);

    const isTyping = display !== targ;
    return <div className="text-[60px] font-mono uppercase">
        {`> ${display}`}
        <div className={clsx(
            "inline-block bg-white w-[0.8ch] h-[1em] align-text-top",
            !isTyping && !isCursorVisible && "invisible"
        )}></div>
    </div>
}