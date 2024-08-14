import { useState } from "react";
import SelectPlayers from "./SelectPlayers/selectPlayer";
import FancySLTile from "./fancySLtile";
import './fancySL.css';
function FancySL() {
    const [playerCount, setPlayerCount] = useState(0);
    const [playerPostions, updatePlayerPositions] = useState(Array(6).fill(null));

    function createPlayers(pCount) {
        switch (pCount) {
            case 1:
                updatePlayerPositions([0, null, null, null, null, null]);
                break;

            case 2:
                updatePlayerPositions([0, 0, null, null, null, null]);
                break;

            case 3:
                updatePlayerPositions([0, 0, 0, null, null, null]);
                break;

            case 4:
                updatePlayerPositions([0, 0, 0, 0, null, null]);
                break;

            case 5:
                updatePlayerPositions([0, 0, 0, 0, 0, null]);
                break;

            case 6:
                updatePlayerPositions([0, 0, 0, 0, 0, 0]);
                break;
        }
    }

    if (playerCount == 0) {
        return (
            <div className="fancySL">
                <SelectPlayers onSubmit={setPlayerCount} createPly={createPlayers}></SelectPlayers>
            </div>
        );
    }
    else {
        return (
            <div className="fancySL">
                Player Count = {playerCount}
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
                <button onClick={() => updatePlayerPositions([3, 0, null, null, null, null])}>Move P1</button>
            </div>
        );
    }
}
export default FancySL