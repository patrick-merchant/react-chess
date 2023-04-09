import { FC } from "react";
import { IPieceProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Piece: FC<IPieceProps> = ({ ...props }) => {
  function solid(): import("@fortawesome/fontawesome-svg-core").IconProp {
    throw new Error("Function not implemented.");
  }

  return (
    <div id={props.location.letter + props.location.number} className="flex h-full justify-center items-center">
      <FontAwesomeIcon icon={props.icon} color={props.isWhite ? "white" : "black"} size="3x"/>
    </div>
  );
};
