import { FC } from "react";
import { halfLetters } from "../../payloads/tiles";
import { ITileProps } from "./types";

export const Tile: FC<ITileProps> = ({ code }) => {
  if (
    (code.number % 2 === 0 && halfLetters.includes(code.letter)) ||
    (code.number % 2 !== 0 && !halfLetters.includes(code.letter))
  ) {
    return <div className="w-16 h-16 bg-orange-300"></div>;
  } else {
    return <div className="w-16 h-16 bg-yellow-700"></div>;
  }
};
