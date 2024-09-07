import P1 from "./players/p1";
import P2 from "./players/p2";
import P3 from "./players/p3";
import P4 from "./players/p4";
function FancySLTile({ tileNumber, playerPos }) {

    return (
        <div className="slbox">
            <P1 tileNum={tileNumber} p1Pos={playerPos[0]} />
            <P2 tileNum={tileNumber} p2Pos={playerPos[1]} />
            <P3 tileNum={tileNumber} p3Pos={playerPos[2]} />
            <P4 tileNum={tileNumber} p4Pos={playerPos[3]} />
        </div>
    );
}
export default FancySLTile