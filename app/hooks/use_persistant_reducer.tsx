"use client";
import React, { Reducer } from "react";

export default function usePersistantReducer<S, A>(
    key: string,
    reducer: Reducer<S, A>,
    initState: S,
    stringer: (state: S) => string,
    parser: (obj: string) => S,
    persistsAfterSession: boolean
): [S, React.Dispatch<A>] {
    const [state, dispatch] = React.useReducer(reducer, undefined, () => {
        try {
            const rawVal = persistsAfterSession ? localStorage.getItem(key) : sessionStorage.getItem(key);
            if (!rawVal)
                return initState;
            return parser(rawVal);
        } catch {
            return initState;
        }
    });

    React.useEffect(() => {
        if (persistsAfterSession) {
            localStorage.setItem(key, stringer(state));
        } else {
            sessionStorage.setItem(key, stringer(state));
        }
    }, [key, persistsAfterSession, state, stringer]);

    return [state, dispatch];
}