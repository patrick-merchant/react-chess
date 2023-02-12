import { FC } from "react";
import { generateCodes } from "../../payloads/tiles";
import { Label } from "../label";
import { Side } from "../label/types";
import { Tile } from "../tile";
import { IBoardProps } from "./types";

export const Board: FC<IBoardProps> = ({}) => {
  const tiles = generateCodes();
  return (
    <div className="relative left-16 top-16 w-[512px] border border-black">
      <Label side={Side.LEFT} />
      <Label side={Side.TOP} />
      <Label side={Side.RIGHT} />
      <Label side={Side.BOTTOM} />
      <div className="grid grid-cols-8">
        {tiles.map((tile) => (
          <Tile code={tile} />
        ))}
      </div>
    </div>
  );
};
