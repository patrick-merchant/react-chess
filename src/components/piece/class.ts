import { IconDefinition, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { IPieceProps, PieceType } from "./types";

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
