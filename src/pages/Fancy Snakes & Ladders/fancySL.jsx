import { useState } from "react";
import SelectPlayers from "./SelectPlayers/selectPlayer";
import FancySLTile from "./fancySLtile";
import './fancySL.css';
function FancySL() {
    const [playerCount, setPlayerCount] = useState(0);
    const [playerPostions, updatePlayerPositions] = useState([0, 3, 1, 1, 2, 3]);

    // if (playerCount != 0) {
    //     return (
    //         <div className="fancySL">Player Count = {playerCount}</div>
    //     );
    // }
    // else {
    //     return (
    //         <div className="fancySL">
    //             <SelectPlayers onSubmit={setPlayerCount}></SelectPlayers>
    //         </div>
    //     );
    // }



    return (
        <>
            <div className="fancySL">
                <div className="row">
                    <FancySLTile tileNumber={0} playerPos={playerPostions}></FancySLTile>
                    <FancySLTile tileNumber={1} playerPos={playerPostions}></FancySLTile>
                    <FancySLTile tileNumber={2} playerPos={playerPostions}></FancySLTile>
                    <FancySLTile tileNumber={3} playerPos={playerPostions}></FancySLTile>
                    <FancySLTile tileNumber={4} playerPos={playerPostions}></FancySLTile>
                    <FancySLTile tileNumber={6} playerPos={playerPostions}></FancySLTile>
                    <FancySLTile tileNumber={7} playerPos={playerPostions}></FancySLTile>
                    <FancySLTile tileNumber={8} playerPos={playerPostions}></FancySLTile>
                    <FancySLTile tileNumber={9} playerPos={playerPostions}></FancySLTile>

                </div>
                <button onClick={() => updatePlayerPositions([0, 0, 0, 0, null, 0])}> Reset</button>
            </div>

        </>
    );
}
export default FancySL