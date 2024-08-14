import { useState } from "react";
import styles from './selectPlayer.module.css'
function SelectPlayers({ onSubmit, createPly}) {
    const [players, setPlayers] = useState(2);

    function decreasePlayer() {
        if (players == 2)
            setPlayers(6);
        else
            setPlayers(players - 1);
    }

    function increasePlayer() {
        if (players == 6)
            setPlayers(2);
        else
            setPlayers(players + 1);
    }

    function onSubmitClicked(){
        onSubmit(players);
        createPly(players);
    }

    return (
        <div className={styles.selectPlayer}>
            <p> Select Number of Players :</p>
            <div className="playerCounter">
                <button onClick={() => decreasePlayer()}> -1 </button>
                <div>{players}</div>
                <button onClick={() => increasePlayer()}>+1</button>
            </div>
            <button onClick={() => onSubmitClicked()}>Submit</button>
        </div>
    );
}
export default SelectPlayers;