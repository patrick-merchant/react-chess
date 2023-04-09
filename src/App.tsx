import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Board } from "./components/board";
import { addPieces } from "./payloads/pieces";

function App() {
  return <Board />;
}

export default App;
