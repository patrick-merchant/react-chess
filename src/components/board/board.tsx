import { FC, useEffect, useState } from "react";
import { addPieces } from "../../payloads/pieces";
import { generateCodes } from "../../payloads/tiles";
import { Label } from "../label";
import { Side } from "../label/types";
import { Tile } from "../tile";
import { Code } from "../tile/types";
import { IBoardProps } from "./types";
import { TakenPieces } from "../taken-pieces";

export const Board: FC<IBoardProps> = () => {

  const [targetPosition, setTargetPosition] = useState(null);
  const [initial, setInitial] = useState(null);
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const [takenPieces, setTakenPieces] = useState(new Array);

  const tiles = generateCodes();
  const pieces = addPieces();

  const matchCodes = (tile: Code) => {
    for (let piece of pieces) {
      if (
        piece.location.letter == tile.letter &&
        piece.location.number == tile.number
      ) {
        return piece;
      }
    }
  };

  useEffect(() => {
    console.log("inital: ", initial);
  })

  useEffect(() => {
    console.log("targetPosition: ", targetPosition);
  })

  return (
    <div className="flex flex-col space-y-16">
    <div className="relative mt-32 border border-black">
      {Object.values(Side).map((side) => (
         <Label key={side} side={side}/>
      ))}
      <div className="grid grid-cols-8">
        {tiles.map((tile) => (
          <Tile
            key={tile.letter + tile.number}
            code={tile}
            startingPieceProps={matchCodes(tile)}
            targetPosition={targetPosition}
            setTargetPosition={setTargetPosition}
            initial={initial}
            setInitial={setInitial}
            isWhiteTurn={isWhiteTurn}
            setIsWhiteTurn={setIsWhiteTurn}
            takenPieces={takenPieces}
            setTakenPieces={setTakenPieces}
          />
        ))}
      </div>
    </div>
    <TakenPieces takenPieces={takenPieces}/>
    </div>
  );
};
