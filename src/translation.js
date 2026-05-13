export const translateToEnglish = async (text) => {
    if (!text || text.trim() === '') return '';

    try {
        const response = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`
        );

        if (!response.ok) {
            throw new Error('Translation failed');
        }

        const data = await response.json();
        const translatedText = data[0][0][0];

        return translatedText
            .toLowerCase()
            .replace(/[^\w\s]/g, '')
            .replace(/\s+/g, '_');

    } catch (error) {
        console.error('Translation error:', error);
        return transliterateToEnglish(text);
    }
};

const transliterateToEnglish = (text) => {
    const cyrillicToLatin = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
        'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
        'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
        'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
        ' ': '_', '-': '_'
    };

    return text
        .toLowerCase()
        .split('')
        .map(char => cyrillicToLatin[char] || (char.match(/[a-z0-9]/) ? char : ''))
        .join('')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
};