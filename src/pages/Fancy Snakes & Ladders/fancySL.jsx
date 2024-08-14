import { useState } from "react";
import SelectPlayers from "./SelectPlayers/selectPlayer";
import './fancySL.css';
function FancySL() {
    const [playerCount, setPlayerCount] = useState(0);

    if (playerCount != 0) {
        return (
            <div className="fancySL">Player Count = {playerCount}</div>
        );
    }
    else {
        return (
            <div className="fancySL">
            <SelectPlayers onSubmit= {setPlayerCount}></SelectPlayers>
            </div>
        );
    }
}
export default FancySL