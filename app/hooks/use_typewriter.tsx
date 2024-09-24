import React from "react";

const DEFAULT_NEXT_CHAR_MS = 250

function hasCommonBase(a: string, b: string): boolean {
    if (a.length > b.length) {
        // swap a and b
        let c = a;
        a = b;
        b = c;
    }
    return a === b.substring(0, a.length);
}

export function useTypewriter(initVal: string, initTarg: string, nextCharMs: number = DEFAULT_NEXT_CHAR_MS): [curr: string, targ: string, setTarg: React.Dispatch<React.SetStateAction<string>>] {
    const [curr, setCurr] = React.useState(initVal);
    const [targ, setTarg] = React.useState(initTarg);

    React.useEffect(() => {
        if (curr === targ) return;

        const timeoutId = setTimeout(() => {
            let nextCurr: string;
            if (curr.length < targ.length && hasCommonBase(curr, targ)) {
                nextCurr = targ.substring(0, curr.length + 1);
            } else {
                nextCurr = curr.substring(0, curr.length - 1);
            }
            setCurr(nextCurr);
        }, nextCharMs);

        return () => clearTimeout(timeoutId);
    }, [curr, targ, nextCharMs]);

    return [curr, targ, setTarg];
}