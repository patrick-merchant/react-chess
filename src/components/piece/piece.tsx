import { FC } from "react";
import { IPieceProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";

export const Piece: FC<IPieceProps> = ({
  isWhite,
  icon,
  pieceSize,
}: IPieceProps) => {
  const safeId = uuidv4();
  return (
    <div id={safeId} className="flex h-full justify-center items-center">
      <FontAwesomeIcon
        icon={icon}
        color={isWhite ? "white" : "black"}
        size={pieceSize ? pieceSize : "3x"}
      />
    </div>
  );
};
