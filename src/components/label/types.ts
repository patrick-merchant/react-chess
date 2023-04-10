import { HTMLAttributes } from "react";

export interface ILabelProps extends HTMLAttributes<HTMLDivElement> {
  side: Side | string;
}

export enum Side {
  LEFT,
  TOP,
  RIGHT,
  BOTTOM,
}
