export default function pTagWidth(content: string, basePTag: HTMLParagraphElement): number {
    const ele = basePTag.cloneNode(true) as HTMLParagraphElement;

    ele.textContent = content;
    ele.style.position = 'absolute';
    ele.style.visibility = 'hidden';
    ele.style.whiteSpace = 'nowrap';

    // Add the paragraph to the document body
    document.body.appendChild(ele);

    // Get the width
    const width = ele.offsetWidth;

    // Remove the temporary paragraph
    document.body.removeChild(ele);

    return width;
}