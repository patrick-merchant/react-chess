import {
  checkIfPieceInWay,
  checkPieceMoveAbility,
} from "../move-constraints/move-constraints";
import { PieceClass } from "../piece/class";
import { PieceType } from "../piece/types";

export function filterMapByValue<K, V>(
  originalMap: Map<K, V>,
  predicate: (value: V) => boolean
): Map<K, V> {
  return new Map(
    Array.from(originalMap).reduce((entries, [key, value]) => {
      if (predicate(value)) {
        entries.push([key, value]);
      }
      return entries;
    }, [] as [K, V][])
  );
}

export const enforceCheck = (
  pieceToMove: PieceClass | null,
  tempStatefulPieces: Map<string, PieceClass>
) => {
  // get position of current player's king.
  const playerKing = filterMapByValue(
    tempStatefulPieces,
    (piece) =>
      piece.getType() === PieceType.KING &&
      piece.getIsWhite() === pieceToMove?.getIsWhite()
  );

  const playerKingPiece = playerKing.values().next().value;
  const playerKingPosition = playerKing.keys().next().value;

  // get opponent's pieces
  const opponentsPieces = filterMapByValue(
    tempStatefulPieces,
    (piece) => piece.getIsWhite() !== playerKingPiece.getIsWhite()
  );

  // check if any of opponent's pieces could take King
  for (const [position, oppPiece] of opponentsPieces) {
    if (
      !checkIfPieceInWay(
        position,
        playerKingPosition,
        tempStatefulPieces,
        oppPiece
      )
    ) {
      if (
        checkPieceMoveAbility(
          oppPiece,
          position,
          playerKingPosition,
          tempStatefulPieces
        )
      ) {
        return true;
      }
    }
  }
  return false;
};
