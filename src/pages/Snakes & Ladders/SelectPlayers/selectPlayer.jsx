import { useState } from "react";
import playSoundOf from "../soundHandler";
import "./selectPlayer.css";
function SelectPlayers({ onSubmit, createPly }) {
  const [players, setPlayers] = useState(2);

  function decreasePlayer() {
    playSoundOf("button", true);
    if (players == 2) setPlayers(4);
    else setPlayers(players - 1);
  }

  function increasePlayer() {
    playSoundOf("button", true);
    if (players == 4) setPlayers(2);
    else setPlayers(players + 1);
  }

  function onSubmitClicked() {
    playSoundOf("button", true);
    onSubmit(players);
    createPly(players);
  }

  return (
    <div className="selectPlayer">
      <p> Select Number of Players :</p>
      <div className="playerCounter">
        <button id="decreasePlayer" onClick={() => decreasePlayer()}>
          {" "}
          -1{" "}
        </button>
        <div>{players}</div>
        <button id="increasePlayer" onClick={() => increasePlayer()}>
          +1
        </button>
      </div>
      <button id="submitPlayers" onClick={() => onSubmitClicked()}>
        Submit
      </button>
    </div>
  );
}
export default SelectPlayers;
