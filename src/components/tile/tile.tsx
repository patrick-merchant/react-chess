import { FC, useEffect, useState } from "react";
import { halfLetters } from "../../payloads/tiles";
import { Piece } from "../piece";
import { ITileProps } from "./types";
import { PieceClass } from "../piece/class";
import {
  checkPieceMoveAbility,
  checkIfPieceInWay,
} from "../move-constraints/move-constraints";
import { checkForCheck, enforceCheck } from "../check-handling/check-for-check";
import { checkForCheckmate } from "../check-handling/checkmate";

export const Tile: FC<ITileProps> = ({
  code,
  piece,
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

  const toggleTurn = () => {
    setIsWhiteTurn(!isWhiteTurn);
  };

  useEffect(() => {
    if (initial === code) {
      setIsInitial(true);
    } else {
      setIsInitial(false);
    }
  }, [initial]);

  const handleMove = (startPosition: string, endPosition: string) => {
    const movePiece = statefulPieces.get(startPosition);

    if (movePiece) {
      // check if there is a piece in the way of the move's path
      const isPieceInWay = checkIfPieceInWay(
        startPosition,
        endPosition,
        statefulPieces,
        movePiece
      );
      if (isPieceInWay) {
        console.log("Invalid move: Piece in move path");
        return;
      }

      // check if the move is compatible with the piece's abilities
      const canPiecePerformMove = checkPieceMoveAbility(
        movePiece,
        startPosition,
        endPosition,
        statefulPieces
      );
      if (!canPiecePerformMove) {
        console.log("Invalid move: This piece cannot move like that");
        return;
      }

      let tempStateful = new Map(statefulPieces);
      tempStateful.set(endPosition, movePiece);
      tempStateful.delete(startPosition);

      // check for check
      if (enforceCheck(movePiece, tempStateful)) {
        console.log(
          "Invalid move: You cannot make a move that puts you in check"
        );
        return;
      }

      // place taken piece next to board
      if (statefulPieces.get(endPosition)) {
        const takenPiece = statefulPieces.get(endPosition);
        takenPiece && setTakenPieces([...takenPieces, takenPiece]);
      }

      setStatefulPieces(tempStateful);
      toggleTurn();

      if (checkForCheck(movePiece, tempStateful)) {
        if (checkForCheckmate(movePiece, tempStateful, endPosition)) {
          console.log("King can't move and threatening piece can't be taken - block");
        } else {
          console.log("Check!");
        }
      }
    }
  };

  const handleClick = (code: string, piece: PieceClass | null) => {
    console.log(code);

    if (!piece && initial) {
      // if tile has no piece on it and an initial piece has been selected:
      handleMove(initial, code);
      setInitial(null);
    } else if (
      piece &&
      initial &&
      !(initial == code) &&
      piece?.getIsWhite() != statefulPieces.get(initial)?.getIsWhite()
    ) {
      // if tile has a piece on it and that piece is not at the same position as the initially selected piece, and is not the same color, and an inital piece has been selected:
      handleMove(initial, code);
      setInitial(null);
    } else if (
      (piece &&
        initial &&
        !(initial == code) &&
        piece.getIsWhite() == statefulPieces.get(initial)?.getIsWhite()) ||
      (piece?.getIsWhite() === isWhiteTurn && !initial)
    ) {
      // if tile has a piece on it and that piece is not at the same position as the initially selected piece, but is the same color - OR no initial has been selected:
      setInitial(code);
    } else if (
      (piece &&
        initial &&
        !(initial == code) &&
        piece.getIsWhite() !== statefulPieces.get(initial)?.getIsWhite()) ||
      (piece?.getIsWhite() !== isWhiteTurn && !initial)
    ) {
      console.log("It is not your turn!");
    } else {
      // if tile is the same as initial.
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
          isInitial ? "opacity-70" : "opacity-100"
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
          isInitial ? "opacity-70" : "opacity-100"
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
