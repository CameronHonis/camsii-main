export default function elementsIntersect(a: HTMLElement, b: HTMLElement): boolean {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();

    return (aRect.left >= bRect.left && aRect.left <= bRect.right && aRect.top >= bRect.top && aRect.top <= bRect.bottom) ||
        (aRect.right >= bRect.left && aRect.right <= bRect.right && aRect.bottom >= bRect.top && aRect.bottom <= bRect.bottom)
}
