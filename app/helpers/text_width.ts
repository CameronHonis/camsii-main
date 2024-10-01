export default function textWidth(content: string, ele: HTMLElement): number {
    const tempEle = ele.cloneNode(true) as HTMLParagraphElement;

    tempEle.textContent = content;
    tempEle.style.position = 'absolute';
    tempEle.style.visibility = 'hidden';
    tempEle.style.whiteSpace = 'nowrap';

    // Add the paragraph to the document body
    document.body.appendChild(tempEle);

    // Get the width
    const width = tempEle.offsetWidth;

    // Remove the temporary paragraph
    document.body.removeChild(tempEle);

    return width;
}