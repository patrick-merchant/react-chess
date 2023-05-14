export const halfLetters = ["a", "c", "e", "g"];

export const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];

export const generateTileCodes = () => {
  const tiles: string[] = [];
  for (let i = numbers.length - 1; i >= 0; i--) {
    letters.forEach((letter) => {
      const code: string = letter + numbers[i];
      tiles.push(code);
    });
  }
  return tiles;
};
