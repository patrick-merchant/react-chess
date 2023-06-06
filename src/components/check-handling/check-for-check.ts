import {
  checkIfPieceInWay,
  checkPieceMoveAbility,
  getSquaresInPath,
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

export const getOppKing = (
  playerPiece: PieceClass | null,
  tempStatefulPieces: Map<string, PieceClass>
) => {
  // get position of opponent's king.
  const oppKing = filterMapByValue(
    tempStatefulPieces,
    (piece) =>
      piece.getType() === PieceType.KING &&
      piece.getIsWhite() !== playerPiece?.getIsWhite()
  );

  const oppKingPosition = oppKing.keys().next().value;
  const oppKingPiece = oppKing.values().next().value;

  return { oppKingPosition, oppKingPiece };
};

export const getPlayerKing = (
  playerPiece: PieceClass | null,
  tempStatefulPieces: Map<string, PieceClass>
) => {
  // get position of player to go next's king.
  const playerKing = filterMapByValue(
    tempStatefulPieces,
    (piece) =>
      piece.getType() === PieceType.KING &&
      piece.getIsWhite() === playerPiece?.getIsWhite()
  );

  const playerKingPosition = playerKing.keys().next().value;
  const playerKingPiece = playerKing.values().next().value;

  return { playerKingPosition, playerKingPiece };
};

export const checkIfKingCouldBeTaken = (
  opponentsPieces: Map<string, PieceClass>,
  playerKingPosition: string,
  tempStatefulPieces: Map<string, PieceClass>
) => {
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

export const checkIfCheckCanBeBlocked = (
  threatPiecePosition: string,
  playerKingPosition: string,
  statefulPieces: Map<string, PieceClass>,
  playersPieces: Map<string, PieceClass>
) => {
  // get squares function currently returns path including endPosition - need to rule this out here then
  const squaresToBlock = getSquaresInPath(
    threatPiecePosition,
    playerKingPosition,
    statefulPieces
  );
  console.log("SQUARES2BLOCK", squaresToBlock);

  // check if any of player's pieces could block check
  for (const [position, playerPiece] of playersPieces) {
    // loop through whole array except last item (as this is king position)
    for (let i = 0; i < squaresToBlock.length - 1; i++) {
      if (
        !checkIfPieceInWay(
          position,
          squaresToBlock[i],
          statefulPieces,
          playerPiece
        ) &&
        checkPieceMoveAbility(
          playerPiece,
          position,
          squaresToBlock[i],
          statefulPieces
        )
      ) {
        let postTakeStateful = new Map(statefulPieces);
        postTakeStateful.set(squaresToBlock[i], playerPiece);
        postTakeStateful.delete(position);
        if (!enforceCheck(playerPiece, postTakeStateful)) {
          return true;
        }
      }
    }
  }
  return false;
};

export const checkIfThreatCouldBeTaken = (
  playersPieces: Map<string, PieceClass>,
  threatPiecePosition: string,
  statefulPieces: Map<string, PieceClass>
) => {
  // check if any of player's pieces could take threatPiece
  for (const [position, playerPiece] of playersPieces) {
    if (
      !checkIfPieceInWay(
        position,
        threatPiecePosition,
        statefulPieces,
        playerPiece
      ) &&
      checkPieceMoveAbility(
        playerPiece,
        position,
        threatPiecePosition,
        statefulPieces
      )
    ) {
      let postTakeStateful = new Map(statefulPieces);
      postTakeStateful.set(threatPiecePosition, playerPiece);
      postTakeStateful.delete(position);
      if (!enforceCheck(playerPiece, postTakeStateful)) {
        return true;
      }
    }
  }
  return false;
};

// takes in piece player is about to move, checks if moving it would put/leave player in check
export const enforceCheck = (
  pieceToMove: PieceClass | null,
  tempStatefulPieces: Map<string, PieceClass>
) => {
  // get position of current player's king.
  const { playerKingPosition, playerKingPiece } = getPlayerKing(
    pieceToMove,
    tempStatefulPieces
  );

  // get opponent's pieces
  const opponentsPieces = filterMapByValue(
    tempStatefulPieces,
    (piece) => piece.getIsWhite() !== playerKingPiece.getIsWhite()
  );
  console.log(opponentsPieces);

  // check if any of opponent's pieces could take King
  const result = checkIfKingCouldBeTaken(
    opponentsPieces,
    playerKingPosition,
    tempStatefulPieces
  );

  return result;
};

// takes in last moved piece, checks if it puts opponent's king in check
export const checkForCheck = (
  lastMovedPiece: PieceClass | null,
  tempStatefulPieces: Map<string, PieceClass>
) => {
  // get position of current opponent's king.
  const { oppKingPosition, oppKingPiece } = getOppKing(
    lastMovedPiece,
    tempStatefulPieces
  );

  // get player's pieces
  const playersPieces = filterMapByValue(
    tempStatefulPieces,
    (piece) => piece.getIsWhite() !== oppKingPiece.getIsWhite()
  );

  // check if an of opponent's pieces could take King
  const result = checkIfKingCouldBeTaken(
    playersPieces,
    oppKingPosition,
    tempStatefulPieces
  );

  return result;
};
