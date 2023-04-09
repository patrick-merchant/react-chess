import { IPieceProps, PieceType } from "../components/piece/types";
import { letters } from "./tiles";

export const addPieces = () => {
  const pieces: IPieceProps[] = [];

  addWhitePawns(pieces);
  addBlackPawns(pieces);
  addWhiteRooks(pieces);
  addBlackRooks(pieces);
  addWhiteKnights(pieces);
  addBlackKnights(pieces);
  addWhiteBishops(pieces);
  addBlackBishops(pieces);
  addWhiteQueen(pieces);
  addBlackQueen(pieces);
  addWhiteKing(pieces);
  addBlackKing(pieces);

  return pieces;
};

export const addWhitePawns = (pieces: IPieceProps[]) => {
  for (let i = 0; i < 8; i++) {
    const pawn: IPieceProps = {
      isWhite: true,
      isTaken: false,
      type: PieceType.PAWN,
      location: {
        letter: letters[i],
        number: 2,
      },
    };
    pieces.push(pawn);
  }
};

export const addBlackPawns = (pieces: IPieceProps[]) => {
  for (let i = 0; i < 8; i++) {
    const pawn: IPieceProps = {
      isWhite: false,
      isTaken: false,
      type: PieceType.PAWN,
      location: {
        letter: letters[i],
        number: 7,
      },
    };
    pieces.push(pawn);
  }
};

export const addWhiteRooks = (pieces: IPieceProps[]) => {
  for (let i = 0; i < 8; i + 7) {
    const rook: IPieceProps = {
      isWhite: true,
      isTaken: false,
      type: PieceType.ROOK,
      location: {
        letter: letters[i],
        number: 1,
      },
    };
    pieces.push(rook);
  }
};

export const addBlackRooks = (pieces: IPieceProps[]) => {
  for (let i = 0; i < 8; i + 7) {
    const rook: IPieceProps = {
      isWhite: false,
      isTaken: false,
      type: PieceType.ROOK,
      location: {
        letter: letters[i],
        number: 8,
      },
    };
    pieces.push(rook);
  }
};

export const addWhiteBishops = (pieces: IPieceProps[]) => {
  for (let i = 2; i < 5; i + 3) {
    const bishop: IPieceProps = {
      isWhite: true,
      isTaken: false,
      type: PieceType.BISHOP,
      location: {
        letter: letters[i],
        number: 1,
      },
    };
    pieces.push(bishop);
  }
};

export const addBlackBishops = (pieces: IPieceProps[]) => {
  for (let i = 2; i < 5; i + 3) {
    const bishop: IPieceProps = {
      isWhite: false,
      isTaken: false,
      type: PieceType.BISHOP,
      location: {
        letter: letters[i],
        number: 8,
      },
    };
    pieces.push(bishop);
  }
};

export const addWhiteKnights = (pieces: IPieceProps[]) => {
  for (let i = 1; i < 7; i + 5) {
    const knight: IPieceProps = {
      isWhite: true,
      isTaken: false,
      type: PieceType.KNIGHT,
      location: {
        letter: letters[i],
        number: 1,
      },
    };
    pieces.push(knight);
  }
};

export const addBlackKnights = (pieces: IPieceProps[]) => {
  for (let i = 1; i < 7; i + 5) {
    const knight: IPieceProps = {
      isWhite: false,
      isTaken: false,
      type: PieceType.KNIGHT,
      location: {
        letter: letters[i],
        number: 8,
      },
    };
    pieces.push(knight);
  }
};

export const addWhiteQueen = (pieces: IPieceProps[]) => {
  const queen: IPieceProps = {
    isWhite: true,
    isTaken: false,
    type: PieceType.QUEEN,
    location: {
      letter: "d",
      number: 1,
    },
  };
  pieces.push(queen);
};

export const addBlackQueen = (pieces: IPieceProps[]) => {
  const queen: IPieceProps = {
    isWhite: false,
    isTaken: false,
    type: PieceType.QUEEN,
    location: {
      letter: "e",
      number: 8,
    },
  };
};

export const addWhiteKing = (pieces: IPieceProps[]) => {
  const king: IPieceProps = {
    isWhite: true,
    isTaken: false,
    type: PieceType.KING,
    location: {
      letter: "e",
      number: 1,
    },
  };
  pieces.push(king);
};

export const addBlackKing = (pieces: IPieceProps[]) => {
  const king: IPieceProps = {
    isWhite: false,
    isTaken: false,
    type: PieceType.KING,
    location: {
      letter: "d",
      number: 8,
    },
  };
  pieces.push(king);
};
