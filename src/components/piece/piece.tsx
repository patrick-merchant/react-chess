import { FC } from "react";
import { IPieceProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Piece: FC<IPieceProps> = ({ ...props }) => {

  return (
    <div id={props.location.letter + props.location.number} className="flex h-full justify-center items-center">
      <FontAwesomeIcon icon={props.icon} color={props.isWhite ? "white" : "black"} size={props.pieceSize ? props.pieceSize : "3x"}/>
    </div>
  );
};
