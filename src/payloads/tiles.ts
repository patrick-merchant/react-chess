export const halfLetters = ["a", "c", "e", "g"];

export const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];

export const generateTileCodes = () => {
  const tiles: string[] = [];
  numbers.forEach((number) => {
    letters.forEach((letter) => {
      const code: string = letter + number;
      tiles.push(code);
    });
  });
  return tiles;
};
