export function getShuffledLetters() {
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ*";
    let letters = [];
    for (let i = 0; i < 16; i++) {
        letters.push(alphabets.charAt(Math.floor(Math.random() * alphabets.length)));
    }
    return letters;
}