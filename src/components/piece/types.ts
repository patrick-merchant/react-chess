import { Code } from "../tile/types";

export interface IPieceProps {
  isWhite: boolean;
  isTaken: boolean;
  location: Code;
  type: PieceType;
}

export enum PieceType {
  PAWN = "Pawn",
  ROOK = "Rook",
  KNIGHT = "Knight",
  BISHOP = "Bishop",
  QUEEN = "Queen",
  KING = "King",
}
