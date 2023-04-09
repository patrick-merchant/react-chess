import { Code } from "../tile/types";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface IPieceProps {
  isWhite: boolean;
  isTaken: boolean;
  location: Code;
  type: PieceType;
  icon: IconDefinition;
}

export enum PieceType {
  PAWN = "pawn",
  ROOK = "rook",
  KNIGHT = "knight",
  BISHOP = "bishop",
  QUEEN = "queen",
  KING = "king",
}
