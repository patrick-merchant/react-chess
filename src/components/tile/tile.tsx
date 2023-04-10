import { FC, useEffect, useState } from "react";
import { halfLetters } from "../../payloads/tiles";
import { Piece } from "../piece";
import { Code, ITileProps } from "./types";
import { IPieceProps } from "../piece/types";

export const Tile: FC<ITileProps> = ({ code, startingPieceProps, targetPosition, setTargetPosition, initial, setInitial, isWhiteTurn, setIsWhiteTurn }) => {
  const [isInitial, setIsInitial] = useState(false);
  const [isTarget, setIsTarget] = useState(false);
  const [statefulPieceProps, setStatefulPieceProps] = useState(startingPieceProps)

  useEffect(() => {
    if (initial?.code.letter === code.letter && initial?.code.number === code.number) {
      setIsInitial(true);
    } else {
      setIsInitial(false)
    }

    if (targetPosition?.letter === code.letter && targetPosition?.number === code.number) {
      setIsTarget(false);
    } else {
      setIsTarget(false);
    }
  }, [initial, targetPosition])

  const handleClick = (code: Code, statefulPieceProps?: IPieceProps) => {
    if(!statefulPieceProps && initial) {
      // if tile has no piece on it and an initial piece has been selected:
      console.log("case 1");
      setTargetPosition(code);
      setStatefulPieceProps(initial.pieceProps)
      setInitial(null);
    } else if (statefulPieceProps && (initial?.code.letter !== code.letter && initial?.code.number !== code.number)) {
      // if tile has a piece on it and that piece is not at the same position as the initially selected piece:
      console.log("case 2");
      console.log("code", code);
      console.log("IP", initial);
      setInitial({code: code, pieceProps: statefulPieceProps});
      setStatefulPieceProps(undefined);
    } else {
      // if tile is the same as initial.
      console.log("case 3");
      console.log("code: ", code);
      console.log("initial: ", initial);
      console.log("SPP: ", statefulPieceProps);
      
      
      setStatefulPieceProps(initial?.pieceProps)
      setInitial(null)
    }
  }
  
  if (
    (code.number % 2 === 0 && halfLetters.includes(code.letter)) ||
    (code.number % 2 !== 0 && !halfLetters.includes(code.letter))
  ) {
    return (
      <div id={code.letter + code.number} className={`w-16 h-16 bg-orange-300 ${isInitial || isTarget ? "opacity-70" : "opacity-100"}`} onClick={() => handleClick(code, statefulPieceProps)} 
      >
        {statefulPieceProps && (
          <Piece
            isWhite={statefulPieceProps.isWhite}
            isTaken={statefulPieceProps.isTaken}
            location={statefulPieceProps.location}
            type={statefulPieceProps.type}
            icon={statefulPieceProps.icon}
          />
        )}
      </div>
    );
  } else {
    return (
      <div id={code.letter + code.number} className={`w-16 h-16 bg-yellow-700 ${isInitial || isTarget ? "opacity-70" : "opacity-100"}`} onClick={() => handleClick(code, statefulPieceProps)} >
        {statefulPieceProps && (
          <Piece
            isWhite={statefulPieceProps.isWhite}
            isTaken={statefulPieceProps.isTaken}
            location={statefulPieceProps.location}
            type={statefulPieceProps.type}
            icon={statefulPieceProps.icon}
          />
        )}
      </div>
    );
  }
};
