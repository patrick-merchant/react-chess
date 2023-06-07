// map with key as clicked squares, values as start positions of rooks
export const castleClickedSquares = new Map<string, string>([
  ["c1", "a1"],
  ["g1", "h1"],
  ["c8", "a8"],
  ["g8", "h8"],
]);

// map for Rook target position when castling, based on clicked square
export const castleRookTargetSquares = new Map<string, string>([
  ["c1", "d1"],
  ["g1", "f1"],
  ["c8", "d8"],
  ["g8", "f8"],
]);
