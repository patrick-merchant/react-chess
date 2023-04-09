import { Code } from "../components/tile/types";

export const halfLetters = ["a", "c", "e", "g"];

export const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

export const generateCodes = () => {
  const tiles: Code[] = [];

  numbers.forEach((number) => {
    letters.forEach((letter) => {
      const code: Code = {
        letter: letter,
        number: number,
      };
      tiles.push(code);
    });
  });
  return tiles;
};
