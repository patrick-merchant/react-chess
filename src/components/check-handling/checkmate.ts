import { letters, numbers } from "../../payloads/tiles";
import { PieceClass } from "../piece/class";
import {
  checkIfCheckCanBeBlocked,
  checkIfThreatCouldBeTaken,
  enforceCheck,
  filterMapByValue,
  getOppKing,
} from "./check-for-check";

export const checkForCheckmate = (
  pieceJustMoved: PieceClass,
  statefulPieces: Map<string, PieceClass>,
  pieceJustMovedPosition: string
) => {
  // get position of king currently in check.
  const { oppKingPosition, oppKingPiece } = getOppKing(
    pieceJustMoved,
    statefulPieces
  );

  // get opponent's pieces
  const opponentsPieces = filterMapByValue(
    statefulPieces,
    (piece) => piece.getIsWhite() == oppKingPiece.getIsWhite()
  );

  // can piece threatening King be taken?
  const canThreatBeTaken = checkIfThreatCouldBeTaken(
    opponentsPieces,
    pieceJustMovedPosition,
    statefulPieces
  );
  if (canThreatBeTaken) {
    console.log("THREAT CAN BE TAKEN");
    return false;
  } else {
    console.log("THREAT CANNOT BE TAKEN");
  }

  // can check be blocked by another of the king-player's pieces?
  const canCheckBeBlocked = checkIfCheckCanBeBlocked(
    pieceJustMovedPosition,
    oppKingPosition,
    statefulPieces,
    opponentsPieces
  );
  if (canCheckBeBlocked) {
    console.log("CHECK CAN BE BLOCKED");
    return false;
  } else {
    console.log("CHECK CANNOT BE BLOCKED");
  }

  // can king move out of check?
  const possKingMoves = new Array<string>();

  const positionsMatrix = [
    letters[letters.indexOf(oppKingPosition[0]) + 1] +
      numbers[numbers.indexOf(oppKingPosition[1])],
    letters[letters.indexOf(oppKingPosition[0])] +
      numbers[numbers.indexOf(oppKingPosition[1]) + 1],
    letters[letters.indexOf(oppKingPosition[0]) + 1] +
      numbers[numbers.indexOf(oppKingPosition[1]) + 1],
    letters[letters.indexOf(oppKingPosition[0]) - 1] +
      numbers[numbers.indexOf(oppKingPosition[1])],
    letters[letters.indexOf(oppKingPosition[0])] +
      numbers[numbers.indexOf(oppKingPosition[1]) - 1],
    letters[letters.indexOf(oppKingPosition[0]) - 1] +
      numbers[numbers.indexOf(oppKingPosition[1]) - 1],
    letters[letters.indexOf(oppKingPosition[0]) + 1] +
      numbers[numbers.indexOf(oppKingPosition[1]) - 1],
    letters[letters.indexOf(oppKingPosition[0]) - 1] +
      numbers[numbers.indexOf(oppKingPosition[1]) + 1],
  ];

  for (const position of positionsMatrix) {
    if (
      validatePosition(position) &&
      statefulPieces.get(position)?.getIsWhite() !== oppKingPiece.getIsWhite()
    ) {
      possKingMoves.push(position);
    }
  }

  console.log("possible king moves: ", possKingMoves);

  for (const possKingMove of possKingMoves) {
    let tempStateful = new Map(statefulPieces);
    tempStateful.set(possKingMove, oppKingPiece);
    tempStateful.delete(oppKingPosition);
    if (!enforceCheck(oppKingPiece, tempStateful)) {
      console.log("KING CAN MOVE OUT OF CHECK");

      return false;
    }
    console.log("KING CANNOT MOVE OUT OF CHECK");
  }
  return true;
};

export const validatePosition = (position: string) => {
  const letterPattern = /^[a-zA-Z]$/;
  const numberPattern = /^-?\d+(\.\d+)?$/;
  if (
    position.length === 2 &&
    letterPattern.test(position[0]) &&
    numberPattern.test(position[1])
  ) {
    return true;
  }
  return false;
};
