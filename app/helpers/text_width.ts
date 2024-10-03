export default function textWidth(ele: HTMLElement, text?: string): number {
    if (text === undefined) {
        if (ele.tagName.toLowerCase() === "input") {
            text = (ele as HTMLInputElement).value;
        } else {
            text = ele.textContent || "";
        }
    }
    text = text.replace(/ /g, '\u00A0');

    const temp = cloneAsPTag(ele);
    temp.style.position = "absolute";
    temp.style.visibility = 'hidden';
    temp.style.whiteSpace = 'nowrap';
    temp.textContent = text;

    document.body.appendChild(temp);

    const width = temp.offsetWidth;

    document.body.removeChild(temp);

    return width;
}

function cloneAsPTag(ele: HTMLElement): HTMLParagraphElement {
    const p = document.createElement("p");

    const styles = window.getComputedStyle(ele);
    p.style.font = styles.font;
    p.style.fontSize = styles.fontSize;
    p.style.fontFamily = styles.fontFamily;
    p.style.fontWeight = styles.fontWeight;
    p.style.letterSpacing = styles.letterSpacing;

    return p;
}