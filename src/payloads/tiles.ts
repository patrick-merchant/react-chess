import { ITileProps } from "../components/tile/types";
import { Code } from "../components/tile/types";

export const halfLetters = ["a", "c", "e", "g"];

const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

export const generateCodes = () => {
  const tiles: Code[] = [];

  letters.forEach((letter) => {
    numbers.forEach((number) => {
      const code: Code = {
        letter: letter,
        number: number,
      };
      tiles.push(code);
    });
  });
  return tiles;
};
