import { FC } from "react";
import { generateCodes } from "../../payloads/tiles";
import { Tile } from "../tile";
import { IBoardProps } from "./types";

export const Board: FC<IBoardProps> = ({}) => {
  const tiles = generateCodes();
  return (
    <div className="grid grid-cols-8 w-[512px] border border-black">
      {tiles.map((tile) => (
        <Tile code={tile} />
      ))}
    </div>
  );
};
