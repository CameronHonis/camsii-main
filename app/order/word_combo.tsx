"use client"

import React from "react";

type Props = {
    combo: string;
}

export default function WordCombo(props: Props) {
    const [isExpanded, setIsExpanded] = React.useState(false);

    React.useEffect(() => {
        const onDocumentClick = () => {
            setIsExpanded(false);
        }
        document.addEventListener("click", onDocumentClick);
        return () => document.addEventListener("click", onDocumentClick);
    }, []);

    const onComboClick = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsExpanded(true);
    }, []);
}