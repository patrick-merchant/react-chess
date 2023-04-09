import { FC } from "react";
import { halfLetters } from "../../payloads/tiles";
import { Piece } from "../piece";
import { ITileProps } from "./types";

export const Tile: FC<ITileProps> = ({ code, pieceProps }) => {
  if (
    (code.number % 2 === 0 && halfLetters.includes(code.letter)) ||
    (code.number % 2 !== 0 && !halfLetters.includes(code.letter))
  ) {
    return (
      <div id={code.letter + code.number} className="w-16 h-16 bg-orange-300">
        {pieceProps && (
          <Piece
            isWhite={pieceProps.isWhite}
            isTaken={pieceProps.isTaken}
            location={pieceProps.location}
            type={pieceProps.type}
            icon={pieceProps.icon}
          />
        )}
      </div>
    );
  } else {
    return (
      <div id={code.letter + code.number} className="w-16 h-16 bg-yellow-700">
        {pieceProps && (
          <Piece
            isWhite={pieceProps?.isWhite}
            isTaken={pieceProps.isTaken}
            location={pieceProps.location}
            type={pieceProps.type}
            icon={pieceProps.icon}

          />
        )}
      </div>
    );
  }
};
