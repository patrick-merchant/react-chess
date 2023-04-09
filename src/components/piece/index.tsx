import { FC } from "react";
import { IPieceProps } from "./types";

export const Piece: FC<IPieceProps> = ({ ...props }) => {
  return (
    <div id={props.location.letter + props.location.number}>
      <p>{props.type}</p>
    </div>
  );
};
