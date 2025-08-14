const title = document.getElementById('title');
const MAX_CHARS_PER_LINE = 35;
const MAX_LINES = 4;

function formatText(text) {
    text = text.slice(0, MAX_CHARS_PER_LINE * MAX_LINES);
    let lines = [];
    for (let i = 0; i < text.length; i += MAX_CHARS_PER_LINE) {
        lines.push(text.slice(i, i + MAX_CHARS_PER_LINE));
    }
    return lines.join('\n');
}

function updateFontAndStroke() {
    const textLength = title.textContent.replace(/\n/g, '').length || 1;

    const fontSize = Math.max(200 - (textLength - 1) * 10, 40);
    title.style.fontSize = fontSize + 'px';

    title.style.webkitTextStroke = (fontSize * 0.1) + 'px black';
}

function updateHash() {
    location.hash = encodeURIComponent(title.textContent.replace(/\n/g, ' '));
}

function setText(newText) {
    title.textContent = formatText(newText);
    updateFontAndStroke();
    updateHash();
}

if (location.hash.length > 1) {
    setText(decodeURIComponent(location.hash.slice(1)));
} else {
    updateFontAndStroke();
}

document.addEventListener('keydown', (e) => {
    const cleanText = title.textContent.replace(/\n/g, '');
    if (e.key.length === 1) {
        setText(cleanText + e.key);
    } else if (e.key === 'Backspace') {
        setText(cleanText.slice(0, -1));
    }
});