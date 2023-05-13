import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface IPieceProps {
  isWhite: boolean;
  type: PieceType;
  icon: IconDefinition;
  pieceSize?: SizeProp;
}

export enum PieceType {
  PAWN = "pawn",
  ROOK = "rook",
  KNIGHT = "knight",
  BISHOP = "bishop",
  QUEEN = "queen",
  KING = "king",
}

export class PieceClass {
  private readonly isWhite: boolean;
  private readonly type: PieceType;
  private readonly icon: IconDefinition;
  private readonly pieceSize?: SizeProp;

  constructor(props: IPieceProps) {
    this.isWhite = props.isWhite;
    this.type = props.type;
    this.icon = props.icon;
    this.pieceSize = props.pieceSize;
  }

  public getIsWhite(): boolean {
    return this.isWhite;
  }

  public getType(): PieceType {
    return this.type;
  }

  public getIcon(): IconDefinition {
    return this.icon;
  }

  public getPieceSize(): SizeProp | undefined {
    return this.pieceSize;
  }
}
