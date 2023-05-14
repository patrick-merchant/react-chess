import { FC, useEffect, useState } from "react";
import { halfLetters } from "../../payloads/tiles";
import { Piece } from "../piece";
import { ITileProps } from "./types";
import { PieceClass } from "../piece/class";
import {
  checkPieceMoveAbility,
  checkIfPieceInWay,
} from "../move-constraints/move-constraints";

export const Tile: FC<ITileProps> = ({
  code,
  piece,
  targetPosition,
  setTargetPosition,
  initial,
  setInitial,
  takenPieces,
  setTakenPieces,
  statefulPieces,
  setStatefulPieces,
  isWhiteTurn,
  setIsWhiteTurn,
}) => {
  const [isInitial, setIsInitial] = useState(false);
  const [isTarget, setIsTarget] = useState(false);

  useEffect(() => {
    if (initial === code) {
      setIsInitial(true);
    } else {
      setIsInitial(false);
    }

    if (targetPosition == code) {
      setIsTarget(false);
    } else {
      setIsTarget(false);
    }
  }, [initial, targetPosition]);

  const handleMove = (startPosition: string, endPosition: string) => {
    const pieceToMove = statefulPieces.get(startPosition);

    if (pieceToMove) {
      // check if there is a piece in the way of the move's path
      const isPieceInWay = checkIfPieceInWay(
        startPosition,
        endPosition,
        statefulPieces,
        pieceToMove
      );
      if (isPieceInWay) {
        console.log("Invalid move: Piece in move path");
        return;
      }

      // check if the move is compatible with the piece's abilities
      const canPiecePerformMove = checkPieceMoveAbility(
        pieceToMove,
        startPosition,
        endPosition,
        statefulPieces
      );
      console.log(canPiecePerformMove);
      if (!canPiecePerformMove) {
        console.log("Invalid move: This piece cannot move like that");
        return;
      }
      let tempStateful = statefulPieces;
      tempStateful.set(endPosition, pieceToMove);
      tempStateful.delete(startPosition);
      setStatefulPieces(tempStateful);
    }
  };

  const handleClick = (code: string, piece: PieceClass | null) => {
    if (!piece && initial) {
      // if tile has no piece on it and an initial piece has been selected:
      console.log("case 1");
      setTargetPosition(code);
      handleMove(initial, code);
      setInitial(null);
    } else if (
      piece &&
      initial &&
      !(initial == code) &&
      piece?.getIsWhite() != statefulPieces.get(initial)?.getIsWhite()
    ) {
      // if tile has a piece on it and that piece is not at the same position as the initially selected piece, and is not the same color, and an inital piece has been selected:
      console.log("case 2");
      handleMove(initial, code);
      setTakenPieces([...takenPieces, piece]);
      setInitial(null);
    } else if (
      (piece &&
        initial &&
        !(initial == code) &&
        piece.getIsWhite() == statefulPieces.get(initial)?.getIsWhite()) ||
      (piece && !initial)
    ) {
      // if tile has a piece on it and that piece is not at the same position as the initially selected piece, but is the same color:
      console.log("case 3");
      setInitial(code);
    } else {
      // if tile is the same as initial.
      console.log("case 4");
      setInitial(null);
    }
  };

  if (
    (Number(code[1]) % 2 === 0 && halfLetters.includes(code[0])) ||
    (Number(code[1]) % 2 !== 0 && !halfLetters.includes(code[0]))
  ) {
    return (
      <div
        id={code}
        className={`w-16 h-16 bg-yellow-700 ${
          isInitial || isTarget ? "opacity-70" : "opacity-100"
        }`}
        onClick={() => handleClick(code, piece)}
      >
        {piece && (
          <Piece
            isWhite={piece.getIsWhite()}
            icon={piece.getIcon()}
            type={piece.getType()}
            pieceSize={piece.getPieceSize()}
          />
        )}
      </div>
    );
  } else {
    return (
      <div
        id={code}
        className={`w-16 h-16 bg-orange-300 ${
          isInitial || isTarget ? "opacity-70" : "opacity-100"
        }`}
        onClick={() => handleClick(code, piece)}
      >
        {piece && (
          <Piece
            isWhite={piece.getIsWhite()}
            icon={piece.getIcon()}
            type={piece.getType()}
            pieceSize={piece.getPieceSize()}
          />
        )}
      </div>
    );
  }
};
