import { FC, useEffect, useState } from "react";
import { generateTileCodes } from "../../payloads/tiles";
import { Label } from "../label";
import { Side } from "../label/types";
import { Tile } from "../tile";
import { IBoardProps } from "./types";
import { TakenPieces } from "../taken-pieces";
import { addPieces } from "../../payloads/pieces";
import { PieceClass } from "../piece/class";

export const Board: FC<IBoardProps> = () => {
  const [targetPosition, setTargetPosition] = useState(null);
  const [initial, setInitial] = useState(null);
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const [takenPieces, setTakenPieces] = useState(new Array<PieceClass>());
  const [statefulPieces, setStatefulPieces] = useState(addPieces());

  const tiles = generateTileCodes();

  const matchCodes = (tile: string) => {
    let tempPiece: PieceClass | null = null;
    statefulPieces.forEach((piece, position) => {
      if (position == tile) {
        tempPiece = piece;
      }
    });
    return tempPiece;
  };

  useEffect(() => {
    console.log("inital: ", initial);
  });

  useEffect(() => {
    console.log("targetPosition: ", targetPosition);
  });

  return (
    <div className="flex flex-col space-y-16">
      <div className="relative mt-32 border border-black">
        {Object.values(Side).map((side) => (
          <Label key={side} side={side} />
        ))}
        <div className="grid grid-cols-8">
          {tiles.map((tile) => (
            <Tile
              key={tile}
              code={tile}
              piece={matchCodes(tile)}
              setTargetPosition={setTargetPosition}
              initial={initial}
              setInitial={setInitial}
              isWhiteTurn={isWhiteTurn}
              setIsWhiteTurn={setIsWhiteTurn}
              takenPieces={takenPieces}
              setTakenPieces={setTakenPieces}
              targetPosition={targetPosition}
              statefulPieces={statefulPieces}
              setStatefulPieces={setStatefulPieces}
            />
          ))}
        </div>
      </div>
      <TakenPieces takenPieces={takenPieces} />
    </div>
  );
};
