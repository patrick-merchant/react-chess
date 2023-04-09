import { FC } from "react";
import { addPieces } from "../../payloads/pieces";
import { generateCodes } from "../../payloads/tiles";
import { Label } from "../label";
import { Side } from "../label/types";
import { Tile } from "../tile";
import { Code } from "../tile/types";
import { IBoardProps } from "./types";

export const Board: FC<IBoardProps> = () => {
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

  return (
    <div className="relative left-16 top-16 w-[512px] border border-black">
      <Label side={Side.LEFT} />
      <Label side={Side.TOP} />
      <Label side={Side.RIGHT} />
      <Label side={Side.BOTTOM} />
      <div className="grid grid-cols-8">
        {tiles.map((tile) => (
          <Tile
            key={tile.letter + tile.number}
            code={tile}
            pieceProps={matchCodes(tile)}
          />
        ))}
      </div>
    </div>
  );
};
