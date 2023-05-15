import { letters, numbers } from "../../payloads/tiles";
import { PieceClass } from "../piece/class";
import { enforceCheck, getOppKing } from "./check-for-check";

export const checkForCheckmate = (
  pieceJustMoved: PieceClass,
  statefulPieces: Map<string, PieceClass>
) => {
  // get position of king currently in check.
  const { oppKingPosition, oppKingPiece } = getOppKing(
    pieceJustMoved,
    statefulPieces
  );

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
      return false;
    }
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
