import { letters, numbers } from "../../payloads/tiles";
import { PieceClass } from "../piece/class";
import { PieceType } from "../piece/types";

export const isMoveHorizontal = (
  startPosition: string,
  endPosition: string
) => {
  // positions are in same row - horizontal
  if (startPosition[1] === endPosition[1]) {
    return true;
  }
  return false;
};

export const isMoveVertical = (startPosition: string, endPosition: string) => {
  // positions are in same column - vertical
  if (startPosition[0] === endPosition[0]) {
    return true;
  }
  return false;
};

export const isMoveDiagonal = (startPosition: string, endPosition: string) => {
  // check if horizontal and vertical diff between positions is equal
  // positions are on diagonal
  if (
    Math.abs(
      letters.indexOf(startPosition[0]) - letters.indexOf(endPosition[0])
    ) ===
    Math.abs(
      numbers.indexOf(startPosition[1]) - numbers.indexOf(endPosition[1])
    )
  ) {
    return true;
  }
  return false;
};

export const checkPieceMoveAbility = (
  piece: PieceClass | null,
  startPosition: string,
  endPosition: string
): boolean => {
  const allowedEndPositions = new Array<string>();
  const letterIndex = letters.indexOf(startPosition[0]);
  const numberIndex = numbers.indexOf(startPosition[1]);

  if (piece?.getType() == PieceType.KNIGHT) {
    // knight can move 2 spaces in one direction, 1 in the other - not diagonal
    allowedEndPositions.push(
      letters[letterIndex + 2] + numbers[numberIndex + 1]
    );
    allowedEndPositions.push(
      letters[letterIndex + 2] + numbers[numberIndex - 1]
    );
    allowedEndPositions.push(
      letters[letterIndex - 2] + numbers[numberIndex + 1]
    );
    allowedEndPositions.push(
      letters[letterIndex - 2] + numbers[numberIndex - 1]
    );
    allowedEndPositions.push(
      letters[letterIndex + 1] + numbers[numberIndex + 2]
    );
    allowedEndPositions.push(
      letters[letterIndex + 1] + numbers[numberIndex - 2]
    );
    allowedEndPositions.push(
      letters[letterIndex - 1] + numbers[numberIndex + 2]
    );
    allowedEndPositions.push(
      letters[letterIndex - 1] + numbers[numberIndex - 2]
    );

    if (allowedEndPositions.includes(endPosition)) {
      return true;
    } else {
      return false;
    }
  } else if (piece?.getType() == PieceType.ROOK) {
    if (
      // rook can only move straight lines
      isMoveHorizontal(startPosition, endPosition) ||
      isMoveVertical(startPosition, endPosition)
    ) {
      return true;
    } else {
      return false;
    }
  } else if (piece?.getType() == PieceType.BISHOP) {
    if (
      // bishop can only move on diagonals
      isMoveDiagonal(startPosition, endPosition)
    ) {
      return true;
    } else {
      return false;
    }
  } else if (piece?.getType() == PieceType.QUEEN) {
    if (
      // queen can move in any direction
      isMoveHorizontal(startPosition, endPosition) ||
      isMoveVertical(startPosition, endPosition) ||
      isMoveDiagonal(startPosition, endPosition)
    ) {
      return true;
    } else {
      return false;
    }
  } else if (piece?.getType() == PieceType.KING) {
    if (
      // king can move in any direction, but only one square
      (isMoveHorizontal(startPosition, endPosition) ||
        isMoveVertical(startPosition, endPosition) ||
        isMoveDiagonal(startPosition, endPosition)) &&
      Math.abs(
        numbers.indexOf(endPosition[1]) - numbers.indexOf(startPosition[1])
      ) < 2 &&
      Math.abs(
        letters.indexOf(endPosition[0]) - letters.indexOf(startPosition[0])
      ) < 2
    ) {
      return true;
    } else {
      return false;
    }
  } else if (piece?.getType() == PieceType.PAWN) {
    if (
      // pawn can only move forwards
      // can move 1 vertical, or 2 vertical if on starting square
      // can only take diagonally
      // en passant
      isMoveVertical(startPosition, endPosition) &&
      piece.getIsWhite() &&
      (numbers.indexOf(endPosition[1]) - numbers.indexOf(startPosition[1]) ===
        1 ||
        (numbers.indexOf(endPosition[1]) - numbers.indexOf(startPosition[1]) ===
          2 &&
          startPosition[1] == "2"))
    ) {
      return true;
    } else if (
      isMoveVertical(startPosition, endPosition) &&
      !piece.getIsWhite() &&
      (numbers.indexOf(startPosition[1]) - numbers.indexOf(endPosition[1]) ===
        1 ||
        (numbers.indexOf(startPosition[1]) - numbers.indexOf(endPosition[1]) ===
          2 &&
          startPosition[1] == "7"))
    ) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};

export const checkIfPieceInWay = (
  startPosition: string,
  endPosition: string,
  statefulPieces: Map<string, PieceClass>,
  pieceToMove: PieceClass
): boolean => {
  // Not an issue for Knights.
  if (pieceToMove.getType() === PieceType.KNIGHT) {
    return false;
  }

  let allowedMoves = new Array<string>();
  // All other pieces will move diagonally, horizontally, or vertically.
  if (isMoveVertical(startPosition, endPosition)) {
    if (numbers.indexOf(startPosition[1]) < numbers.indexOf(endPosition[1])) {
      for (
        let i = numbers.indexOf(startPosition[1]) + 1;
        i < numbers.indexOf(endPosition[1]) + 1;
        i++
      ) {
        if (startPosition[0] + numbers[i] == endPosition) {
          allowedMoves.push(startPosition[0] + numbers[i]);
        } else if (
          statefulPieces.get(startPosition[0] + numbers[i]) !== undefined
        ) {
          break;
        } else {
          allowedMoves.push(startPosition[0] + numbers[i]);
        }
      }
    } else {
      for (
        let i = numbers.indexOf(startPosition[1]) - 1;
        i > numbers.indexOf(endPosition[1]) - 1;
        i--
      ) {
        if (startPosition[0] + numbers[i] == endPosition) {
          allowedMoves.push(startPosition[0] + numbers[i]);
        } else if (
          statefulPieces.get(startPosition[0] + numbers[i]) !== undefined
        ) {
          break;
        } else {
          allowedMoves.push(startPosition[0] + numbers[i]);
        }
      }
    }
  } else if (isMoveHorizontal(startPosition, endPosition)) {
    if (letters.indexOf(startPosition[0]) < letters.indexOf(endPosition[0])) {
      for (
        let i = letters.indexOf(startPosition[0]) + 1;
        i < letters.indexOf(endPosition[0]) + 1;
        i++
      ) {
        if (letters[i] + startPosition[1] == endPosition) {
          allowedMoves.push(letters[i] + startPosition[1]);
        } else if (
          statefulPieces.get(letters[i] + startPosition[1]) !== undefined
        ) {
          break;
        } else {
          allowedMoves.push(letters[i] + startPosition[1]);
        }
      }
    } else {
      for (
        let i = letters.indexOf(startPosition[0]) - 1;
        i > letters.indexOf(endPosition[0]) - 1;
        i--
      ) {
        if (letters[i] + startPosition[1] == endPosition) {
          allowedMoves.push(letters[i] + startPosition[1]);
        } else if (
          statefulPieces.get(letters[i] + startPosition[1]) !== undefined
        ) {
          break;
        } else {
          allowedMoves.push(letters[i] + startPosition[1]);
        }
      }
    }
  } else if (isMoveDiagonal(startPosition, endPosition)) {
    if (
      letters.indexOf(startPosition[0]) < letters.indexOf(endPosition[0]) &&
      numbers.indexOf(startPosition[1]) < numbers.indexOf(endPosition[1])
    ) {
      for (
        let i = letters.indexOf(startPosition[0]) + 1;
        i < letters.indexOf(endPosition[0]) + 1;
        i++
      ) {
        if (
          letters[i] +
            numbers[
              numbers.indexOf(startPosition[1]) +
                (i - letters.indexOf(startPosition[0]))
            ] ==
          endPosition
        ) {
          allowedMoves.push(
            letters[i] +
              numbers[
                numbers.indexOf(startPosition[1]) +
                  (i - letters.indexOf(startPosition[0]))
              ]
          );
        } else if (
          statefulPieces.get(
            letters[i] +
              numbers[
                numbers.indexOf(startPosition[1]) +
                  (i - letters.indexOf(startPosition[0]))
              ]
          ) !== undefined
        ) {
          break;
        } else {
          allowedMoves.push(
            letters[i] +
              numbers[
                numbers.indexOf(startPosition[1]) +
                  (i - letters.indexOf(startPosition[0]))
              ]
          );
        }
      }
    } else if (
      letters.indexOf(startPosition[0]) < letters.indexOf(endPosition[0]) &&
      numbers.indexOf(startPosition[1]) > numbers.indexOf(endPosition[1])
    ) {
      for (
        let i = letters.indexOf(startPosition[0]) + 1;
        i < letters.indexOf(endPosition[0]) + 1;
        i++
      ) {
        if (
          letters[i] +
            numbers[
              numbers.indexOf(startPosition[1]) -
                (i - letters.indexOf(startPosition[0]))
            ] ==
          endPosition
        ) {
          allowedMoves.push(
            letters[i] +
              numbers[
                numbers.indexOf(startPosition[1]) -
                  (i - letters.indexOf(startPosition[0]))
              ]
          );
        } else if (
          statefulPieces.get(
            letters[i] +
              numbers[
                numbers.indexOf(startPosition[1]) -
                  (i - letters.indexOf(startPosition[0]))
              ]
          ) !== undefined
        ) {
          break;
        } else {
          allowedMoves.push(
            letters[i] +
              numbers[
                numbers.indexOf(startPosition[1]) -
                  (i - letters.indexOf(startPosition[0]))
              ]
          );
        }
      }
    } else if (
      letters.indexOf(startPosition[0]) > letters.indexOf(endPosition[0]) &&
      numbers.indexOf(startPosition[1]) > numbers.indexOf(endPosition[1])
    ) {
      for (
        let i = letters.indexOf(startPosition[0]) - 1;
        i > letters.indexOf(endPosition[0]) - 1;
        i--
      ) {
        if (
          letters[i] +
            numbers[
              numbers.indexOf(startPosition[1]) +
                (i - letters.indexOf(startPosition[0]))
            ] ==
          endPosition
        ) {
          allowedMoves.push(
            letters[i] +
              numbers[
                numbers.indexOf(startPosition[1]) +
                  (i - letters.indexOf(startPosition[0]))
              ]
          );
        } else if (
          statefulPieces.get(
            letters[i] +
              numbers[
                numbers.indexOf(startPosition[1]) +
                  (i - letters.indexOf(startPosition[0]))
              ]
          ) !== undefined
        ) {
          break;
        } else {
          allowedMoves.push(
            letters[i] +
              numbers[
                numbers.indexOf(startPosition[1]) +
                  (i - letters.indexOf(startPosition[0]))
              ]
          );
        }
      }
    } else {
      for (
        let i = letters.indexOf(startPosition[0]) - 1;
        i > letters.indexOf(endPosition[0]) - 1;
        i--
      ) {
        if (
          letters[i] +
            numbers[
              numbers.indexOf(startPosition[1]) +
                (letters.indexOf(startPosition[0]) - i)
            ] ==
          endPosition
        ) {
          allowedMoves.push(
            letters[i] +
              numbers[
                numbers.indexOf(startPosition[1]) +
                  (letters.indexOf(startPosition[0]) - i)
              ]
          );
        } else if (
          statefulPieces.get(
            letters[i] +
              numbers[
                numbers.indexOf(startPosition[1]) +
                  (letters.indexOf(startPosition[0]) - i)
              ]
          ) !== undefined
        ) {
          break;
        } else {
          allowedMoves.push(
            letters[i] +
              numbers[
                numbers.indexOf(startPosition[1]) +
                  (letters.indexOf(startPosition[0]) - i)
              ]
          );
        }
      }
    }
  }
  console.log(allowedMoves);

  if (allowedMoves.includes(endPosition)) {
    return false;
  } else {
    return true;
  }
};
