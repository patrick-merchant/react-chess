import { IPieceProps } from "../piece/types";

export interface ITileProps {
  code: Code;
  pieceProps?: IPieceProps | undefined;
}

export type Code = {
  letter: string;
  number: number;
};
