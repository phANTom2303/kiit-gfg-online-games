import { useState } from "react";
import SelectPlayers from "./SelectPlayers/selectPlayer";
import FancySLTile from "./fancySLtile";
import './fancySL.css';
function FancySL() {
    const [playerCount, setPlayerCount] = useState(0);
    const [playerPostions, updatePlayerPositions] = useState(Array(6).fill(null));
    const[message,updateMessage] = useState(null);
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

    //AI generated
    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }
    //AI generated



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
                Player Count = {playerCount} Dice : {message}
                <button onClick={() => updateMessage(rollDice())}>Roll Dice</button>
                <div className="row">
                    <FancySLTile tileNumber={99} playerPos={playerPostions} />
                    <FancySLTile tileNumber={98} playerPos={playerPostions} />
                    <FancySLTile tileNumber={97} playerPos={playerPostions} />
                    <FancySLTile tileNumber={96} playerPos={playerPostions} />
                    <FancySLTile tileNumber={95} playerPos={playerPostions} />
                    <FancySLTile tileNumber={94} playerPos={playerPostions} />
                    <FancySLTile tileNumber={93} playerPos={playerPostions} />
                    <FancySLTile tileNumber={92} playerPos={playerPostions} />
                    <FancySLTile tileNumber={91} playerPos={playerPostions} />
                    <FancySLTile tileNumber={90} playerPos={playerPostions} />
                </div>
                <div className="row">
                    <FancySLTile tileNumber={80} playerPos={playerPostions} />
                    <FancySLTile tileNumber={81} playerPos={playerPostions} />
                    <FancySLTile tileNumber={82} playerPos={playerPostions} />
                    <FancySLTile tileNumber={83} playerPos={playerPostions} />
                    <FancySLTile tileNumber={84} playerPos={playerPostions} />
                    <FancySLTile tileNumber={85} playerPos={playerPostions} />
                    <FancySLTile tileNumber={86} playerPos={playerPostions} />
                    <FancySLTile tileNumber={87} playerPos={playerPostions} />
                    <FancySLTile tileNumber={88} playerPos={playerPostions} />
                    <FancySLTile tileNumber={89} playerPos={playerPostions} />
                </div>
                <div className="row">
                    <FancySLTile tileNumber={79} playerPos={playerPostions} />
                    <FancySLTile tileNumber={78} playerPos={playerPostions} />
                    <FancySLTile tileNumber={77} playerPos={playerPostions} />
                    <FancySLTile tileNumber={76} playerPos={playerPostions} />
                    <FancySLTile tileNumber={75} playerPos={playerPostions} />
                    <FancySLTile tileNumber={74} playerPos={playerPostions} />
                    <FancySLTile tileNumber={73} playerPos={playerPostions} />
                    <FancySLTile tileNumber={72} playerPos={playerPostions} />
                    <FancySLTile tileNumber={71} playerPos={playerPostions} />
                    <FancySLTile tileNumber={70} playerPos={playerPostions} />
                </div>
                <div className="row">
                    <FancySLTile tileNumber={60} playerPos={playerPostions} />
                    <FancySLTile tileNumber={61} playerPos={playerPostions} />
                    <FancySLTile tileNumber={62} playerPos={playerPostions} />
                    <FancySLTile tileNumber={63} playerPos={playerPostions} />
                    <FancySLTile tileNumber={64} playerPos={playerPostions} />
                    <FancySLTile tileNumber={65} playerPos={playerPostions} />
                    <FancySLTile tileNumber={66} playerPos={playerPostions} />
                    <FancySLTile tileNumber={67} playerPos={playerPostions} />
                    <FancySLTile tileNumber={68} playerPos={playerPostions} />
                    <FancySLTile tileNumber={69} playerPos={playerPostions} />
                </div>
                <div className="row">
                    <FancySLTile tileNumber={59} playerPos={playerPostions} />
                    <FancySLTile tileNumber={58} playerPos={playerPostions} />
                    <FancySLTile tileNumber={57} playerPos={playerPostions} />
                    <FancySLTile tileNumber={56} playerPos={playerPostions} />
                    <FancySLTile tileNumber={55} playerPos={playerPostions} />
                    <FancySLTile tileNumber={54} playerPos={playerPostions} />
                    <FancySLTile tileNumber={53} playerPos={playerPostions} />
                    <FancySLTile tileNumber={52} playerPos={playerPostions} />
                    <FancySLTile tileNumber={51} playerPos={playerPostions} />
                    <FancySLTile tileNumber={50} playerPos={playerPostions} />
                </div>
                <div className="row">
                    <FancySLTile tileNumber={40} playerPos={playerPostions} />
                    <FancySLTile tileNumber={41} playerPos={playerPostions} />
                    <FancySLTile tileNumber={42} playerPos={playerPostions} />
                    <FancySLTile tileNumber={43} playerPos={playerPostions} />
                    <FancySLTile tileNumber={44} playerPos={playerPostions} />
                    <FancySLTile tileNumber={45} playerPos={playerPostions} />
                    <FancySLTile tileNumber={46} playerPos={playerPostions} />
                    <FancySLTile tileNumber={47} playerPos={playerPostions} />
                    <FancySLTile tileNumber={48} playerPos={playerPostions} />
                    <FancySLTile tileNumber={49} playerPos={playerPostions} />
                </div>
                <div className="row">
                    <FancySLTile tileNumber={39} playerPos={playerPostions} />
                    <FancySLTile tileNumber={38} playerPos={playerPostions} />
                    <FancySLTile tileNumber={37} playerPos={playerPostions} />
                    <FancySLTile tileNumber={36} playerPos={playerPostions} />
                    <FancySLTile tileNumber={35} playerPos={playerPostions} />
                    <FancySLTile tileNumber={34} playerPos={playerPostions} />
                    <FancySLTile tileNumber={33} playerPos={playerPostions} />
                    <FancySLTile tileNumber={32} playerPos={playerPostions} />
                    <FancySLTile tileNumber={31} playerPos={playerPostions} />
                    <FancySLTile tileNumber={30} playerPos={playerPostions} />
                </div>
                <div className="row">
                    <FancySLTile tileNumber={20} playerPos={playerPostions} />
                    <FancySLTile tileNumber={21} playerPos={playerPostions} />
                    <FancySLTile tileNumber={22} playerPos={playerPostions} />
                    <FancySLTile tileNumber={23} playerPos={playerPostions} />
                    <FancySLTile tileNumber={24} playerPos={playerPostions} />
                    <FancySLTile tileNumber={25} playerPos={playerPostions} />
                    <FancySLTile tileNumber={26} playerPos={playerPostions} />
                    <FancySLTile tileNumber={27} playerPos={playerPostions} />
                    <FancySLTile tileNumber={28} playerPos={playerPostions} />
                    <FancySLTile tileNumber={29} playerPos={playerPostions} />
                </div>
                <div className="row">
                    <FancySLTile tileNumber={19} playerPos={playerPostions} />
                    <FancySLTile tileNumber={18} playerPos={playerPostions} />
                    <FancySLTile tileNumber={17} playerPos={playerPostions} />
                    <FancySLTile tileNumber={16} playerPos={playerPostions} />
                    <FancySLTile tileNumber={15} playerPos={playerPostions} />
                    <FancySLTile tileNumber={14} playerPos={playerPostions} />
                    <FancySLTile tileNumber={13} playerPos={playerPostions} />
                    <FancySLTile tileNumber={12} playerPos={playerPostions} />
                    <FancySLTile tileNumber={11} playerPos={playerPostions} />
                    <FancySLTile tileNumber={10} playerPos={playerPostions} />
                </div>
                <div className="row">
                    <FancySLTile tileNumber={0} playerPos={playerPostions} />
                    <FancySLTile tileNumber={1} playerPos={playerPostions} />
                    <FancySLTile tileNumber={2} playerPos={playerPostions} />
                    <FancySLTile tileNumber={3} playerPos={playerPostions} />
                    <FancySLTile tileNumber={4} playerPos={playerPostions} />
                    <FancySLTile tileNumber={5} playerPos={playerPostions} />
                    <FancySLTile tileNumber={6} playerPos={playerPostions} />
                    <FancySLTile tileNumber={7} playerPos={playerPostions} />
                    <FancySLTile tileNumber={8} playerPos={playerPostions} />
                    <FancySLTile tileNumber={9} playerPos={playerPostions} />
                </div>
            </div>
        );
    }
}
export default FancySL