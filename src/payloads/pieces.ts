import {
  faChessBishop,
  faChessKing,
  faChessKnight,
  faChessPawn,
  faChessQueen,
  faChessRook,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import { PieceClass, PieceType } from "../components/piece/types";

export const addPieces = () => {
  const pieceMappings: Map<string, PieceClass> = new Map();

  // map black pieces
  pieceMappings.set(
    "a8",
    new PieceClass({
      isWhite: false,
      type: PieceType.ROOK,
      icon: faChessRook,
    })
  );
  pieceMappings.set(
    "b8",
    new PieceClass({
      isWhite: false,
      type: PieceType.KNIGHT,
      icon: faChessKnight,
    })
  );
  pieceMappings.set(
    "c8",
    new PieceClass({
      isWhite: false,
      type: PieceType.BISHOP,
      icon: faChessBishop,
    })
  );
  pieceMappings.set(
    "d8",
    new PieceClass({
      isWhite: false,
      type: PieceType.QUEEN,
      icon: faChessQueen,
    })
  );
  pieceMappings.set(
    "e8",
    new PieceClass({
      isWhite: false,
      type: PieceType.KING,
      icon: faChessKing,
    })
  );
  pieceMappings.set(
    "f8",
    new PieceClass({
      isWhite: false,
      type: PieceType.BISHOP,
      icon: faChessBishop,
    })
  );
  pieceMappings.set(
    "g8",
    new PieceClass({
      isWhite: false,
      type: PieceType.KNIGHT,
      icon: faChessKnight,
    })
  );
  pieceMappings.set(
    "h8",
    new PieceClass({
      isWhite: false,
      type: PieceType.ROOK,
      icon: faChessRook,
    })
  );
  pieceMappings.set(
    "a7",
    new PieceClass({
      isWhite: false,
      type: PieceType.PAWN,
      icon: faChessPawn,
    })
  );
  pieceMappings.set(
    "b7",
    new PieceClass({
      isWhite: false,
      type: PieceType.PAWN,
      icon: faChessPawn,
    })
  );
  pieceMappings.set(
    "c7",
    new PieceClass({
      isWhite: false,
      type: PieceType.PAWN,
      icon: faChessPawn,
    })
  );
  pieceMappings.set(
    "d7",
    new PieceClass({
      isWhite: false,
      type: PieceType.PAWN,
      icon: faChessPawn,
    })
  );
  pieceMappings.set(
    "e7",
    new PieceClass({
      isWhite: false,
      type: PieceType.PAWN,
      icon: faChessPawn,
    })
  );
  pieceMappings.set(
    "f7",
    new PieceClass({
      isWhite: false,
      type: PieceType.PAWN,
      icon: faChessPawn,
    })
  );
  pieceMappings.set(
    "g7",
    new PieceClass({
      isWhite: false,
      type: PieceType.PAWN,
      icon: faChessPawn,
    })
  );
  pieceMappings.set(
    "h7",
    new PieceClass({
      isWhite: false,
      type: PieceType.PAWN,
      icon: faChessPawn,
    })
  );

  // map white pieces
  pieceMappings.set(
    "a1",
    new PieceClass({
      isWhite: true,
      type: PieceType.ROOK,
      icon: faChessRook,
    })
  );
  pieceMappings.set(
    "b1",
    new PieceClass({
      isWhite: true,
      type: PieceType.KNIGHT,
      icon: faChessKnight,
    })
  );
  pieceMappings.set(
    "c1",
    new PieceClass({
      isWhite: true,
      type: PieceType.BISHOP,
      icon: faChessBishop,
    })
  );
  pieceMappings.set(
    "d1",
    new PieceClass({
      isWhite: true,
      type: PieceType.QUEEN,
      icon: faChessQueen,
    })
  );
  pieceMappings.set(
    "e1",
    new PieceClass({
      isWhite: true,
      type: PieceType.KING,
      icon: faChessKing,
    })
  );
  pieceMappings.set(
    "f1",
    new PieceClass({
      isWhite: true,
      type: PieceType.BISHOP,
      icon: faChessBishop,
    })
  );
  pieceMappings.set(
    "g1",
    new PieceClass({
      isWhite: true,
      type: PieceType.KNIGHT,
      icon: faChessKnight,
    })
  );
  pieceMappings.set(
    "h1",
    new PieceClass({
      isWhite: true,
      type: PieceType.ROOK,
      icon: faChessRook,
    })
  );
  pieceMappings.set(
    "a2",
    new PieceClass({
      isWhite: true,
      type: PieceType.PAWN,
      icon: faChessPawn,
    })
  );
  pieceMappings.set(
    "b2",
    new PieceClass({
      isWhite: true,
      type: PieceType.PAWN,
      icon: faChessPawn,
    })
  );
  pieceMappings.set(
    "c2",
    new PieceClass({
      isWhite: true,
      type: PieceType.PAWN,
      icon: faChessPawn,
    })
  );
  pieceMappings.set(
    "d2",
    new PieceClass({
      isWhite: true,
      type: PieceType.PAWN,
      icon: faChessPawn,
    })
  );
  pieceMappings.set(
    "e2",
    new PieceClass({
      isWhite: true,
      type: PieceType.PAWN,
      icon: faChessPawn,
    })
  );
  pieceMappings.set(
    "f2",
    new PieceClass({
      isWhite: true,
      type: PieceType.PAWN,
      icon: faChessPawn,
    })
  );
  pieceMappings.set(
    "g2",
    new PieceClass({
      isWhite: true,
      type: PieceType.PAWN,
      icon: faChessPawn,
    })
  );
  pieceMappings.set(
    "h2",
    new PieceClass({
      isWhite: true,
      type: PieceType.PAWN,
      icon: faChessPawn,
    })
  );

  return pieceMappings;
};
