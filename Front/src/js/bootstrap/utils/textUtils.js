export function findNearestSpace(text, index) {
    if (text[index] === ' ') return index;
    let left = index - 1;
    let right = index + 1;
    while (left >= 0 || right < text.length) {
        if (left >= 0 && text[left] === ' ') return left;
        if (right < text.length && text[right] === ' ') return right;
        left--;
        right++;
    }
    return index;
}
