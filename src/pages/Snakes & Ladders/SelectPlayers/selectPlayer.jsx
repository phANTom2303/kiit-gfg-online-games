import { useState } from "react";
import './selectPlayer.css'
function SelectPlayers({ onSubmit, createPly}) {
    const [players, setPlayers] = useState(2);

    function decreasePlayer() {
        if (players == 2)
            setPlayers(4);
        else
            setPlayers(players - 1);
    }

    function increasePlayer() {
        if (players == 4)
            setPlayers(2);
        else
            setPlayers(players + 1);
    }

    function onSubmitClicked(){
        onSubmit(players);
        createPly(players);
    }

    return (
        <div className="selectPlayer">
            <p> Select Number of Players :</p>
            <div className="playerCounter">
                <button  id="decreasePlayer" onClick={() => decreasePlayer()}> -1 </button>
                <div>{players}</div>
                <button  id="increasePlayer" onClick={() => increasePlayer()}>+1</button>
            </div>
            <button id="submitPlayers" onClick={() => onSubmitClicked()}>Submit</button>
        </div>
    );
}
export default SelectPlayers;