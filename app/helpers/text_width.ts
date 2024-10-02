export default function textWidth(ele: HTMLElement): number {
    let content: string = "";
    if (ele.tagName.toLowerCase() === "input") {
        content = (ele as HTMLInputElement).value;
    } else {
        content = ele.textContent || "";
    }
    const temp = cloneAsPTagWithContent(content, ele);
    temp.style.position = "absolute";
    temp.style.visibility = 'hidden';
    temp.style.whiteSpace = 'nowrap';

    // Add the paragraph to the document body
    document.body.appendChild(temp);

    // Get the width
    const width = temp.offsetWidth;

    // Remove the temporary paragraph
    document.body.removeChild(temp);

    return width;
}

function cloneAsPTagWithContent(content: string, ele: HTMLElement): HTMLParagraphElement {
    const p = document.createElement("p");
    p.textContent = content;
    
    const styles = window.getComputedStyle(ele);
    p.style.font = styles.font;
    p.style.fontSize = styles.fontSize;
    p.style.fontFamily = styles.fontFamily;
    p.style.fontWeight = styles.fontWeight;
    p.style.letterSpacing = styles.letterSpacing;

    return p;
}