import { IPieceProps } from "../piece/types";

export interface ITileProps {
  code: Code;
  startingPieceProps: IPieceProps | undefined;
  targetPosition: Code | null;
  setTargetPosition: React.Dispatch<React.SetStateAction<any>>;
  initial: Initial | null;
  setInitial: React.Dispatch<React.SetStateAction<any>>;
  isWhiteTurn: boolean;
  setIsWhiteTurn: React.Dispatch<React.SetStateAction<boolean>>;
  takenPieces: Array<IPieceProps>;
  setTakenPieces: React.Dispatch<React.SetStateAction<Array<IPieceProps>>>;
}

export type Code = {
  letter: string;
  number: number;
};

export type Initial = {
  code: Code;
  pieceProps: IPieceProps;
}
