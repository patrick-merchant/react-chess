import { FC } from "react";
import { ITakenPieceProps } from "./types";
import { Piece } from "../piece";

export const TakenPieces: FC<ITakenPieceProps> = ({takenPieces}) => {

  return (
    <div className="flex flex-col space-y-4 items-center">
    <div className="flex flex-row">
      {takenPieces.filter((piece) => piece.isWhite).map((takenPiece, index) => (
        <Piece key={index}
        isWhite={takenPiece.isWhite}
        location={takenPiece.location}
        type={takenPiece.type}
        icon={takenPiece.icon}
        pieceSize="2x"
        />    
      ))}
    </div>
    <div className="flex flex-row">
    {takenPieces.filter((piece) => !piece.isWhite).map((takenPiece, index) => (
      <Piece key={index}
      isWhite={takenPiece.isWhite}
      location={takenPiece.location}
      type={takenPiece.type}
      icon={takenPiece.icon}
      pieceSize="2x"
      />    
    ))}
  </div>
  </div>
  );
};
