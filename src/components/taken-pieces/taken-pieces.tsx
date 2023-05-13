import { FC } from "react";
import { ITakenPieceProps } from "./types";
import { Piece } from "../piece";

export const TakenPieces: FC<ITakenPieceProps> = ({ takenPieces }) => {
  return (
    <div className="flex flex-col space-y-4 items-center">
      <div className="flex flex-row">
        {takenPieces
          .filter((piece) => piece.getIsWhite())
          .map((takenPiece, index) => (
            <Piece
              key={index}
              isWhite={takenPiece.getIsWhite()}
              type={takenPiece.getType()}
              icon={takenPiece.getIcon()}
              pieceSize="2x"
            />
          ))}
      </div>
      <div className="flex flex-row">
        {takenPieces
          .filter((piece) => !piece.getIsWhite())
          .map((takenPiece, index) => (
            <Piece
              key={index}
              isWhite={takenPiece.getIsWhite()}
              type={takenPiece.getType()}
              icon={takenPiece.getIcon()}
              pieceSize="2x"
            />
          ))}
      </div>
    </div>
  );
};
