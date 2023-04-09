import { FC } from "react";
import { letters, numbers } from "../../payloads/tiles";
import { ILabelProps, Side } from "./types";

export const Label: FC<ILabelProps> = ({ ...props }) => {
  return props.side === Side.LEFT ? (
    <div className="absolute -left-16 w-16 h-[512px] flex flex-col">
      {numbers.map((number) => (
        <div key={number} className="w-16 h-16 flex">
          <p className="m-auto">{number}</p>
        </div>
      ))}
    </div>
  ) : props.side === Side.TOP ? (
    <div className="absolute -top-16 w-[512px] h-16 flex flex-row">
      {letters.map((letter) => (
        <div key={letter} className="w-16 h-16 flex">
          <p className="m-auto">{letter}</p>
        </div>
      ))}
    </div>
  ) : props.side === Side.RIGHT ? (
    <div className="absolute -right-16 w-16 h-[512px] flex flex-col">
      {numbers.map((number) => (
        <div key={number} className="w-16 h-16 flex">
          <p className="m-auto">{number}</p>
        </div>
      ))}
    </div>
  ) : (
    <div className="absolute -bottom-16 h-16 w-[512px] flex flex-row">
      {letters.map((letter) => (
        <div key={letter} className="w-16 h-16 flex">
          <p className="m-auto">{letter}</p>
        </div>
      ))}
    </div>
  );
};
