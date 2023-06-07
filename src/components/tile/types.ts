import { PieceClass } from "../piece/class";

export interface ITileProps {
  code: string;
  piece: PieceClass | null;
  initial: string | null;
  setInitial: React.Dispatch<React.SetStateAction<any>>;
  isWhiteTurn: boolean;
  setIsWhiteTurn: React.Dispatch<React.SetStateAction<boolean>>;
  takenPieces: Array<PieceClass>;
  setTakenPieces: React.Dispatch<React.SetStateAction<Array<PieceClass>>>;
  statefulPieces: Map<string, PieceClass>;
  setStatefulPieces: React.Dispatch<
    React.SetStateAction<Map<string, PieceClass>>
  >;
  movedKings: Array<string>;
  setMovedKings: React.Dispatch<React.SetStateAction<Array<string>>>;
  movedRooks: Array<string>;
  setMovedRooks: React.Dispatch<React.SetStateAction<Array<string>>>;
}
