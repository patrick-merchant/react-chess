import { letters, numbers } from "../../payloads/tiles";
import { PieceClass } from "../piece/class";
import { PieceType } from "../piece/types";

export const checkPieceMoveAbility = (
  piece: PieceClass | null,
  startPosition: string,
  endPosition: string
): boolean => {
  const allowedEndPositions = new Array<string>();
  const letterIndex = letters.indexOf(startPosition[0]);
  const numberIndex = numbers.indexOf(startPosition[1]);

  if (piece?.getType() == PieceType.KNIGHT) {
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
      endPosition[0] === startPosition[0] ||
      endPosition[1] == startPosition[1]
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
  if (startPosition[0] === endPosition[0]) {
    // positions are in same column - vertical
    if (numbers.indexOf(startPosition[1]) < numbers.indexOf(endPosition[1])) {
      for (
        let i = numbers.indexOf(startPosition[1]) + 1;
        i < numbers.indexOf(endPosition[1]) + 1;
        i++
      ) {
        if (statefulPieces.get(startPosition[0] + numbers[i]) !== undefined) {
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
        if (statefulPieces.get(startPosition[0] + numbers[i]) !== undefined) {
          break;
        } else {
          allowedMoves.push(startPosition[0] + numbers[i]);
        }
      }
    }
  } else if (startPosition[1] === endPosition[1]) {
    // positions are in same row - horizontal
    if (letters.indexOf(startPosition[0]) < letters.indexOf(endPosition[0])) {
      for (
        let i = letters.indexOf(startPosition[0]) + 1;
        i < letters.indexOf(endPosition[0]) + 1;
        i++
      ) {
        if (statefulPieces.get(letters[i] + startPosition[1]) !== undefined) {
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
        if (statefulPieces.get(letters[i] + startPosition[1]) !== undefined) {
          break;
        } else {
          allowedMoves.push(letters[i] + startPosition[1]);
        }
      }
    }
  } else if (
    Math.abs(
      letters.indexOf(startPosition[0]) - letters.indexOf(endPosition[0])
    ) ===
    Math.abs(
      numbers.indexOf(startPosition[1]) - numbers.indexOf(endPosition[1])
    )
  ) {
    // check if horizontal and vertical diff between positions is equal
    // positions are on diagonal
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

  if (allowedMoves.includes(endPosition)) {
    return false;
  } else {
    return true;
  }
};
