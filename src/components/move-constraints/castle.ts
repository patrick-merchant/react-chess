import {
  castleClickedSquares,
  castleRookTargetSquares,
} from "../../payloads/castling";
import { PieceClass } from "../piece/class";
import { PieceType } from "../piece/types";

export const checkForCastle = (
  movePiece: PieceClass,
  movedKings: Array<string>,
  startPosition: string,
  endPosition: string,
  movedRooks: Array<string>,
  statefulPieces: Map<string, PieceClass>,
  setStatefulPieces: React.Dispatch<
    React.SetStateAction<Map<string, PieceClass>>
  >,
  toggleTurn: () => void,
  setMovedRooks: React.Dispatch<React.SetStateAction<Array<string>>>,
  setMovedKings: React.Dispatch<React.SetStateAction<Array<string>>>
) => {
  // When King moves, add King start position to array.
  // When Rook moves, add Rook start position to array.
  if (
    movePiece.getType() === PieceType.KING &&
    !movedKings.includes(startPosition) &&
    !movedRooks.includes(castleClickedSquares.get(endPosition) as string) &&
    endPosition[1] == startPosition[1] &&
    (endPosition[0] == "c" || endPosition[0] == "g")
  ) {
    const castlePosition = castleClickedSquares.get(endPosition);
    if (castlePosition != undefined) {
      let tempStateful = new Map(statefulPieces);
      // switch king
      tempStateful.set(endPosition, movePiece);
      tempStateful.delete(startPosition);
      // switch castle
      tempStateful.set(
        castleRookTargetSquares.get(endPosition) as string,
        statefulPieces.get(castlePosition as string) as PieceClass
      );
      tempStateful.delete(castlePosition as string);

      // take Piece
      setStatefulPieces(tempStateful);
      toggleTurn();

      setMovedRooks([...movedRooks, castlePosition as string]);
    }
    setMovedKings([...movedKings, startPosition]);
    return;
  }
};
