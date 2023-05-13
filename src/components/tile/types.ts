import { PieceClass } from "../piece/types";

export interface ITileProps {
  code: string;
  piece: PieceClass | null;
  targetPosition: string | null;
  setTargetPosition: React.Dispatch<React.SetStateAction<any>>;
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
}
