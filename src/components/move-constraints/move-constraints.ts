import { letters, numbers } from "../../payloads/tiles";
import { PieceClass } from "../piece/class";
import { PieceType } from "../piece/types";

export const checkAllowedMoves = (
  piece: PieceClass | null,
  startPosition: string,
  endPosition: string
): Array<string> => {
  const allowedEndPositions = new Array<string>();
  const letterIndex = letters.indexOf(startPosition[0]);
  const numberIndex = numbers.indexOf(startPosition[1]);

  const moveDirection = checkMoveDirection(startPosition, endPosition);

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
  }
  return allowedEndPositions;
};

export const checkMoveDirection = (
  startPosition: string,
  endPosition: string
) => {
  // Not an issue for Knights.
  // All other pieces will move diagonally, horizontally, or vertically.
  if (startPosition[0] === endPosition[0]) {
    // positions are in same column - vertical
    return MOVE_DIRECTION.VERTICAL;
  } else if (startPosition[1] === endPosition[1]) {
    // positions are in same row - horizontal
    return MOVE_DIRECTION.HORIZONTAL;
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
    return MOVE_DIRECTION.DIAGONAL;
  }
};
